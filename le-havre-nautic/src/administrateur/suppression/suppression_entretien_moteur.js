import React, { useState, useEffect } from 'react';

import EntretienTable from '../../components/entretienTable';
import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import '../../styles/ajout.css';
import '../../styles/connexion.css';


function SuppressionEntretienMoteurs() {

  // Etat local qui permet à l'affichage du bouton suppression
  const [showDeleteButton] = useState(true);

  // Etat local de stockage des données
  const [donnees, setDonnees] = useState([]);
  const [, setEntretiens] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState([]);
  const [fournisseurNomSelectionne, setFournisseurNomSelectionne] = useState('');

// Fonction qui permet d'afficher les moteurs en fonctions des fournisseurs sélectionnés
  const handleFournisseurChange = async (event) => {
    const fournisseur_nom = event.target.value;
    setFournisseurNomSelectionne(fournisseur_nom);
  };
  
  // Affichage des entretiens moteurs
  useEffect(() => {
    const getMenuEntretien = async () => {
      if (fournisseurNomSelectionne) {
        const menuData = await fetchAffichage('Menu', fournisseurNomSelectionne);
        setSelectedEngine(menuData);
        setEntretiens(menuData);
      }
    };
    getMenuEntretien();
  }, [fournisseurNomSelectionne]);

  // affichage des fournisseurs
  useEffect(() => {
    const getMenu = async () => {
      const menuData = await fetchAffichage('Menu');
      setDonnees(menuData);
    };
  getMenu();
  }, []);



  return (
    <div>
      <figure className="ficheAjoutAppareil">
        <h2>Suppression d'étapes</h2>
        <select onChange={handleFournisseurChange}>
          <option value="">-- Sélectionnez un fournisseur --</option>
          {donnees.map((engine) => (
            <option key={engine.fournisseur_nom} value={engine.fournisseur_nom}>
              {engine.fournisseur_nom}
            </option>
          ))}
        </select>
      </figure>
      <EntretienTable
        selectedEngine={selectedEngine}
        showDeleteButton={showDeleteButton}
             />
    </div>
  );
}

export default SuppressionEntretienMoteurs;