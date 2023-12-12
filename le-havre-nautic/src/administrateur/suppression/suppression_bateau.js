import React, { useState, useEffect } from 'react';


import { CreationTableau } from '../../components/creationTableauGeneral';
import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import { API_Suppression_General } from '../../components/fonctionsAPI/SuppressionAPI';

import headerBateaux from '../../components/JSONInformationsElements/ajoutBateauxDonnees.json'

import '../../styles/ajout.css'
import '../../styles/connexion.css'

function SuppressionBateaux() {
  // Etat local qui permet à l'affichage du bouton suppression
  const [showDeleteButton] = useState(true);
  // Etat local de stockage des données
  const [bateaux, setBateaux] = useState([]);
// Affichage des données bateaux
  async function getBateaux() {
    const bateauxData = await fetchAffichage('Bateaux');
    setBateaux(bateauxData);
  }
  // Appel de la fonction de suppression générique
  async function API_Suppression(id) {
    await API_Suppression_General('Bateaux', id);
  }
  
  useEffect(() => {
    getBateaux(); // Appel initial pour charger les données des bateaux
  }, []);
  
  // filtre des données à afficher dans les titres tableau
const headers = headerBateaux.filter((bateaux) => bateaux.label !== 'Numéro de série'
                                              && bateaux.label !== 'Gamme bateau') ;

  return (
    <div>
    <h2>
        Vente de bateaux
    </h2>
    <table>
      <thead>
        <tr>
        {headers.map(({name, label}) => (
          <th key={name}>{label}</th>
        ))}
        </tr>
      </thead>
      <tbody>
      {bateaux.filter(bateaux => bateaux.gamme !== 'aucun bateau').map((element, index) => (
        <CreationTableau 
                    id={element.idBATEAUX}
                    fournisseur_bateau_nom={element.fournisseur_bateau_nom || 'Aucune donnée'}
                    gamme={element.gamme || 'Aucune donnée'}
                    immatriculation={element.immatriculation || 'Aucune donnée'}
                    annee={element.annee || 'Aucune donnée'}
                    longueur_coque={element.longueur_coque || 'Aucune donnée'}
                    largeur_bau={element.largeur_bau || 'Aucune donnée'}
                    tirant_air={element.tirant_air || 'Aucune donnée'}
                    tirant_eau={element.tirant_eau || 'Aucune donnée'}
                    cabine={element.cabine || 'Aucune donnée'}
                    couchette={element.couchette || 'Aucune donnée'}
                    fournisseur_moteur_nom={element.fournisseur_moteur_nom || 'Aucune donnée'}
                    moteur_nom={element.moteur_nom}
                    moteur_gamme={element.moteur_gamme}
                    etat={element.etat || 'Aucune donnée'}
                    prix={element.prix || 'Aucune donnée'}
                    API_Suppression={API_Suppression}
                    elementSuppression={'bateau'}
                    showDeleteButton={showDeleteButton}
            />
          ))}
      </tbody>
    </table>
    </div>
  );
}

export default SuppressionBateaux
