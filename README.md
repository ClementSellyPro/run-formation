# RunFormation

L'application permet à l'utilisateur de consulter une liste de formations, de se s'inscrire/connecter pour s'inscrire à une formation.

## Prérequis
- Node.js 18+
- MySQL 8+

## Stack Technique
- Fronted: Angular
- Backend: NestJS
- ORM: Prisma
- Base de donnees: MySQL

## Fonctionnalités
- Authentification utilisateur
- Affichage d'un catalogue de formations
- Inscription d'un utilisateur a une formation
- Dashboard admin pour approuver/rejecter les inscriptions
- API REST (NestJS + Prisma)

## 1. Cloner et installer le backend
```bash
git clone https://github.com/ClementSellyPro/run-formation.git
cd run-formation

# Backend
cd backend
npm install
```

## 2. Créer le fichier .env

Dans `backend/.env` :
```env
DATABASE_URL="mysql://root:VOTRE_PASSWORD@localhost:3306/formation_db"
JWT_SECRET="SECRET"
```

## 3. Créer la base de données

**Option A** : Avec ligne de commande
```bash
mysql -u root -p
CREATE DATABASE formation_db;
EXIT;
```

**Option B** : Avec phpMyAdmin ou MySQL Workbench
- Créer une base nommée `formation_db`

## 4. Générer les tables et données
```bash
npx prisma migrate dev
npx prisma db seed
```

## 5. Installer le frontend
```bash
cd ../frontend
npm install
```

## 6. Démarrer l'application

**Terminal 1** (Backend) :
```bash
cd backend
npm run start:dev
```
Si vous rencontrez cette erreur: 
"PrismaClientInitializationError: Can't reach database server at `localhost:3306`", 
vérifiez que votre serveur MySQL est bien démarré.

**Terminal 2** (Frontend) :
```bash
cd frontend
ng serve
```

## 7. Ouvrir l'application

Allez sur `http://localhost:4200`

## Compte ADMIN

**Admin** : `admin@mail.com` / `admin`