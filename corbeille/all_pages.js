import { useState } from "react";

export default function Pages(){
    const [etat, setEtat] = useState([true, false, false])
    return <Option />


}

function Option(){
    return (
        <>
        <div className="option">
            <button>Details</button>
            <button>Episodes</button>
            <button>Commentaires</button>
        </div>
        </>
    )

}