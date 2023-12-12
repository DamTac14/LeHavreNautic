export async function API_Suppression_General(Detail, id) {

  const ipAddress = window.location.hostname;


  // Création de la route API en ajoutant les paramètres afin de rendre générique son utilisation
    const url = `http://${ipAddress}:5005/api/suppression${Detail}/${id}`;

    // Utilisation de la méthode fetch en lui donnant la méthode et vérifiant l'autorisation d'accès grâce 
    // à credentials ce qui sera vérifié
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.status === 200) {
      if (id) {
        // Si vous avez l'ID de l'élément à valider, vous pouvez le cibler spécifiquement
        const element = document.getElementById(id);
        if (element) {
          // Mettez à jour le style de l'élément pour le masquer
          element.style.visibility = 'collapse';
        }
      }
    } else {
      console.log('Erreur :', response.statusText);
      const messageElement = document.getElementById("message");
      messageElement.classList.add("error");
      messageElement.innerHTML = ('Erreur :', response.statusText);
    }
  }
  