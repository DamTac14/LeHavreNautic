import React, { useState, useEffect } from 'react';

import { fetchAffichage } from './fonctionsAPI/AffichageAPI';

function ListeEmploye() {
  // Etat local de stockage des données
  const [employe, setEmploye] = useState([]);

  // Affichage des données employées
  useEffect(() => {
    const getEmployes = async () => {
      const employesData = await fetchAffichage('employes');
      setEmploye(employesData);
    };
    getEmployes();
  }, []);
  
  return (
    <>
    {employe.map((element, index) => (
        <tr>
            <td>{element.nom}</td>
            <td>{element.prenom}</td>
            <td>{element.mail}</td>
            <td>{element.telephone}</td>
        </tr>
      )
        )}
    </>
  )
}

export default ListeEmploye