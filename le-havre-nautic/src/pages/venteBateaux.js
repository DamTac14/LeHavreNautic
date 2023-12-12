import React, { useEffect, useState } from "react";
import { CreationTableau } from "../components/creationTableauGeneral";
import { fetchAffichage } from "../components/fonctionsAPI/AffichageAPI";
import headerBateaux from "../components/JSONInformationsElements/ajoutBateauxDonnees.json"

import "../styles/Tableaux.css";

function PageBateaux() {
    // Gestion des états grâce à useState
  const [bateaux, setBateaux] = useState([]);
    // Gestion de l'apparition du bouton de suppression
  const [showDeleteButton] = useState(false);

// useEffect afin d'afficher les bateaux
  useEffect(() => {
    const getBateaux = async () => {
      const bateauxData = await fetchAffichage('Bateaux');
      setBateaux(bateauxData);
    };
    getBateaux();
  }, []);

    // Filtre de la feuille JSON & les données dans la base qui permet d'afficher les éléments de titre du tableau

  const bateauxFiltres = bateaux.filter((element) => element.prix !== ''
                                                    && element.prix !== null
                                                    && element.prix !== 0.000)
  
   const headers = headerBateaux.filter((bateaux) => bateaux.label !== 'Supprimer' 
                                                  && bateaux.label !== 'Numéro de série'
                                                  && bateaux.label !== 'Gamme bateau'

   ) ;

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
      {/* Parcours des données */}
      {bateauxFiltres.map((element, index) => (
                    <CreationTableau 
                    id={element.idBATEAUX}
                    fournisseur_bateau_nom={element.fournisseur_bateau_nom || 'Aucune donnée'}
                    immatriculation={element.immatriculation || 'Aucune donnée'}
                    gamme={element.gamme}
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
                    showDeleteButton={showDeleteButton}
            />
          ))}
      </tbody>
    </table>
    </div>
  );
}

export default PageBateaux;
