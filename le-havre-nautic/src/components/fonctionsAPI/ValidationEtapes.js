export async function ValiderEtapes(Detail, id = null) {

  const ipAddress = window.location.hostname;


    let url = `http://${ipAddress}:5005/api/entretien/${Detail}`;
    let body = {};

    // Condition qui permet d'ajouter un id si le paramètre est rempli et d'ajouter ainsi au body qui est envoyé
    // vers la base de données une valeur au tableau valide
    if (id) {
      url += `/${id}`;
      body = { valide: true };
    }
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });
  
    const data = await response.json();
    console.log(data);
  
    if (response.status === 200) {
      // Étape validée avec succès
    
      if (id) {
        // Si vous avez l'ID de l'élément à valider, vous pouvez le cibler spécifiquement
        const element = document.getElementById(id);
        if (element) {
          // Mettez à jour le style de l'élément pour le masquer
          element.style.display = 'none';
        }
      } else {
        // Sinon, vous pouvez mettre à jour tous les éléments correspondants à l'étape validée
        const elements = document.getElementsByClassName(Detail);
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          // Mettez à jour le style de chaque élément pour le masquer
          element.style.display = 'none';
        }
      }
    } else {
      // Gestion de l'erreur
      console.log('Erreur :', response.statusText);
      const messageElement = document.getElementById("message");
      messageElement.classList.add("error");
      messageElement.innerHTML = `Erreur : ${response.statusText}`;
    }
    
  }
  