import React from "react";
import ajoutEmployesDonnees from '../../components/JSONInformationsElements/ajoutEmployesDonnees.json'
import FormulaireGlobal from "../../components/Formulaire";

import { AjoutGlobal } from "../../components/fonctionsAPI/AjoutFetch";

function ajoutEmploye() {
    // Filtrage des données pour le formulaire
    const employesForm = ajoutEmployesDonnees.filter((element) => element.label !== 'Supprimer')

    var handleClick = () => {
        // Récupération des valeurs ajoutées côté navigateur
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
        
    
        // le json des données à ajouter 
        let donnees_a_ajouter = {
            nom,
            prenom,
            mail,
            telephone,
            mot_de_passe, // utilise le nom de propriété correct
            ROLE_idROLE
          };
          

        AjoutGlobal(donnees_a_ajouter, 'Employé(e)', 'ajoutEmploye', 'POST')
    }
    
    return(
        <figure className="ficheAjoutClient">
            <h2>Ajout employé</h2>

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
            required />

            <span class="role-label">Utilisateur</span>

        </label>
      </div>
      
            <p id="message"> </p>

            <button type="submit"
                    id='submit'
                    className="ConnexionButton EnvoiButton" 
                    onClick={handleClick}>AJOUTER</button>
    </figure>
    );
}

export default ajoutEmploye