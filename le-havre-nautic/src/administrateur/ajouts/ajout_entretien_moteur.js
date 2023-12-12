import React, { useState, useEffect } from 'react';

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import entretiensMoteurs from '../../components/JSONInformationsElements/ajoutEntretiensDonnees.json'
import FormulaireGlobal from '../../components/Formulaire';

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';

import '../../styles/ajout.css'

function AjoutEntretien() {
  // Stockage local grâce à useState
    const [entretiens, setEntretiens] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const entretiensMoteursForm = entretiensMoteurs;
  // Affichage des moteurs pour le select
    useEffect(() => {
        const getEntretiens = async () => {
          const entretiensData = await fetchAffichage('Moteurs');
          setEntretiens(entretiensData);
        };
        getEntretiens();
      }, []);

var handleClick = () => {
  // Récupération des valeurs ajoutées côté navigateur
    const {
        value: nomMoteur,
    } = document.getElementById('nom_moteur')
    const {
        value: periode,
    } = document.getElementById('periode')
    const {
        value: etape,
    } = document.getElementById('etape')
    const {
        value: reference,
    } = document.getElementById('reference')
    const {
        value: quantite,
    } = document.getElementById('quantite')

    

    // le json des données à ajouter 
    const donnees_a_ajouter = {
        nomMoteur,
        periode,
        etape,
        reference,
        quantite
      };

      // Condition pour obliger l'utilisateur à choisir un moteur
      if(nomMoteur === '') {
      
        const messageElement = document.getElementById("message");
        messageElement.classList.add("error");
        messageElement.innerHTML = "Il y a une erreur lors de votre opération, vérifiez l'état de vos données";
      }else {
          AjoutGlobal(donnees_a_ajouter, 'entretien', 'ajoutEntretien', 'POST')
      }
}
// Filtre permettant de rechercher dans le select un moteur en écrivant
const filteredMoteurs = entretiens.filter((moteur) =>
`${moteur.moteur_nom}`.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleClientChange = (event) => {
const selectedValue = event.target.value;
// Gérer la sélection du client
};

    return (
    <figure className="ficheAjoutAppareil">
    <h2>Ajout d'une nouvelle étape</h2>

    <div>
        <label>
            <p>Nom moteur lié à l'entretien</p>
        </label>
      <select id="nom_moteur" onChange={handleClientChange}>
        <option value="">-- Sélectionnez un moteur * --</option>
          <input
            type="text"
            placeholder="Rechercher un moteur"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        {filteredMoteurs.map((client) => (
          <option key={client.idMOTEURS} value={`${client.moteur_nom}`}>
          {client.moteur_nom} {client.fournisseur_moteur_nom} 
          </option>
        ))}
      </select>

            <FormulaireGlobal 
            inputs={entretiensMoteursForm}
            />

    </div>  

    <p id='periodeMessage'>
                * Vous pouvez écrire le numéro de série du moteur lorsque vous avez ouvert la liste déroulante pour le trouver</p>

    <p id="message"> </p>

    <button type="submit" 
    id='submit' 
    className="ConnexionButton EnvoiButton" 
    onClick={handleClick}>AJOUTER</button>
        
    </figure>
    )
}

export default AjoutEntretien