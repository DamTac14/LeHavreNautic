// Importation des middlewars de connexion et d'authentification 

const { app,
        connexion,
        authenticateToken, 
        authenticateTokenAdmin, 
        authenticateTokenAdminMenu,
        loginData } = require('./app_middleware.js');




// Importation des fonctions génériques

const { affichageGlobal,
        suppressionGenerique,
        ajouterElement,
        mettreAJourElement } = require('./fonction_generique.js');




        // Génération du port qui sera utilisé pour l'écoute du serveur
const port = 5005;




/* Liste des fonctions qui sont utilisées pour créer les requêtes vers la base de donnée et gérer les infos entre 
le côté front-end et back-end. 

Création des routes, ajout des middleware d'authentification si besoin afin de sécuriser l'accès côté serveur */



// Appel de la fonction de connexion avec la route attribuée pour le côté client
app.post('/api/connexionUtilisateur',async function connexionUtilisateur(req, res){
  await loginData(req, res, "mail", "mot_de_passe")
})

// Fonction de déconnexion avec la route attribuée pour le côté client
app.post('/api/logout', function (req, res) {
  req.session.destroy(function(err) {

      res.clearCookie('token');
      res.sendStatus(200); // Réponse 200 OK
      console.log('vous êtes déconnectés')
  });
});
    










/* Fonctions appelant la fonction d'affichages générale, elles donnent les requêtes dans les paramètres
  et si besoin les id afin de récupérer les données liées aux id

  Nous y mettons directement la méthode, la route API qui sera récupérée côté serveur
  Et également le middleware d'authentification qui est utilisé pour vérifier l'autorisation à la connexion */

app.get('/api/fournisseurs', authenticateToken, async function affichageFournisseurs (req, res) {
  await affichageGlobal(req, res, `SELECT * 
                                  FROM fournisseur`)
})

app.get('/api/employes', authenticateToken, async function affichageEmployes  (req, res) {
  await affichageGlobal(req, res, `SELECT * 
                                  FROM employe`)
})

app.get('/api/rechercheDeClient', authenticateToken, async function lectureClient (req, res){
  var requestClient = `SELECT 
                      clients.idCLIENTS,
                      clients.nom, 
                      clients.prenom, 
                      bateaux.nom AS bateau_nom, 
                      clients.mail, clients.telephone, 
                      clients.place_portuaire,
                      clients.BATEAUX_idBATEAUX,
                      bateaux.MOTEURS_idMOTEURS as idMOTEURS,
                      moteurs.nom AS moteur_nom, 
                      moteurs.puissance AS puissance_moteur,
                      bateaux.MOTEURS_idMOTEURS,
                      bateaux.gamme, 
                      pris_en_charge.date_sortie,
                      conformite.date_entree,
                      fournisseur_moteur.nom AS fournisseur_moteur_nom, 
                      fournisseur_bateau.nom AS fournisseur_bateau_nom
                      
                      FROM moteurs
                      
                      INNER JOIN (clients
                                  INNER JOIN bateaux ON clients.BATEAUX_idBATEAUX = bateaux.idBATEAUX)
                          ON moteurs.idMOTEURS = bateaux.MOTEURS_idMOTEURS
                      INNER JOIN bateaux b ON b.idBATEAUX = clients.BATEAUX_idBATEAUX
                      LEFT JOIN pris_en_charge on pris_en_charge.CLIENTS_idCLIENTS = clients.idCLIENTS
                      LEFT JOIN conformite on conformite.CLIENTS_idCLIENTS = clients.idCLIENTS
                      INNER JOIN moteurs m ON m.idMOTEURS = b.MOTEURS_idMOTEURS
                      INNER JOIN fournisseur fournisseur_moteur ON moteurs.FOURNISSEUR_idFOURNISSEUR = fournisseur_moteur.idFOURNISSEUR
                      INNER JOIN fournisseur fournisseur_bateau ON bateaux.FOURNISSEUR_idFOURNISSEUR = fournisseur_bateau.idFOURNISSEUR
                      ORDER BY nom`
  await affichageGlobal(req, res, requestClient)
})

app.get('/api/Bateaux', authenticateToken, async function lectureBateaux(req, res) {

// Cet affichage demande une jointure pour montrer les données moteur liées au bateau
  var requestBateaux = `SELECT b.idBATEAUX,
  b.gamme, 
  b.nom, 
  b.annee, 
  b.immatriculation,
  b.longueur_coque, 
  b.largeur_bau, 
  b.tirant_air, 
  b.tirant_eau, 
  b.cabine, 
  b.couchette, 
  b.etat, 
  b.lier_client_vente,
  b.prix, 
  m.nom AS moteur_nom, 
  m.gamme AS moteur_gamme, 
  m.puissance, 
  fb.nom AS fournisseur_bateau_nom, 
  fm.nom AS fournisseur_moteur_nom
FROM bateaux b 
INNER JOIN moteurs m 
ON b.MOTEURS_idMOTEURS = m.idMOTEURS 
INNER JOIN fournisseur fb 
ON b.FOURNISSEUR_idFOURNISSEUR = fb.idFOURNISSEUR 
INNER JOIN fournisseur fm 
ON m.FOURNISSEUR_idFOURNISSEUR = fm.idFOURNISSEUR `;

await affichageGlobal(req, res, requestBateaux)
})

