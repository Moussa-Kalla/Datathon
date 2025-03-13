# Datathon IA School : Chatbot interactif pour RAVENFOX

## Description
> [RAVENFOX](https://ravenfox.xyz/?srsltid=AfmBOorF6RvAbRO4FHaCXCqn_Y2YTsEUwo1jY0HmovVRmSG0yXSXZDXY) est une entreprise française spécialisée dans la conception et la fabrication d’accessoires pour fauteuils roulants électriques, destinés aux personnes à mobilité réduite.
> 
Ce projet a été développé dans le cadre du **Datathon 2025**. Il vise à :
> Développer un chatbot d'assistance pour les utilisateurs de fauteuils roulants, offrant des fonctionnalités de maintenance préventive, de diagnostic de pannes et de suggestions de produits adaptés.

> Le projet utilise une approche RAG (Retrieval-Augmented Generation) en exploitant les données des manuels de réparation des fauteuils roulants pour fournir des réponses précises aux utilisateurs. Il intègre également l'API OpenAI afin de tirer parti des capacités avancées de GPT-4 pour une interaction fluide et intelligente avec les utilisateurs.


## Aperçu du Projet

![Aperçu du projet](https://github.com/Moussa-Kalla/Datathon/blob/main/data/06637244-d253-4c11-9abe-52b973e46ca7.png?raw=true)  <!-- Remplace par le bon chemin de ton image -->


## 📖 Table des Matières
- [Aperçu du Projet](#aperçu-du-projet)
- [Structure du Projet](#structure-du-projet)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribuer](#contribuer)
- [Remerciements](#remerciements)

---
**Objectifs** :
- Développer une solution AI/Data pour le Datathon.
- Offrir une assistance intelligente pour les utilisateurs ciblés.
- Intégrer un **chatbot intelligent** avec des fonctionnalités spécifiques.

**Fonctionnalités principales** :
- Maintenance préventive (rappels et entretiens).
- Diagnostic de pannes en fonction des symptômes signalés.
- Suggestions de produits et solutions adaptées aux utilisateurs.

---

## 📂 Structure du Projet
Voici l'organisation des fichiers du projet :

```bash
Datathon/
├── .idea/                 # Fichiers de configuration de l'IDE
├── data/                  # Données utilisées pour le projet
├── datathon-api/          # Code source du backend (API)
├── datathon-frontend/     # Code source de l'application frontend
├── notebooks/             # Notebooks Jupyter pour l'analyse des données
├── .gitignore             # Fichiers et dossiers à ignorer par Git
├── README.md              # Documentation principale du projet
├── requirements.txt       # Dépendances Python requises
└── requirements1.txt      # (À fusionner avec requirements.txt si nécessaire)
```

## Installation

1. Cloner le repository

```bash
git clone https://github.com/Moussa-Kalla/Datathon.git
cd Datathon
```

2. Installer les dépendances

Backend
```bash
cd datathon-api
pip install -r requirements.txt
```

## 💡 Utilisation

1. Démarrer le backend
```bash
cd datathon-api
python app.py   # ou `uvicorn main:app --reload`
```

2. Démarrer le frontend
```bash
cd ../datathon-frontend
npm start
```

3. Accéder à l’application

🔗 Ouvrez un navigateur et rendez-vous sur : http://localhost:3000

## Contribuer

Les contributions sont les bienvenues !
Veuillez suivre les étapes ci-dessous :
 1. Forkez le repository.
 2. Créez une branche pour votre fonctionnalité :
```bash
 git checkout -b feature/NouvelleFeature
```
 3.	Ouvrez une Pull Request sur GitHub.

 ## Remerciements

Merci à toute l’équipe du Datathon 2025 pour leur travail acharné ! 🚀
Nous remercions également les organisateurs et sponsors pour cet événement.
