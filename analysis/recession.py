def predict_recession(gdp_growth, inflation, unemployment):
    try:
        risk_score = 0
        factors = []

        gdp_growth = float(gdp_growth) if gdp_growth is not None else None
        inflation = float(inflation) if inflation is not None else None
        unemployment = float(unemployment) if unemployment is not None else None

        # GDP growth (weight 40%)
        if gdp_growth is None:
            risk_score += 20
        elif gdp_growth < 0:
            risk_score += 40
            factors.append(f"Contracting economy ({gdp_growth:.1f}%)")
        elif gdp_growth < 1:
            risk_score += 25
            factors.append(f"Near-zero growth ({gdp_growth:.1f}%)")
        elif gdp_growth < 2:
            risk_score += 10

        # Inflation (weight 35%)
        if inflation is None:
            risk_score += 15
        elif inflation > 15:
            risk_score += 35
            factors.append(f"Hyperinflation ({inflation:.1f}%)")
        elif inflation > 10:
            risk_score += 25
            factors.append(f"High inflation ({inflation:.1f}%)")
        elif inflation > 7:
            risk_score += 15
            factors.append(f"Elevated inflation ({inflation:.1f}%)")
        elif inflation < 0:
            risk_score += 20
            factors.append(f"Deflation risk ({inflation:.1f}%)")

        # Unemployment (weight 25%)
        if unemployment is None:
            risk_score += 10
        elif unemployment > 20:
            risk_score += 25
            factors.append(f"Very high unemployment ({unemployment:.1f}%)")
        elif unemployment > 15:
            risk_score += 18
            factors.append(f"High unemployment ({unemployment:.1f}%)")
        elif unemployment > 10:
            risk_score += 10
            factors.append(f"Elevated unemployment ({unemployment:.1f}%)")

        probability = min(92, max(5, risk_score))

        if probability >= 60:
            level = "High"
        elif probability >= 35:
            level = "Medium"
        else:
            level = "Low"

        return {
            "probability": probability,
            "level": level,
            "factors": factors[:3]
        }
    except Exception as e:
        return {"probability": 0, "level": "Unknown", "factors": [], "error": str(e)}