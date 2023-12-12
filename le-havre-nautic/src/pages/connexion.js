import React, {useEffect} from 'react'
import '../styles/connexion.css'
import Login from '../components/fonctionsAPI/Login';

function Connexion(){


  // Utilisation de useEffect afin de faire fonctionner la touchée entrée pour lancer la fonction de connexion
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        Login();
      }
    }
// Récupération des input de connexion comme le mail et le mot de passe
    const mail = document.getElementById("emailUser");
    const mot_de_passe = document.getElementById("mdpUser");

    // Ajout de l'événement keyup ainsi que la fonction qui permettra de se connecter grâce à la touche entrée
    mail.addEventListener("keyup", handleKeyPress);
    mot_de_passe.addEventListener("keyup", handleKeyPress);


    // Permet d'éviter les comportements inattendus ou de fuites de mémoire
    return () => {
      mail.removeEventListener("keyup", handleKeyPress);
      mot_de_passe.removeEventListener("keyup", handleKeyPress);
    };
   }, []);
      

    return(
        <figure className="form">

            <h2>Connexion</h2>
            
            <div>
              {/*
            
              Input de connexion qui récupère le mail de l'utilisateur

            */}
                <label>
                    <p>Mail</p>
                </label>

                <input id="emailUser" 
                        type="text" 
                        name="emailUser" 
                        placeholder="Mail" 
                        className="inputConnexion" 
                        required />

            </div>
            <div>

                          {/*
            
              Input du mot de passe qui récupère le mot de passe de l'utilisateur

            */}

                <label>
                    <p>Mot de passe</p>
                </label>

                <input id="mdpUser" 
                      type="password" 
                      name="mdpUser" 
                      minLength="8" 
                      placeholder="Mot de passe" 
                      className="inputConnexion" 
                      required />
            </div>

            <p id="message"> </p>

            <button type="submit" 
                    id='submit' 
                    className="ConnexionButton" 
                    onTouchStart={() =>Login()}
                    onClick={Login}>CONNEXION</button>
    </figure>
    )
}

export default Connexion