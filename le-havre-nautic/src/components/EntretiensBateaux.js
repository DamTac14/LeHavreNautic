import React, { useState } from 'react';

function EntretienBateau({idBateau}) {

const [,etapesBateaux] = useState([])

    return (

        <>
            <ul>
                <li>Pare-Battage
                    <input type="checkbox" id="checkbox1" /> Endommagé
                    <input type="checkbox" id="checkbox2" /> Non endommagé
                </li>
                <li>Propulseur d'étrave
                    <input type="checkbox" id="checkbox3" /> Endommagé
                    <input type="checkbox" id="checkbox4" /> Non endommagé
                </li>
                <li>Pare-Battage
                    <input type="checkbox" id="checkbox5" /> Endommagé
                    <input type="checkbox" id="checkbox6" /> Non endommagé
                </li>
                <li>Guindeau
                    <input type="checkbox" id="checkbox7" /> Endommagé
                    <input type="checkbox" id="checkbox8" /> Non endommagé
                </li>
                <li>Siège
                    <input type="checkbox" id="checkbox9" /> Endommagé
                    <input type="checkbox" id="checkbox10" /> Non endommagé
                </li>
                <li>Gouvernail
                    <input type="checkbox" id="checkbox11" /> Endommagé
                    <input type="checkbox" id="checkbox12" /> Non endommagé
                </li>
                <li>Cadran
                    <input type="checkbox" id="checkbox11" /> Endommagé
                    <input type="checkbox" id="checkbox12" /> Non endommagé
                </li>
                <li>Boîtier de commande
                    <input type="checkbox" id="checkbox13" /> Endommagé
                    <input type="checkbox" id="checkbox14" /> Non endommagé
                </li>
                <li>Direction
                    <input type="checkbox" id="checkbox15" /> Endommagé
                    <input type="checkbox" id="checkbox16" /> Non endommagé
                </li>
                <li>Feux
                    <input type="checkbox" id="checkbox17" /> Endommagé
                    <input type="checkbox" id="checkbox18" /> Non endommagé
                </li>
                <li>Anti-Fouling
                    <input type="checkbox" id="checkbox19" /> Endommagé
                    <input type="checkbox" id="checkbox20" /> Non endommagé
                </li>
                <li>Porte Canne
                    <input type="checkbox" id="checkbox21" /> Endommagé
                    <input type="checkbox" id="checkbox22" /> Non endommagé
                </li>
                <li>T-Top
                    <input type="checkbox" id="checkbox23" /> Endommagé
                    <input type="checkbox" id="checkbox24" /> Non endommagé
                </li>
                <li>Echelle d'Etrave
                    <input type="checkbox" id="checkbox25" /> Endommagé
                    <input type="checkbox" id="checkbox26" /> Non endommagé
                </li>
                <li>Essuie-Glaces
                    <input type="checkbox" id="checkbox27" /> Endommagé
                    <input type="checkbox" id="checkbox28" /> Non endommagé
                </li>
                <li>Vitres
                    <input type="checkbox" id="checkbox29" /> Endommagé
                    <input type="checkbox" id="checkbox30" /> Non endommagé
                </li>
                <li>Toilettes
                    <input type="checkbox" id="checkbox31" /> Endommagé
                    <input type="checkbox" id="checkbox32" /> Non endommagé
                </li>
                <li>Réfrigérateur
                    <input type="checkbox" id="checkbox33" /> Endommagé
                    <input type="checkbox" id="checkbox34" /> Non endommagé
                </li>
                <li>Cuisine
                    <input type="checkbox" id="checkbox35" /> Endommagé
                    <input type="checkbox" id="checkbox36" /> Non endommagé
                </li>
                <li>Enceinte
                    <input type="checkbox" id="checkbox37" /> Endommagé
                    <input type="checkbox" id="checkbox38" /> Non endommagé
                </li>
            </ul>
        </>
    )
}

export default EntretienBateau