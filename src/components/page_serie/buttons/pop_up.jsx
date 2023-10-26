


// this file will handle all the different pop up options on this page
import { useEffect, useState } from 'react'
// import '../serie.css'
export default function FastStart(props){
    const [show, setShow] = useState([])
    const id = props.id
    
    useEffect(()=>{
        
    // checking if we have data about the show
    const liste = JSON.parse(localStorage.getItem("buushido_liste"))
    const serie = liste ? liste[id] : null

     if(typeof serie === "object" && serie !== null){
            if (serie.last_episode){
                setShow([serie.id, serie.last_saison, serie.last_episode])
            }    
        }
    }, [])

    //function to make the pop up disapear after a certain time
    useEffect(()=>{
        if (show.length > 0){

            setTimeout(()=>{
                setShow(false)
            }
            , 7900)


        }
    }, [show])
    
    if (show.length > 0){
        const launcher = props.launcher
        
        
        return (
            <section id="pop-up" style={{
                animation: 'slider 0.3s linear 0s 1 forwards ',
            }}>
                <h1><i style={{
                    fontWeight : '300',
                }}>Reprendre</i> : <strong>Saison {show[1]} Episode {show[2]} ?</strong></h1>
                

                <div style={{display : 'flex', justifyContent : 'space-evenly',
                width : '100%', marginBottom : '3vmin'
                }}>
                    <button onClick={()=>{setShow(false)}}><h2>Annuler</h2></button>
                    <button onClick={()=>{launcher(show)}}><h2>Reprendre</h2></button>
                </div>
                
                
                <hr></hr>
            </section>
    )
}
}