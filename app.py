from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import wbgapi as wb
import pandas as pd
import math
import requests
import threading
import time
from analysis.sentiment import get_news_sentiment
from analysis.forecasting import get_gdp_forecast
from analysis.clustering import build_clusters, get_similar_countries
from analysis.recession import predict_recession
from groq import Groq
import warnings
warnings.filterwarnings('ignore')
import os
from dotenv import load_dotenv
load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = Flask(__name__)
app.config['SECRET_KEY'] = 'geoid-2026'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# API Keys
NEWS_API_KEY = "your_newsapi_key_here"
GROQ_API_KEY = "your_groq_api_key_here"

client = Groq(api_key=GROQ_API_KEY)

# Cache
_countries_cache = None
_last_updated = None

def fetch_countries_data():
    global _countries_cache, _last_updated
    try:
        indicators = {
            'NY.GDP.MKTP.CD': 'gdp',
            'SP.POP.TOTL': 'population',
            'FP.CPI.TOTL.ZG': 'inflation',
            'SL.UEM.TOTL.ZS': 'unemployment',
            'NY.GDP.PCAP.CD': 'gdp_per_capita',
            'NY.GDP.MKTP.KD.ZG': 'gdp_growth'
        }

        dfs = []
        for code, name in indicators.items():
            df = wb.data.DataFrame(code, mrv=1)
            df.columns = [name]
            dfs.append(df)

        combined = pd.concat(dfs, axis=1).reset_index()
        combined.columns = ['country'] + list(indicators.values())
        combined = combined.dropna(subset=['gdp'])

        countries_info = {}
        for c in wb.economy.list():
            if isinstance(c, dict):
                countries_info[c.get('id', '')] = c.get('value', '')
            else:
                countries_info[c.id] = c.value

        combined['name'] = combined['country'].map(countries_info)
        combined = combined.dropna(subset=['name'])

        def calc_health_score(row):
            score = 50
            if pd.notna(row.get('gdp_growth')):
                g = row['gdp_growth']
                if g > 5: score += 25
                elif g > 3: score += 15
                elif g > 0: score += 5
                else: score -= 15
            if pd.notna(row.get('inflation')):
                i = row['inflation']
                if 1 <= i <= 3: score += 25
                elif 0 <= i <= 5: score += 15
                elif i <= 8: score += 5
                else: score -= 15
            if pd.notna(row.get('unemployment')):
                u = row['unemployment']
                if u < 4: score += 25
                elif u < 6: score += 15
                elif u < 10: score += 5
                else: score -= 10
            return max(0, min(100, round(score)))

        combined['health_score'] = combined.apply(calc_health_score, axis=1)

        build_clusters(combined)

        _countries_cache = combined
        _last_updated = time.time()
        print(f"Data refreshed at {time.strftime('%H:%M:%S')}")
        return combined
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def background_refresh():
    while True:
        time.sleep(1800)
        print("Auto-refreshing data...")
        fetch_countries_data()
        socketio.emit('data_refreshed', {'timestamp': time.time(), 'time': time.strftime('%H:%M UTC')})

refresh_thread = threading.Thread(target=background_refresh, daemon=True)
refresh_thread.start()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/countries')
def get_countries():
    global _countries_cache
    try:
        if _countries_cache is None:
            combined = fetch_countries_data()
        else:
            combined = _countries_cache

        if combined is None:
            return jsonify({"error": "Could not fetch data"})

        records = combined.to_dict('records')
        for record in records:
            for key, value in record.items():
                if isinstance(value, float) and math.isnan(value):
                    record[key] = None

        return jsonify(records)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/country/<country_code>')
