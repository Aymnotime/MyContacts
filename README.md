<div align="center">
  <h1>MyContacts</h1>
  <p><strong>Gestionnaire de contacts sécurisé – Node.js, React, MongoDB</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" alt="Node.js">
    <img src="https://img.shields.io/badge/Express.js-4.x-black?logo=express" alt="Express">
    <img src="https://img.shields.io/badge/MongoDB-%5E6.0-brightgreen?logo=mongodb" alt="MongoDB">
    <img src="https://img.shields.io/badge/React-18.x-61dafb?logo=react" alt="React">
    <img src="https://img.shields.io/badge/Jest-tests-brightgreen?logo=jest" alt="Jest">
  </p>
</div>

---

## Sommaire
- [Présentation](#présentation)
- [Installation & Setup](#installation--setup)
- [Scripts](#scripts)
- [API REST](#api-rest)
- [Identifiants de test](#identifiants-de-test)
- [Documentation Swagger](#documentation-swagger)
- [Tests unitaires](#tests-unitaires)
- [Technologies](#technologies)
- [Contact](#contact)

---

## Présentation

MyContacts est une application web professionnelle permettant à chaque utilisateur de gérer ses contacts personnels de façon sécurisée. Authentification, gestion CRUD, API REST, interface moderne et documentation interactive sont inclus.

---

## Installation & Setup

### 1. Cloner le projet
```bash
git clone <repo-url>
cd Projet-MyContacts
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env # puis adaptez les variables si besoin
npm start
```
- Par défaut, le backend écoute sur le port **5000**.

### 3. Frontend
```bash
cd ../frontend
npm install
npm start
```
- Par défaut, le frontend écoute sur le port **3000**.

---

## Scripts

Dans chaque dossier (`backend` ou `frontend`) :

- `npm start` : démarre le serveur (backend) ou l'app React (frontend)
- `npm test`  : lance les tests unitaires (backend)
- `npm run build` : build de production (frontend)

---

## API REST

Base URL : `http://localhost:5000/api`

### Authentification
| Méthode | Endpoint           | Description         |
|---------|--------------------|--------------------|
| POST    | /auth/register     | Inscription        |
| POST    | /auth/login        | Connexion          |

### Contacts (protégé par JWT)
| Méthode | Endpoint           | Description                |
|---------|--------------------|----------------------------|
| GET     | /contacts          | Liste des contacts         |
| POST    | /contacts          | Ajouter un contact         |
| GET     | /contacts/:id      | Détail d’un contact        |
| PUT     | /contacts/:id      | Modifier un contact        |
| DELETE  | /contacts/:id      | Supprimer un contact       |

---

## Identifiants de test

Pour tester rapidement l’API ou l’interface :

- **Email** : `test@example.com`
- **Mot de passe** : `password123`

Ces identifiants sont créés automatiquement lors des tests unitaires.

---

## Documentation Swagger

- Accès : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- Permet de tester toutes les routes de l’API directement dans le navigateur.

---

## Tests unitaires

Dans le dossier `backend` :
```bash
npm test
```
- Les tests couvrent l’authentification et la gestion des contacts.

---

## Technologies
- **Backend** : Node.js, Express, MongoDB, JWT
- **Frontend** : React, Axios, Context API
- **Tests** : Jest, Supertest

---

## Contact

Pour toute question ou contribution : [Votre nom ou email professionnel ici]
