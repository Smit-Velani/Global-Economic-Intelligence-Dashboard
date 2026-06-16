import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

_cluster_df = None

def build_clusters(combined_df):
    global _cluster_df
    try:
        features = ['gdp_per_capita', 'inflation', 'unemployment', 'gdp_growth']
        df = combined_df[['country', 'name'] + features].copy()
        df = df.dropna(subset=features)

        if len(df) < 10:
            return None

        X = df[features].values.astype(float)
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        n_clusters = min(8, len(df) // 5)
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        df = df.copy()
        df.loc[:, 'cluster'] = kmeans.fit_predict(X_scaled)
        df.loc[:, 'x_scaled'] = list(X_scaled)

        _cluster_df = df
        return df
    except Exception as e:
        print(f"Clustering error: {e}")
        return None

def get_similar_countries(target_code, n=5):
    global _cluster_df

    if _cluster_df is None:
        return {"similar": [], "cluster": None}

    try:
        df = _cluster_df

        if target_code not in df['country'].values:
            return {"similar": [], "cluster": None}

        target_row = df[df['country'] == target_code].iloc[0]
        target_cluster = target_row['cluster']
        target_scaled = np.array(target_row['x_scaled'])

        same_cluster = df[(df['cluster'] == target_cluster) & (df['country'] != target_code)].copy()

        if len(same_cluster) == 0:
            return {"similar": [], "cluster": int(target_cluster)}

        distances = []
        for _, row in same_cluster.iterrows():
            dist = float(np.sqrt(np.sum((np.array(row['x_scaled']) - target_scaled) ** 2)))
            distances.append(dist)

        same_cluster = same_cluster.copy()
        same_cluster['distance'] = distances
        similar = same_cluster.nsmallest(n, 'distance')

        result = []
        for _, row in similar.iterrows():
            result.append({
                'country': str(row['country']),
                'name': str(row['name']),
                'gdp_per_capita': round(float(row['gdp_per_capita']), 0) if pd.notna(row['gdp_per_capita']) else None,
                'gdp_growth': round(float(row['gdp_growth']), 2) if pd.notna(row['gdp_growth']) else None
            })

        return {
            "similar": result,
            "cluster": int(target_cluster),
            "cluster_size": int(len(df[df['cluster'] == target_cluster]))
        }
    except Exception as e:
        print(f"Similar countries error: {e}")
        return {"similar": [], "cluster": None}