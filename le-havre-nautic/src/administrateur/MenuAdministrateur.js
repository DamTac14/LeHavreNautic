import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

function MenuAdministrateur() {
  // Condition qui permet aux sous menus
  const [isMenuOpen] = useState(false);

      return (
          <div>
           <nav className='navAdmin'>
             <ul>
               <li className="deroulantAdmin">
                 <Link>Ajouter</Link>
                 <ul className={isMenuOpen ? 'sousAdmin open' : 'sousAdmin'}>
                   <li>
                     <Link to="/ajout_client">Ajouter client</Link>
                   </li>
                   <li>
                     <Link to="/ajout_vente_bateau">Ajouter un bateau</Link>
                   </li>
                   <li>
                     <Link to="/ajout_vente_remorque">Ajouter une remorque</Link>
                   </li>
                   <li>
                     <Link to="/ajout_vente_moteur">Ajouter un moteur</Link>
                   </li>
                   <li>
                   <Link to="/ajout_entretien_moteur">Ajouter un/des entretien(s) moteur</Link>
                 </li>
                   <li>
                     <Link to="/ajout_employe">Ajouter employé</Link>
                   </li>
                   <li>
                     <Link to="/ajout_fournisseur">Ajouter un fournisseur</Link>
                   </li>
                 </ul>
               </li>
               <li className="deroulantAdmin">
                 <Link>Modifier</Link>
                 <ul className={isMenuOpen ? 'sousAdmin open' : 'sousAdmin'}>
                    <li>
                      <Link to="/modification_client">Modifier un client</Link>
                    </li>
                    <li>
                      <Link to="/modification_bateau">Modifier un bateau</Link>
                    </li>
                    <li>
                      <Link to="/modification_remorque">Modifier une remorque</Link>
                    </li>
                    <li>
                      <Link to="/modification_moteur">Modifier un moteur</Link>
                    </li>
                    <li>
                      <Link to="/modification_entretien">Modifier un entretien moteur</Link>
                    </li>
                    <li>
                      <Link to="/modification_employe">Modifier un employé</Link>
                    </li>
                    <li>
                     <Link to="/modification_fournisseur">Modifier un fournisseur</Link>
                   </li>
                 </ul>
               </li>
               <li className="deroulantAdmin">
                 <Link>Supprimer</Link>
                 <ul className={isMenuOpen ? 'sousAdmin open' : 'sousAdmin'}>
                   <li>
                     <Link to="/suppression_client">Supprimer client</Link>
                   </li>
                   <li>
                     <Link to="/suppression_employe">Supprimer employé</Link>
                   </li>
                   <li>
                     <Link to="/suppression_fournisseur">Supprimer un fournisseur</Link>
                   </li>
                   <li>
                     <Link to="/suppression_bateau">Supprimer un bateau</Link>
                   </li>
                   <li>
                     <Link to="/suppression_remorque">Supprimer une remorque</Link>
                   </li>
                   <li>
                     <Link to="/suppression_moteur">Supprimer un moteur</Link>
                   </li>
                   <li>
                   <Link to="/suppression_entretien_moteur">Supprimer un entretien moteur</Link>
                 </li>
                 </ul>
               </li>
             </ul>
           </nav>
         </div>
      )
}

export default MenuAdministrateur;