app.get('/api/Moteurs', authenticateToken, async function lectureMoteurs(req, res) {

  // Ce code demande une jointure pour afficher les données du fournisseur lié au moteur
  var requestMoteurs = `SELECT  m.idMOTEURS,
  m.nom AS moteur_nom, 
  m.gamme AS moteur_gamme,
  m.puissance, 
  m.numero_serie,
  m.poids,
  m.bruit,
  m.taxe,
  m.reference,
  m.annee,
  m.etat,
  m.annee_utilisation,
  m.lier_bateau_vente,
  m.prix,
fm.nom AS fournisseur_moteur_nom
FROM moteurs m
INNER JOIN fournisseur fm 
ON m.FOURNISSEUR_idFOURNISSEUR = fm.idFOURNISSEUR `;

await affichageGlobal(req,res, requestMoteurs)
})

app.get('/api/Remorques', authenticateToken, async function lectureRemorques(req, res) {

  var requestRemorques = `SELECT * 
                          FROM remorques`;

  affichageGlobal(req,res, requestRemorques)
})

app.get('/api/priseEnCharge', authenticateToken, async function affichagePriseEnCharge(req, res) {

  /* Selection distinct pour retrouver le client mais également différentes jointures qui permettent de retrouver les informations nécessaires,
      le bateau son moteur lié mais également les entretiens liés au moteur et également les fournisseurs liés aux appareils du client
  */

  var requestPEC =       `
  SELECT DISTINCT
          clients.idCLIENTS,
          clients.nom,
          clients.prenom,
          bateaux.gamme,
          fournisseur_bateau.nom AS fournisseur_bateau_nom,
          fournisseur_moteur.nom AS fournisseur_moteur_nom,
          conformite.date_entree,
          conformite.commentaire,
          moteurs.nom AS moteur_nom,
          moteurs.numero_serie,
          bateaux.immatriculation,
          moteurs.idMOTEURS,
          bateaux.idBATEAUX,
          pris_en_charge.date_sortie
    FROM clients
    INNER JOIN bateaux ON bateaux.idBATEAUX = clients.BATEAUX_idBATEAUX
    LEFT JOIN moteurs ON moteurs.idMOTEURS = bateaux.MOTEURS_idMOTEURS
    LEFT JOIN entretien ON entretien.MOTEURS_idMOTEURS = moteurs.idMOTEURS
    INNER JOIN fournisseur fournisseur_moteur ON moteurs.FOURNISSEUR_idFOURNISSEUR = fournisseur_moteur.idFOURNISSEUR
    INNER JOIN fournisseur fournisseur_bateau ON bateaux.FOURNISSEUR_idFOURNISSEUR = fournisseur_bateau.idFOURNISSEUR
    INNER JOIN conformite ON conformite.CLIENTS_idCLIENTS = clients.idCLIENTS
    LEFT JOIN pris_en_charge ON pris_en_charge.CLIENTS_idCLIENTS = clients.idCLIENTS
`
await affichageGlobal(req, res, requestPEC)
})

app.get('/api/moteursEntretien',authenticateToken, async function affichageMoteursEntretien (req, res){

  var requestMoteursEntretien = `SELECT * FROM moteurs
                                GROUP BY nom
                                ORDER BY nom`
  await affichageGlobal(req, res, requestMoteursEntretien)
})

app.get('/api/Entretiens',authenticateToken, async function affichageMoteursEntretien (req, res){

  // Ce code présente une jointure pour afficher les entretiens liés au moteur, et regroupe tout et permet de les mettre dans l'ordre
  var requestMoteursEntretien = `SELECT entretien.*, moteurs.nom AS nom_moteur
  FROM entretien
  JOIN moteurs ON entretien.MOTEURS_idMOTEURS = moteurs.idMOTEURS
  GROUP BY entretien.reference
  ORDER BY entretien.MOTEURS_idMOTEURS;
  `
  await affichageGlobal(req, res, requestMoteursEntretien)
})


app.get('/api/Menu', authenticateToken, async function affichageMenu (req, res) {
  // Ce code présente une jointure afin d'afficher le menu des fournisseurs moteurs, et côté client lorsqu'on clique dessus on aura les informatios nécessaires
  // Elles sont regroupées par les noms des fournisseurs afin d'éviter les répétitions

  var requestMenu = `
  SELECT fournisseur.nom AS fournisseur_nom, 
        moteurs.nom AS moteur_nom, 
        entretien.periode, 
        entretien.etape, 
        entretien.reference, 
        entretien.quantite
  FROM fournisseur 
  INNER JOIN moteurs ON fournisseur.idFOURNISSEUR = moteurs.FOURNISSEUR_idFOURNISSEUR 
  INNER JOIN entretien ON moteurs.idMOTEURS = entretien.MOTEURS_idMOTEURS
  GROUP BY fournisseur_nom;`

  await affichageGlobal(req, res, requestMenu)
})

