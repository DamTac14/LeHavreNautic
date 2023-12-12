// app.js
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session');
const sql = require('mysql2/promise');
const dotenv = require('dotenv');
const os = require('os');


const interfaces = os.networkInterfaces();
const addresses = interfaces['Wi-Fi'] || interfaces['Ethernet'] || [];
const ipv4Address = addresses.find(address => address.family === 'IPv4');


dotenv.config();

const config = require('./configuration/config.json');
const connexion = sql.createPool(config);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name:'token',
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      SameSite:'lax',
      secure: false,
      maxAge: 7200000
    }
  }));


/* Activer les requêtes CORS

Ainsi nous pouvons accepter les données en local ou avec l'adresse ip ce qui servira justement 
de pouvoir travailler facilement le responsive design ou de faire les tests tablettes téléphones mais également pc
pour tout support

*/
app.use(cors({
    origin: ['http://localhost:5000',`http://${ipv4Address.address}:5000`],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true
  }));
  

// Fonction pour générer un token d'accès JWT
function generateAccessToken(mail) {
    const token = jwt.sign({ mail: mail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    return token;
  }
  
  // Fonction de connexion

  
    // Middleware pour vérifier l'authentification de l'utilisateur
  function authenticateToken(req, res, next) {
    // Récupération du token et s'il n'y en a pas on sort de cette fonction
      const token = req.session.token
      if (token == null) {
        return res.sendStatus(401); 
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token_decode) => {
        // Liste des vérifications comme la date d'expiration, le mail ou si une erreur est récupérée
          if (err) {
              return res.sendStatus(401);
          }
          if (token_decode.exp < (Date.now() / 1000)) {
              return res.sendStatus(401);
          }
          if (!token_decode.mail) {
              return res.sendStatus(401);
          }
        next(); 
      });
    }  
  
    // Middleware pour vérifier l'authentification de l'administrateur afin d'intéragir avec la base de donnée
  
    function authenticateTokenAdmin(req, res, next) {
      // Vérification de la validitié du token
      const token = req.session.token;
      if (token == null) {
        return res.sendStatus(401);
      }
      console.log('verification token')
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, token_decode) => {
        // Vérification de l'expiration, du mail
        if (err) {
          return res.sendStatus(401);
        }
        if (token_decode.exp < Date.now() / 1000) {
          return res.sendStatus(401);
        }
        if (!token_decode.mail) {
          return res.sendStatus(401);
        }
        // Vérifier si l'utilisateur est administrateur en utilisant une requête pour vérifier le role et le nombre de ligne sous forme de 
        // tableau qui seront renvoyées
        try {
          const [rows] = await connexion.query(
            
            `SELECT role.role
            FROM employe
            INNER JOIN role ON employe.ROLE_idROLE = role.idROLE
            WHERE employe.mail = ?`,
            [token_decode.mail],
          );
          const role = rows[0].role;
          console.log(role)
        } catch (error) {
          console.error(error);
          return res.sendStatus(500);
        }
        next();
      });
    }
    
    // Middleware pour vérifier l'authentification de l'administrateur pour afficher le menu administrateur
    // Cela fonctionne de la même manière que la fonction précédente mais cela renvoi afin de stocker de manière locale également afin d'afficher un menu
  
    function authenticateTokenAdminMenu(req, res, next) {
      const token = req.session.token;
      if (token == null) {
        return res.sendStatus(401);
      }
      console.log('verification token')
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, token_decode) => {
        if (err) {
          return res.sendStatus(401);
        }
        if (token_decode.exp < Date.now() / 1000) {
          return res.sendStatus(401);
        }
        if (!token_decode.mail) {
          return res.sendStatus(401);
        }
        console.log('try')
        // Vérifier si l'utilisateur est administrateur
        try {
          const [rows] = await connexion.query(
            
    `SELECT role.role
    FROM employe
    INNER JOIN role ON employe.ROLE_idROLE = role.idROLE
    WHERE employe.mail = ?`,
    [token_decode.mail],
          );
          const role = rows[0].role;
          console.log(role)
          return res.json({ isAdmin: (role === 'Administrateur') });
        } catch (error) {
          console.error(error);
          return res.sendStatus(500);
        }
      });
    }

    async function loginData(req, res, userId, password) {
      // Récupération des données mail et mot de passe envoyées du client vers le serveur
      const { mail, mot_de_passe } = req.body;
      
      // Requête SQL qui permet de faire une vérification de correspondance
      const [rows] = await connexion.query(
          `SELECT * FROM employe WHERE ${userId}=? AND ${password}=?`,
          [mail, mot_de_passe]
      );
  
      // Condition, si dans la base de données le client existe alors une seule apparaîtra, dans ce cas on passe à la suite
      if (rows.length === 1) {
         // Récupérer le prénom de la première ligne pour l'afficher
          const { prenom } = rows[0];
  
          // Génération d'un token grâce à une fonction de génération en utilisant le mail qui est bien stocké dans la base de données afin
          // Qu'il soit bien lié à l'utilisateur qui se connecte
          const token = generateAccessToken(mail);


          // Stockage du token dans la session
          req.session.token = token;


        // Inclure le prénom dans la réponse JSON avec le retour "OK"
          res.json({ retour: "OK", message: `Bienvenue à vous, ${prenom}` }); 
          console.log(req.session);
      } else {
          res.json({ retour: "PAS OK" });
          console.log('Vos identifiants sont mauvais')
      }
  }
  
      
          
  
  // Exportation des fonctions qui seront réutilisées dans le serveur 
 module.exports = {
    app,
    connexion,
    authenticateToken,
    authenticateTokenAdmin,
    authenticateTokenAdminMenu,
    generateAccessToken,
    loginData
  };
  
