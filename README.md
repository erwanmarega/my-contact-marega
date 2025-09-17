# 📒 Gestion de Contacts

Application full-stack permettant de **gérer des contacts** (CRUD complet) avec :  
- **Frontend** : React (Vite)  
- **Backend** : Node.js (Express)  
- **Base de données** : MongoDB Atlas  

---

## 🚀 Installation & Setup

### 1. Cloner le projet
```bash
git clone https://github.com/erwanmarega/my-contact-marega.git
cd my-contact-marega
```


### 2. Backend (Node.js + Express)
```bash
cd server
npm install
```

**Créer un ficher .env dans le dossier /server**
```bash
PORT=3000
MONGO_URI=mongodb+srv://Erwan:Admin@cluster0.vd4fdjf.mongodb.net/my-contact-marega
TOKEN_KEY=Mycontact123
FRONTEND_URL=http://localhost:5173
```

**Lancer le backend :**
```bash
node index.js
```

### 3. Frontend (React + Vite)
```bash
cd client
npm install
```

**Créer un fichier .env dans le dossier /client**
```bash
VITE_API_URL=http://localhost:3000
```

**Lancer le frontend**
```bash
npm run dev
```


## Endpoints principaux (API REST)

**Contacts**

**GET**	/api/contacts	: Liste tous les contacts	

**POST** 	/api/contacts :	Créer un contact	

**GET**	/api/contacts/:id	: Obtenir un contact	

**PUT**	/api/contacts/:id	: Modifier un contact	

**DELETE**	/api/contacts/:id	: Supprimer un contact	

**Authentification**

**POST**	/api/auth/signup	: Créer un compte

**POST**	/api/auth/login	: Se connecter (JWT)

## Identifiant de test 
```bash
email : test300@gmail.com
password : mdp300
```

## Déploiement

## 1. Backend 
Hébergé sur **Render**

Via ce lien 

(https://my-contact-marega.onrender.com/)


## 2. Frontend
Hébergé sur **Vercel**

Via ce lien 

(https://my-contact-marega.vercel.app/)

## Dépendances

### Backend
Le backend utilise Node.js avec les bibliothèques suivantes :

- **bcrypt**: ^6.0.0 – pour le hachage des mots de passe  
- **body-parser**: ^2.2.0 – pour parser le corps des requêtes HTTP  
- **cookie-parser**: ^1.4.7 – pour gérer les cookies  
- **cors**: ^2.8.5 – pour activer les requêtes cross-origin  
- **dotenv**: ^17.2.2 – pour gérer les variables d'environnement  
- **express**: ^5.1.0 – framework web  
- **jsonwebtoken**: ^9.0.2 – pour l’authentification JWT  
- **mongoose**: ^8.18.0 – pour interagir avec MongoDB  
- **nodemon**: ^3.1.10 – pour recharger automatiquement le serveur en développement  
- **swagger-jsdoc**: ^6.2.8 – pour générer la documentation API  
- **swagger-ui-express**: ^5.0.1 – pour afficher la documentation API via Express

### Frontend 
- **@tailwindcss/vite**: ^4.1.13 – plugin Tailwind pour Vite
- **lucide-react**: ^0.544.0 – icônes SVG
- **react**: ^19.1.1 – bibliothèque principale React
- **react-dom**: ^19.1.1 – rendu React dans le DOM
- **react-router-dom**: ^7.9.1 – routage côté client
- **tailwindcss**: ^4.1.13 – framework CSS utilitaire








