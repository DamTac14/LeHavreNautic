import React, { useState } from 'react';
import '../styles/recherche.css'

function Recherche() {
  
  // État local pour stocker la valeur de recherche
  const [searchValue, setSearchValue] = useState('');

  // Fonction pour effectuer la recherche
  function rechercher_moteur(event) {

    // Obtenir la valeur de recherche à partir de l'élément d'entrée
    let input = document.getElementById('barre2recherche').value;

    // Convertir la valeur de recherche en minuscules pour une correspondance insensible à la casse
    input = input.toLowerCase();

    // Obtenir tous les éléments ayant la classe 'rechercher_moteur'
    let lettre = document.getElementsByClassName('rechercher_moteur');

    // Parcourir tous les éléments de la classe 'rechercher_moteur'
    for (var i = 0; i < lettre.length; i++) {

      // Vérifier si le contenu de l'élément ne contient pas la valeur de recherche
      if (!lettre[i].innerHTML.toLowerCase().includes(input)) {

        // Cacher l'élément s'il ne correspond pas à la recherche
        lettre[i].style.display = "none";

      } else{
        // Afficher l'élément s'il correspond à la recherche
        lettre[i].style.display = "";
      }
    }

    // Mettre à jour la valeur de recherche dans l'état
    setSearchValue(input);
  }
  
  // Fonction pour supprimer la recherche et réinitialiser les résultats
  function supprimer_recherche() {

    // Réinitialiser la valeur de recherche
    setSearchValue("");

    // Effacer le contenu de l'élément d'entrée
    document.getElementById('barre2recherche').value = "";

    // Afficher tous les éléments de la classe 'rechercher_moteur'
    let lettre = document.getElementsByClassName('rechercher_moteur');

    for (var i = 0; i < lettre.length; i++) {
      lettre[i].style.display = "";
    }
  }
  
  return (
    <div className="recherche-wrapper">

      {/* Champ de recherche */}

      <input
        id={'barre2recherche'}
        onKeyUp={(event) => rechercher_moteur(event)}
        type={'text'}
        placeholder={'Rechercher'}
      />

      {/* Bouton de suppression de la recherche */}

      {searchValue.length > 0 && (
        <button className="supprButtonRecherche" onClick={() => supprimer_recherche()}>
          X
        </button>
      )}
    </div>
  );
}

export default Recherche;
