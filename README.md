# FRAMEWORKS & LANGAGES

## Front-End
•	REACTJS
•	JAVASCRIPT
•	HTML
•	CSS

## Back-End
•	NODEJS (API REST)
•	EXPRESSJS
•	MYSQL

# LANCEMENT DE L'APPLICATION

## Installation des modules 

Installer NodeJS sur son poste : https://nodejs.org/en

```bash
npm install [module]
```

_Répéter l'opération pour chacun des modules_

* express
* jsonwebtoken
* cors
* express-session
* mysql2/promise
* dotenv
* os

## Lancement 
**Ouvrir deux terminal à partir du dossier Le-Havre-Nautic**

### Configuration front-end

_Premier terminal_

```bash
npm start
```

_Vous aurez un message de compilation réussie et également sur quel port (localhost ou adresse ip) le site tournera._

### Configuration back-end

_Importer dans wampserver le fichier  **lhnautic.sql** avec une base de donnée du même nom sans l'extension._

_Second terminal_

```bash
cd src 
cd server 
node server.js
```

Vous aurez un message qui annoncera que le serveur est lancé et fonctionne correctement.

Arrêtez les serveurs dans le terminal appuyez simultanément sur ```Ctrl + C```

