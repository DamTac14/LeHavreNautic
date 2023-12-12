import React, { useState, useEffect } from 'react';
import FormulaireGlobal from '../../components/Formulaire';

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import ajoutMoteursDonnees from '../../components/JSONInformationsElements/ajoutMoteursDonnees.json'
import { calculTaxe } from '../../components/taxeCalcul';
import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';

import '../../styles/ajout.css'

function AjoutVenteMoteur() {

    const [fournisseurs, setFournisseurs] = useState([]);
    // Filtre des données moteurs pour le formulaire
    const moteursForm = ajoutMoteursDonnees.filter((element) => element.label !== 'Supprimer'
                                                            && element.label !== 'Etat'
                                                            && element.label !== 'Taxe')


    // Affichage des fournisseurs
    useEffect(() => {
        const getFournisseur = async () => {
          const fournisseursData = await fetchAffichage('fournisseurs');
          setFournisseurs(fournisseursData);
        };
        getFournisseur();
      }, []);
      


      var handleClick = () => {

    // Récupération des valeurs côté navigateur
    
    const {
        value: FOURNISSEUR_idFOURNISSEUR,
    } = document.getElementById('fournisseur_moteur')
    const {
        value: nom,
    } = document.getElementById('nom_moteur')
    const {
        value: reference,
        } = document.getElementById('numserie_moteur')
    const {
        value: numero_serie,
        } = document.getElementById('numserie_moteur')
    const {
        value: puissance,
    } = document.getElementById('puissance_moteur')
    const {
        value: poids,
        } = document.getElementById('poids_moteur')
    const {
    value: bruit,
    } = document.getElementById('bruit_moteur')
    const {
        value: annee,
    } = document.getElementById('annee_moteur')
    const {
        value: annee_utilisation,
    } = document.getElementById('annee_utilisation_moteur')
    const {
        value: gamme,
    } = document.getElementById('gamme_moteur')
    const {
        value: etat,
    } = document.getElementById('etat_moteur')
    const {
        value: prix,
    } = document.getElementById('prix_moteur')
  
  const taxe = calculTaxe(puissance,annee)
  
    
        // le json des données à ajou  ter 
        let donnees_a_ajouter = {
        FOURNISSEUR_idFOURNISSEUR,
        nom:nom.replace(/\s+/g, '').toUpperCase(),
        reference,
        gamme,
        numero_serie:numero_serie.replace(/\s+/g, ''),
        puissance,
        annee,
        poids,
        bruit,
        taxe:taxe,
        annee_utilisation,
        etat,
        prix
        };


  if (FOURNISSEUR_idFOURNISSEUR === '' ||
        numero_serie === '' ) {
      
            const messageElement = document.getElementById("message");
            messageElement.classList.add("error");
            messageElement.innerHTML = "Il y a une erreur lors de votre opération, vérifiez l'état de vos données";
        
        } else {
            AjoutGlobal(donnees_a_ajouter, 'moteur', 'ajoutMoteur', 'POST')
        }
      }
    
    return (
        <figure className="ficheAjoutAppareil">

            <h2>Ajout d'un moteur</h2>
            
            <h3>Informations moteur</h3>

            <FormulaireGlobal 
            inputs={moteursForm}
            />

            <label>
                <p>Marque du moteur</p>
            </label>

                <select  id='fournisseur_moteur'>

                    <option value="">Choisissez un fournisseur</option>

                    {fournisseurs.filter(fournisseur => fournisseur.type === 'moteur' && fournisseur.nom !== 'none').map(fournisseur => (
                    <option key={fournisseur.idFOURNISSEUR} value={fournisseur.idFOURNISSEUR}>{fournisseur.nom}</option>
                    ))}

                </select>
            <label>
                <p>Gamme</p>
            </label>
            
                <select id="gamme_moteur">
                    <option value="">Choisissez une gamme si besoin</option>

                    <option value="Mécanique">Mécanique</option>
                    <option value="Electrique">Electrique</option>
                    <option value="Compact">Compact</option>
                    <option value="Sport">Sport</option>
                </select>

            <label>
                <p>Etat du moteur</p>
            </label>

                <select id="etat_moteur">
                    <option value="">Choisissez un état</option>

                    <option value="neuf">Neuf</option>
                    <option value="occasion">Occasion</option>

                </select>

            <p id="message"> </p>

            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton EnvoiButton" 
                    onClick={handleClick}>AJOUTER</button>

        </figure>
    );
}

export default AjoutVenteMoteur