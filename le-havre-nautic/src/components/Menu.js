import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAffichage } from './fonctionsAPI/AffichageAPI';

import Recherche from './recherche';
import '../styles/menu.css';
import CalculPasHelice from './pasHelice';
import EntretienTable from './entretienTable';


function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(null);
    const [donnees, setDonnees] = useState([]);
    const [selectedEngine, setSelectedEngine] = useState([]);
    const [showDeleteButton] = useState(false);

  
    const location = useLocation();
  
    useEffect(() => {
      setIsMenuOpen(false);
      // Condition lors du chemmin url afin de pouvoir remettre à jour le state setSelectedEngine pour libérer la place
      if (!location.pathname.includes('/moteurs_')) {
        setSelectedEngine(null);
      }
    }, [location]);




    const handleClick = async (fournisseur_nom) => {
      // Gestion de clique avec la fonction d'affichage et les paramètres attendues de l'autre côté afin d'affichier les entretiens
      const data = await fetchAffichage('Menu', fournisseur_nom);
      setSelectedEngine(data);
    };
    
  // .map qui permet de vérifier le nom du fournisseur sur lequel qu'on clique afin de traiter les données et afficher celles liés 
  // au fournisseur cliqué en récuprant les informations attendues dans les paramètres
    const engineLists = donnees.map((engine) => {
      return (
        <li key={engine.fournisseur_nom}>
          <Link to={`/moteurs_${engine.fournisseur_nom}`} onClick={() => handleClick(engine.fournisseur_nom)}>
            {engine.fournisseur_nom}
          </Link>
        </li>
      );
    });
  

    useEffect(() => {
      // réinitialiser les données lorsque le menu est fermé
      if (!isMenuOpen) {
        setSelectedEngine(null);
      }
    }, [isMenuOpen]);
  

    // Gestion d'affichage du menu moteur avec les informations dans la base de données
        
  useEffect(() => {
    const getMenu = async () => {
      const menuData = await fetchAffichage('Menu');
      setDonnees(menuData);
    };
    getMenu();
  }, []);


  const toggleMenu = (menuId) => {
    if (isMenuOpen === menuId) {
      setIsMenuOpen(null); // Ferme le menu si on clique à nouveau dessus
    } else {
      setIsMenuOpen(menuId); // Ouvre le menu cliqué
    }
  };




  const handleTouchToggleMenu = (menuId) => {
    setIsMenuOpen((prevOpenMenuId) => {
      if (prevOpenMenuId === menuId) {
        return null; // Ferme le menu si on appuie à nouveau dessus
      } else {
        return menuId; // Ouvre le menu cliqué
      }
    });
  };



    return (
      <div>
        <nav className='nav'>
          <ul>            
            <li className='deroulant'>

              <Link onClick={() => toggleMenu('client-menu')}
                    onTouchStart={() => handleTouchToggleMenu('client-menu')}
                    onTouchEnd={(e) => e.preventDefault()}>Client</Link>

                <ul  className={`sous ${isMenuOpen === 'client-menu' ? 'open' : ''}`}>
                  <li>
                    <Link to="/recherche_client">Recherche client</Link>
                  </li>
                  <li>
                    <Link to="/envoi_atelier">Vérification client vers atelier</Link>
                  </li>
                </ul>
            </li>

            <li>
              <Link to="/Charges">Prise en charge</Link>
            </li>


          <li className="deroulant">
            <Link  onClick={() => toggleMenu('moteur-menu')}
                    onTouchStart={() => handleTouchToggleMenu('moteur-menu')}
                    onTouchEnd={(e) => e.preventDefault()}>Moteurs</Link>
                    
            <ul className={`sous ${isMenuOpen === 'moteur-menu' ? 'open' : ''}`}>
            {engineLists}
          </ul>
          </li>
        </ul>
        </nav>

        <CalculPasHelice />
        <Recherche />
        <EntretienTable selectedEngine={selectedEngine} 
                        showDeleteButton={showDeleteButton}/>
        </div>
        );
  }
  

export default Menu;