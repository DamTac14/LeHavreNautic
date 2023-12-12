import React, { useState, useEffect } from 'react';
import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';

import '../../styles/ajout.css'
import '../../styles/connexion.css'

function ModificationFournisseur() {
  // Variables de stockage de données
  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fournisseurSelected, setFournisseurIdSelected] = useState('');
  // Filtrage des fournisseurs pour enlever le none
  var fournisseursFiltrees = fournisseurs.filter((element) => element.nom !== 'none')

  // Affichage des fournisseurs
  useEffect(() => {
    const getFournisseur = async () => {
      const fournisseursData = await fetchAffichage('fournisseurs');
      setFournisseurs(fournisseursData);
    };
    getFournisseur();
  }, []);


  var handleClick = (id) => {

    // Récupération des valeurs côté navigateur
    const {
      value: nom,
    } = document.getElementById('nom_fournisseur');
    const {
      value: type,
    } = document.getElementById('type_fournisseur')

    // le json des données à modifier
    let donnees_a_ajouter = {
      nom,
      type
    };

      if(fournisseurSelected === '') {

        const messageElement = document.getElementById("message");
        messageElement.classList.add("error");
        messageElement.innerHTML = 'Vous devez sélectionner un fournisseur' ;

      } else {

        // Appel de la fonction ajouterDonneesGlobales avec les paramètres
       AjoutGlobal(donnees_a_ajouter, 'Fournisseur', 'ModificationFournisseur', 'PUT', id)
    }
  }

  // Filtrage qui permet de retrouver le nom des fournisseurs en l'écrivant
  const filteredFournisseur = fournisseursFiltrees.filter((fournisseur) =>
  `${fournisseur.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleFournisseurChange (event) {
  const selectedValue = event.target.value;

  setFournisseurIdSelected(selectedValue)
  };


  return (
    <figure className="ficheAjoutClient">

      <h2>Modification d'un fournisseur</h2>

      <select id="fournisseur" onChange={handleFournisseurChange}>
      <option>-- Sélectionnez un fournisseur * --</option>

      <input
        type="text"
        placeholder="Rechercher un fournisseur"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

  {filteredFournisseur.map((fournisseur) => (
    <option key={fournisseur.idFOURNISSEUR} value={fournisseur.idFOURNISSEUR}>
        {fournisseur.nom}
    </option>
  ))}

</select>

      <div>

        <h4>Nom du fournisseur</h4>

          <input
          type='text'
          id='nom_fournisseur'
          name='nom_fournisseur'
          />

      </div>

     <div class="choixRole">

      <h4>Type de fournisseur</h4>

      <select id="type_fournisseur">
      <option value="">Sélectionnez le nouveau type **</option>

      <option value="moteur">Moteur</option>
      <option value="bateau">Bateau</option>

  </select>
     </div>

      <p id="message"> </p>

      <p id='periodeMessage'>
        <br></br>* Vous pouvez écrire le nom du fournisseur lorsque vous avez ouvert la liste déroulante pour le trouver
        <br></br>
        
        <br></br>** Si vous ne voulez pas changer le type du fournisseur, veuillez ne rien sélectionner</p>

      <button type="submit"
              id='submit'
              className="ConnexionButton EnvoiButton" 
              onClick={() => handleClick(fournisseurSelected)}>
              MODIFIER
      </button>
              
    </figure>
  )
}

export default ModificationFournisseur;
