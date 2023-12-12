import '../../styles/ajout.css'

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';

function AjoutFournisseur() {

var handleClick = () => {
// Récupération des valeurs côté navigateur
    const {
        value: nom,
    } = document.getElementById('nom_fournisseur')
    const {
        value: type,
    } = document.getElementById('type_fournisseur')
    

    // le json des données à ajou  ter 
    let donnees_a_ajouter = {
        nom,
        type
      };

      // Condition qui pousse l'utilisateur à choisir un type de fournisseur
      if (type === "Choisissez pour quel type d'appareil") {
      
        const messageElement = document.getElementById("message");
        messageElement.classList.add("error");
        messageElement.innerHTML = "Il y a une erreur lors de votre opération, vérifiez l'état de vos données";
    
    } else {
          AjoutGlobal(donnees_a_ajouter, 'fournisseur', 'ajoutFournisseur', 'POST')
      }
}

    return (
    <figure className="ficheAjoutAppareil">
        <h2>Ajout d'un nouveau fournisseur</h2>

            <div>
                <label>
                    <p>Nom du fournisseur</p>
                </label>

                <input id="nom_fournisseur" 
                type="text" 
                name="nom_fournisseur" 
                className="inputAjout" 
                required />

            </div>
            <div>
                <label>
                    <p>Type</p>
                </label>
                
                <select id="type_fournisseur">
                    <option>Choisissez pour quel type d'appareil</option>
                    <option value="bateau">Bateau</option>
                    <option value="moteur">Moteur</option>
                </select>
            </div>

            <p id="message"> </p>

            <button type="submit" 
            id='submit' 
            className="ConnexionButton EnvoiButton" 
            onClick={handleClick}>AJOUTER</button>
    
    </figure>
    )
}

export default AjoutFournisseur