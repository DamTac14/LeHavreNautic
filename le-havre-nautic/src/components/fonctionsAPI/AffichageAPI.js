// Fonction générale d'affichage des données en passant par des paramètres

export const fetchAffichage = async (Detail, id = null) => {

const ipAddress = window.location.hostname;

// Condition d'affichage si c'est par id afin de détaillé au client ou si c'est général et ainsi générer une route vers le serveur API

const url = id ? `http://${ipAddress}:5005/api/${Detail}/${id}` 
                : `http://${ipAddress}:5005/api/${Detail}`;

// Fonction fetch d'affichage de mes données
const response = await fetch(url, {
  method:'GET',
  credentials: 'include'
});

// Retour du résultat attendu dans un format .json() 
const result = await response.json();
return result;
};
