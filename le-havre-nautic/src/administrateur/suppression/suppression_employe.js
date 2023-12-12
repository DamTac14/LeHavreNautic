import React, { useState, useEffect } from 'react';

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import { CreationTableau } from '../../components/creationTableauGeneral';
import { API_Suppression_General } from '../../components/fonctionsAPI/SuppressionAPI';

import '../../styles/ajout.css'
import '../../styles/connexion.css'

function SuppressionEmployes() {
// Etat local qui permet à l'affichage du bouton suppression
  const [showDeleteButton] = useState(true);
  // Etat local de stockage des données
  const [employe, setEmploye] = useState([]);
  

// Appel de la fonction de suppression générique
  async function API_Suppression(id) {
    await API_Suppression_General('Employes', id);
  }

// Affichage des données employées
  useEffect(() => {
    const getEmployes = async () => {
      const employesData = await fetchAffichage('employes');
      setEmploye(employesData);
    };
    getEmployes();
  }, []);

  const employeFiltre = employe.filter((element) => element.nom !== 'Di Gregorio')

  return (
    <div>
      <h2>Suppression d'un(e) employé(e)</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
        {employeFiltre.map((element, index) => (
          <CreationTableau 
            id={element.idEMPLOYE}
            nom={element.nom}
            prenom={element.prenom}
            elementSuppression={'employé'}
            API_Suppression={API_Suppression}
            showDeleteButton={showDeleteButton}
          />
        )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SuppressionEmployes
