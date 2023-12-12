import React, { useState, useEffect } from 'react';

import FormulaireGlobal from '../../components/Formulaire'

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import ajoutBateauxDonnees from '../../components/JSONInformationsElements/ajoutBateauxDonnees.json';

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';
import '../../styles/ajout.css'

function ModificationBateau() {
    // Stockage local grâce à useState des différentes données
    const [bateaux, setBateaux] = useState([]);
    const [moteurs, setMoteurs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBateauId, setSelectedBateauId] = useState('');

    // Filtrage des moteurs pour afficher que ceux qui seront liés à un bateau mais qui ne le sont pas encore
    const moteursForm = moteurs.filter((element) => element.lier_bateau_vente !== 0)

    // Filtrage des données bateaux pour le formulaire
    const bateauForm = ajoutBateauxDonnees.filter((element) => element.gamme !== 'aucun bateau'
                                                                && element.label !== 'Supprimer' 
                                                                && element.label !== 'Etat' 
                                                                && element.label !== 'Nombre de couchettes' 
                                                                && element.label !== 'Nombre de cabines'
                                                                && element.label !== 'Longueur'
                                                                && element.label !== 'Largeur' 
                                                                && element.label !== 'Moteur'
                                                                && element.label !== 'Gamme bateau'
                                                                && element.label !== 'Numéro de série' 
                                                                && element.label !== 'Nombre de cabines'
                                                                && element.label !== "Tirant d'air" 
                                                                && element.label !== "Tirant d'eau"
                                                                && element.label !== "Année"  )

      // Affichage des données bateaux pour sélectionner celui qu'on veut modifier
      useEffect(() => {
        const getBateaux = async () => {
        const bateauxData = await fetchAffichage('bateaux');
            setBateaux(bateauxData);
            };
        getBateaux();
    }, []);

    // Affichage des données moteurs pour afficher ceux que l'on veut modifier
    useEffect(() => {
      const getMoteurs = async () => {
      const moteursData = await fetchAffichage('Moteurs');
          setMoteurs(moteursData);
          };
          getMoteurs();
    }, []);
                                                              
                                                              
                                                              


  var handleClick = (id) => {
// Récupération des valeurs côté navigateur
  const {
    value: nom_bateau,
  } = document.getElementById('nom_bateau')
  const {
    value: immatriculation,
  } = document.getElementById('immatriculation_bateau')
  const {
    value: prix,
  } = document.getElementById('prix_bateau')
  const { 
    value:etat,
  } = document.getElementById('etat_bateau')
  const {
    value: idMOTEURS,
  } = document.getElementById('idMOTEURS')

// Données à envoyer à la base de données, stockées dans une variable
  const donnees_a_ajouter = {

    // BATEAU
    nom_bateau,
    immatriculation,
    prix,
    etat,

    // MOTEUR
    idMOTEURS
  }

  // Condition pour pousser l'utilisateur à choisir un bateau
  if(selectedBateauId === '') {

    const messageElement = document.getElementById("message");
    messageElement.classList.add("error");
    messageElement.innerHTML = 'Vous devez sélectionner un bateau';

  } else {

    // Appel de la fonction ajouterDonneesGlobales avec les paramètres
    AjoutGlobal(donnees_a_ajouter, 'bateau', 'ModificationBateau', 'PUT', id);
    }
  };

// Filtre qui permet à l'écriture du nom d'un bateau afin de mieux le retrouver dans le select
const filteredBateaux = bateaux.filter((bateau) =>
`${bateau.gamme} ${bateau.immatriculation}`.toLowerCase().includes(searchTerm.toLowerCase())
);


const handleBateauChange = (event) => {
    setSelectedBateauId(event.target.value);
// Gérer la sélection du client
};


    return(

<figure className="ficheAjoutClient">

            <h2>Modification bateau</h2>

            <h3>Informations bateau</h3>

            <select id="bateau" onChange={handleBateauChange}>
            <option>-- Sélectionnez un bateau * --</option>

            <input
              type="text"
              placeholder="Rechercher un bateau"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

        {filteredBateaux.map((bateau) => (
          <option key={bateau.idBATEAUX} value={bateau.idBATEAUX}>
              {bateau.immatriculation} {bateau.gamme} {bateau.fournisseur_nom}
          </option>
        ))}

      </select>

      <FormulaireGlobal 
      inputs={bateauForm}
        />
        <div>
            <label>
                <p>Etat du bateau</p>
            </label>
              <select id="etat_bateau">
                  <option>Choisissez un état</option>

                  <option value="neuf">Neuf</option>
                  <option value="occasion" selected>Occasion</option>
              </select>
          </div>
          <select id='idMOTEURS'>

            <option value="">-- Sélectionnez un moteur ** --</option>

          {moteursForm.map((moteur) => (
            <option key={moteur.idMOTEURS} value={moteur.idMOTEURS}>
            {moteur.fournisseur_moteur_nom} {moteur.moteur_nom} 
            </option>
          ))}

        </select>

        <p id="message"> </p>

        <p id='periodeMessage'>
        <br></br>* Vous pouvez écrire l'immatriculation du bateau lorsque vous avez ouvert la liste déroulante pour le trouver
        
        <br></br>** Si vous ne voulez pas changer le moteur, veuillez ne rien sélectionner</p>
        
        
            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton EnvoiButton"  
                    onClick={() => handleClick(selectedBateauId)}>
                    MODIFIER
            </button>
            
</figure>
    );
}

export default ModificationBateau