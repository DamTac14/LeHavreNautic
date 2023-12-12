import React, { useState, useEffect } from 'react';

import FormulaireGlobal from '../../components/Formulaire';

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';
import ajoutBateauxDonnees from '../../components/JSONInformationsElements/ajoutBateauxDonnees.json'

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';

import '../../styles/ajout.css'

function AjoutVenteBateau() {

const [fournisseurs, setFournisseurs] = useState([]);
const [moteurs, setMoteurs] = useState([]);

// Filtre des données bateaux pour le formulaire
const BateauxForm = ajoutBateauxDonnees.filter((element) => element.label !== 'Etat'
                                                            && element.label !== 'Supprimer'
                                                            && element.label !== 'Moteur')

    // Affichage des moteurs à lier
useEffect(() => {
    const getMoteurs = async () => {
      const moteursData = await fetchAffichage('Moteurs');
      setMoteurs(moteursData);
    };
    getMoteurs();
  }, []);

  // Affichage des fournisseurs
  useEffect(() => {
    const getFournisseur = async () => {
      const fournisseursData = await fetchAffichage('fournisseurs');
      setFournisseurs(fournisseursData);
    };
    getFournisseur();
  }, []);

  const moteursLies = moteurs.filter(moteur => moteur.lier_bateau_vente !== 0)

  var handleClick = () => {

                      // Récupération des valeurs côté navigateur
                      const {
                        value: FOURNISSEUR_idFOURNISSEUR,
                    } = document.getElementById('fournisseur_bateau')
                    const {
                        value: nom,
                    } = document.getElementById('nom_bateau')
                    const {
                        value: immatriculation,
                        } = document.getElementById('immatriculation_bateau')
                    const {
                        value: numero_serie,
                        } = document.getElementById('numserie_bateau')
                    const {
                        value: longueur,
                    } = document.getElementById('longueur_bateau')
                    const {
                    value: largeur,
                    } = document.getElementById('largeur_bateau')
                    const {
                        value: annee,
                    } = document.getElementById('annee_bateau')
                    const {
                    value: tirant_air,
                    } = document.getElementById('tirant_air_bateau')
                    const {
                        value: tirant_eau,
                    } = document.getElementById('tirant_eau_bateau')
                    const {
                        value: cabines,
                    } = document.getElementById('cabines_bateau')
                    const {
                        value: couchettes,
                    } = document.getElementById('couchettes_bateau')
                    const {
                        value: gamme,
                    } = document.getElementById('gamme_bateau')
                    const {
                        value: etat,
                    } = document.getElementById('etat_bateau')
                    const {
                        value: MOTEURS_idMOTEURS,
                    } = document.getElementById('choix_moteur_bateau')
                    const {
                        value: prix,
                    } = document.getElementById('prix_bateau')

                    

    // le json des données à ajouter 
    const donnees_a_ajouter = {
                            FOURNISSEUR_idFOURNISSEUR,
                            nom,
                            gamme,
                            numero_serie,
                            immatriculation,
                            annee,
                            longueur,
                            largeur,
                            tirant_air,
                            tirant_eau,
                            cabines,
                            couchettes,
                            etat,
                            prix,
                            MOTEURS_idMOTEURS
      };

if (FOURNISSEUR_idFOURNISSEUR === ''
    || MOTEURS_idMOTEURS === '') {
      
      const messageElement = document.getElementById("message");
      messageElement.classList.add("error");
      messageElement.innerHTML = "Il y a une erreur lors de votre opération, vérifiez l'état de vos données";

    } else {
        AjoutGlobal(donnees_a_ajouter, 'bateau', 'ajoutBateau', 'POST')
    }
  }

    return (
        <figure className="ficheAjoutAppareil">

                <h2>Ajout d'un bateau</h2>

            <FormulaireGlobal 
            inputs={BateauxForm} />

            <div>
                <label>
                    <p>Marque du bateau</p>
                </label>

                <select id='fournisseur_bateau'>
                    <option value="">Choisissez un fournisseur</option>
                    
                    {fournisseurs.filter(fournisseur => fournisseur.type === 'bateau').map(fournisseur => (
                    <option key={fournisseur.idFOURNISSEUR} value={fournisseur.idFOURNISSEUR}>{fournisseur.nom} {fournisseur.numero_serie}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>
                    <p>Etat du bateau</p>
                </label>
                    <select id="etat_bateau">
                        <option>Choisissez un état</option>

                        <option value="neuf" selected>Neuf</option>
                        <option value="occasion">Occasion</option>
                    </select>
            </div>
            <div>
                <label>
                    <p>Moteur</p>
                </label>

                <select id="choix_moteur_bateau">
                    <option value="">Choisissez un moteur à rattacher</option>
                    
                    {moteursLies.map((moteur) => (
                            <option key={moteur.idMOTEURS} value={moteur.idMOTEURS}>{moteur.moteur_nom}</option>
                        ))}
                </select>
            </div>

            <p id="message"> </p>
            <p id='periodeMessage'>
            Si vous souhaitez ajouter un bateau, déjà vendu et appartenant à un client, veuillez ne mettre aucun prix.
            </p>
            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton EnvoiButton" 
                    onClick={handleClick}>AJOUTER</button>
        </figure>
    );
}

export default AjoutVenteBateau