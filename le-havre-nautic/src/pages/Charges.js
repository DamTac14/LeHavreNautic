import React, { useEffect, useState } from "react";

import EtapesList from "../components/EtapeLists";
import EtapeMoteurs from "../components/EtapesMoteurs";

import priseEnChargeHeader from '../components/JSONInformationsElements/priseEnCharge.json'

import { fetchAffichage } from "../components/fonctionsAPI/AffichageAPI";

import "../styles/progress.css";
import "../styles/button.css";
import '../styles/Entretiens.css';


  function Charges() {

    // useState et variables de stockages de donnée afin d'être réutilisé pour les affichages
    const [donnees, setDonnees] = useState([]);
    const [etapesAffichees, setEtapesAffichees] = useState([]);
    const headers = priseEnChargeHeader
  

    // Fonction qui permettra d'afficher les étapes ou les cacher
    const BoutonAffichageEtapes = (index) => {
      setEtapesAffichees((etapesAffichees) => {
        const newEtapesAffichees = [...etapesAffichees];
        newEtapesAffichees[index] = !newEtapesAffichees[index];
        return newEtapesAffichees;
      });
    };


    // Filtrage des données en mettant une condition au niveau des dates afin de ne pas afficher tout le tableau de conformité de la base de données
    var donneesFiltre = donnees.filter((element) => {
    
      const condition = element.date_entree > element.date_sortie || element.date_sortie === null;
    
      return condition;
    });

    
    // useEffect qui permet l'affichage des données contenues dans la prise en charge
    useEffect(() => {
      const getClients = async () => {
        const priseEnChargeData = await fetchAffichage('priseEnCharge');
        setDonnees(priseEnChargeData);
        setEtapesAffichees(new Array(priseEnChargeData.length).fill(false));
      };
      getClients();
    }, []);

    

    return (
      <div>
        <h2>Appareils pris en charge</h2>
        <table>
          <thead>
            <tr>
            {headers.map(({name, label}) => (
              <th key={name}>{label}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {donneesFiltre.map((item, index) => (
              <tr className="rechercher_moteur" key={index} id={item.idCLIENTS}>
                <td>{item.nom}</td>
                <td> {item.prenom}</td>
                <td>{item.fournisseur_bateau_nom} {item.gamme}</td>
                <td>{item.immatriculation}</td>
                <td>{item.fournisseur_moteur_nom} {item.moteur_nom}</td>
                <td>{item.numero_serie}</td>
                <td>{new Date (item.date_entree).toLocaleDateString()}</td>
                <td>{item.commentaire}</td>
                <td>                
                {/*
                
              Affichage des étapes en les masquant ou affichage grâce à la fonction BoutonAffichageEtapes
              
              */}
                <EtapesList idMOTEURS={item.idMOTEURS}
                            idCLIENTS={item.idCLIENTS}/>
                  <button onClick={() => BoutonAffichageEtapes(index)} className="buttonEtapes">

                    {etapesAffichees[index] ? 'Cacher les étapes' : 'Afficher les étapes'}

                  </button>

                  {etapesAffichees[index] && (

                    <EtapeMoteurs id={item.idMOTEURS}
                   />)}
                    
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default Charges