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
```bash
https://my-contact-marega.onrender.com/
```

## 2. Frontend
Hébergé sur **Vercel**

Via ce lien 
```bash
https://my-contact-marega.vercel.app/
```