app.get('/api/Menu/:fournisseur_nom', authenticateToken, async function affichageMenuParFournisseur (req, res) {
  const { fournisseur_nom } = req.params;

  // Lié à la fonction ci-dessus, cela permet d'afficher les moteurs et leurs entretiens en fonction du fournisseur sur lequel on clique

  const requestParFournisseur = `
    SELECT DISTINCT fournisseur.nom AS fournisseur_nom, 
                    moteurs.nom AS moteur_nom, 
                    entretien.idENTRETIEN,
                    entretien.periode, 
                    entretien.etape, 
                    entretien.reference, 
                    entretien.quantite
    FROM fournisseur 
    INNER JOIN moteurs ON fournisseur.idFOURNISSEUR = moteurs.FOURNISSEUR_idFOURNISSEUR 
    INNER JOIN entretien ON moteurs.idMOTEURS = entretien.MOTEURS_idMOTEURS
    WHERE fournisseur.nom = ?
    GROUP BY entretien.reference
    ORDER BY entretien.periode`;

    await affichageGlobal(req, res, requestParFournisseur, fournisseur_nom);
})

app.get('/api/priseEnCharge/:id',authenticateToken, async function affichagePriseEnChargeEtapes(req, res) {
  var idDeLentretien = req.params.id

  var requestEntretien =`SELECT * FROM entretien 
                         WHERE MOTEURS_idMOTEURS=?`   

  await affichageGlobal(req, res,requestEntretien ,idDeLentretien )
})









// AJOUTS
app.post('/api/ajoutEmploye', authenticateTokenAdmin, async function ajoutEmployeBDD(req, res){
  // Récupération des données
  const employeValues = req.body
  try {
  await ajouterElement("employe", employeValues)
  res.status(200).send('L\'employé est bien ajouté')
} catch (error) {
  console.log(error);
  res.status(500).send('Erreur lors de l\'ajout de l\'employé.');
}
})

app.post('/api/ajoutBateau', authenticateTokenAdmin, async function ajoutBateauVente  (req, res) {
  try {
    // Condition afin de pouvoir de mettre à jour la table lier_client_vente qui permettra côté client de modifier les données client et lui
    // attribuer un nouveau bateau
    
    const prix = req.body.prix;
    let lier_client_vente;

    if (!prix || parseFloat(prix) === 0) {
      lier_client_vente = 1;
    } else {
      lier_client_vente = 0;
    }

    const insertBateauValues = {
      FOURNISSEUR_idFOURNISSEUR: req.body.FOURNISSEUR_idFOURNISSEUR,
      nom: req.body.nom,
      gamme: req.body.gamme,
      numero_serie: req.body.numero_serie,
      immatriculation: req.body.immatriculation,
      annee: req.body.annee,
      longueur_coque: req.body.longueur,
      largeur_bau: req.body.largeur,
      tirant_air: req.body.tirant_air,
      tirant_eau: req.body.tirant_eau,
      cabine: req.body.cabines,
      couchette: req.body.couchettes,
      etat: req.body.etat,
      prix: req.body.prix,
      lier_client_vente: lier_client_vente,
      MOTEURS_idMOTEURS: req.body.MOTEURS_idMOTEURS,
    };

    await ajouterElement('bateaux', insertBateauValues);


  // Récupération de l'ID du moteur à lier au bateau 
  const moteurId = req.body.MOTEURS_idMOTEURS;
  
    // Mise à jour de la colonne "lier_bateau_vente" de la table "moteurs"
    await mettreAJourElement('moteurs',{ lier_bateau_vente: 0 },`idMOTEURS = ${moteurId} AND nom != "aucun moteur"`);
    res.status(200).send('Le bateau est bien ajouté')
  } catch (error) {
    console.log(error);
    res.status(500).send('Erreur lors de l\'ajout du bateau.');
  }
})

app.post('/api/ajoutRemorque', authenticateTokenAdmin, async function ajoutRemorqueVente(req, res){
  
  const remorquesValues = req.body
try {
  await ajouterElement("remorques", remorquesValues)
  res.status(200).send('La remorque est bien ajoutée')
} catch (error) {
  console.log(error);
  res.status(500).send('Erreur lors de l\'ajout de la remorque' );
}
})

app.post('/api/ajoutMoteur', authenticateTokenAdmin, async function ajoutMoteursVente (req, res){
try {
  // Récupération des valeurs moteurs
  const valeurs = {
      FOURNISSEUR_idFOURNISSEUR: req.body.FOURNISSEUR_idFOURNISSEUR,
      gamme: req.body.gamme,
      nom: req.body.nom,
      numero_serie: req.body.numero_serie,
      reference: req.body.reference,
      puissance: req.body.puissance,
      annee: req.body.annee,
      poids: req.body.poids,
      bruit: req.body.bruit,
      taxe: req.body.taxe,
      annee_utilisation: req.body.annee_utilisation,
      etat: req.body.etat,
      prix: req.body.prix
    };

    const moteurId = await ajouterElement('moteurs', valeurs);

    console.log("Moteur ajouté à votre BDD");
  
    const [entretiens] = await connexion.query(`SELECT 
                                                periode, 
                                                etape, 
                                                reference, 
                                                MOTEURS_idMOTEURS
                                                FROM entretien
                                                WHERE MOTEURS_idMOTEURS = 
                                                (SELECT idMOTEURS FROM moteurs WHERE nom = ? LIMIT 1);`, 
                                          [req.body.nom]);

// Boucle qui permet de recupérer les entretiens afin de les copier et les ajouter lorsque le nom du moteur est similaire

    for (const entretien of entretiens) {
      const valeursEntretien = {
        periode: entretien.periode,
        etape: entretien.etape,
        reference: entretien.reference,
        quantite: entretien.quantite,
        MOTEURS_idMOTEURS: moteurId
      };
      
      await ajouterElement('entretien', valeursEntretien);}
      res.status(200).send('L\'entretien est bien ajouté')
    } catch (error) {
      console.log(error);
      res.status(500).send('Erreur lors de l\'ajout de l\'entretien.' );
    }
})

