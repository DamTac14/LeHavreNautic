import React, { useEffect, useState } from "react";

import { fetchAffichage } from "./fonctionsAPI/AffichageAPI";
import { ValiderEtapes } from "./fonctionsAPI/ValidationEtapes";

function EtapeMoteurs({ id }) {
  // Utilisation de l'état local pour stocker les données des moteurs
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {

    // Utilisation de useEffect pour effectuer une requête lors du chargement du composant
    const getDonneesMoteurs = async () => {

      // Appel de la fonction fetchAffichage pour récupérer les données des moteurs
      const moteursData = await fetchAffichage('priseEnCharge', id);

      // Mise à jour de l'état local avec les données récupérées
      setDonnees(moteursData);
    };

    // Appel de la fonction pour récupérer les données des moteurs
    getDonneesMoteurs();
  }, []);

  // Filtrage des étapes non valides à partir des données des moteurs
  const etapesNonValides = donnees.filter((item) => item.valide !== 1);

  return (
    <div className="EntretiensMoteurs">
      <h4>Etapes moteur</h4>
      {etapesNonValides.map((item, index) => (
        <div key={index} className={`EntretiensMoteurs ${item.idENTRETIEN}`}>
  
          {/* Affichage des informations de l'étape */}
          <p>{item.etape}</p>
          <p>{item.reference}</p>
          <p>Quantité : {item.quantite}</p>
          
          {/* Demande de confirmation avant de valider l'étape */}
          <button onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir valider cette étape ?')) {
              ValiderEtapes(item.idENTRETIEN);
            }
          }}
          className="ButtonEntretien">Valider</button>
        </div>
      ))}
    </div>
  );
  
}

export default EtapeMoteurs;
