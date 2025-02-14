import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from config import client
import asyncio
import datetime
from openai import OpenAI
from rapidfuzz import process

# Charger les données du fichier JSON
with open("data/faq.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Extraire les instructions et inputs comme données à indexer
texts = [entry["instruction"] + " " + entry["input"] for entry in data]
responses = [entry["output"] for entry in data]

# Utiliser SentenceTransformer pour encoder les textes
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(texts)

# Créer l'index FAISS pour la recherche rapide
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# Sauvegarder l'index et les réponses
faiss.write_index(index, "data/faq.faiss")
with open("data/responses.json", "w", encoding="utf-8") as f:
    json.dump(responses, f)

def search_faq(query):
    query_vector = model.encode([query])  # Encoder la question

    # Charger l'index et les réponses
    index = faiss.read_index("data/faq.faiss")
    with open("data/responses.json", "r", encoding="utf-8") as f:
        responses = json.load(f)

    # Trouver la réponse la plus proche
    _, idx = index.search(np.array(query_vector), k=1)  
    return responses[idx[0][0]]  # Retourner la meilleure réponse

def convert_to_json(text):
    text = text.replace("json", "").replace("```", "")
    return json.loads(text)


def check_maintenance():
    # Exemple : Vérifier si la dernière maintenance a été effectuée il y a plus de 30 jours
    last_maintenance_date = datetime.datetime(2024, 1, 31)  # Date de la dernière maintenance
    current_date = datetime.datetime.now()
    delta = current_date - last_maintenance_date

    if delta.days > 30:
        return "Rappel : Une maintenance est nécessaire. Il y a plus de 30 jours depuis la dernière maintenance."
    else:
        return "Votre fauteuil n'a pas besoin de maintenance, vous êtes à jour!"

import datetime

def check_maintenance():
    # Exemple : Vérifier si la dernière maintenance a été effectuée il y a plus de 30 jours
    last_maintenance_date = datetime.datetime(2024, 1, 31)  # Date de la dernière maintenance
    current_date = datetime.datetime.now()
    delta = current_date - last_maintenance_date

    if delta.days > 30:
        return "Rappel : Une maintenance est nécessaire. Il y a plus de 30 jours depuis la dernière maintenance."
    else:
        return "Votre fauteuil n'a pas besoin de maintenance, vous êtes à jour!"
import datetime

def check_maintenance():
    # Exemple : Vérifier si la dernière maintenance a été effectuée il y a plus de 30 jours
    last_maintenance_date = datetime.datetime(2024, 1, 31)  # Date de la dernière maintenance
    current_date = datetime.datetime.now()
    delta = current_date - last_maintenance_date

    if delta.days > 30:
        return "Rappel : Une maintenance est nécessaire. Il y a plus de 30 jours depuis la dernière maintenance."
    else:
        return "Votre fauteuil n'a pas besoin de maintenance, vous êtes à jour!"


def detect_model(question, models):
    """Détecte le modèle de fauteuil roulant avec tolérance aux fautes de frappe."""
    try:
        match = process.extractOne(question, models, score_cutoff=60)
        if match:  # Si un modèle proche est trouvé
            best_match, score, _ = match
            return best_match if score else None
    except Exception as e:
        print(f"Erreur lors de la détection du modèle : {e}")
    return None  # Aucun modèle trouvé ou erreur

def ask_gpt4o(question):
    try:
        # Vérifier la maintenance avant de répondre
        maintenance_status = check_maintenance()
        print(f"Check rapide de maintenance : \n{maintenance_status}\n")
    except Exception as e:
        print(f"Erreur lors de la vérification de maintenance : {e}")
        maintenance_status = "Impossible de vérifier la maintenance."

    try:
        # Cherche une réponse dans la base de connaissances
        retrieved_answer = search_faq(question)
    except Exception as e:
        print(f"Erreur lors de la récupération de la FAQ : {e}")
        retrieved_answer = "Aucune information trouvée dans la base de connaissances."

    # Liste des modèles connus (normalisés en minuscules)
    models = [
        "aviva rx40", "quickie q50 r", "permobil f5", "invacare tdx sp2", "aviva fx40",
        "juvo", "lynx", "m3 corpus", "sango", "storm", "tdx", "aviva rx40 ulm"
    ]

    # Normalisation de la question (minuscules)
    question_lower = question.lower()

    # Détection du modèle
    detected_model = detect_model(question_lower, models)

    # Construire le prompt avec le contexte
    if detected_model:
        prompt = f"""On est dans le contexte des fauteuils roulants.
Un modèle de fauteuil roulant a été détecté : {detected_model.upper()}.
Il faut fournir une réponse en tenant compte du modèle mentionné et de la base de connaissances.

Réponse de la base : {retrieved_answer}

Question : {question}

Réponds avec précision en tenant compte du contexte et du modèle spécifié.
"""
    else:
        prompt = f"""On est dans le contexte des fauteuils roulants.
Aucun modèle spécifique n'a été détecté dans la question. Il faut donc fournir une réponse générale
sans mentionner un modèle en particulier et sans en attribuer un à l'utilisateur.

Réponse de la base : {retrieved_answer}

Question : {question}

Réponds avec précision en tenant compte du contexte de manière générale.
"""


    # response = client.chat.with_raw_response.completions.create(
    #     model="gpt-4o",
    #     messages=[{"role": "user", "content": prompt}],
    #     max_tokens=1000,
    #     stream=False  # STREAMING ACTIVÉ
    # )
    #
    # return convert_to_json(response.text)['choices'][0]['message']['content']

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            stream=True  # STREAMING ACTIVÉ
        )

        for chunk in response:
            if chunk and chunk.choices and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    except Exception as e:
        yield f"Erreur: {str(e)}"
