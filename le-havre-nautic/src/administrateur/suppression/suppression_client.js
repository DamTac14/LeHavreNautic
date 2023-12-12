import React, { useState, useEffect } from 'react';

import { CreationTableau } from '../../components/creationTableauGeneral';
import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import { API_Suppression_General } from '../../components/fonctionsAPI/SuppressionAPI';

import headerClients from '../../components/JSONInformationsElements/ajoutClientDonnees.json'
import headerClientsAppareil from '../../components/JSONInformationsElements/rechercheClientInformations.json'


import '../../styles/ajout.css'
import '../../styles/connexion.css'

function SuppressionClient() {
    // Etat local qui permet à l'affichage du bouton suppression
  const [showDeleteButton] = useState(true);

    // Etat local de stockage des données
  const [clients, setClients] = useState([]);

  // Appel de la fonction de suppression
  async function API_Suppression(id) {
    await API_Suppression_General('Clients', id);
  }

// Affichage des données clients
  useEffect(() => {
    const getClients = async () => {
      const clientsData = await fetchAffichage('rechercheDeClient');
      setClients(clientsData);
    };
    getClients();
  }, []);


  return (
    <div>
      <h2>Suppression d'un client</h2>
      <table>
        <thead>
          <tr>
          {headerClients.map(({name, label}) => (
            <th key={name}>{label}</th>
          ))}
          {headerClientsAppareil.map(({name, label}) => (
            <th key={name}>{label}</th>
          ))}
          </tr>
        </thead>
        <tbody>
        {clients.map((element) => (
          <CreationTableau 
            id={element.idCLIENTS} 
            nom={element.nom || 'Aucune donnée'}
            prenom={element.prenom || 'Aucune donnée'}
            mail={element.mail || 'Aucune donnée'}
            telephone={element.telephone || 'Aucune donnée'}
            fournisseur_bateau_nom={element.fournisseur_bateau_nom || 'Aucune donnée'}
            gamme={element.gamme || 'Aucune donnée'}
            bateau_nom={element.bateau_nom || 'Aucune donnée'}
            fournisseur_moteur_nom={element.fournisseur_moteur_nom || 'Aucune donnée'}
            moteur_nom={element.moteur_nom || 'Aucune donnée'}
            place_portuaire={element.place_portuaire || 'Aucune donnée'}
            date_entree={element.date_entree || 'Aucune donnée'}
            date_sortie={element.date_sortie || 'Aucune donnée'}
            elementSuppression={'client'}
            API_Suppression={API_Suppression}
            showDeleteButton={showDeleteButton} 
          />
        ))}
        </tbody>
      </table>
      
      </div>
  )
}

export default SuppressionClient;
