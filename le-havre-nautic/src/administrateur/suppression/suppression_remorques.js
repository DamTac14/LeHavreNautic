import React, { useState, useEffect } from 'react';

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import { CreationTableau } from '../../components/creationTableauGeneral';
import { API_Suppression_General } from '../../components/fonctionsAPI/SuppressionAPI';

import headerRemorques from "../../components/JSONInformationsElements/ajoutRemorquesDonnees.json"

import '../../styles/ajout.css'
import '../../styles/connexion.css'

function SuppressionRemorques() {
// Etat local qui permet à l'affichage du bouton suppression
  const [showDeleteButton] = useState(true)
// Etat local de stockage des données
  const [remorques, setRemorques] = useState([]);

  // Appel de la fonction de suppression générique
  async function API_Suppression(id) {
    await API_Suppression_General('Remorque', id);
}
  
  // Affichage des remorques
  useEffect(() => {
    const getRemorques = async () => {
      const remorquesData = await fetchAffichage('Remorques');
      setRemorques(remorquesData);
    };
    getRemorques();
  }, []);

  
  return (
    <div>
      <h2>Suppression d'une remorque</h2>
      <table>
        <thead>
          <tr>
          {headerRemorques.map(({name, label}) => (
            <th key={name}>{label}</th>
          ))}
          </tr>
        </thead>
        <tbody>
        {remorques.map((element, index) => (
          <CreationTableau 
            id={element.idREMORQUES}
            marque={element.marque || 'Aucune donnée'}
            nom={element.nom || 'Aucune donnée'}
            ptac={element.ptac || 'Aucune donnée'}
            reference={element.reference || 'Aucune donnée'}
            charge={element.charge || 'Aucune donnée'}
            largeur={element.largeur || 'Aucune donnée'}
            longueur={element.longueur || 'Aucune donnée'}
            resistance={element.resistance || 'Aucune donnée'}
            tete={element.tete || 'Aucune donnée'}
            chassis={element.chassis || 'Aucune donnée'}
            roues={element.roues || 'Aucune donnée'}
            etat={element.etat  || 'Aucune donnée'}
            prix={element.prix || 'Aucune donnée'}
            elementSuppression={'remorque'}
            showDeleteButton={showDeleteButton}
            API_Suppression={API_Suppression}
          />
        ))}
        </tbody>
      </table>
      </div>
  )
}

export default SuppressionRemorques