app.post('/api/ajoutClient', authenticateTokenAdmin, async function ajoutClient(req, res) {
  
  try {
    const moteurValeurs = {
      FOURNISSEUR_idFOURNISSEUR: req.body.marque_moteur,
      nom: req.body.nom_moteur,
      annee: req.body.annee_moteur,
      numero_serie: req.body.numero_serie_moteur,
      puissance: req.body.puissance_moteur,
      annee_utilisation: req.body.annee_utilisation_moteur,
      poids: req.body.poids_moteur,
      bruit: req.body.bruit_moteur
    };

    const moteurId = await ajouterElement('moteurs', moteurValeurs);

    console.log("Moteur ajouté à votre BDD");

    const [entretiens] = await connexion.query(`SELECT 
    periode, 
    etape, 
    reference, 
    MOTEURS_idMOTEURS
    FROM entretien
    WHERE MOTEURS_idMOTEURS = 
    (SELECT idMOTEURS FROM moteurs WHERE nom = ? LIMIT 1);`, 
[req.body.nom_moteur]);


for (const entretien of entretiens) {
const valeursEntretien = {
periode: entretien.periode,
etape: entretien.etape,
reference: entretien.reference,
quantite: entretien.quantite,
MOTEURS_idMOTEURS: moteurId
};


await ajouterElement('entretien', valeursEntretien);}


    // Récupération des valeurs du bateau et on y attribue le moteur précédement ajouté
    const bateauValeurs = {
      FOURNISSEUR_idFOURNISSEUR: req.body.marque_bateau,
      nom: req.body.nom_bateau,
      annee: req.body.annee_bateau,
      immatriculation: req.body.immatriculation_bateau,
      longueur_coque: req.body.longueur_bateau,
      largeur_bau: req.body.largeur_bateau,
      tirant_air: req.body.tirant_air_bateau,
      tirant_eau: req.body.tirant_eau_bateau,
      cabine: req.body.cabines_bateau,
      couchette: req.body.couchettes_bateau,
      MOTEURS_idMOTEURS: moteurId
    };

    const bateauId = await ajouterElement('bateaux', bateauValeurs);

    // Récupération des données clients et on y attribue le bateau précédement ajouté
    const clientValeurs = {
      nom: req.body.nom_client,
      prenom: req.body.prenom_client,
      mail: req.body.mail_client,
      telephone: req.body.telephone_client,
      place_portuaire: req.body.place_portuaire_client,
      BATEAUX_idBATEAUX: bateauId
    };

    await ajouterElement('clients', clientValeurs);
    res.status(200).send("Le client a été ajouté à la base de données.");
  } catch (error) {
    console.log(error);
    res.status(500).send('Erreur lors de l\'ajout du client.' );
  }
})

app.post('/api/ajoutFournisseur', authenticateTokenAdmin, async function ajoutFournisseurBDD(req, res) {
  const fournisseurValues = req.body
  try {
  await ajouterElement("fournisseur", fournisseurValues)
  
  res.status(200).send('Fournisseur ajouté avec succès.');
} catch (error) {
  console.log(error);
  res.status(500).send('Erreur lors de l\'ajout du fournisseur.' );
}
})

app.post('/api/ajoutEntretien', authenticateTokenAdmin, async function ajoutEntretienMoteurs(req, res) {
  // Récupération des valeurs d'entretien à ajouter et le moteur auquel les attribuer
  try {
    const nomMoteur = req.body.nomMoteur;
    const periode = req.body.periode;
    const etape = req.body.etape;
    const reference = req.body.reference;
    const quantite = req.body.quantite;

    // Récupération de tous les moteurs ayant le même nom
    const [moteurs] = await connexion.query('SELECT * FROM moteurs WHERE nom = ?', [nomMoteur]);

    // Ajout de la nouvelle ligne d'entretien pour chaque moteur
    for (const moteur of moteurs) {
      await ajouterElement('entretien', {
        MOTEURS_idMOTEURS: moteur.idMOTEURS,
        periode,
        etape,
        reference,
        quantite
      });
    }

    res.status(200).send('Entretien ajouté avec succès pour tous les moteurs ayant le même nom.' );
  } catch (error) {
    console.log(error);
    res.status(500).send('Erreur lors de l\'ajout de l\'entretien.' );
  }
}
)

