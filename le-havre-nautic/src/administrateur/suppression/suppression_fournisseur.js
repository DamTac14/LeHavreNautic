import React, { useState, useEffect } from 'react';
import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import { CreationTableau } from '../../components/creationTableauGeneral';

import { API_Suppression_General } from '../../components/fonctionsAPI/SuppressionAPI';

import '../../styles/ajout.css'
import '../../styles/connexion.css'

function SuppressionFournisseur() {
// Etat local qui permet à l'affichage du bouton suppression
  const [showDeleteButton] = useState(true)
// Etat local de stockage des données
  const [fournisseurs, setFournisseurs] = useState([]);

  // Filtre pour ne pas afficher le fournisseur "none" qui sert pour différentes raison dans différents affichages lors de suppression
  var fournisseursFiltrees = fournisseurs.filter((element) => element.nom !== 'none')

  // Appel de la fonction de suppression
  async function API_Suppression(id) {
      await API_Suppression_General('Fournisseur', id);
  }

  // Affichage des données des fournisseurs
  useEffect(() => {
    const getFournisseur = async () => {
      const fournisseursData = await fetchAffichage('fournisseurs');
      setFournisseurs(fournisseursData);
    };
    getFournisseur();
  }, []);
  

  return (
    <div>
      <h2>Suppression d'un fournisseur</h2>
      <table>
        <thead>
          <tr>
            <th>Nom du fournisseur</th>
            <th>Appareil lié</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>       
        {fournisseursFiltrees.map((element) => (
          <CreationTableau 
            id={element.idFOURNISSEUR}
            nom={element.nom}
            type={element.type}
            elementSuppression={'fournisseur'}
            API_Suppression={API_Suppression}
            showDeleteButton={showDeleteButton}
          />
        ))}
        </tbody>
      </table>
      </div>
  )
}

export default SuppressionFournisseur
