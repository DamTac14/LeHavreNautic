import React, { useEffect, useState } from "react";
import ajoutEmployesDonnees from '../../components/JSONInformationsElements/ajoutEmployesDonnees.json'
import FormulaireGlobal from "../../components/Formulaire";

import { fetchAffichage } from "../../components/fonctionsAPI/AffichageAPI";

import { AjoutGlobal } from "../../components/fonctionsAPI/AjoutFetch";

function ModificationEmploye() {

    // useState de stockage
    const [employe, setEmploye] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [idEmploye, setSelectedEmployeId] = useState('');

    // Filtre pour le formulaire
    const employesForm = ajoutEmployesDonnees.filter((element) => element.label !== 'Supprimer')

    // Filtrage du nom du patron afin qu'il ne soit pas affiché
    const employeFiltered = employe.filter((element) => element.nom !== 'Di Gregorio')

    var handleClick = (id) => {
        

        // Récupération des valeurs côté navigateur
        const {
            value: nom,
        } = document.getElementById('nom_employe')
        const {
            value: prenom,
        } = document.getElementById('prenom_employe')
        const {
            value: mail,
        } = document.getElementById('mail_employe')
        const {
            value: telephone,
        } = document.getElementById('telephone_employe')
        const {
            value: mot_de_passe,
        } = document.getElementById('mdp_employe')
        const {
            value: ROLE_idROLE,
        } = document.querySelector('input[name="role"]:checked')        
        
    
        // le json des données à modifier
        let donnees_a_ajouter = {
            nom,
            prenom,
            mail,
            telephone,
            mot_de_passe, 
            ROLE_idROLE
          };
          
          // Condition pour pousser l'utilisateur à choisir un employé
        if(idEmploye === '') {
    
            const messageElement = document.getElementById("message");
            messageElement.classList.add("error");
            messageElement.innerHTML = 'Vous devez sélectionner un employé'  

        } else {
            // Appel de la fonction ajouterDonneesGlobales avec les paramètres
            AjoutGlobal(donnees_a_ajouter, 'Employé(e)', 'ModificationEmploye', 'PUT', id)
        }
    }

    // Affichage des employés

    useEffect(() => {
        const getEmployes = async () => {
          const employesData = await fetchAffichage('employes');
          setEmploye(employesData);
        };
        getEmployes();
      }, []);

      // Filtre qui permet également à afficher les employés et pouvoir les retrouver en écrivant
      const filteredClients = employeFiltered.filter((client) =>
            `${client.nom} ${client.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
            );


    async function handleClientChange (event) {
    const selectedValue = event.target.value;

    setSelectedEmployeId(selectedValue)};
    
    return(
        <figure className="ficheAjoutClient">
            <h2>Modification employé</h2>

            <select id="client" onChange={handleClientChange}>
            <option>-- Sélectionnez un employé * --</option>

            <input
              type="text"
              placeholder="Rechercher un client"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredClients.map((client) => (
              <option
                key={client.idEMPLOYE}
                value={`${client.idEMPLOYE}`}
              >
                {client.nom} {client.prenom}
              </option>
            ))}
            

      </select>

            <FormulaireGlobal 
            inputs={employesForm}
            />

        <label>
            <h3>Role</h3>
        </label>

    <div class="choixRole">
        <label for="administrateur">

            <input type="radio" 
            name="role" 
            value="1" 
            id="administrateur" />

            <span class="role-label">Administrateur</span>

        </label>

        <label for="utilisateur">

            <input type="radio" 
            name="role" 
            value="2" 
            id="utilisateur" 
            checked />

            <span class="role-label">Employé</span>

        </label>
      </div>
      
            <p id="message"> </p>
            <button type="submit"
                    id='submit'
                    className="ConnexionButton EnvoiButton" 
                    onClick={() => handleClick(idEmploye)}>
                    MODIFIER
            </button>
    </figure>
    );
}

export default ModificationEmploye