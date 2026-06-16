import wbgapi as wb
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import warnings
warnings.filterwarnings('ignore')

def detect_anomalies():
    try:
        # Fetch GDP growth data for all countries
        data = wb.data.DataFrame('NY.GDP.MKTP.KD.ZG', mrv=1)
        data = data.dropna()
        data.columns = ['gdp_growth']
        data = data.reset_index()
        data.columns = ['country', 'gdp_growth']

        # Fit Isolation Forest
        model = IsolationForest(contamination=0.1, random_state=42)
        data['anomaly'] = model.fit_predict(data[['gdp_growth']])

        # Get anomalous countries
        anomalies = data[data['anomaly'] == -1].copy()
        anomalies = anomalies.sort_values('gdp_growth')

        return {
            "anomalies": anomalies[['country', 'gdp_growth']].to_dict('records'),
            "total_countries": len(data),
            "anomaly_count": len(anomalies)
        }

    except Exception as e:
        return {"error": str(e)}