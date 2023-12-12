/* importation de la connexion qui permet l'accès à la base de données */

const { connexion } = require('./app_middleware.js');

/* fonctions génériques qui seront réutilisées grâce aux différents paramètres afin d'éviter les copier coller */






/* Fonction générique d'affichage qui prend la requête en paramètre mais également l'id, si aucun id ne passe 
alors elle agit comme une fonction get basique */

async function affichageGlobal(req, res, request, params = {}) {
    try {
      const [rows] = await connexion.query(request, params);
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).send([{ message: error }]);
    }
  }
  
  








  /* fonction de suppression générique qui prend en paramètre l'id récupéré, mais également
  les requêtes. Je dis 'les' car il se peut qu'il y en ait plusieurs, alors il faudra les mettre sous forme
  de tableau afin que chacunes leur tours elles soient exécutées */
  
  async function suppressionGenerique(req, res, id, queries = []) {
    try {
      // Exécution des requêtes de suppression fournies
      for (const query of queries) {
        await connexion.query(query, [id]);
      }
      console.log(`Les données avec l'id ${id} ont été supprimées avec succès.`);
    } catch (error) {
      console.log(error);
      res.status(500).send([{ message: error }]);
    }
  }


  


  








// AJOUT DE DONNEES

async function ajouterElement(table, valeurs) {
    try {
      // Construction des colonnes et des valeurs à récupérer
      const colonnes = Object.keys(valeurs);
      const valeursSQL = Object.values(valeurs);
      
    
      const colonnesSQL = colonnes.join(', ');
      const parametresSQL = colonnes.map(() => '?').join(', ');
  
      // Intégration de la requête
      const insertQuery = `INSERT INTO ${table} (${colonnesSQL}) VALUES (${parametresSQL})`;
  
      const [result] = await connexion.query(insertQuery, valeursSQL);
      const elementId = result.insertId;
  
      console.log("Élément ajouté à votre base de données avec l'ID :", elementId);

      return elementId
  
    } catch (error) {
      console.error(error);
    }
  }
  















/* Fonction de modification des éléments */

async function mettreAJourElement( request, valeurs) {
  try {
    // Requête qui sera construite et envoyée dans le serveur
    await connexion.query(request, [...valeurs]);
    console.log("Élément mis à jour dans votre base de données");

  } catch (error) {
    console.error(error);
  }
}

  
// Exportation des fonctions génériques 

  module.exports = {
    affichageGlobal,
    suppressionGenerique,
    ajouterElement,
    mettreAJourElement
  }