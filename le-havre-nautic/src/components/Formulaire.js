import React, { useState } from "react";

function FormulaireGlobal({ inputs }) {
  // Utilisation de l'état local pour stocker les valeurs du formulaire
  const [formValues, setFormValues] = useState({});

  // Gestion du changement de valeur des champs de saisie
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Mise à jour de l'état local avec les nouvelles valeurs du formulaire
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form>
      {/* Affichage des champs de saisie en fonction de la configuration passée en tant que prop */}
      {inputs.map((input) => (
        <div key={input.name}>
          <label htmlFor={input.name}>{input.label}</label>
          <input
            type={input.type}
            id={input.id}
            name={input.name}
            value={formValues[input.id] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
}

export default FormulaireGlobal;