app.post('/api/conformiteUpdate',authenticateToken, async function conformite (req, res) {
  // Ajout d'une ligne de conformité, ou si déjà existant, mise à jour des informations du client dans le tableau de conformité
 try {
    await connexion.query(
          `INSERT INTO conformite 
              (CLIENTS_idCLIENTS, commentaire, date_entree) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
          commentaire = VALUES(commentaire), 
          date_entree = VALUES(date_entree)
    `,
    
      [req.body.idCLIENTS, 
        req.body.commentaire, 
        req.body.date_entree]
    );
      

    // Mise à jour des entretiens qui sont liés au moteur du client afin qu'ils puissent apparaître en fonction de la période attendue
    await connexion.query(
      `
      UPDATE entretien
      SET valide = 0
      WHERE MOTEURS_idMOTEURS = ?
      AND (periode = 1 OR periode = ?);

      `,
      [req.body.idMOTEURS, req.body.periode]
    );


    console.log('Conformitée envoyée');
    res.status(200).send('Le client a bien été envoyer vers l\'atelier');
  } catch (error) {
    res.status(500).send('Il ya un problème avec votre serveur');
  }
})



// PRISE EN CHARGE

app.put('/api/entretien/:id', authenticateToken, async function validationEtapes(req, res) {
  const id = req.params.id;
// Valeur renvoyée dans la base de données afin de valider les étapes au client
  const entretienValeurs = {
    valide: true
  };
try {
  await mettreAJourElement('UPDATE entretien SET ? WHERE idENTRETIEN = ?', [entretienValeurs, id]);     
  res.status(200).send({message : 'L\'entretien est bien validé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de l\'ajout de la validation de l\'entretien.' });
}
});

