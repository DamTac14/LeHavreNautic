import React, { useEffect, useState } from 'react';


import { fetchAffichage } from '../components/fonctionsAPI/AffichageAPI';
import { AjoutGlobal } from '../components/fonctionsAPI/AjoutFetch';

import "../styles/ajout.css"
  
function Cart() {
    // Gestion des états grâce à useState
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect afin d'afficher les clients

    useEffect(() => {
      const getClients = async () => {
        const clientsData = await fetchAffichage('rechercheDeClient');
        setClients(clientsData);
      };
      getClients();
    }, []);
    
    // Gestion d'état pour récupérer les commentaires
    const [texteTextarea, setTexteTextarea] = useState('');

    const handleTextareaChange = (event) => {
      setTexteTextarea(event.target.value);
    };

// Fonction liée au bouton qui enverra les données vers la conformité attendue du côté back end 
        var handleClick = () => {
          const selectedValue = document.getElementById('client').value;
          let idCLIENTS, idMOTEURS;
          
          // Split qui permet à la recherche et la récupération l'idMOTEURS et l'idCLIENTS
          selectedValue.split('-').forEach((value, index) => {
            if (index === 0) {
              idMOTEURS = value;
            } else if (index === 1) {
              idCLIENTS = value;
            }
          });

          // Attribution des commentaires récupérés à une variable qui permettra à l'envoi des données JSON
          const commentaire = texteTextarea
          var date_entree = new Date()
          const periode = document.getElementById('periode').value

          // Déclaration des données
        let data = {
            idCLIENTS:idCLIENTS,
            date_entree:date_entree,
            commentaire:commentaire,

            idMOTEURS:idMOTEURS,
            periode:periode
        }
        // Appel de la fonction générique 
        AjoutGlobal(data, 'conformité', 'conformiteUpdate', 'POST')
    }
// Filtre d'affichage des clients dans la barre de select avec leur no met prénom pour pouvoir également les rechercher plus facilement
    const filteredClients = clients.filter((client) =>
    `${client.nom} ${client.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleClientChange = (event) => {
    const selectedValue = event.target.value;
    // Gérer la sélection du client
  };
    
    return (
      <div>
      <h2>Vérification avant prise en charge</h2>
      <table>
      <thead>
          <tr>
              <th colSpan="3">CLIENT</th>
          </tr>
      </thead>
      <tbody>

      {/*

      Select déroulant qui permet d'afficher les clients et de pouvoir en sélectionner un en écrivant son nom 
      et ainsi pouvoir récupérer son identifiant client ainsi que l'identifiant moteur qui lui appartient 
    
    */}
          <tr className='client'>
          <td colSpan={3}>
          <select id="client" onChange={handleClientChange}>
          <option value="">-- Sélectionnez un client * --</option>
          <input
            type="text"
            placeholder="Rechercher un client"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredClients.map((client) => (
            <option key={client.idCLIENTS} value={`${client.idMOTEURS}-${client.idCLIENTS}`}>
              {client.nom} {client.prenom}
            </option>
          ))}
        </select>


            {/*
          
              Choix de l'entretien moteur à faire afin de savoir quelles sont les étapes qui seront à faire 
              lors de la prise en charge de l'appareil
          
          */}
        <select id='periode'>
          <option value="">-- Choisir une periode entretien moteur ** --</option>
          
            <option
              value={'2'}
            >
            2 ans / 200 heures
            </option>

            <option
            value={'3'}
            >
            3 ans / 300 heures
            </option>
          
            <option
            value={'5'}
            >
            5 ans / 500 heures
            </option>
      </select>
        
      </td>
          </tr>
      </tbody>
          {/*

          Section d'ajout des commentaires qui seront affichés dans la page de prise en charge

          */}
      <thead>
          <tr>
              <th colSpan="3">COMMENTAIRES</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td colSpan="3">
                  <textarea rows="10" 
                            cols="50" 
                            value={texteTextarea} 
                            onChange={handleTextareaChange} />
              </td>
          </tr>
      </tbody>
      <thead>
          </thead>
          <tbody>
          <tr>
          <td colSpan="3">
          <p id='message'> </p>
                <p id='periodeMessage'>
                * Vous pouvez écrire le nom du client lorsque vous avez ouvert la liste déroulante pour le trouver
                
                <br></br><br></br>** Par défaut la période d'un an sera mise à jour avec la période sélectionnée, <br></br>veuillez ne rien sélectionner si c'est celle que vous voulez ajouter à la prise en charge</p>

                    <button type="submit" 
                    className='EnvoiButton ConnexionButton' 
                    onClick={handleClick}>Envoyer</button>

                </td>
            </tr>
      </tbody>
  </table>
  </div>
          )
    }

    export default Cart