def get_country_detail(country_code):
    try:
        forecast = get_gdp_forecast(country_code)

        country_obj = wb.economy.get(country_code)
        country_name = country_obj.get('value', country_code) if isinstance(country_obj, dict) else country_obj.value

        sentiment = get_news_sentiment(country_name, NEWS_API_KEY)
        currency_data = get_currency(country_code)
        similar = get_similar_countries(country_code)

        recession = {"probability": 0, "level": "Unknown", "factors": []}
        if _countries_cache is not None:
            row_df = _countries_cache[_countries_cache['country'] == country_code]
            if not row_df.empty:
                row = row_df.iloc[0]
                recession = predict_recession(
                    row.get('gdp_growth'), row.get('inflation'), row.get('unemployment')
                )

        prompt = f"""Provide a brief 3-sentence economic summary of {country_name} as of 2026.
        Include latest GDP figures, growth forecast, key challenges, and outlook. Be factual and concise."""
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )
        summary = response.choices[0].message.content

        risk_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": f"Based on {country_name}'s economy in 2026, give one word: Low, Medium, or High risk for investors. Reply with only one word."}]
        )
        risk_rating = risk_response.choices[0].message.content.strip()

        return jsonify({
            "country": country_name,
            "code": country_code,
            "forecast": forecast,
            "sentiment": sentiment,
            "summary": summary,
            "risk_rating": risk_rating,
            "currency": currency_data,
            "similar_countries": similar,
            "recession": recession
        })
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/top10')
def get_top10():
    try:
        df = wb.data.DataFrame('NY.GDP.PCAP.CD', mrv=1)
        df.columns = ['gdp_per_capita']
        df = df.dropna().reset_index()
        df.columns = ['country', 'gdp_per_capita']

        countries_info = {}
        for c in wb.economy.list():
            if isinstance(c, dict):
                countries_info[c.get('id', '')] = c.get('value', '')
            else:
                countries_info[c.id] = c.value

        df['name'] = df['country'].map(countries_info)
        df = df.dropna(subset=['name'])

        exclude = ['WLD','HIC','OEC','EUU','NAC','LCN','ECS','EAS','MEA','SSF','SAS','MIC','LMC','UMC','LIC']
        df = df[~df['country'].isin(exclude)]
        df = df[df['gdp_per_capita'] < 200000]

        top10 = df.nlargest(10, 'gdp_per_capita')
        records = top10.to_dict('records')
        for r in records:
            if isinstance(r.get('gdp_per_capita'), float) and math.isnan(r['gdp_per_capita']):
                r['gdp_per_capita'] = None
        return jsonify(records)
    except Exception as e:
        return jsonify({"error": str(e)})

def get_currency(country_code):
    currency_map = {
        'USA':'USD','GBR':'GBP','JPN':'JPY','CHN':'CNY','IND':'INR',
        'BRA':'BRL','CAN':'CAD','AUS':'AUD','CHE':'CHF','KOR':'KRW',
        'MEX':'MXN','IDN':'IDR','TUR':'TRY','SAU':'SAR','NLD':'EUR',
        'DEU':'EUR','FRA':'EUR','ITA':'EUR','ESP':'EUR','RUS':'RUB',
        'ZAF':'ZAR','NGA':'NGN','EGY':'EGP','ARG':'ARS','PAK':'PKR',
        'BGD':'BDT','VNM':'VND','PHL':'PHP','THA':'THB','MYS':'MYR',
        'SGP':'SGD','NZL':'NZD','SWE':'SEK','NOR':'NOK','DNK':'DKK',
        'POL':'PLN','ISR':'ILS','ARE':'AED','KWT':'KWD','QAT':'QAR',
        'CHL':'CLP','COL':'COP','PER':'PEN','KEN':'KES','GHA':'GHS',
        'ETH':'ETB','TZA':'TZS','UGA':'UGX','HUN':'HUF','CZE':'CZK',
        'ROU':'RON','HRV':'EUR','BGR':'BGN','SRB':'RSD','UKR':'UAH',
        'KAZ':'KZT','UZB':'UZS','BLR':'BYR','GEO':'GEL','ARM':'AMD'
    }
    currency = currency_map.get(country_code)
    if not currency or currency == 'USD':
        return {"currency": "USD", "rate": 1.0}
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=5)
        rate = r.json()['rates'].get(currency)
        return {"currency": currency, "rate": round(rate, 4) if rate else None}
    except:
        return {"currency": currency, "rate": None}

@socketio.on('connect')
def handle_connect():
    emit('connected', {'status': 'Live', 'time': time.strftime('%H:%M UTC')})

if __name__ == '__main__':
    socketio.run(app, debug=True)