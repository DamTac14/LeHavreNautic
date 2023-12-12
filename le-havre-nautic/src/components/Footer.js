import React, {useState} from 'react';
import { Link } from 'react-router-dom';



function Footer() {

  const [isConnected] = useState(localStorage.getItem('isAuthenticated') === 'true');


  return (
    <div className="footer">
      <p className="footer__text">Copyright &copy; {new Date().getFullYear()} Le Havre Nautic</p>
      <p className="footer__text"><Link to="mention_legales">Mentions Légales</Link></p>
     {isConnected && <p className="footer__text"><Link to="liste_employes">Employés</Link></p>}
    </div>
  );
}

export default Footer;
