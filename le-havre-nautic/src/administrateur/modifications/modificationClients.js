import React, { useState, useEffect } from 'react';

import FormulaireGlobal from '../../components/Formulaire'

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import ajoutClientDonnees from '../../components/JSONInformationsElements/ajoutClientDonnees.json';

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';
import '../../styles/ajout.css'

function ModificationClient() {

  // UseState des données à stocker pour l'affichage
const [bateaux, setBateaux] = useState([]);
const [moteurs, setMoteurs] = useState([]);
const [clients, setClients] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [selectedClientId, setSelectedClientId] = useState('');
const [currentMoteur, setCurrentMoteur] = useState('');

// Filtre des données clients pour le formulaire
const clientsForm = ajoutClientDonnees.filter((element) => element.label !== 'Supprimer')

// Filtre des données bateau pour le formulaire

const bateauxForm = bateaux.filter((element) => element.gamme !== 'aucun bateau' 
                                                && element.prix !== null
                                                || element.lier_client_vente !== 0
                                                )

// Filtre des données moteurs pour le formulaire

const moteursForm = moteurs.filter((element) => element.lier_bateau_vente !== 0 
                                              && element.moteur_nom !== 'aucun moteur')

// Affichage des données clients stockées en base de données
  useEffect(() => {
    const getClients = async () => {
      const clientsData = await fetchAffichage('rechercheDeClient');
      setClients(clientsData);
    };
    getClients();
  }, []);


  var handleClick = (id) => {
// Récupération des valeurs côté navigateur
    // CLIENT
 const {
    value: nom_client,
  } = document.getElementById('nom_client')
  const {
    value: prenom_client,
  } = document.getElementById('prenom_client')
  const {
    value: mail_client,
  } = document.getElementById('mail_client')
  const {
    value: telephone_client,
  } = document.getElementById('telephone_client')
  const {
    value: place_portuaire_client,
  } = document.getElementById('emplacement_portuaire_client')
  const {
    value: idBATEAUX,
  } = document.getElementById('idBATEAUX_client')
  const {
    value: idMOTEURS,
  } = document.getElementById('idMOTEURS_client')
  const {
    value: ancienMoteur,
  } = currentMoteur


// Données à envoyer vers le serveur
  const donnees_a_ajouter = {
    // CLIENT
    nom_client,
    prenom_client,
    mail_client,
    telephone_client,
    place_portuaire_client,

    // BATEAU
    idBATEAUX,

    // MOTEUR
    idMOTEURS,
    ancienMoteur
    }
// Condition pour pousser l'utilisateur à choisir un client
      if(selectedClientId === '') {
        
        const messageElement = document.getElementById("message");
        messageElement.classList.add("error");
        messageElement.innerHTML = 'Vous devez sélectionner un client'  

            } else {
        // Appel de la fonction ajouterDonneesGlobales avec les paramètres
        AjoutGlobal(donnees_a_ajouter, 'client', 'ModificationClient', 'PUT', id);
      }
  };

// Affichage des bateaux
  useEffect(() => {
    const getBateaux = async () => {
    const bateauxData = await fetchAffichage('bateaux');
        setBateaux(bateauxData);
        };
    getBateaux();
}, []);


// Affichagée des moteurs
useEffect(() => {
  const getMoteurs = async () => {
  const moteursData = await fetchAffichage('Moteurs');
      setMoteurs(moteursData);
      };
      getMoteurs();
}, []);


// Filtre permettant l'affichage des clients dans le select et de pouvoir écrire pour les retrouver facilement
const filteredClients = clients.filter((client) =>
`${client.nom} ${client.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
);

// Fonction de récupération d'id client et d'id moteur
async function handleClientChange (event) {
  const selectedValue = event.target.value;

  const [clientId, moteurId] = selectedValue.split('-');

  setSelectedClientId(clientId);
  setCurrentMoteur(moteurId);
};

    return(
<figure className="ficheAjoutClient">
            <h2>Modification client</h2>

            <h3>Informations client</h3>

            <select id="client" onChange={handleClientChange}>
                <option>-- Sélectionnez un client * --</option>

                <input
                  type="text"
                  placeholder="Rechercher un client"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {filteredClients.map((client) => (
                  <option
                    key={client.idCLIENTS}
                    value={`${client.idCLIENTS}-${client.idMOTEURS}`}
                  >
                    {client.nom} {client.prenom}
                  </option>
                ))}
                

          </select>

            <FormulaireGlobal 
                inputs={clientsForm}
            />

            <select id='idBATEAUX_client'>
              <option value="">----------- Sélectionnez un bateau ** ----------</option>
                {bateauxForm.map((client) => (
                  <option key={client.idBATEAUX} value={`${client.idBATEAUX}`}>
                  {client.immatriculation} {client.fournisseur_bateau_nom} {client.gamme}
                  </option>
                ))}
            </select>

          <select id='idMOTEURS_client'>

            <option value="">-- Sélectionnez un moteur ** --</option>

          {moteursForm.map((client) => (
            <option key={client.idMOTEURS} value={`${client.idMOTEURS}`}>
            {client.fournisseur_moteur_nom} {client.moteur_nom} 
            </option>
          ))}

        </select>

        <p id="message"> </p>

        <p id='periodeMessage'>
        * Vous pouvez écrire le nom du client lorsque vous avez ouvert la liste déroulante pour le trouver

        <br></br>** Si vous ne voulez pas changer le bateau ou le moteur, veuillez ne rien sélectionner</p>
        
        
            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton EnvoiButton"  
                    onClick={() => handleClick(selectedClientId)}>
                    MODIFIER
            </button>
            
</figure>
    );
}

export default ModificationClient