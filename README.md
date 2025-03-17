# Datathon IA School : Chatbot interactif pour RAVENFOX

## Description
> [RAVENFOX](https://ravenfox.xyz/?srsltid=AfmBOorF6RvAbRO4FHaCXCqn_Y2YTsEUwo1jY0HmovVRmSG0yXSXZDXY) est une entreprise française spécialisée dans la conception et la fabrication d’accessoires pour fauteuils roulants électriques, destinés aux personnes à mobilité réduite.
> 
Ce projet a été développé dans le cadre du **Datathon 2025**. Il vise à :
> Développer un chatbot d'assistance pour les utilisateurs de fauteuils roulants, offrant des fonctionnalités de maintenance préventive, de diagnostic de pannes et de suggestions de produits adaptés.

> Le projet utilise une approche RAG (Retrieval-Augmented Generation) en exploitant les données des manuels de réparation des fauteuils roulants pour fournir des réponses précises aux utilisateurs. Il intègre également l'API OpenAI afin de tirer parti des capacités avancées de GPT-4 pour une interaction fluide et intelligente avec les utilisateurs.


## Aperçu du Projet

![Aperçu du projet](https://github.com/Moussa-Kalla/Datathon/blob/main/data/06637244-d253-4c11-9abe-52b973e46ca7.png?raw=true)


## Table des Matières
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
├── .idea/
data
├── data/
├── faq.faiss
├── faq.json
├── Logo-Ravenfox-Open-Graph-1.webp
├── responses.json
├── texte_complet.txt
datathon-api
├── datathon-api/
├── .idea
│   ├── .gitignore
│   ├── datathon-api.iml
│   ├── inspectionProfiles
│   │   ├── profiles_settings.xml
│   │   ├── Project_Default.xml
│   ├── misc.xml
│   ├── modules.xml
│   └── vcs.xml
├── app.py
├── config.py
├── data
│   ├── faq.faiss
│   ├── faq.json
│   └── responses.json
├── main.py
├── requirements.txt
├── test_main.http
├── vercel.json
datathon-fronted
├── datathon-fronted/
├── .gitignore
├── .idea
│   ├── .gitignore
│   ├── datathon-fronted.iml
│   ├── inspectionProfiles
│   │   ├── profiles_settings.xml
│   │   ├── Project_Default.xml
│   ├── jsLinters
│   │   ├── eslint.xml
│   ├── modules.xml
│   ├── prettier.xml
│   └── vcs.xml
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src
│   ├── app
│   │   ├── assets
│   │   │   ├── arrow-small-up.svg
│   │   │   ├── logo.jpeg
│   │   │   ├── logo.webp
│   │   ├── components
│   │   │   ├── circular_progress.tsx
│   │   │   ├── EmptyView.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   └── └── page.tsx
│
├── tailwind.config.ts
├── tsconfig.json
│
├── notebooks/
│   └──RAG_OPENAI.ipynb
│
├── .gitignore
├── README.md
├── requirements.txt
├── requirements1.txt
└── SECURITY.md
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

## Utilisation

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

Merci à toute l’équipe du Datathon 2025 pour leur travail acharné !
Nous remercions également les organisateurs et sponsors pour cet événement.
