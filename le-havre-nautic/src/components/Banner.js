import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Banner.css'
import logo from '../img/userAvatar.png'

function Banner() {

    const [isConnected, setIsConnected] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const [messageConnexion, setMessageConnexion] = useState(localStorage.getItem('MessageConnexion'));


// Fonction de déconnexion
const handleLogout = () => {
    const ipAddress = window.location.hostname;

    fetch('http://'+ipAddress+':5005/api/logout', {
        method: 'POST',
        credentials: 'include'
    })

    .then(response => {

        // supprimer le token de connexion de localStorage et mettre à jour l'état local
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('MessageConnexion')
        setIsConnected(false);
        setMessageConnexion(false)
        // Redirection au formulaire de connexion
        window.location.href = "/acces_employe";
    })

    .catch(error => {
        console.error('Erreur lors de la déconnexion :', error);
    });
}

    return (
        <div>
            <div className="LHC-banner">
            
            <p id='messageConnexion'> {messageConnexion} </p>

                <p className='connexion'>
                {/*
            
                    Condition de l'affichage si l'utilisateur est connecté cela affiché la déconnexion sinon l'inverse

                */}
                    {isConnected ? (

                        <button onClick={handleLogout} className='deconnexion'>
                        <img src={logo} alt="Icone connexion" className='imageConnexion'/> 
                            Déconnexion
                        </button>

                    ) : (

                        <Link to="/acces_employe"> 
                            <img src={logo} alt="Icone connexion" className='imageConnexion' /> 
                            Connexion
                        </Link>

                    )}

                </p>

                <h1>Le Havre Nautic</h1>

                <p>Accès réservé aux employés</p>
            </div>
        </div>
    )
}

export default Banner