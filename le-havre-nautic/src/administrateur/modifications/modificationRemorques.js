import React, { useState, useEffect } from 'react';

import FormulaireGlobal from '../../components/Formulaire'

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import ajoutRemorqueDonnees from '../../components/JSONInformationsElements/ajoutRemorquesDonnees.json';

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';
import '../../styles/ajout.css'

function ModificationRemorque() { 
    // Stockage des données en utilisant useState
    const [remorques, setRemorques] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRemorqueId, setSelectedRemorqueId] = useState('');

    // Filtrage qui permet d'afficher seulement les données qu'on veut modifier 
    const remorquesForm = ajoutRemorqueDonnees.filter((element) => element.name === 'prix_remorque')

    // Affichage des remorques
      useEffect(() => {
        const getRemorques = async () => {
        const remorqueData = await fetchAffichage('Remorques');
        setRemorques(remorqueData);
            };
            getRemorques();
    }, []);
                                              


  var handleClick = (id) => {
    
    // Valeurs récupérées côté navigateur
    const {
      value: prix,
    } = document.getElementById('prix_remorque');
    const {
      value: etat,
    } = document.getElementById('etat_remorque');


  // Données stockées dans une variable à envoyer vers le serveur
  const donnees_a_ajouter = {
    prix,
    etat
  }

  // Condition pour pousser l'utilisateur à choisir une remorque
  if(selectedRemorqueId === '') {

    const messageElement = document.getElementById("message");
    messageElement.classList.add("error");
    messageElement.innerHTML = 'Vous devez sélectionner une remorque';

  } else {

    // Appel de la fonction ajouterDonneesGlobales avec les paramètres
    AjoutGlobal(donnees_a_ajouter, 'remorque', 'ModificationRemorque', 'PUT', id);
    }
  };

// Filtrage qui permet d'afficher les remorques et pouvoir les retrouver en écrivant leur nom
const filteredRemorques = remorques.filter((bateau) =>
`${bateau.nom} ${bateau.reference}`.toLowerCase().includes(searchTerm.toLowerCase())
);


const handleRemorqueChange = (event) => {
    setSelectedRemorqueId(event.target.value);
// Gérer la sélection du client
};


    return(

<figure className="ficheAjoutClient">

            <h2>Modification remorque</h2>

            <h3>Informations remorques</h3>

            <select id="remorque" onChange={handleRemorqueChange}>
            <option>-- Sélectionnez une remorque * --</option>

            <input
              type="text"
              placeholder="Rechercher une remorque"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

        {filteredRemorques.map((remorques) => (
          <option key={remorques.idREMORQUES} value={remorques.idREMORQUES}>
          {remorques.reference} {remorques.nom} 
          </option>
        ))}

      </select>

      <FormulaireGlobal 
      inputs={remorquesForm}
        />
        <div>
            <label>
                <p>Etat de la remorque</p>
            </label>
              <select id="etat_remorque">
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
                    onClick={() => handleClick(selectedRemorqueId)}>
                    MODIFIER
            </button>
            
</figure>
    );
}

export default ModificationRemorque