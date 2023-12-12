import React, { useState } from 'react';
import '../styles/button.css'

function CalculPasHelice() {
  // État local pour gérer l'affichage des champs de saisie
  const [afficherInputs, setAfficherInputs] = useState(false);

  // États locaux pour stocker les valeurs saisies par l'utilisateur
  const [vitesse, setVitesse] = useState('');
  const [tauxRed, setTauxRed] = useState('');
  const [RPM, setRPM] = useState('');
  var [resultat, setResultat] = useState('');

  // Fonction pour effectuer le calcul du pas de l'hélice
  function calculPasHelice() {

    // Calcul des valeurs intermédiaires
    const pasHaut = 100 * vitesse * tauxRed;
    const pasBas = 2.54 * RPM * 60;

    // Calcul du résultat final
    const resultatCalcul = (pasHaut / pasBas) * 2;

    const resultatArrondi = resultatCalcul.toFixed(2)
    // Mise à jour de l'état du résultat
    setResultat(resultatArrondi);
  }

  // Gestionnaire de changement de la valeur de la vitesse
  function vitesseChange(event) {
    setVitesse(event.target.value);
  }

  // Gestionnaire de changement de la valeur du taux de réduction
  function tauxRedChange(event) {
    setTauxRed(event.target.value);
  }

  // Gestionnaire de changement de la valeur des RPM
  function RPMChange(event) {
    setRPM(event.target.value);
  }

  // Fonction pour afficher ou masquer les champs de saisie
  const toggleAfficherCalcul = () => {
    setAfficherInputs(!afficherInputs);
  };

  return (
    <div className='pasHelice'>
      <button className='buttonPasHelice' onClick={toggleAfficherCalcul}>

        {/* Texte du bouton basé sur l'état de l'affichage des champs de saisie */}
        {afficherInputs ? "Cacher le calcul pas d'hélice" : "Afficher le calcul pas d'hélice"}

      </button>

      {/* Affichage des champs de saisie et du résultat si afficherInputs est true */}
      {afficherInputs && (
        <div className='pasHeliceContour'>
          <input type="number" value={vitesse} onChange={vitesseChange} placeholder="Vitesse en noeuds" />
          <input type="number" value={tauxRed} onChange={tauxRedChange} placeholder="Taux réduction embase" />
          <input type="number" value={RPM} onChange={RPMChange}  placeholder="Tours/minutes (RPM)" />
          <button className='buttonCalcul' onClick={calculPasHelice}>Calculer</button>

          {/*Condition de retour du résultat, s'il est correct affiche le résultat et son unité 
                    sinon affiche un message comme quoi le calcul est incorrect */}
                    
          {isNaN(vitesse) 
          || isNaN(tauxRed) 
          || isNaN(RPM) 
          || isNaN(resultat) 
          ? 
          <p>Votre calcul est incorrect</p> 
          : 
          <p>Résultat : {resultat} pas</p>}
          
        </div>
      )}
    </div>
  );
}

export default CalculPasHelice;
