from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication


with open("pipeFinal.pkl", "rb") as model_file:
    model = joblib.load(model_file)


num_cols = [
    "MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)", "MDVP:Jitter(%)", "MDVP:Jitter(Abs)",
    "MDVP:RAP", "MDVP:PPQ", "Jitter:DDP", "MDVP:Shimmer", "MDVP:Shimmer(dB)",
    "Shimmer:APQ3", "Shimmer:APQ5", "MDVP:APQ", "Shimmer:DDA", "NHR", "HNR",
    "RPDE", "DFA", "spread1", "spread2", "D2", "PPE"
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Convert JSON data to DataFrame
        form_data = {col: float(data[col]) for col in num_cols}
        X_test = pd.DataFrame([form_data])

        # Make prediction
        prediction = model.predict(X_test)[0]
        
        return jsonify({"prediction": int(prediction)})  # Convert to JSON response

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5003)
