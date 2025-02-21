from flask import Flask, render_template, request
import pandas as pd
import joblib

# Load the trained model
import joblib

# Load model correctly
with open("pipeFinal.pkl", "rb") as model_file:
    model = joblib.load(model_file)


# Define expected column names
num_cols = [
    "MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)", "MDVP:Jitter(%)", "MDVP:Jitter(Abs)",
    "MDVP:RAP", "MDVP:PPQ", "Jitter:DDP", "MDVP:Shimmer", "MDVP:Shimmer(dB)",
    "Shimmer:APQ3", "Shimmer:APQ5", "MDVP:APQ", "Shimmer:DDA", "NHR", "HNR",
    "RPDE", "DFA", "spread1", "spread2", "D2", "PPE"
]

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    prediction = None
    
    if request.method == "POST":
        try:
            # Get form data as a dictionary
            form_data = {col: float(request.form[col]) for col in num_cols}

            # Convert to DataFrame
            X_test = pd.DataFrame([form_data])

            # Make prediction
            prediction = model.predict(X_test)[0]
        
        except Exception as e:
            prediction = f"Error: {str(e)}"

    return render_template("index.html", prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True)
