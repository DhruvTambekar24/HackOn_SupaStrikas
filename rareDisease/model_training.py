import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report, accuracy_score

# Load dataset
data_path = "mimic_iv_extended_sample.csv"
df = pd.read_csv(data_path)

# Encode categorical variables
label_encoder = LabelEncoder()
df["gender"] = label_encoder.fit_transform(df["gender"])
df["diagnosis"] = label_encoder.fit_transform(df["diagnosis"])

# Define features (X) and target (y)
feature_cols = [
    "age", "gender", "heart_rate", "blood_pressure", "temperature",
    "respiratory_rate", "oxygen_saturation", "white_blood_cell_count",
    "hemoglobin", "glucose", "CRP"
]
X = df[feature_cols]
y = df["diagnosis"]

# Standardize numerical features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define XGBoost model
xgb_model = xgb.XGBClassifier(objective="multi:softmax", num_class=len(df["diagnosis"].unique()), eval_metric="mlogloss")

# Hyperparameter tuning
param_grid = {
    "max_depth": [3, 5, 7],
    "learning_rate": [0.01, 0.1, 0.2],
    "n_estimators": [50, 100, 200]
}
grid_search = GridSearchCV(xgb_model, param_grid, cv=3, scoring="accuracy", verbose=1, n_jobs=-1)
grid_search.fit(X_train, y_train)

# Best model
tuned_model = grid_search.best_estimator_

# Evaluate model
y_pred = tuned_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Save model
tuned_model.save_model("xgboost_rare_disease_model.json")