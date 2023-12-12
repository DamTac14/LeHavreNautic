import React, { useState, useEffect } from 'react';

import FormulaireGlobal from '../../components/Formulaire'

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import ajoutMoteurDonnees from '../../components/JSONInformationsElements/ajoutMoteursDonnees.json';

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';
import '../../styles/ajout.css'

function ModificationMoteur() {
    // Variables de stockage des données
    const [moteurs, setMoteurs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMoteurId, setSelectedMoteurId] = useState('');

    // Filtre qui permet d'afficher ce que l'on veut seulement modifier
    const moteursForm = ajoutMoteurDonnees.filter((element) => element.name === 'prix_moteur'
                                                              || element.name === 'annee_utilisation_moteur')

      // Affichage des moteurs
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
      value: prix,
    } = document.getElementById('prix_moteur');
    const {
      value: etat,
    } = document.getElementById('etat_moteur');


    // Variable stockant les données à modifier
  const donnees_a_ajouter = {
    prix,
    etat
  }

  // Condition poussant l'utilisateur à sélectionner un moteur
  if(selectedMoteurId === '') {

    const messageElement = document.getElementById("message");
    messageElement.classList.add("error");
    messageElement.innerHTML = 'Vous devez sélectionner un moteur';

  } else {

    // Appel de la fonction ajouterDonneesGlobales avec les paramètres
    AjoutGlobal(donnees_a_ajouter, 'moteur', 'ModificationMoteur', 'PUT', id);
    }
  };

  // Filtrage qui permet de sélectionner un moteur en l'écrivant
const filteredMoteurs = moteurs.filter((bateau) =>
`${bateau.moteur_nom} ${bateau.numero_serie}`.toLowerCase().includes(searchTerm.toLowerCase())
);


const handleBateauChange = (event) => {
    setSelectedMoteurId(event.target.value);
// Gérer la sélection du client
};


    return(

<figure className="ficheAjoutClient">

            <h2>Modification moteurs</h2>

            <h3>Informations moteurs</h3>

            <select id="bateau" onChange={handleBateauChange}>
            <option>-- Sélectionnez un moteur * --</option>

            <input
              type="text"
              placeholder="Rechercher un bateau"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

        {filteredMoteurs.map((moteur) => (
          <option key={moteur.idMOTEURS} value={moteur.idMOTEURS}>
              {moteur.moteur_nom} {moteur.numero_serie}
          </option>
        ))}

      </select>

      <FormulaireGlobal 
      inputs={moteursForm}
        />
        <div>
            <label>
                <p>Etat du moteur</p>
            </label>
              <select id="etat_moteur">
                  <option>Choisissez un état</option>

                  <option value="neuf">Neuf</option>
                  <option value="occasion" selected>Occasion</option>
              </select>
          </div>

        <p id="message"> </p>

        <p id='periodeMessage'>
        <br></br>* Vous pouvez écrire l'immatriculation du bateau lorsque vous avez ouvert la liste déroulante pour le trouver
        </p>
        
        
            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton EnvoiButton"  
                    onClick={() => handleClick(selectedMoteurId)}>
                    MODIFIER
            </button>
            
</figure>
    );
}

export default ModificationMoteur