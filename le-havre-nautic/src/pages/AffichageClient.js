import React, { useState, useEffect } from 'react';
import { CreationTableau } from '../components/creationTableauGeneral';

import { fetchAffichage } from '../components/fonctionsAPI/AffichageAPI';
import headerClients from '../components/JSONInformationsElements/ajoutClientDonnees.json';
import headerClientsAppareils from '../components/JSONInformationsElements/rechercheClientInformations.json'

function Client() {
  // useState qui permet de stocker les données et donner l'état du bouton supprimer sur false afin qu'il ne s'affiche pas 
  const [showDeleteButton] = useState(false);
  const [donnees, setDonnees] = useState([]);

// Filtrage qui permet d'enlever le titre supprimer du tableau
  const headerAppareil = headerClientsAppareils.filter((element) => element.label !== 'Supprimer')


  useEffect(() => {
    const getClients = async () => {
      const clientsData = await fetchAffichage('rechercheDeClient');
      setDonnees(clientsData);
    };
    getClients();
  }, []);

  return (
  <>
    <h2>Recherche de client</h2>
      <div className="recherche-wrapper">
        <table>
          <thead>
          {/*
        
            Nous parcourons les feuilles JSON qui permettent de générer les titres de tableau afin de récupérer les titres clients et ceux des appareils

        */}
            <tr>
              {headerClients.map(({name, label}) => (
                <th key={name}>{label}</th>
              ))}
              {headerAppareil.map(({name, label}) => (
                <th key={name}>{label}</th>
              ))}
            </tr>
          </thead>

          {/*

          Parcours des données clients, ici s'il n'y a aucune donnée dans la base de données, alors on affiche un message 'Aucun donnée' 
          grâce à une condition de vérification        
        
        */}
          <tbody>
          {donnees.map((element) => (
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
              showDeleteButton={showDeleteButton} 
            />
          ))}
          </tbody>
        </table>
      </div>
  </>
                          );
}

export default Client;









/* const filteredData = searchValue.length > 0
    ? donnees.filter((user) => {
        const nom = user.nom.toLowerCase();
        const prenom = user.prenom.toLowerCase();
        const nomComplet = `${nom}${prenom}`;
        const nomCompletInverse = `${prenom}${nom}`;
        return nomComplet.includes(searchValue)
          || nomCompletInverse.includes(searchValue)
          || nom.includes(searchValue)
          || prenom.includes(searchValue);
      })
    : [];
    const boutonSuppression = () => {
      setSearchValue('');
    };    

          <input
        type="text"
        id="rechercheClient"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Nom client"
      />
      {searchValue.length > 0 && (
        <button className="supprButton" 
        onClick={() => boutonSuppression("")}>
          X
        </button>
      )}

      
  const handleSearchChange = (event) => {
    const client = event.target.value.toLowerCase().trim();
    setSearchValue(client);
  };
    */