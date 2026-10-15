
# Global Economic Intelligence Dashboard

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=flat&logo=d3.js&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI_Inference-00A67E?style=flat)
![World Bank](https://img.shields.io/badge/World_Bank-API-009FDA?style=flat)

> An interactive economic intelligence and business analytics platform covering 217 countries and territories, integrating World Bank indicators, machine learning, GDP forecasting, AI-generated economic insights, news sentiment analysis, and interactive visualizations.

Built with **Python, Flask, D3.js, Plotly, Scikit-Learn, Statsmodels, and Groq AI**.

---

## Overview

The Global Economic Intelligence Dashboard transforms macroeconomic data into accessible business intelligence through automated data ingestion, statistical analysis, machine learning, and interactive dashboards.

The platform enables users to explore economic performance, compare countries, identify anomalies, forecast GDP trends, and generate country-level economic reports.

### Key Highlights

- **217 countries and territories** covered by the World Bank country dataset.
- **186 countries and territories with available GDP observations** in the tested data snapshot.
- **8 K-Means economic clusters** for country segmentation.
- **5-year GDP forecasts** using ARIMA time-series modeling.
- **Isolation Forest** for GDP growth anomaly detection.
- **Rule-based recession-risk indicators** using economic fundamentals.
- **AI-generated economic summaries** grounded in World Bank observations.
- **News sentiment analysis** using VADER and NewsAPI.
- **30-minute background data refresh** with WebSocket notifications.
- **Interactive D3.js maps, Plotly charts, and printable economic reports**.

Data availability varies by indicator and reporting year.

---

## Features

### 1. Interactive World Economic Dashboard

- D3.js choropleth visualization of global economic indicators.
- Toggle between GDP, GDP per capita, inflation, and unemployment.
- Country search with autocomplete.
- Click countries to view detailed economic information.
- Dynamic color scaling and missing-data handling.
- Interactive country comparison and economic benchmarking.

### 2. AI-Powered Economic Intelligence

Integrates the Groq API using the `openai/gpt-oss-120b` model.

Capabilities include:

- Three-sentence economic summaries for individual countries.
- Grounding prompts in retrieved World Bank economic indicators.
- Contextual interpretation of GDP, GDP growth, inflation, and unemployment.
- Explicit acknowledgment of unavailable economic data.
- Economic Risk Indicator with Low, Medium, High, or Unknown classifications.

AI-generated summaries are explanatory commentary and should be checked against source observations.

### 3. Machine Learning and Statistical Analysis

**K-Means Country Clustering**

- Segments economies into eight clusters.
- Uses GDP per capita, inflation, unemployment, and GDP growth.
- Standardizes economic features before clustering.
- Handles missing features through imputation within the clustering workflow.
- Identifies economically similar countries for comparative analysis.

**ARIMA GDP Forecasting**

- Uses the ARIMA(1,1,1) time-series model.
- Retrieves historical nominal GDP observations.
- Generates five-year country-level GDP projections.
- Visualizes historical and predicted values using Plotly.

**Isolation Forest Anomaly Detection**

- Detects statistical outliers in GDP growth data.
- Uses Scikit-Learn's Isolation Forest.
- Configured with a contamination parameter of 0.10.
- Provides anomaly counts and affected countries.

**Recession-Risk Analysis**

- Evaluates GDP growth, inflation, and unemployment.
- Applies weighted, rule-based economic thresholds.
- Produces an economic-risk classification and explanatory factors.
- Exposes a numerical risk score for dashboard visualization.

The risk score is a heuristic and is not a statistically calibrated recession probability.

### 4. News Sentiment Analysis

- Fetches economic news headlines through NewsAPI.
- Applies VADER natural-language sentiment scoring.
- Categorizes sentiment as positive, neutral, or negative.
- Displays headline-level sentiment alongside country analysis.

### 5. Currency Exchange Rates

- Retrieves exchange rates relative to the US dollar.
- Supports currency mappings for a range of countries.
- Displays available exchange-rate information within country-detail panels.

### 6. Real-Time Dashboard Notifications

- Flask-SocketIO provides client-server communication.
- Background refresh attempts run every 30 minutes.
- Connected clients receive `data_refreshed` notifications.
- Supports dashboard updates without requiring a full manual reload.

World Bank economic observations are periodically refreshed, not real-time streaming market prices.

### 7. Interactive Analytics and Visualizations

- D3.js world economic choropleth.
- Plotly GDP forecasting charts.
- Country comparison radar charts.
- Economic health gauge.
- GDP per capita leaderboard.
- Animated historical GDP bar chart race.
- Economic anomaly visualization.

### 8. Economic Reporting

Generates on-demand, printable country reports containing:

- GDP and GDP per capita.
- GDP growth and population.
- Inflation and unemployment.
- Currency information.
- Economic Health Score.
- News sentiment.
- Economic Risk Indicator.
- AI-generated economic summary.

Reports can be saved as PDF using the browser's print functionality.

Scheduled reporting and server-side PDF generation are not currently implemented.

---

## Technology Stack

| Component | Technologies |
|---|---|
| Backend | Python, Flask, Flask-SocketIO |
| Data Processing | Pandas, NumPy |
| Economic Data | World Bank API, wbgapi |
| Machine Learning | Scikit-Learn, K-Means, Isolation Forest |
| Forecasting | Statsmodels, ARIMA |
| Generative AI | Groq API, GPT-OSS 120B |
| NLP | VADER Sentiment Analysis |
| News | NewsAPI |
| Currency | ExchangeRate API |
| Visualization | D3.js, Plotly, TopoJSON |
| Frontend | JavaScript, HTML5, CSS3 |
| Communication | REST APIs, Socket.IO |

---

## System Architecture

```text
                   External Data Sources
                           |
             +-------------+-------------+
             |             |             |
         World Bank      NewsAPI     ExchangeRate
             |             |             |
             +-------------+-------------+
                           |
                    Python / Flask
                           |
              Data Ingestion & Processing
                           |
                       Pandas
                           |
           +---------------+---------------+
           |               |               |
       Forecasting      Clustering       Anomaly
         ARIMA           K-Means         Detection
           |               |          Isolation Forest
           +---------------+---------------+
                           |
                  Economic Risk Rules
                           |
                  Groq AI Integration
                           |
                    REST API Layer
                           |
                 Flask-SocketIO Events
                           |
                  JavaScript Frontend
                           |
              +------------+------------+
              |            |            |
           D3.js         Plotly       Reports
          World Map      Charts       Browser PDF
```

---

## Project Structure

```text
Global-Economic-Intelligence-Dashboard/
|
|-- app.py
|-- requirements.txt
|-- .gitignore
|-- .env                       # Local credentials (not committed)
|
|-- templates/
|   |-- index.html
|
|-- static/
|   |-- dashboard.js
|   |-- style.css
|
|-- analysis/
|   |-- anomaly.py
|   |-- clustering.py
|   |-- forecasting.py
|   |-- recession.py
|   |-- sentiment.py
```

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Smit-Velani/Global-Economic-Intelligence-Dashboard.git

cd Global-Economic-Intelligence-Dashboard
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

Activate on Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Or on macOS/Linux:

```bash
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```dotenv
NEWS_API_KEY=your_newsapi_key_here
GROQ_API_KEY=your_groq_api_key_here
FLASK_SECRET_KEY=replace_with_a_random_secret
```

API key providers:

- NewsAPI: https://newsapi.org/register
- Groq: https://console.groq.com

Never commit real API credentials to GitHub.

### 5. Start the Application

```bash
python app.py
```

Open:

http://127.0.0.1:5000

The application currently runs in a Flask development configuration. Production deployment requires additional security, configuration, and operational hardening.

---

## API Documentation

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Render dashboard |
| GET | `/api/countries` | Retrieve countries and economic indicators |
| GET | `/api/country/<code>` | Economic details, AI summary, forecasting, sentiment, clustering |
| GET | `/api/top10` | Top GDP-per-capita entries |
| GET | `/api/anomalies` | Isolation Forest anomaly results |
| Socket.IO | `/socket.io` | Real-time connection and refresh notifications |

### Example: Country Economic Analysis

```bash
curl http://127.0.0.1:5000/api/country/USA
```

The response includes fields such as:

```json
{
  "code": "USA",
  "country": "United States",
  "forecast": {},
  "recession": {
    "level": "Low",
    "probability": 5,
    "factors": []
  },
  "risk_rating": "Low",
  "sentiment": {},
  "similar_countries": {},
  "currency": {},
  "summary": "AI-generated economic summary"
}
```

The values above illustrate the response structure. The legacy `probability` field represents a heuristic score, not a calibrated probability.

---

## Machine Learning Methodology

### K-Means Clustering

**Input features:**

- GDP per capita.
- Inflation.
- Unemployment.
- GDP growth.

**Pipeline:**

1. Retrieve World Bank indicators.
2. Clean and validate numeric features.
3. Impute missing clustering features.
4. Standardize features.
5. Train K-Means with eight clusters.
6. Assign countries to economic clusters.
7. Identify countries with similar characteristics.

K-Means provides descriptive grouping; it does not establish causal or economic equivalence.

### ARIMA Forecasting

Model configuration:

```python
ARIMA(order=(1, 1, 1))
```

The forecasting workflow retrieves historical nominal GDP data and produces a five-year projection.

Forecasts are statistical estimates and should not be interpreted as guaranteed future outcomes.

### Isolation Forest

```python
IsolationForest(
    contamination=0.1,
    random_state=42
)
```

Isolation Forest identifies GDP-growth observations that differ significantly from typical cross-country patterns.

Outliers are not necessarily economic crises or erroneous records.

### Economic Risk Scoring

The economic-risk indicator combines threshold-based signals from:

- GDP growth.
- Inflation.
- Unemployment.

The model produces a rule-based score and risk classification.

It is not trained logistic regression and does not estimate a calibrated recession probability.

---

## Data Sources

| Source | Data |
|---|---|
| World Bank API | GDP, GDP per capita, population, inflation, unemployment, GDP growth |
| NewsAPI | News headlines |
| ExchangeRate API | Currency exchange rates |
| Natural Earth / TopoJSON | World map geographic boundaries |
| Groq API | AI-generated narrative analysis |

World Bank indicators may refer to different reporting years depending on availability.

---

## Testing and Validation

The project underwent local functionality checks covering:

- 217 World Bank country and territory records.
- 186 entries with available GDP observations in the tested snapshot.
- ARIMA forecasts for the United States, India, and Germany.
- Eight K-Means clusters and peer-country comparisons.
- Isolation Forest anomaly API connectivity.
- Simulated Flask-SocketIO refresh events.
- Rule-based recession-risk scenarios.
- AI-generated economic summaries grounded in retrieved data.
- Browser-generated economic reporting.
- API endpoint availability.

### Application Health Check

**22/22 checks passed** during local testing.

The checks covered required files, Python syntax, key Flask endpoints, and basic response validation.

These tests do not establish forecasting accuracy, complete feature coverage, scalability, or production readiness.

---

## Limitations and Future Improvements

Potential enhancements include:

- Forecast backtesting and accuracy metrics.
- Stronger handling of indicator reporting-year differences.
- Persistent database storage and ingestion history.
- Improved anomaly interpretation.
- Calibrated recession prediction models.
- Automated server-side PDF reporting.
- Production-ready deployment and authentication.
- Automated test suites and CI/CD.
- Better monitoring and error recovery.
- Improved AI-output validation and consistency checks.

---

## Author

**Smitkumar Velani**  
M.S. Data Science  
Northeastern University, Boston

[GitHub](https://github.com/Smit-Velani) | [LinkedIn](https://linkedin.com/in/smit-velani) | [Portfolio](https://smit-velani.github.io)

---

*Built with Python, Flask, D3.js, Scikit-Learn, Statsmodels, Groq AI, and World Bank Data.*
