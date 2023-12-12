import React, { useEffect, useState } from "react";
import { fetchAffichage } from "./fonctionsAPI/AffichageAPI";
import { AjoutGlobal } from "./fonctionsAPI/AjoutFetch";
import { fetchIsAdmin } from "./fonctionsAPI/AccesAdmin";

function EtapesList({ idMOTEURS, idCLIENTS }) {
  const [etapes, setEtapes] = useState([]);
  const [etapesTerminees, setEtapesTerminees] = useState(0);
  const [EtapesCompletes, setEtapesCompletes] = useState(0);

  // Récupération par le serveur si l'utilisateur est un administrateur
  const [isAdmin, setIsAdmin] = useState([])
  fetchIsAdmin().then((isAdmin) => setIsAdmin(isAdmin));


  var handleClick = (id) => {
    const date_sortie = new Date().toISOString()
    const idCLIENTS = id;

    // le json des données à ajouter 
    let donnees_a_ajouter = {
      idCLIENTS, 
      date_sortie
    };
    AjoutGlobal(donnees_a_ajouter, 'réparation', 'finReparation', 'POST')

    if (id) {
      // Si vous avez l'ID de l'élément à valider, vous pouvez le cibler spécifiquement
      const element = document.getElementById(id);
      if (element) {
        // Mettez à jour le style de l'élément pour le masquer
        element.style.display = 'none';
      }
    } 
  }

  useEffect(() => {
    // Récupérer les données des étapes du moteur lors du montage du composant ou lorsque l'idMOTEURS change
    const getDonneesMoteurs = async () => {
      const moteursData = await fetchAffichage('priseEnCharge', idMOTEURS);
      setEtapes(moteursData);
    };
    getDonneesMoteurs();
  }, [idMOTEURS]);



  useEffect(() => {
    // Calculer le nombre d'étapes terminées lorsque les données des étapes changent
    let count = 0;
    etapes.forEach((etape) => {
      // Condition afin d'ajouter les étapes valides
      if (etape.valide === 1) {
        count += 1;
      }
    });
    setEtapesTerminees(count);

    // Cette ligne permet d'intégrer le nombre d'étapes complètes & le nombre d'étapes validées afin de faire la comparaison
    // & ainsi faire apparaître le bouton qui valide la fin des réparations
    setEtapesCompletes(count === etapes.length);
  }, [etapes]);

  // Calcul de progression afin que peu importe la liste cela concorde avec la valeur attendue dans la barre de progression
  const progress = (etapesTerminees / etapes.length) * 100;
  return (
    <div>
      <p>Avancée du moteur</p>
      <progress value={progress} max="100"></progress>
      {isAdmin && EtapesCompletes && (
        <div>
          <button
            className="buttonFinal"
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir terminer les réparations ?')) {
                handleClick(idCLIENTS);
              }
            }}
          >
            Fin des réparations
          </button>
        </div>
      )}
    </div>
  );
}  

export default EtapesList;
