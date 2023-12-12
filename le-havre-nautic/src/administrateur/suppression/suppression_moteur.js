import React, { useState, useEffect } from 'react';

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import { CreationTableau } from '../../components/creationTableauGeneral';
import { API_Suppression_General } from '../../components/fonctionsAPI/SuppressionAPI';

import headerMoteurs from '../../components/JSONInformationsElements/ajoutMoteursDonnees.json'

import '../../styles/ajout.css'
import '../../styles/connexion.css'

function SuppressionMoteurs() {

  // Etat local à l'affichage du bouton de suppression
  const [showDeleteButton] = useState(true)
  
  // Etat local au stockage des données
  const [moteurs, setMoteurs] = useState([]);

// Appel de la fonction générique de suppression
  async function API_Suppression(id) {
    await API_Suppression_General('Moteur', id);
  }

// Affichage des données moteurs    
  useEffect(() => {
    const getMoteurs = async () => {
      const moteursData = await fetchAffichage('Moteurs');
      setMoteurs(moteursData);
    };
    getMoteurs();
  }, []);



  return (
    <div>
      <h2>Suppression d'un moteur</h2>
      <table>
        <thead>
          <tr>
          {headerMoteurs.map(({name, label}) => (
            <th key={name}>{label}</th>
          ))}
          </tr>
        </thead>
        <tbody>
        {moteurs.map((element, index) => (
          <CreationTableau 
            id={element.idMOTEURS}
            fournisseur_moteur_nom={element.fournisseur_moteur_nom || 'Aucune donnée'}
            moteur_nom={element.moteur_nom}
            moteur_gamme={element.moteur_gamme}
            annee_utilisation={element.annee_utilisation || 'Aucune donnée'}
            annee={element.annee || 'Aucune donnée'}
            puissance={element.puissance || 'Aucune donnée'}
            poids={element.poids || 'Aucune donnée'}
            bruit={element.bruit || 'Aucune donnée'}
            taxe={element.taxe || 'Aucune donnée'}
            reference={element.reference || 'Aucune donnée'}
            numero_serie={element.numero_serie || 'Aucune donnée'}
            etat={element.etat  || 'Aucune donnée'}
            prix={element.prix || 'Aucune donnée'}
            elementSuppression={'moteur'}
            API_Suppression={API_Suppression}
            showDeleteButton={showDeleteButton}
          />
        ))}
        </tbody>
      </table>
      </div>
  )
}

export default SuppressionMoteurs
