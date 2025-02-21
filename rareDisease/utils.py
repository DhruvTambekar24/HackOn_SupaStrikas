from PyPDF2 import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
import google.generativeai as genai

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    text = ""
    try:
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    except Exception as e:
        print("Error extracting text from PDF:", e)
    return text.strip()

def analyze_text_tfidf(text):
    """Performs TF-IDF analysis to extract important medical terms."""
    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform([text])
        feature_names = vectorizer.get_feature_names_out()
        
        top_n = 10
        sorted_indices = tfidf_matrix.toarray().flatten().argsort()[-top_n:][::-1]
        important_words = [feature_names[i] for i in sorted_indices]
        
        return important_words
    except Exception as e:
        print("Error in TF-IDF analysis:", e)
        return []

def get_diagnosis_with_gemini(text):
    """Uses Google's Gemini AI to analyze patient data and suggest possible rare disease diagnoses."""
    try:
        model = genai.GenerativeModel("gemini-pro")
        prompt = (
            "You are an AI-powered diagnostic assistant designed to help doctors identify rare diseases. "
            "Analyze the following patient data, including medical history, symptoms, and lab results. "
            "Match the patient's information with known rare disease profiles and provide possible diagnoses. "
            "Suggest additional tests or medical evaluations if necessary to confirm the diagnosis. "
            "Also, include potential treatment options or specialist referrals where relevant.\n\n"
            f"Patient Data:\n{text}"
        )
        response = model.generate_content(prompt)
        return response.text if response else "No response from AI."
    except Exception as e:
        print("Error in AI processing:", e)
        return "AI processing failed."

# Example Usage
if __name__ == "__main__":
    pdf_path = "medical_report.pdf"  # Replace with the actual PDF file path
    extracted_text = extract_text_from_pdf(pdf_path)
    
    if extracted_text:
        important_terms = analyze_text_tfidf(extracted_text)
        print("Key Medical Terms Identified:", important_terms)
        
        diagnosis = get_diagnosis_with_gemini(extracted_text)
        print("\nAI Diagnosis and Suggestions:\n", diagnosis)
    else:
        print("No text extracted from PDF.")

# from PyPDF2 import PdfReader
# from sklearn.feature_extraction.text import TfidfVectorizer
# import google.generativeai as genai

# def extract_text_from_pdf(pdf_path):
#     text = ""
#     try:
#         reader = PdfReader(pdf_path)
#         for page in reader.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text + "\n"
#     except Exception as e:
#         print("Error extracting text from PDF:", e)
#     return text.strip()

# def analyze_text_tfidf(text):
#     try:
#         vectorizer = TfidfVectorizer(stop_words='english')
#         tfidf_matrix = vectorizer.fit_transform([text])
#         feature_names = vectorizer.get_feature_names_out()
        
#         top_n = 10
#         sorted_indices = tfidf_matrix.toarray().flatten().argsort()[-top_n:][::-1]
#         important_words = [feature_names[i] for i in sorted_indices]
        
#         return important_words
#     except Exception as e:
#         print("Error in TF-IDF analysis:", e)
#         return []

# def get_diagnosis_with_gemini(text):
#     try:
#         model = genai.GenerativeModel("gemini-pro")
#         response = model.generate_content(f"Analyze the following medical report and provide insights or possible diagnosis: \n\n{text}")
#         return response.text if response else "No response from AI."
#     except Exception as e:
#         print("Error in AI processing:", e)
#         return "AI processing failed."
# import re
# import pickle
# import pandas as pd
# from PyPDF2 import PdfReader
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.preprocessing import LabelEncoder
# import xgboost as xgb
# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch
# import os
# from dotenv import load_dotenv

# load_dotenv()

# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# # ===== Step 1: Extract Text from PDF =====
# def extract_text_from_pdf(pdf_path):
#     text = ""
#     try:
#         reader = PdfReader(pdf_path)
#         for page in reader.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text + "\n"
#     except Exception as e:
#         print("Error extracting text from PDF:", e)
#     return text.strip()

# # ===== Step 2: Named Entity Recognition (NER) with TF-IDF =====
# def extract_medical_terms(text):
#     vectorizer = TfidfVectorizer(stop_words="english", max_features=20)
#     tfidf_matrix = vectorizer.fit_transform([text])
#     feature_names = vectorizer.get_feature_names_out()
#     return list(feature_names)

# # ===== Step 3: Matching Diseases with UMLS =====
# def match_diseases(terms):
#     # Dummy dictionary, replace with actual UMLS API
#     disease_dict = {"cough": "Tuberculosis", "fever": "Malaria", "chest pain": "Heart Attack"}
#     matched_diseases = [disease_dict[term] for term in terms if term in disease_dict]
#     return matched_diseases if matched_diseases else ["Unknown Disease"]

# # ===== Step 4: AI-Based Diagnosis with Gemini =====
# def get_diagnosis_with_gemini(text):
#     try:
#         from google.generativeai import GenerativeModel
#         model = GenerativeModel("gemini-pro")
#         response = model.generate_content(f"Analyze the medical report:\n{text}")
#         return response.text if response else "No response from AI."
#     except Exception as e:
#         print("Error in AI processing:", e)
#         return "AI processing failed."

# # ===== Step 5: Rank Top Rare Diseases using XGBoost =====
# def load_xgboost_model():
#     with open(r"C:\Users\dtamb\OneDrive\Desktop\HacKoN\MultipleDiseases\backend\models\xgboost_rare_disease_model.json", "rb") as f:
#         return pickle.load(f)

# def rank_diseases(ehr_features):
#     model = load_xgboost_model()
#     preds = model.predict([ehr_features])
#     return preds.argsort()[::-1][:5]  # Return top 5 ranked diseases
