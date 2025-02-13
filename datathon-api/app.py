import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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

def Ravenfox_chat(question):
    """ Envoie la question à GPT-4o avec du streaming """
    retrieved_answer = search_faq(question)  # Trouver la réponse la plus pertinente

    # Construire le prompt avec le contexte
    prompt = f"Voici une réponse issue de la base de connaissances :\n{retrieved_answer}\n\nQuestion : {question}\nRéponds avec précision en tenant compte du contexte."

    # Appel API OpenAI avec STREAMING activé
    response = client.chat.with_raw_response.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000,
        stream=False  # STREAMING ACTIVÉ
    )

    return convert_to_json(response.text)['choices'][0]['message']['content']