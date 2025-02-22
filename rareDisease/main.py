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
