export async function AjoutGlobal(donneesAjoutee, element, APIRoute, Methode, id = null) {

    var message = '';
    var url;
    const ipAddress = window.location.hostname;

    if (Methode === 'POST') {
        url = `http://${ipAddress}:5005/api/${APIRoute}`;
        message = 'ajouté';
    } else if (Methode === 'PUT') {
        url = `http://${ipAddress}:5005/api/${APIRoute}/${id}`;
        message = 'modifié';
    }

    let response = await fetch(url, {
        method: Methode,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(donneesAjoutee)
    });

    if (response.status === 200) {
        const messageElement = document.getElementById("message");
        messageElement.classList.add("success");
        messageElement.innerHTML = element + " bien " + message + " dans votre base de données";
    } else {
        const messageElement = document.getElementById("message");
        messageElement.classList.add("error");
        messageElement.innerHTML = `Erreur : ${response.statusText}`;
        throw new Error('Le serveur ne répond pas');
    }
}
