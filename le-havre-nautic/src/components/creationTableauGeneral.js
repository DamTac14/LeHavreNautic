import React, {useState} from 'react';

export function CreationTableau({
                                id,
                                nom,
                                prenom,
                                mail,
                                telephone,
                                marque,
                                fournisseur_bateau_nom,
                                bateau_nom,
                                fournisseur_moteur_nom,
                                moteur_nom,
                                moteur_gamme,
                                place_portuaire,
                                date_entree,
                                date_sortie,
                                immatriculation,
                                reference,
                                annee,
                                gamme,
                                puissance, 
                                poids,
                                bruit,
                                taxe,
                                longueur_coque,
                                numero_serie,
                                largeur_bau,
                                tirant_air,
                                tirant_eau,
                                cabine,
                                couchette,
                                ptac,
                                charge,
                                largeur,
                                longueur,
                                resistance,
                                commentaire,
                                tete,
                                chassis,
                                roues,
                                etat,
                                annee_utilisation,
                                prix,
                                type,
                                elementSuppression,
                                API_Suppression,
                                showDeleteButton} ){

    const [idASupprimer, setIDAsupprimer] = useState(null);    

    const handleConfirmationSuppression = (id) => {
      setIDAsupprimer(id);
    }
  
    const handleAnnulationSuppression = () => {
      setIDAsupprimer(null);
    }
  
    const handleSuppression = async () => {
      await API_Suppression(id);
      setIDAsupprimer(null);
    };



    return (

        <>
        {/*
        
        Création d'une ligne de tableaux en fonction des données attendues de l'autre côté.
      
        On reprend les paramètres, on met des conditions afin d'afficher si des données sont reçues ou non, et on génère un grand tableau
        Il y a beaucoup d'informations mais cela permet d'avoir un tableau générique et d'éviter les copier coller inutiles 
        
        Le className rechercher_moteur est ajouté pour pouvoir utiliser la barre de rechercher

        On ajoute l'id de l'élément en id afin de pouvoir mettre en place la suppression API et la visibilité des éléments

        Pour des informations qu'on est pas sûrs d'avoir, nous mettons une condition afin d'afficher si aucune donnée est sauvegardé

        */}
        
        <tr key={id} className={`rechercher_moteur`} id={id}>

            {nom && <td>{nom}</td>}

            {prenom &&  <td>{prenom}</td>}

            {mail &&  <td>{mail}</td>}

            {telephone &&  <td>{telephone}</td>}

            {place_portuaire &&  <td>{place_portuaire}</td>}

            {marque &&  <td>{marque}</td>}

            {fournisseur_bateau_nom &&  <td>{fournisseur_bateau_nom} {gamme}</td>}

            {bateau_nom &&  <td>{bateau_nom}</td>}

            {fournisseur_moteur_nom &&  <td>{fournisseur_moteur_nom} {moteur_nom} {moteur_gamme}</td>}

            {immatriculation &&  <td>{immatriculation !== 'Aucune donnée' ? <p>{immatriculation}</p> : 'Aucune donnée'}</td>}

            {date_entree &&  <td>{new Date(date_entree).toLocaleDateString() !== 'Invalid Date' ? <p>{new Date(date_entree).toLocaleDateString()}</p> : "Aucune date d'entrée"}</td>}
            
            {date_sortie &&  <td>{new Date(date_sortie).toLocaleDateString() !== 'Invalid Date' ? <p>{new Date(date_sortie).toLocaleDateString()}</p> : "Aucune date de sortie"}</td>}
            
            {numero_serie &&  <td>{numero_serie !== 'Aucune donnée' ? <p>{numero_serie}</p> : 'Aucune donnée'}</td>}

            {reference &&  <td>{reference !== 'Aucune donnée' ? <p>{reference}</p> : 'Aucune donnée'}</td>}

            {puissance &&  <td>{puissance !== 'Aucune donnée' ? <p>{puissance} CV</p> : 'Aucune donnée'}</td>}
            
            {annee &&  <td>{annee !== 'Aucune donnée' ? <p>{annee}</p> : 'Aucune donnée'}</td>}
            
            {poids && <td>{poids !== 'Aucune donnée' ? <p>{poids} kg</p> : 'Aucune donnée'}</td>}
            
            {bruit &&  <td>{bruit !== 'Aucune donnée' ? <p>{bruit}</p> : 'Aucune donnée'}</td>}

            {commentaire &&  <td>{commentaire !== 'Aucune donnée' ? <p>{commentaire}</p> : 'Aucune donnée'}</td>}
            
            {taxe &&  <td>{taxe !== 'Aucune donnée' ? <p>{taxe} €</p> : 'Aucune donnée'}</td>}
            
            {longueur_coque &&  <td>{longueur_coque !== 'Aucune donnée' ? <p>{longueur_coque} mètres</p> : 'Aucune donnée'}</td>}
            
            {largeur_bau &&  <td>{largeur_bau !== 'Aucune donnée' ? <p>{largeur_bau} mètres</p> : 'Aucune donnée'}</td>}
            
            {tirant_air &&  <td>{tirant_air !== 'Aucune donnée' ? <p>{tirant_air} mètres</p> : 'Aucune donnée'}</td>}
            
            {tirant_eau &&  <td>{tirant_eau !== 'Aucune donnée' ? <p>{tirant_eau} mètres</p> : 'Aucune donnée'}</td>}
            
            {cabine &&  <td>{cabine}</td>}
            
            {couchette &&  <td>{couchette}</td>}
            
            {ptac &&  <td>{ptac !== 'Aucune donnée' ? <p>{ptac} tonnes</p> : 'Aucune donnée'}</td>}
            
            {charge &&  <td>{charge !== 'Aucune donnée' ? <p>{charge} tonnes</p> : 'Aucune donnée'}</td>}
            
            {largeur &&  <td>{largeur !== 'Aucune donnée' ? <p>{largeur} mètres</p> : 'Aucune donnée'}</td>}
            
            {longueur &&  <td>{longueur !== 'Aucune donnée' ? <p>{longueur} mètres</p> : 'Aucune donnée'}</td>}
            
            {resistance &&  <td>{resistance}</td>}
            
            {tete &&  <td>{tete}</td>}
            
            {chassis &&  <td>{chassis}</td>}
            
            {roues &&  <td>{roues !== 'Aucune donnée' ? <p>{roues} pouces</p> : 'Aucune donnée'}</td>}
            
            {annee_utilisation &&  <td>{annee_utilisation !== 'Aucune donnée' ? <p>{annee_utilisation} an(s)</p> : 'Aucune donnée'}</td>}
            
            {etat &&  <td>{etat !== 'Aucune donnée' ? <p>{etat}</p> : 'Aucune donnée'}</td>}
            
            {type &&  <td>{type}</td>}
            
            {prix &&  <td>{prix !== 'Aucune donnée' ? <p>{prix} € TTC</p> : 'Aucune donnée'}</td>}



            {/*
          


            */}
        {showDeleteButton && (
            <td>
              {idASupprimer === id ? (
                <div className={"confirmation"}>

                  <p>
                    Confirmez-vous la suppression de ce(t/te) {elementSuppression} ?
                  </p>

                  <button onClick={() => handleSuppression(id)} 
                  className='valider'>Oui</button>

                  <button onClick={handleAnnulationSuppression} 
                  className='annuler'>Non</button>
                </div>
              ) : (
                <button onClick={() => handleConfirmationSuppression(id)} 
                className='annuler'>Supprimer</button>
              )}
            </td>
          )}
          </tr>

        </>
    )
}