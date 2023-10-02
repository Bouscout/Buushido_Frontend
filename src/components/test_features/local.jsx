import { useState } from "react"

export default function Add_local(){
    const [valeur, setValeur] = useState(0)
    function handle_click(){
        let new_value = valeur + 1
        setValeur(new_value)
        sessionStorage.setItem('valeur', new_value.toString())
    }
    
    return (

        <>
        <h1>Chaque fois que tu clickes la valeur et change est sauvegarder dans LS : valeur : {valeur}</h1>
        <button onClick={()=>{handle_click()}}><h2>Ajouter</h2></button>
        </>
    )
}