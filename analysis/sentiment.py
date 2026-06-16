import requests
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def get_news_sentiment(country_name, api_key):
    url = f"https://newsapi.org/v2/everything"
    params = {
        "q": f"{country_name} economy",
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 10,
        "apiKey": api_key
    }

    try:
        response = requests.get(url, params=params)
        articles = response.json().get("articles", [])

        if not articles:
            return {
                "score": 0,
                "label": "Neutral",
                "headlines": []
            }

        scores = []
        headlines = []

        for article in articles:
            title = article.get("title", "")
            if title:
                score = analyzer.polarity_scores(title)["compound"]
                scores.append(score)
                headlines.append({
                    "title": title,
                    "score": round(score, 3),
                    "url": article.get("url", "")
                })

        avg_score = round(sum(scores) / len(scores), 3)

        if avg_score >= 0.05:
            label = "Positive"
        elif avg_score <= -0.05:
            label = "Negative"
        else:
            label = "Neutral"

        return {
            "score": avg_score,
            "label": label,
            "headlines": headlines[:5]
        }

    except Exception as e:
        return {
            "score": 0,
            "label": "Neutral",
            "headlines": [],
            "error": str(e)
        }