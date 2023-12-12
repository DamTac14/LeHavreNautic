export const fetchIsAdmin = () => {
  // Récupération de l'adresse IP du client
  const ipAddress = window.location.hostname;

  // Utilisation de l'adresse IP pour effectuer la requête
  return fetch(`http://${ipAddress}:5005/api/isAdmin`, {
    method: 'GET',
    credentials: 'include'
  })
    .then((response) => response.json())
    .then((data) => data.isAdmin)
    .catch((error) => console.error(error));
};
