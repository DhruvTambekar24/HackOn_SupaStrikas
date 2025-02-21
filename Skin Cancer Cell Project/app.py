# from flask import Flask, render_template, request
# from ultralytics import YOLO
# import os
# import uuid
# import cv2

# app = Flask(__name__)

# UPLOAD_FOLDER = 'static/uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Load the model globally
# model = YOLO('best.pt')


# def predict_top_class(filepath):
#     """
#     Perform inference on the uploaded file and return the top class and confidence.

#     Args:
#         filepath (str): Path to the uploaded file.

#     Returns:
#         dict: A dictionary with top class and its confidence.
#     """
#     try:
#         print("Model Predict called")
#         results = model.predict(
#             source=filepath,
#             conf=0.5,  # Adjust confidence threshold
#             save=False,
#         )

#         # Initialize top class and confidence
#         top_class = None
#         top_confidence = 0.0

#         if results:
#             for result in results:
#                 # Safely check if probs exist and process them
#                 if hasattr(result, 'probs') and result.probs is not None:
#                     if hasattr(result.probs, 'top1') and hasattr(result.probs, 'top1conf'):
#                         top_class_idx = result.probs.top1
#                         top_confidence = float(result.probs.top1conf)
#                         top_class = model.names[top_class_idx]

#         return {
#             'type': top_class,
#             'confidence': top_confidence * 100
#         }

#     except Exception as e:
#         print(f"Error processing image: {e}")
#         return {
#             'type': "Error",
#             'confidence': 0.0
#         }


# @app.route('/', methods=['GET', 'POST'])
# def home():
#     if request.method == 'POST':
#         if 'file' not in request.files:
#             return render_template('index.html', error='No file part')

#         file = request.files['file']

#         if file.filename == '':
#             return render_template('index.html', error='No selected file')

#         if file:
#             # Generate unique filename
#             filename = str(uuid.uuid4()) + '.jpg'
#             filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#             file.save(filepath)

#             # Perform inference
#             try:
#                 top_result = predict_top_class(filepath)

#                 # Render template with results
#                 return render_template(
#                     'index.html',
#                     original_image=f'uploads/{filename}',
#                     top_result=top_result
#                 )

#             except Exception as e:
#                 # Log the error for debugging
#                 return render_template('index.html', error=f'Error processing image: {e}')

#     return render_template('index.html')


# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS 
import os
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the YOLO model globally
model = YOLO('best.pt')

def predict_top_class(filepath):
    """
    Perform inference on the uploaded file and return the top class and confidence.
    """
    try:
        print("Model Predict called")
        results = model.predict(source=filepath, conf=0.5, save=False)

        top_class = None
        top_confidence = 0.0

        if results:
            for result in results:
                if hasattr(result, 'probs') and result.probs is not None:
                    if hasattr(result.probs, 'top1') and hasattr(result.probs, 'top1conf'):
                        top_class_idx = result.probs.top1
                        top_confidence = float(result.probs.top1conf)
                        top_class = model.names[top_class_idx]

        return {"type": top_class, "confidence": top_confidence * 100}

    except Exception as e:
        print(f"Error processing image: {e}")
        return {"type": "Error", "confidence": 0.0}
    
@app.route('/', methods=['GET'])
def home():
    return ("message: Welcome to the Skin Cancer Cell Project!")

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = str(uuid.uuid4()) + '.jpg'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            top_result = predict_top_class(filepath)
            return jsonify({"original_image": f"/uploads/{filename}", "top_result": top_result})
        except Exception as e:
            return jsonify({"error": f"Error processing image: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)

