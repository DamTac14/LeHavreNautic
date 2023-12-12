import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {React, useState} from 'react'


// COMPOSANTS
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import MenuAdministrateur from './administrateur/MenuAdministrateur';
import { MessageConnecte } from './components/DejaConnecte';
import Footer from './components/Footer';
// ADMINISTRATEUR
// AJOUT
import AjoutEmploye from './administrateur/ajouts/ajout_employe';
import AjoutClient from './administrateur/ajouts/ajout_client';
import AjoutVenteBateau from './administrateur/ajouts/ajout_vente_bateau';
import AjoutVenteRemorque from './administrateur/ajouts/ajout_remorque_vente';
import AjoutVenteMoteur from './administrateur/ajouts/ajout_vente_moteur';
import AjoutFournisseur from './administrateur/ajouts/ajout_fournisseur';
import AjoutEntretien from './administrateur/ajouts/ajout_entretien_moteur';

// MODIFICATION
import ModificationClient from './administrateur/modifications/modificationClients';
import ModificationBateau from './administrateur/modifications/modificationBateaux';
import ModificationEmploye from './administrateur/modifications/modificationEmployes';
import ModificationFournisseur from './administrateur/modifications/modificationFournisseur';
import ModificationEntretien from './administrateur/modifications/modificationEntretien';
import ModificationMoteur from './administrateur/modifications/modificationMoteurs';
import ModificationRemorque from './administrateur/modifications/modificationRemorques';


// SUPPRESSION
import SuppressionFournisseur from './administrateur/suppression/suppression_fournisseur';
import SuppressionRemorques from './administrateur/suppression/suppression_remorques';
import SuppressionMoteurs from './administrateur/suppression/suppression_moteur';
import SuppressionBateaux from './administrateur/suppression/suppression_bateau';
import SuppressionEmployes from './administrateur/suppression/suppression_employe';
import SuppressionClient from './administrateur/suppression/suppression_client';
import SuppressionEntretienMoteurs from './administrateur/suppression/suppression_entretien_moteur';


// EMPLOYE
// PAGES
import Client from './pages/AffichageClient';
import Cart from "./pages/etat";
import Charges from './pages/Charges';
import PageBateaux from './pages/venteBateaux';
import PageMoteurs from './pages/venteMoteurs';
import PageRemorques from './pages/venteRemorques';
import Connexion from './pages/connexion';
import MentionsLegales from './components/MentionsLegales';
import ListeEmploye from './components/EmployesListe';

import { fetchIsAdmin } from './components/fonctionsAPI/AccesAdmin';


function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected] = useState(localStorage.getItem('isAuthenticated') === 'true');

      fetchIsAdmin().then((isAdmin) => setIsAdmin(isAdmin));


  return (
    <Router>
    <div>
      {isAdmin && <MenuAdministrateur />}
              <Banner />
        {isConnected && <Menu />}
          <Routes>
          <Route path="/mention_legales" element={<MentionsLegales />} />
          {isConnected && <Route path="/liste_employes" element={<ListeEmploye />} />}

            {isConnected && isAdmin && <Route path="/suppression_fournisseur" element={<SuppressionFournisseur />} />}
            {isConnected && isAdmin && <Route path="/suppression_remorque" element={<SuppressionRemorques />} />}
            {isConnected && isAdmin && <Route path="/suppression_moteur" element={<SuppressionMoteurs />} />}
            {isConnected && isAdmin && <Route path="/suppression_bateau" element={<SuppressionBateaux />} />}
            {isConnected && isAdmin && <Route path="/suppression_employe" element={<SuppressionEmployes />} />}
            {isConnected && isAdmin && <Route path="/suppression_client" element={<SuppressionClient />} />}
            {isConnected && isAdmin && <Route path="/suppression_entretien_moteur" element={<SuppressionEntretienMoteurs />} />}

            {isConnected && isAdmin && <Route path="/modification_client" element={<ModificationClient />} />}
            {isConnected && isAdmin && <Route path="/modification_bateau" element={<ModificationBateau />} />}
            {isConnected && isAdmin && <Route path="/modification_employe" element={<ModificationEmploye />} />}
            {isConnected && isAdmin && <Route path="/modification_fournisseur" element={<ModificationFournisseur />} />}
            {isConnected && isAdmin && <Route path="/modification_entretien" element={<ModificationEntretien />} />}
            {isConnected && isAdmin && <Route path="/modification_moteur" element={<ModificationMoteur />} />}
            {isConnected && isAdmin && <Route path="/modification_remorque" element={<ModificationRemorque />} />}




            {isConnected && isAdmin && <Route path="/ajout_fournisseur" element={<AjoutFournisseur />} />}
            {isConnected && isAdmin && <Route path="/ajout_vente_moteur" element={<AjoutVenteMoteur />} />}
            {isConnected && isAdmin && <Route path="/ajout_entretien_moteur" element={<AjoutEntretien />} />}
            {isConnected && isAdmin && <Route path="/ajout_vente_remorque" element={<AjoutVenteRemorque />} />}
            {isConnected && isAdmin && <Route path="/ajout_vente_bateau" element={<AjoutVenteBateau />} />}
            {isConnected && isAdmin && <Route path="/ajout_client" element={<AjoutClient />} />}
            {isConnected && isAdmin && <Route path="/ajout_employe" element={<AjoutEmploye />} />}
            

            {isConnected ? (<Route path="/acces_employe" element={<MessageConnecte />} />)  : 
            (<Route path="/acces_employe" element={<Connexion />} />)}
            {isConnected && <Route path="/recherche_client" element={<Client />} />}
            {isConnected && <Route path="/charges" element={<Charges />} />}
            {isConnected && <Route path="/envoi_atelier" element={<Cart />} />}
            {isConnected && <Route path="/Bateaux" element={<PageBateaux />} />}
            {isConnected && <Route path="/Moteurs" element={<PageMoteurs />} />}
            {isConnected && <Route path="/Remorques" element={<PageRemorques />} />}
          </Routes>
           <Footer />
      </div>
    </Router>
  );
}

export default App;

