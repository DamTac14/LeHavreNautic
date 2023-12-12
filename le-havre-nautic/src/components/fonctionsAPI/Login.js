async function Login() {    
      
    const mail = document.getElementById('emailUser').value
    const mot_de_passe = document.getElementById('mdpUser').value
          
    // Le json des données à ajouter
    let userData = {
      mail: mail,
      mot_de_passe: mot_de_passe,
    };

    const ipAddress = window.location.hostname;

  
    const url = `http://${ipAddress}:5005/api/connexionUtilisateur`;
    
    try {
      // appel de l'api
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      
      const result = await response.json();

      // Condition en fonction de la réponse attendue

      // Si l'utilisateur est reconnu dans la base :
      if (result.retour === 'OK') {

        // stockage du message de connexion
        localStorage.setItem('MessageConnexion',result.message)

        // authentification réussie et stockage pour les affichages
        localStorage.setItem('isAuthenticated', 'true');

        // redirection vers la page de recherche de client
        window.location.href = "/recherche_client";
      } else {
        // Ajout du message d'erreur si la connexion n'a pas fonctionnée
        const messageElement = document.getElementById("message");
        messageElement.classList.add("error");
        messageElement.innerHTML = "Veuillez vérifier vos identifiants";
      }
    } catch (error) {
      console.error(error);
    }
  }

  export default Login;