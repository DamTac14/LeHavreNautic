export function calculTaxe(puissance, anneeFabrication) {
  // taux de la taxe en euros par CV
  const taux = [
    { max: 25, valeur: 46.5 },
    { max: 55, valeur: 54 },
    { max: 99, valeur: 76 },
    { max: Infinity, valeur: 90 }
  ];

  // coefficient d'âge
  let coefficientAge = 0.9;
  const anneeCourante = new Date().getFullYear();
  const age = anneeCourante - anneeFabrication;

  // Détermination du coefficient d'âge en fonction de l'année de fabrication du moteur
  if (age > 15) {
    coefficientAge = 0.1;
  } else if (age > 10) {
    coefficientAge = 0.3;
  } else if (age > 5) {
    coefficientAge = 0.6;
  }

  // Calcul de la taxe en fonction de la puissance du moteur
  let taxe = 0;
  for (let i = 0; i < taux.length; i++) {
    const tauxCourant = taux[i];
    if (puissance <= tauxCourant.max) {
      taxe = puissance * tauxCourant.valeur * coefficientAge;
      break;
    }
  }
  return taxe;
}
