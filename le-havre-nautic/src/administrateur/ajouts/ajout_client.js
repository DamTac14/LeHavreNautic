import React, { useState, useEffect } from 'react';

import FormulaireGlobal from '../../components/Formulaire'

import { fetchAffichage } from '../../components/fonctionsAPI/AffichageAPI';

import ajoutClientDonnees from '../../components/JSONInformationsElements/ajoutClientDonnees.json';
import ajoutBateauxClientDonnees from '../../components/JSONInformationsElements/ajoutBateauxDonnees.json';
import ajoutMoteursDonnees from '../../components/JSONInformationsElements/ajoutMoteursDonnees.json'

import { AjoutGlobal } from '../../components/fonctionsAPI/AjoutFetch';
import '../../styles/ajout.css'

function AjoutClient() {

    const [fournisseurs, setFournisseurs] = useState([]);

    // Filtre des données qui seront ajoutées dans le formulaire d'ajout
    const clientsForm = ajoutClientDonnees.filter((element) => element.label !== 'Supprimer')
    const bateauxForm = ajoutBateauxClientDonnees.filter((element) => element.label !== 'Prix' 
                                                                    && element.label !== 'Supprimer'
                                                                     && element.label !== 'Etat'
                                                                     && element.label !== 'Moteur')

    const moteursForm = ajoutMoteursDonnees.filter((element) => element.label !== 'Prix' 
                                                                    && element.label !== 'Supprimer'
                                                                     && element.label !== 'Etat'
                                                                     && element.label !== 'Taxe')

    
  var handleClick = () => {

    // Récupération des valeurs entrées dans le navigateur 
     // CLIENT
 const {
    value: nom_client,
  } = document.getElementById('nom_client')
  const {
    value: prenom_client,
  } = document.getElementById('prenom_client')
  const {
    value: mail_client,
  } = document.getElementById('mail_client')
  const {
    value: telephone_client,
  } = document.getElementById('telephone_client')
  const {
    value: place_portuaire_client,
  } = document.getElementById('emplacement_portuaire_client')




  // BATEAU
  const {
    value: marque_bateau,
  } = document.getElementById('fournisseur_bateau')
  const {
    value: nom_bateau,
  } = document.getElementById('nom_bateau')
  const {
    value: annee_bateau,
  } = document.getElementById('annee_bateau')
  const {
    value: immatriculation_bateau,
  } = document.getElementById('immatriculation_bateau')
  const {
    value: longueur_bateau,
  } = document.getElementById('longueur_bateau')
  const {
    value: largeur_bateau,
  } = document.getElementById('largeur_bateau')
  const {
    value: tirant_air_bateau,
  } = document.getElementById('tirant_air_bateau')
  const {
    value: tirant_eau_bateau,
  } = document.getElementById('tirant_eau_bateau')
  const {
    value: cabines_bateau,
  } = document.getElementById('cabines_bateau')
  const {
    value: couchettes_bateau,
  } = document.getElementById('couchettes_bateau')
  



  // MOTEUR
    const {
        value: marque_moteur,
    } = document.getElementById('fournisseur_moteur')
    const {
        value: nom_moteur,
    } = document.getElementById('nom_moteur')
    const {
        value: numero_serie_moteur,
        } = document.getElementById('numserie_moteur')
    const {
        value: puissance_moteur,
    } = document.getElementById('puissance_moteur')
    const {
        value: poids_moteur,
        } = document.getElementById('poids_moteur')
    const {
    value: bruit_moteur,
    } = document.getElementById('bruit_moteur')
    const {
        value: annee_moteur,
    } = document.getElementById('annee_moteur')
    const {
        value: annee_utilisation_moteur,
    } = document.getElementById('annee_utilisation_moteur')
    const { 
      value: lier_bateau_vente,
    } = 0

// Stockage des données à envoyer vers le serveur qui les traitera et les ajoutera à la base de données
  const donnees_a_ajouter = {
    // CLIENT
    nom_client,
    prenom_client,
    mail_client,
    telephone_client,
    place_portuaire_client,

    // BATEAU
    marque_bateau,
    nom_bateau,
    annee_bateau,
    immatriculation_bateau,
    longueur_bateau,
    largeur_bateau,
    tirant_air_bateau,
    tirant_eau_bateau,
    cabines_bateau,
    couchettes_bateau,

    // MOTEUR
    marque_moteur,
    nom_moteur: nom_moteur.replace(/\s+/g, '').toUpperCase(),
    numero_serie_moteur: numero_serie_moteur.replace(/\s+/g, ''),
    puissance_moteur,
    poids_moteur,
    bruit_moteur,
    annee_moteur,
    lier_bateau_vente,
    annee_utilisation_moteur,
  }
  

  if (marque_bateau === "" 
    || marque_moteur === "") {
      
      const messageElement = document.getElementById("message");
      messageElement.classList.add("error");
      messageElement.innerHTML = "Il y a une erreur lors de votre opération, vérifiez l'état de vos données";

  } else {
      // Appel de la fonction ajouterDonneesGlobales avec les paramètres
      AjoutGlobal(donnees_a_ajouter, 'client', 'ajoutClient', 'POST');
  }
  };

        useEffect(() => {
                const getFournisseur = async () => {
                const fournisseursData = await fetchAffichage('fournisseurs');
                    setFournisseurs(fournisseursData);
                    };
                getFournisseur();
        }, []);


    return(
<figure className="ficheAjoutClient">
            <h2>Ajout client</h2>

            <h3>Informations client</h3>

            <FormulaireGlobal 
                inputs={clientsForm}
            />
    <div>
                    <h3>Bateau client</h3>
            <div>
                <label>
                    <p>Marque du bateau</p>
                </label>

                    <select id='fournisseur_bateau'>
                        <option value="">Choisissez un fournisseur</option>

                            {fournisseurs.filter(fournisseur => fournisseur.type === 'bateau').map(fournisseur => (
                        <option key={fournisseur.idFOURNISSEUR}
                         value={fournisseur.idFOURNISSEUR}>{fournisseur.nom}</option>
                    ))}
                    </select>

                    <FormulaireGlobal 
                    inputs={bateauxForm}
                    />
            </div>
    </div>

    <div>
        <h3>Moteur du bateau client</h3>
            <div>
                    <label>
                        <p>Marque du moteur</p>
                    </label>

                <select  id='fournisseur_moteur'>

                    <option value="">Choisissez un fournisseur</option>

                    {fournisseurs.filter(fournisseur => fournisseur.type === 'moteur').map(fournisseur => (
                    <option key={fournisseur.idFOURNISSEUR} 
                    value={fournisseur.idFOURNISSEUR}>{fournisseur.nom}</option>
                    ))}

                </select>
            </div>

            <FormulaireGlobal 
            inputs={moteursForm}
            />
    </div>

            <p id="message"> </p>

            <button type="submit" 
                    id='submit' 
                    className="EnvoiButton ConnexionButton" 
                    onClick={handleClick}>AJOUTER</button>
</figure>
    );
}

export default AjoutClient