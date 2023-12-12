import React, { useEffect, useState } from "react";

import ajoutEntretienGlobal from '../../components/JSONInformationsElements/ajoutEntretiensDonnees.json'
import FormulaireGlobal from "../../components/Formulaire";

import { fetchAffichage } from "../../components/fonctionsAPI/AffichageAPI";

import { AjoutGlobal } from "../../components/fonctionsAPI/AjoutFetch";

function ModificationEntretien() {
  // Variables de stockage de données en utilisant useState
    const [entretien, setEntretien] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [idEntretien, setSelectedEntretienId] = useState('');


    var handleClick = (id) => {
     // Récupération des valeurs côté navigateur
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
    
        // le json des données à modifier
        let donnees_a_ajouter = {
          periode,
          etape,
          reference,
          quantite
          };

          // Condition poussant à sélectionner un entretien à modifier
          
        if(idEntretien === '') {
    
            const messageElement = document.getElementById("message");
            messageElement.classList.add("error");
            messageElement.innerHTML = 'Vous devez sélectionner un entretien'  

        } else {
            // Appel de la fonction ajouterDonneesGlobales avec les paramètres
            AjoutGlobal(donnees_a_ajouter, 'Entretien', 'ModificationEntretien', 'PUT', id)
        }
    }

    // Affichage des entretiens

    useEffect(() => {
        const getEmployes = async () => {
          const employesData = await fetchAffichage('Entretiens');
          setEntretien(employesData);
        };
        getEmployes();
      }, []);

      //Fonction qui permet d'afficher les entretiens et les retrouvant par leur référence car la référence est unique
      const filteredEntretien = entretien.filter((entretien) =>
            `${entretien.reference}`.toLowerCase().includes(searchTerm.toLowerCase())
            );


    async function handleClientChange (event) {
    const selectedValue = event.target.value;

    setSelectedEntretienId(selectedValue)};
    
    return(
        <figure className="ficheAjoutClient">
            <h2>Modification entretien</h2>

            <select id="entretien" onChange={handleClientChange}>
            <option>-- Sélectionnez un entretien * --</option>

            <input
              type="text"
              placeholder="Rechercher un entretien"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredEntretien.map((client) => (
              <option
                key={client.idENTRETIEN}
                value={`${client.idENTRETIEN}`}
              >
                {client.nom_moteur} {client.reference}
              </option>
            ))}
            

      </select>

            <FormulaireGlobal 
            inputs={ajoutEntretienGlobal}
            />

            <p id='periodeMessage'>
        <br></br>* Vous pouvez écrire le nom de l'entretien lorsque vous avez ouvert la liste déroulante pour le trouver
              </p>

            <p id="message"> </p>
            <button type="submit"
                    id='submit'
                    className="ConnexionButton EnvoiButton" 
                    onClick={() => handleClick(idEntretien)}>
                    MODIFIER
            </button>
            
    </figure>
    );
}

export default ModificationEntretien