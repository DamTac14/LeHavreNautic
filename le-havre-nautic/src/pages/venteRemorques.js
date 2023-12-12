import React, { useEffect, useState } from "react";
import { CreationTableau } from "../components/creationTableauGeneral";
import headerRemorques from "../components/JSONInformationsElements/ajoutRemorquesDonnees.json"
import { fetchAffichage } from "../components/fonctionsAPI/AffichageAPI";
import "../styles/Tableaux.css";

function PageRemorques() {
  // Gestion des états grâce à useState
  const [remorques, setDonnees] = useState([]);
  // Gestion de l'apparition du bouton de suppression
  const [showDeleteButton] = useState(false)

// useEffect afin d'afficher les remorques
  useEffect(() => {
    const getRemorques = async () => {
      const remorquesData = await fetchAffichage('Remorques');
      setDonnees(remorquesData);
    };
    getRemorques();
  }, []);

  // Filtre de la feuille JSON qui permet d'afficher les éléments de titre du tableau
const headers = headerRemorques.filter((remorques) => remorques.label !== 'Supprimer') ;

  return (
    <div>
    <h2>
        Vente de remorques
    </h2>
    <table>
        <thead>
    <tr>
    {headers.map(({name, label}) => (
      <th key={name}>{label}</th>
      ))}
      </tr>
      </thead>
      {/*Parcours des données stockés dans la base afin d'afficher les remorques avec un filtre qui permet de
        trier celles qui n'ont aucun prix sachant que cette page est dédiée à la vente */}
        <tbody>
        {remorques.filter(remorque => remorque.prix !== null && remorque.prix !== 0).map((element, index) => (
          <CreationTableau 
            id={element.idREMORQUES}
            marque={element.marque || 'Aucune donnée'}
            nom={element.nom || 'Aucune donnée'}
            immatriculation={element.immatriculation || 'Aucune donnée'}
            ptac={element.ptac || 'Aucune donnée'}
            charge={element.charge || 'Aucune donnée'}
            largeur={element.largeur || 'Aucune donnée'}
            longueur={element.longueur || 'Aucune donnée'}
            resistance={element.resistance || 'Aucune donnée'}
            tete={element.tete || 'Aucune donnée'}
            chassis={element.chassis || 'Aucune donnée'}
            roues={element.roues || 'Aucune donnée'}
            etat={element.etat  || 'Aucune donnée'}
            prix={element.prix || 'Aucune donnée'}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default PageRemorques;