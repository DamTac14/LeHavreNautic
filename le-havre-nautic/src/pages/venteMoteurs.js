import React, { useEffect, useState } from "react";
import { CreationTableau } from "../components/creationTableauGeneral";
import { fetchAffichage } from "../components/fonctionsAPI/AffichageAPI";
import headerMoteurs from "../components/JSONInformationsElements/ajoutMoteursDonnees.json"

import "../styles/Tableaux.css";

function PageMoteurs() {
    // Gestion des états grâce à useState
  const [moteurs, setMoteurs] = useState([]);
    // Gestion de l'apparition du bouton de suppression
  const [showDeleteButton] = useState(false)

  // useEffect afin d'afficher les moteurs

  useEffect(() => {
    const getMoteurs = async () => {
      const moteursData = await fetchAffichage('Moteurs');
      setMoteurs(moteursData);
    };
    getMoteurs();
  }, []);

  // Filtre de la feuille JSON qui permet d'afficher les éléments de titre du tableau

const headers = headerMoteurs.filter((moteur) => moteur.label !== 'Supprimer')

  return (
  <div>
      <h2>
          Vente de moteurs
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
          {moteurs.filter(moteur => moteur.prix !== null && moteur.prix !== 0).map((element, index) => (
              <CreationTableau 
                id={element.idMOTEURS}
                fournisseur_moteur_nom={element.fournisseur_moteur_nom || 'Aucune donnée'}
                moteur_nom={element.moteur_nom}
                moteur_gamme={element.moteur_gamme}
                annee_utilisation={element.annee_utilisation || 'Aucune donnée'}
                numero_serie={element.numero_serie || 'Aucune donnée'}
                annee={element.annee || 'Aucune donnée'}
                puissance={element.puissance || 'Aucune donnée'}
                poids={element.poids || 'Aucune donnée'}
                bruit={element.bruit || 'Aucune donnée'}
                taxe={element.taxe || 'Aucune donnée'}
                reference={element.reference || 'Aucune donnée'}
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

export default PageMoteurs;
