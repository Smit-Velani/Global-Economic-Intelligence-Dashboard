# Global Economic Intelligence Dashboard

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=flat&logo=d3.js&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_LLaMA-00A67E?style=flat)
![World Bank](https://img.shields.io/badge/World_Bank_API-009FDA?style=flat)

> An end-to-end real-time economic intelligence platform covering 190+ countries with AI-generated summaries, GDP forecasting, recession risk prediction, K-Means country clustering, live news sentiment analysis, and an animated GDP bar chart race — built with Flask, D3.js, and Groq LLaMA 3.3.

---

## Features

**Interactive World Map**
- D3.js choropleth map with GDP data across 190+ countries
- Toggle between GDP, GDP Per Capita, Inflation, and Unemployment views
- Click any country for instant detailed analysis
- Country search bar with live autocomplete

**AI-Powered Country Analysis**
- Groq LLaMA 3.3 generates 3-sentence economic summaries per country
- AI investor risk rating: Low / Medium / High
- Economic Health Score (0-100) based on GDP growth, inflation, unemployment

**Machine Learning Features**
- K-Means clustering identifies economically similar countries
- Recession Risk Predictor using GDP growth, inflation, and unemployment indicators
- Isolation Forest anomaly detection on GDP growth data
- ARIMA time series forecasting for 5-year GDP projections

**Live Data & Sentiment**
- Real-time news headlines via NewsAPI with VADER sentiment analysis
- Currency exchange rates vs USD via ExchangeRate API
- WebSocket real-time updates — data auto-refreshes every 30 minutes

**Visualization & Comparison**
- Animated GDP Bar Chart Race (2000-2024) for top 10 economies
- Country comparison tool with Plotly radar charts
- Top 10 richest countries leaderboard by GDP per capita
- Download country economic report as PDF

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask, Flask-SocketIO |
| ML & AI | Scikit-Learn (K-Means, Isolation Forest), ARIMA (statsmodels), Groq LLaMA 3.3 |
| NLP | VADER Sentiment Analysis, NewsAPI |
| Data | World Bank API (wbgapi), ExchangeRate API |
| Frontend | D3.js v7, Plotly 2.26, TopoJSON, Socket.IO |
| Styling | Custom CSS, White Professional Theme |

---

## Project Structure

```
Global-Economic-Dashboard/
│
├── app.py                      ← Flask backend + WebSocket + API endpoints
├── requirements.txt
├── .env                        ← API keys (not committed)
├── .gitignore
│
├── templates/
│   └── index.html              ← D3.js map + full UI
│
├── static/
│   ├── style.css               ← Professional white theme
│   └── dashboard.js            ← D3.js, Plotly, Socket.IO client
│
└── analysis/
    ├── sentiment.py            ← VADER news sentiment
    ├── forecasting.py          ← ARIMA GDP forecasting
    ├── anomaly.py              ← Isolation Forest anomaly detection
    ├── clustering.py           ← K-Means country clustering
    └── recession.py            ← Recession risk predictor
```

---

## Setup & Installation

**Clone the repository:**
```bash
git clone https://github.com/Smit-Velani/Global-Economic-Intelligence-Dashboard.git
cd Global-Economic-Intelligence-Dashboard
```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Create `.env` file with your API keys:**
```
NEWS_API_KEY=your_newsapi_key_here
GROQ_API_KEY=your_groq_api_key_here
```

Get free API keys:
- NewsAPI: https://newsapi.org/register
- Groq: https://console.groq.com

**Run the app:**
```bash
python app.py
```

Open browser at: `http://127.0.0.1:5000`

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/countries` | All countries with GDP, inflation, unemployment, health score |
| `GET /api/country/<code>` | Full country detail: AI summary, forecast, sentiment, clustering |
| `GET /api/top10` | Top 10 countries by GDP per capita |
| `WS /socket.io` | WebSocket for real-time data refresh notifications |

---

## ML Models

**K-Means Clustering**
- Features: GDP per capita, inflation, unemployment, GDP growth
- 8 clusters of economically similar countries
- Identifies peer countries for benchmarking

**Recession Risk Predictor**
- Rule-based logistic regression approximation
- Risk factors: GDP growth rate, inflation rate, unemployment rate
- Output: probability score (0-100%) and Low/Medium/High level

**ARIMA Forecasting**
- ARIMA(1,1,1) model on 20 years of World Bank GDP data
- Generates 5-year GDP forecast per country
- Handles non-stationary time series with differencing

**Isolation Forest**
- Detects countries with anomalous GDP growth patterns
- Contamination parameter: 10%
- Applied across all available World Bank countries

---

## Data Sources

- **World Bank API** — GDP, population, inflation, unemployment, GDP growth (latest available year)
- **NewsAPI** — Live news headlines for sentiment analysis
- **ExchangeRate API** — Currency exchange rates vs USD
- **Natural Earth / TopoJSON** — World map topology

---

## Author

**Smitkumar Velani**
MS Data Science — Northeastern University, Boston

[GitHub](https://github.com/Smit-Velani) | [LinkedIn](https://linkedin.com/in/smit-velani) | [Portfolio](https://smit-velani.github.io)

---

*Built with Python · Flask · D3.js · Groq LLaMA · World Bank API · Scikit-Learn*
