import '../../styles/ajout.css'
import FormulaireGlobal from '../../components/Formulaire'
import ajoutRemorques from '../../components/JSONInformationsElements/ajoutRemorquesDonnees.json'

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch'

function AjoutVenteRemorque() {
    // Filtre des données JSON pour le formulaire
    const ajoutRemorquesForm = ajoutRemorques.filter((element) => element.label !== 'Supprimer'
                                                                && element.label !== 'Etat')

    var handleClick = () => {

        // Récupération des valeurs entrées côté navigateur
        const {
            value: marque,
        } = document.getElementById('marque_remorque')
        const {
            value: nom,
        } = document.getElementById('nom_remorque')
        const {
            value: immatriculation,
        } = document.getElementById('immatriculation_remorque')
        const {
            value: ptac,
        } = document.getElementById('ptac_remorque')
        const {
            value: charge,
        } = document.getElementById('charge_remorque')
        const {
            value: longueur,
        } = document.getElementById('longueur_remorque')
        const {
            value: largeur,
        } = document.getElementById('largeur_remorque')
        const {
            value: resistance,
        } = document.getElementById('resistance_remorque')
        const {
            value: tete,
        } = document.getElementById('tete_remorque')
        const {
            value: chassis,
        } = document.getElementById('chassis_remorque')
        const {
            value: roues,
        } = document.getElementById('roues_remorque')
        const {
            value: etat,
        } = document.getElementById('etat_remorque')
        const {
            value: prix,
        } = document.getElementById('prix_remorque')
    
    
        // le json des données à ajou  ter 
        let donnees_a_ajouter = {
            marque,
            nom,
            immatriculation,
            ptac,
            charge,
            largeur,
            longueur,
            resistance,
            tete,
            chassis,
            roues,
            etat,
            prix
          };
        

          AjoutGlobal(donnees_a_ajouter, 'remorque', 'ajoutRemorque', 'POST')
    }


    return (
        <figure className="ficheAjoutAppareil">

            <h2>Ajout d'une remorque</h2>
            
            <h3>Informations remorque</h3>

                <FormulaireGlobal 
                inputs={ajoutRemorquesForm}
                />

            <div>
                <label>
                    <p>Etat de la remorque</p>
                </label>

                <select id="etat_remorque">
                    <option value="">Choisissez un état</option>
                    <option value="neuf">Neuf</option>
                    <option value="occasion">Occasion</option>
                </select>
            </div>

            <p id="message"> </p>

            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton EnvoiButton" 
                    onClick={handleClick}>AJOUTER</button>

        </figure>
    );
}

export default AjoutVenteRemorque