Retrouvez [ici](https://drive.google.com/drive/u/0/folders/1MSg0heTZb7RuiSQhDc8RjvIZ1R8cKYJf) le mémoire et le diaporama de mon passage à mon examen final.

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

# STRUCTURE DES DOSSIERS

* Le-Havre-Nautic
  * src
    * **administrateur**
      * Regroupe le menu, toutes les pages concernant l'interface administrateur 
    * **components**
      * Regroupe tous les composants qui seront exportés et réutilisés sur les différentes pages
    * **img**
      * Regroupe les images
    * **pages**
      * Regroupe les différentes pages principales du site
    * **server**
      * Regroupe les modules, middleware et configurations du serveur (Node.JS)
    * **styles**
      * Regroupe les feuilles cascades de styles

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

En cours d'amélioration après mûres réflexions et avoir sélectionnés parmi divers conseils.
