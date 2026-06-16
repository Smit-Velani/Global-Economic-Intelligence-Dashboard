import wbgapi as wb
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import warnings
warnings.filterwarnings('ignore')

def get_gdp_forecast(country_code):
    try:
        # Fetch GDP data from World Bank
        data = wb.data.DataFrame('NY.GDP.MKTP.CD', country_code, mrv=20)
        
        if data.empty:
            return {"error": "No data available"}

        # Clean data
        series = data.iloc[0].dropna()
        series.index = pd.to_datetime(series.index.str.replace('YR', ''), format='%Y')
        series = series.sort_index()
        series = series / 1e9  # Convert to billions

        # Fit ARIMA model
        model = ARIMA(series, order=(1, 1, 1))
        fitted = model.fit()

        # Forecast next 5 years
        forecast = fitted.forecast(steps=5)
        last_year = series.index[-1].year

        historical = [
            {"year": int(y.year), "gdp": round(float(v), 2)}
            for y, v in zip(series.index[-10:], series.values[-10:])
        ]

        predicted = [
            {"year": last_year + i + 1, "gdp": round(float(v), 2)}
            for i, v in enumerate(forecast)
        ]

        return {
            "historical": historical,
            "forecast": predicted,
            "unit": "USD Billion"
        }

    except Exception as e:
        return {"error": str(e)}