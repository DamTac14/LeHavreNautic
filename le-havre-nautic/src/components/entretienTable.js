import React, { useState } from 'react';
import { API_Suppression_General } from './fonctionsAPI/SuppressionAPI';

function EntretienTable({ selectedEngine, showDeleteButton }) {
  // Utilisation de useState pour les données et le stockage local
  const [idASupprimer, setIDAsupprimer] = useState(null);
  const [, setEntretiens] = useState([]);

  async function API_Suppression(id) {
    await API_Suppression_General('Entretien', id);
  }

  // Fonction de confirmation de suppression en récupérant l'id
  const handleConfirmationSuppression = (idENTRETIEN) => {
    setIDAsupprimer(idENTRETIEN);
  }
  // Fonction d'annulation de suppression
  const handleAnnulationSuppression = () => {
    setIDAsupprimer(null);
  }

  // Fonction lancée lorsque l'on appuie sur la suppression en attendant la réponse validée ou non
  const handleSuppression = async (idENTRETIEN) => {
    await API_Suppression(idENTRETIEN);
    setIDAsupprimer(null);
    setEntretiens([]);
    this.forceUpdate();
  }

  if (!selectedEngine || !selectedEngine.length) {
    return null;
  }

  const filtrerNomMoteur = selectedEngine.filter((item, index, arr) => {
    // Retourne true si l'index actuel est égal à l'index de la première occurrence
    // où les propriétés moteur_nom et fournisseur_nom correspondent à celles de l'élément en cours
    return (
      index ===
      arr.findIndex(
        (nom) =>
          nom.moteur_nom === item.moteur_nom &&
          nom.fournisseur_nom === item.fournisseur_nom
      )
    );
  });
  

// Regrouper les entretiens par moteur
const entretiensParMoteur = {};
selectedEngine.forEach((entretien) => {
  const moteurKey = `${entretien.moteur_nom}-${entretien.fournisseur_nom}`;
  if (!entretiensParMoteur[moteurKey]) {
    entretiensParMoteur[moteurKey] = [];
  }
  entretiensParMoteur[moteurKey].push(entretien);
});

return (
  <div>
    <table>
      <thead>
        {filtrerNomMoteur.map((item, index, arr) => {
          const rowSpan = arr.filter(
            (nom) =>
              nom.moteur_nom === item.moteur_nom &&
              nom.fournisseur_nom === item.fournisseur_nom
          ).length;

          const moteurKey = `${item.moteur_nom}-${item.fournisseur_nom}`;
          const entretiensMoteur = entretiensParMoteur[moteurKey] || [];

          return (
            <>
              <tr>
                <th colSpan={5} rowSpan={rowSpan} className={"seconde-ligne rechercher_moteur"}>
                  {item.moteur_nom} {item.fournisseur_nom}
                </th>
              </tr>
              <tr className={"rechercher_moteur"}>
                <th className={'entretien ' + item.moteur_nom}>Période</th>
                <th className={'entretien ' + item.moteur_nom}>Étape</th>
                <th className={'entretien ' + item.moteur_nom}>Référence</th>
                <th className={'entretien ' + item.moteur_nom}>Quantité</th>
                {showDeleteButton && <th className={'entretien'}>Supprimer</th>}
              </tr>
              {entretiensMoteur.map((entretien) => (
                <tr key={entretien.idENTRETIEN}>
                  <td className={"ans" + entretien.periode + " " + entretien.moteur_nom}>{entretien.periode}</td>
                  <td className={"ans" + entretien.periode + " " + entretien.moteur_nom}>{entretien.etape}</td>
                  <td className={"ans" + entretien.periode + " " + entretien.moteur_nom}>{entretien.reference}</td>
                  <td className={"ans" + entretien.periode + " " + entretien.moteur_nom}>{entretien.quantite}</td>
                  {showDeleteButton && (
                    <td className={"ans" + entretien.periode}>
                      {idASupprimer === entretien.idENTRETIEN ? (
                        <div className={"confirmation"}>
                          <p>Confirmez-vous la suppression de cet entretien ?</p>
                          <button onClick={() => handleSuppression(entretien.idENTRETIEN)} className='valider'>Oui</button>
                          <button onClick={handleAnnulationSuppression} className='annuler'>Non</button>
                        </div>
                      ) : (
                        <button onClick={() => handleConfirmationSuppression(entretien.idENTRETIEN)} className='annuler'>Supprimer</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </>
          );
        })}
      </thead>
      <tbody></tbody>
    </table>
  </div>
);
  }
  export default EntretienTable;



  /*
  
  return (
    <div>
      <table>

          <tbody>
            {selectedEngine.map((item) => (
              <tr key={item.idENTRETIEN}>
                <td className={"ans"+item.periode+" "+item.moteur_nom}>{item.periode}</td>
                <td className={"ans"+item.periode+" "+item.moteur_nom}>{item.etape}</td>
                <td className={"ans"+item.periode+" "+item.moteur_nom}>{item.reference}</td>
                <td className={"ans"+item.periode+" "+item.moteur_nom}>{item.quantite}</td>

{/*

Bouton de suppression à la vérification si le bouton de suppression est true sur la visibilité

ensuite lors de la récupération de l'id à supprimer il y a une sécurité en demandant si l'utilisateur est sûr de vouloir
supprimer cet élément afin d'éviter les mauvaises manipulation



{showDeleteButton && (
  <td className={"ans"+item.periode}>
    {idASupprimer === item.idENTRETIEN ? (
      <div className={"confirmation"}>
        <p>
          Confirmez-vous la suppression de cet entretien ?
        </p>
        <button onClick={() => handleSuppression(item.idENTRETIEN)} className='valider'>Oui</button>
        <button onClick={handleAnnulationSuppression} className='annuler'>Non</button>
      </div>
    ) : (
      <button onClick={() => handleConfirmationSuppression(item.idENTRETIEN)} className='annuler'>Supprimer</button>
    )}
  </td>
)}
</tr>
))}
</tbody>
</table>
</div>
);
  
  */