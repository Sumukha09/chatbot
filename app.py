"""
Main Flask application for the Medical Referral System
This file handles the backend logic for symptom analysis and specialist recommendations.
It uses spaCy for natural language processing to analyze patient symptoms.
"""

from flask import Flask, request, jsonify, send_from_directory
import os
import sys
import threading
import webbrowser
from flask_cors import CORS
import spacy
from typing import Dict


app = Flask(__name__)
CORS(app)

# Dictionary mapping medical specialties to related keywords and symptoms
# Used for matching patient symptoms with appropriate specialists
MEDICAL_SPECIALTIES = {
    
    "Cardiologist": ["heart", "chest pain", "palpitations", "blood pressure", "cardiovascular"],
    "Dermatologist": ["skin", "rash", "acne", "itching", "dermal"],
    "Neurologist": ["headache", "migraine", "seizure", "brain", "nervous system"],
    "Orthopedist": ["bone", "joint", "fracture", "spine", "muscle pain", "joint pain", "knee pain", "back pain", "shoulder pain", "neck pain", "arthritis", "bone pain", "joint stiffness"],
    "Gastroenterologist": ["stomach", "digestive", "abdomen", "liver", "intestine"],
    "Psychiatrist": ["depression", "anxiety", "mental health", "mood", "psychological"],
    "ENT": ["ear", "nose", "throat", "hearing", "sinus"],
    "Ophthalmologist": ["eye", "vision", "sight", "blindness", "optical"],
    "Endocrinologist": ["hormone", "diabetes", "thyroid", "endocrine"],
    "Oncologist": ["cancer", "tumor", "oncology"],
    "Orthopedic Surgeon": ["surgery", "orthopedic", "bone surgery", "fracture"],
    "Pediatrician": ["child", "pediatrics", "infant"],
    "Pulmonologist": ["lung", "breathing", "pulmonary"],
    "Rheumatologist": [ "arthritis", "rheumatology", "joint pain", "joint swelling", "joint stiffness", "inflammation", "autoimmune", "rheumatoid", "lupus", "gout"],
    "Urologist": ["urinary", "kidney", "bladder"],
    "Gynecologist": ["women", "gynecology", "obstetrics"],
    "Allergist": ["allergy", "immunology"],
    "Physiatrist": ["physical medicine", "rehabilitation"],
    "Geriatrician": ["elderly", "geriatrics"],
    "Infectious Disease Specialist": ["infection", "disease", "epidemiology"],
    "General Physician": ["fever", "fatigue", "weakness", "general health"]
}


# Load the English language model for spaCy NLP
nlp = spacy.load('en_core_web_lg')

def analyze_symptoms(symptoms: str) -> str:
    
    # Analyze patient symptoms and return Recommended medical specialty
    
    doc = nlp(symptoms.lower())
    
    specialty_scores = {specialty: 0 for specialty in MEDICAL_SPECIALTIES}
    
    # First pass: Check for direct keyword matches
    for specialty, keywords in MEDICAL_SPECIALTIES.items():
        for keyword in keywords:
            # Check for exact matches first
            if keyword in symptoms.lower():
                specialty_scores[specialty] += 2
                
    # Second pass: Check for semantic similarity
    for specialty, keywords in MEDICAL_SPECIALTIES.items():
        for token in doc:
            if not token.is_stop and not token.is_punct:
                for keyword in keywords:
                    if token.has_vector and nlp(keyword)[0].has_vector:
                        similarity = token.similarity(nlp(keyword)[0])
                        if similarity > 0.6:  # Lowered threshold for better matching
                            specialty_scores[specialty] += similarity

    # Get the specialty with the highest score
    max_score = max(specialty_scores.values())
    
    # Only default to General Physician if no good matches found
    if max_score < 0.5:  # Lowered threshold
        return "General Physician"
    
    # Get all specialties with scores close to the max score
    top_specialties = [
        specialty for specialty, score in specialty_scores.items()
        if score >= max_score - 0.3  # Consider specialties with scores close to max
    ]
    
    # Prioritize specific specialists over General Physician
    if len(top_specialties) > 1 and "General Physician" in top_specialties:
        top_specialties.remove("General Physician")
    
    
    return max(specialty_scores.items(), key=lambda x: x[1])[0]

# Flask route handlers
# Endpoint to serve the index.html file
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Endpoint to serve static files
@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

# Endpoint to analyze symptoms submitted by the user
@app.route('/analyze_symptoms', methods=['POST'])
def handle_symptoms():
    # Process the symptoms and return recommendations for specialists
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', '')
        recommendation = analyze_symptoms(symptoms)
        return jsonify({
            'specialty': recommendation,
            'message': f"Based on your symptoms, I recommend consulting a {recommendation}."
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def start_browser():
   
    webbrowser.open('http://127.0.0.1:5000')

if __name__ == '__main__':
    app.run(port=5000)
    threading.Timer(1.5, start_browser).start()
        
    try:
        while True:
            pass
    except KeyboardInterrupt:
        print("\nShutting down...")
        sys.exit(0)
