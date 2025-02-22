from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import os
import google.generativeai as genai
from PyPDF2 import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from config import API_KEY
from utils import extract_text_from_pdf, analyze_text_tfidf, get_diagnosis_with_gemini
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change to ["http://localhost:5173"] for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
# Configure Gemini API
genai.configure(api_key=API_KEY)

# app = FastAPI()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    ehr_text = extract_text_from_pdf(file_path)
    if not ehr_text:
        return JSONResponse(content={"error": "No text extracted from PDF."}, status_code=400)

    important_terms = analyze_text_tfidf(ehr_text)
    diagnosis = get_diagnosis_with_gemini(ehr_text)

    return {
        "file_name": file.filename,
        "important_terms": important_terms,
        "diagnosis": diagnosis
    }
# from fastapi import FastAPI, File, UploadFile
# from utils import extract_text_from_pdf, extract_medical_terms, match_diseases, get_diagnosis_with_gemini, rank_diseases
# import os
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Adjust if frontend runs elsewhere
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods (POST, GET, etc.)
#     allow_headers=["*"],  # Allow all headers
# )

# # ===== Root API =====
# @app.get("/")
# def read_root():
#     return {"message": "Rare Disease Diagnosis API is Running!"}

# # ===== Upload and Process EHR PDF =====
# @app.post("/upload")
# async def upload_pdf(file: UploadFile = File(...)):
#     # Save uploaded file
#     file_path = f"uploads/{file.filename}"
#     with open(file_path, "wb") as f:
#         f.write(file.file.read())

#     # Extract text
#     ehr_text = extract_text_from_pdf(file_path)

#     if not ehr_text:
#         return {"error": "No text extracted from the PDF"}

#     # Extract medical terms
#     important_terms = extract_medical_terms(ehr_text)

#     # Match diseases
#     matched_diseases = match_diseases(important_terms)

#     # AI-based diagnosis
#     ai_diagnosis = get_diagnosis_with_gemini(ehr_text)

#     # Rank diseases
#     ranked_diseases = rank_diseases(important_terms)

#     return {
#         "extracted_text": ehr_text[:500],  # Preview first 500 characters
#         "important_terms": important_terms,
#         "matched_diseases": matched_diseases,
#         "ai_diagnosis": ai_diagnosis,
#         "ranked_diseases": ranked_diseases
#     }