app.post('/api/finReparation', authenticateTokenAdmin, async function validationFinReparation (req, res) {

  // Ajout ou modification des la prise en charge en ajoutant la date de sortie

  try {
    await connexion.query(
      `INSERT INTO pris_en_charge 
      (CLIENTS_idCLIENTS, date_sortie)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      date_sortie = VALUES(date_sortie);`, 
      [req.body.idCLIENTS, req.body.date_sortie]
    );
    
    res.status(200).send("La prise en charge est terminée");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de l'insertion dans la base de données");}
})








app.put('/api/ModificationFournisseur/:id', authenticateTokenAdmin, async function modificationBateau(req, res) {

  const id = req.params.id;
  // Modification des données mais si aucune valeur n'est récupérée alors elles restent inchangées
  try {

  const updateFournisseurQuery = `UPDATE fournisseur
  SET fournisseur.nom = CASE WHEN ? <> "" THEN ? ELSE fournisseur.nom END,
  fournisseur.type = CASE WHEN ? <> "" THEN ? ELSE fournisseur.type END
  WHERE fournisseur.idFOURNISSEUR = ?`;

const updateFournisseurValues = [
    req.body.nom, req.body.nom, // Nouveau nom du fournisseur
    req.body.type, req.body.type, // Nouveau type du fournisseur 
    id // ID du fournisseur à modifier
];

    await mettreAJourElement(updateFournisseurQuery, updateFournisseurValues);
    console.log("Données du fournisseur modifiées dans la base de données");

    // Envoi de la réponse réussie
    res.status(200).send("Les données du fournisseur ont été modifiées avec succès.");
  } catch (error) {
    console.error("Une erreur s'est produite lors de la modification des données du fournisseur :", error);

    // Envoi d'une réponse d'erreur
    res.status(500).send("Une erreur s'est produite lors de la modification des données du fournisseur.");
  }
})



app.put('/api/ModificationEmploye/:id', authenticateTokenAdmin, async function modificationBateau(req, res) {
 
  const id = req.params.id;

  try {
  // Modification des données mais si aucune valeur n'est récupérée alors elles restent inchangées

  const updateEmployeQuery = `UPDATE employe
  SET employe.nom = CASE WHEN ? <> "" THEN ? ELSE employe.nom END,
  employe.prenom = CASE WHEN ? <> "" THEN ? ELSE employe.prenom END,
  employe.mail = CASE WHEN ? <> "" THEN ? ELSE employe.mail END,
  employe.telephone = CASE WHEN ? <> "" THEN ? ELSE employe.telephone END,
  employe.mot_de_passe = CASE WHEN ? <> "" THEN ? ELSE employe.mot_de_passe END,
  employe.ROLE_idROLE = CASE WHEN ? <> "" THEN ? ELSE employe.ROLE_idROLE END
  WHERE employe.idEMPLOYE = ?`;

const updateEmployeValues = [
    req.body.nom, req.body.nom, // Nouveau nom de l'employé
    req.body.prenom, req.body.prenom, // Nouveau prenom de l'employé
    req.body.mail, req.body.mail, // Nouveau mail de l'employé
    req.body.telephone, req.body.telephone, // Nouveau téléphone employé
    req.body.mot_de_passe, req.body.mot_de_passe, // Nouveau mot de passe
    req.body.ROLE_idROLE, req.body.ROLE_idROLE, // Nouveau rôle
    id // ID de l'employe à modifier
];

  await mettreAJourElement(updateEmployeQuery, updateEmployeValues);
  console.log("Données de l'employé modifiées dans la base de données");

    // Envoi de la réponse réussie
    res.status(200).send("Les données de l'employé ont été modifiées avec succès.");
  } catch (error) {
    console.error("Une erreur s'est produite lors de la modification des données de l'employé :", error);

    // Envoi d'une réponse d'erreur
    res.status(500).send("Une erreur s'est produite lors de la modification des données de l'employé.");
  }
})

app.put('/api/ModificationBateau/:id', authenticateTokenAdmin, async function modificationBateau(req, res) {
  const id = req.params.id;
  // Modification des données mais si aucune valeur n'est récupérée alors elles restent inchangées

  try {
    // Modification du moteur dans la table moteurs
    if (req.body.idMOTEURS !== "") {
      const updateMoteursQuery = `UPDATE moteurs
        SET moteurs.prix = CASE WHEN ? <> "" THEN ? ELSE moteurs.prix END,
            moteurs.lier_bateau_vente = CASE WHEN ? <> "" THEN 0 ELSE moteurs.lier_bateau_vente END
        WHERE moteurs.idMOTEURS = ?`;

      const updateMoteursValues = [
        req.body.idMOTEURS, // ID du moteur à modifier (pour la condition du prix)
        req.body.idMOTEURS, // ID du moteur à modifier (pour la condition de lier_bateau_vente)
        req.body.idMOTEURS // ID du moteur à modifier
      ];

      await connexion.query(updateMoteursQuery, updateMoteursValues);
      console.log("Moteur modifié dans la base de données");
    }

    // Modification du bateau dans la table bateaux
    const updateBateauQuery = `UPDATE bateaux
      SET bateaux.nom = CASE WHEN ? <> "" THEN ? ELSE bateaux.nom END,
          bateaux.immatriculation = CASE WHEN ? <> "" THEN ? ELSE bateaux.immatriculation END,
          bateaux.prix = CASE WHEN ? <> "" THEN ? ELSE bateaux.prix END,
          bateaux.etat = CASE WHEN ? <> "" THEN ? ELSE bateaux.etat END
      WHERE bateaux.idBATEAUX = ?`;

    const updateBateauxValues = [
      req.body.nom_bateau, req.body.nom_bateau, // Nouveau nom du bateau
      req.body.immatriculation, req.body.immatriculation, // Nouvelle immatriculation du bateau
      req.body.prix, req.body.prix, // Nouveau prix du bateau
      req.body.etat, req.body.etat, // Nouvel état du bateau
      id // ID du bateau à modifier
    ];

    await connexion.query(updateBateauQuery, updateBateauxValues);
    console.log("Données du bateau modifiées dans la base de données");

    // Envoi de la réponse réussie
    res.status(200).send("Les données du bateau ont été modifiées avec succès.");
  } catch (error) {
    console.error("Une erreur s'est produite lors de la modification des données du bateau :", error);

    // Envoi d'une réponse d'erreur
    res.status(500).send("Une erreur s'est produite lors de la modification des données du bateau.");
  }
});

app.put('/api/ModificationClient/:id', authenticateTokenAdmin, async function modificationClient(req, res) {
  const id = req.params.id;
  try {

// Modification du moteur dans la table moteurs
if (req.body.idMOTEURS !== "") {
  const updateMoteursQuery = `UPDATE moteurs
  SET moteurs.prix = CASE WHEN ? <> "" THEN ? ELSE moteurs.prix END,
      moteurs.lier_bateau_vente = CASE WHEN ? <> "" THEN 0 ELSE moteurs.lier_bateau_vente END
  WHERE moteurs.idMOTEURS = ?;
  `;

  const updateMoteursValues = [
    req.body.idMOTEURS, // ID du moteur à modifier (pour la condition du prix)
    req.body.idMOTEURS, // ID du moteur à modifier (pour la condition de lier_bateau_vente)
    req.body.idMOTEURS, // ID du moteur à modifier
  ];

  await mettreAJourElement(updateMoteursQuery, updateMoteursValues);
  console.log("Moteur modifié dans la base de données");
}


// Ici nous mettons à jour les tables prix et lier_client_vente car le bateau est enfin attribué à un client.
if (req.body.idBATEAUX !== "") {
  const updateBateauQuery = `UPDATE bateaux
                             SET prix = NULL,
                                 lier_client_vente = 0
                             WHERE idBATEAUX = ?`;

  const updateBateauxValues = [
    req.body.idBATEAUX, // ID du bateau à modifier
  ];

  await mettreAJourElement(updateBateauQuery, updateBateauxValues);
  console.log("Bateau modifié dans la base de données");
}

  // Mise à jour des données clients s'il n'y a aucune données elles restent inchangées
  const updateClientQuery = `UPDATE clients
    SET
      nom = CASE WHEN ? <> "" THEN ? ELSE nom END,
      prenom = CASE WHEN ? <> "" THEN ? ELSE prenom END,
      mail = CASE WHEN ? <> "" THEN ? ELSE mail END,
      telephone = CASE WHEN ? <> "" THEN ? ELSE telephone END,
      place_portuaire = CASE WHEN ? <> "" THEN ? ELSE place_portuaire END
    WHERE idCLIENTS = ?`;

  const updateClientValues = [
    req.body.nom_client, req.body.nom_client,
    req.body.prenom_client, req.body.prenom_client,
    req.body.mail_client, req.body.mail_client,
    req.body.telephone_client, req.body.telephone_client,
    req.body.place_portuaire_client, req.body.place_portuaire_client,
    id
  ];

    await mettreAJourElement(updateClientQuery, updateClientValues);
    console.log("Client mis à jour dans la base de données");
     // Envoi de la réponse réussie
     res.status(200).send("Les données du client ont été modifiées avec succès.");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la modification des données du client :", error);
  
      // Envoi d'une réponse d'erreur
      res.status(500).send("Une erreur s'est produite lors de la modification des données du client.");
    }
});



app.put('/api/ModificationEntretien/:id', authenticateTokenAdmin, async function modificationBateau(req, res) {
  const id = req.params.id;

  try {
    // Modification du bateau dans la table bateaux
    const updateEntretienQuery = `UPDATE entretien
      SET entretien.periode = CASE WHEN ? <> "" THEN ? ELSE entretien.periode END,
      entretien.etape = CASE WHEN ? <> "" THEN ? ELSE entretien.etape END,
      entretien.reference = CASE WHEN ? <> "" THEN ? ELSE entretien.reference END,
      entretien.quantite = CASE WHEN ? <> "" THEN ? ELSE entretien.quantite END
      WHERE entretien.idENTRETIEN = ?`;

    const updateEntretienValues = [
      req.body.periode, req.body.periode, // Nouveau nom du bateau
      req.body.etape, req.body.etape, // Nouvelle immatriculation du bateau
      req.body.reference, req.body.reference, // Nouveau prix du bateau
      req.body.quantite, req.body.quantite, // Nouvel état du bateau
      id // ID du bateau à modifier
    ];

    await connexion.query(updateEntretienQuery, updateEntretienValues);
    console.log("Données du bateau modifiées dans la base de données");

    // Envoi de la réponse réussie
    res.status(200).send("Les données du bateau ont été modifiées avec succès.");
  } catch (error) {
    console.error("Une erreur s'est produite lors de la modification des données du bateau :", error);

    // Envoi d'une réponse d'erreur
    res.status(500).send("Une erreur s'est produite lors de la modification des données du bateau.");
  }
});
  


app.put('/api/ModificationMoteur/:id', authenticateTokenAdmin, async function modificationBateau(req, res) {
  const id = req.params.id;

  try {
    // Modification du bateau dans la table bateaux
    const updateEntretienQuery = `UPDATE moteurs
      SET moteurs.prix = CASE WHEN ? <> "" THEN ? ELSE moteurs.prix END,
      moteurs.etat = CASE WHEN ? <> "" THEN ? ELSE moteurs.etat END
      WHERE moteurs.idMOTEURS = ?`;

    const updateEntretienValues = [
      req.body.prix, req.body.prix, // Nouveau prix du moteur
      req.body.etat, req.body.etat, // Nouvel état du moteur
      id // ID du moteur à modifier
    ];

    await connexion.query(updateEntretienQuery, updateEntretienValues);
    console.log("Données du bateau modifiées dans la base de données");

    // Envoi de la réponse réussie
    res.status(200).send("Les données du bateau ont été modifiées avec succès.");
  } catch (error) {
    console.error("Une erreur s'est produite lors de la modification des données du bateau :", error);

    // Envoi d'une réponse d'erreur
    res.status(500).send("Une erreur s'est produite lors de la modification des données du bateau.");
  }
});
  

app.put('/api/ModificationRemorque/:id', authenticateTokenAdmin, async function modificationBateau(req, res) {
  const id = req.params.id;
  // Modification des données s'il n'y a pas de valeurs elles restent inchangées
  try {
    // Modification du bateau dans la table remorques
    const updateEntretienQuery = `UPDATE remorques
      SET remorques.prix = CASE WHEN ? <> "" THEN ? ELSE remorques.prix END,
      remorques.etat = CASE WHEN ? <> "" THEN ? ELSE remorques.etat END
      WHERE remorques.idREMORQUES = ?`;

    const updateEntretienValues = [
      req.body.prix, req.body.prix, // Nouveau prix de la remorque
      req.body.etat, req.body.etat, // Nouvel état de la remorque
      id // ID de la remorque à modifier
    ];

    await connexion.query(updateEntretienQuery, updateEntretienValues);
    console.log("Données de la remorque modifiées dans la base de données");

    // Envoi de la réponse réussie
    res.status(200).send("Les données de la remorque ont été modifiées avec succès.");
  } catch (error) {
    console.error("Une erreur s'est produite lors de la modification des données de la remorque:", error);

    // Envoi d'une réponse d'erreur
    res.status(500).send("Une erreur s'est produite lors de la modification des donnéesde la remorque.");
  }
});
  











// SUPPRESSION

app.delete('/api/suppressionFournisseur/:id',authenticateTokenAdmin, async function suppressionFournisseur (req, res) {

  const id = req.params.id 
  // Instruction de suppression du fournisseur en récupérant les données qui sont liées à ce fournisseur
try {
  const queriesFournisseurs = [
    'DELETE FROM clients WHERE BATEAUX_idBATEAUX IN (SELECT idBATEAUX FROM bateaux WHERE FOURNISSEUR_idFOURNISSEUR = ?);',
    'DELETE FROM moteurs WHERE FOURNISSEUR_idFOURNISSEUR = ?;',   
    'DELETE FROM bateaux WHERE FOURNISSEUR_idFOURNISSEUR = ?;',
    'DELETE FROM fournisseur WHERE idFOURNISSEUR = ?;'
  ]

  await suppressionGenerique(req, res, id, queriesFournisseurs);
  res.status(200).send({message : 'Le fournisseur est bien supprimé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression du fournisseur.' });
}
})

app.delete('/api/suppressionRemorque/:id',authenticateTokenAdmin, async function suppressionRemorque (req, res) {
  const id = req.params.id 
  // Suppression de la remorque
try { 
  const queriesRemorque = 'DELETE FROM remorques WHERE idREMORQUES = ?'

  await suppressionGenerique(req, res, id, [queriesRemorque]);
  res.status(200).send({message : 'La remorque est bien supprimée'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression de la remorque.' });
}
})

app.delete('/api/suppressionMoteur/:id',authenticateTokenAdmin, async function suppressionMoteurs(req, res){

  // Suppression d'un moteur et mise à jour d'un bateau en mettant 'aucun moteur' qui a l'id 16
  const id = req.params.id 
try {
  const queriesMoteurs = [
    'UPDATE bateaux SET MOTEURS_idMOTEURS = 16 WHERE MOTEURS_idMOTEURS = ?;',
    'DELETE FROM entretien WHERE MOTEURS_idMOTEURS = ?;',
    'DELETE FROM moteurs WHERE idMOTEURS = ?;'
  ]

  await suppressionGenerique(req, res, id, queriesMoteurs);  
  res.status(200).send({message : 'Le moteur est bien supprimé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression du moteur.' });
}
})

app.delete('/api/suppressionBateaux/:id',authenticateTokenAdmin, async function suppressionBateaux (req, res){

  // Suppression du bateau en mettant à jour le tableau client en ajoutant "aucun bateau" qui a l'identifiant bateau 19
  const id = req.params.id
try {
  const queriesBateaux = [
    'UPDATE clients SET BATEAUX_idBATEAUX = 19 WHERE BATEAUX_idBATEAUX = ?',
    'DELETE FROM bateaux WHERE idBATEAUX = ?'
  ];
  
  await suppressionGenerique(req, res, id, queriesBateaux);
  res.status(200).send({message : 'Le bateau est bien supprimé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression du bateau.' });
}
})

app.delete('/api/suppressionClients/:id',authenticateTokenAdmin, async function suppressionClients (req, res) {
  // Suppression du client en recherchant dans les autres tableaux les clés primaires et les supprimant

  const id = req.params.id;
try {
  const queriesClients = ['DELETE FROM conformite WHERE CLIENTS_idCLIENTS = ?;',
                          'DELETE FROM pris_en_charge WHERE CLIENTS_idCLIENTS = ?;',
                          'DELETE FROM clients WHERE idCLIENTS = ?;'
                          ]

  await suppressionGenerique(req, res, id, queriesClients);
  res.status(200).send({message : 'Le client est bien supprimé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression du client.' });
}
})

app.delete('/api/suppressionEmployes/:id',authenticateTokenAdmin, async function suppressionEmployes(req, res){
  // Suppression de l'employé 

  const id = req.params.id
  try {
  const queriesEmploye =  `DELETE FROM employe 
                          WHERE idEMPLOYE = ?;`

  await suppressionGenerique(req, res, id, [queriesEmploye]);
  res.status(200).send({message : 'L\'employé est bien supprimé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression de l\'employé.' });
}
})

app.delete('/api/suppressionEntretien/:id',authenticateTokenAdmin, async function suppressionEntretien (req, res) {
  // Suppression de l'entretien en recherchant toutes les mêmes références qui seront liées aux moteurs similaires
  const id = req.params.id
 try {
  const queryEntretien = `DELETE FROM entretien 
                          WHERE reference = 
                                (SELECT DISTINCT reference 
                                FROM  
                                    (SELECT reference 
                                      FROM entretien 
                                      WHERE idENTRETIEN = ? LIMIT 1) 
                                AS e2)`;

  await suppressionGenerique(req, res, id, [queryEntretien]);
  res.status(200).send({message : 'L\'entretien est bien supprimé'})
} catch (error) {
  console.log(error);
  res.status(500).send({ message: 'Erreur lors de la suppression de l\'entretien.' });
}
})






// Envoi d'accès pour administrateur
app.get('/api/isAdmin', authenticateTokenAdminMenu);



// Lecture du port et possibilité d'utiliser sur le réseau wifi 
app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
  console.log(`Le serveur écoute sur toutes les interfaces réseau.`);
});