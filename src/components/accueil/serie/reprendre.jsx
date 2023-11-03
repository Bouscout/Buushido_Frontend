import { useEffect, useState } from "react"
import { ImagePortrait } from "../../self-contained/image-portrait"
import { Single } from "../poster/anim"
// import './index.css'
const BASE_URL = "https://buushido.com"

// function to handle the tab that will show the user the last show
// he watched so that he take where he left from

export default function Reprendre(){
    const [found, setFound] = useState(false)
    const [series, setSeries] = useState([])

    function checking_presence(){ // to check if there is a liste already
        const la_liste = JSON.parse(localStorage.getItem('buushido_liste'))

        if (typeof la_liste === "object" && la_liste !== null){
            // making sure the size of the array is no more than 14 elements othersize take 14 latest          
            const to_display = []

            for (const element of Object.values(la_liste).reverse()){
                if (element.last_episode){
                    to_display.push(element)

                    if (to_display.length > 14){
                        break
                    }
                }
            }

            setSeries(to_display)

            setFound(true)
            return true

        }else{ // in case there is no order the component should not render
            setFound(false)
            return false
        }
    }
    

    useEffect(()=>{
        checking_presence()
    }, [])


    if(series.length > 0){
        return(
            <section className="onglet">
                <h1 className="onglet-name">Reprendre le visionnage</h1>
                <div className="container">
                    {series.map((serie, i)=>{
                        return(
                            <Serie_episode 
                                serie={serie}
                                saison={serie.last_saison}
                                episode={serie.last_episode}
                                key={i}
                            />
                        )
                    })}
                </div>
            </section>
        )
    
    // in case we know they are being fetched at least
    }else if(found){
        <section className="onglet">
        <h1 className="onglet-name" style={{
            color : '#fee'
        }}>Onglet</h1>
        <Single />
    </section>
    }

}



const Serie_episode = ({
    serie,
    saison,
    episode,
}) =>{
    const [display, setDisplay] = useState(true)

    function handle_delete(){
        let liste = JSON.parse(localStorage.getItem('buushido_liste')) 

        // removing it from the liste of last watched
        const chosen = liste[serie.id]

        chosen.last_episode = null
        chosen.last_saison = null

        liste[serie.id] = chosen

        //update the list 
        localStorage.setItem('buushido_liste', JSON.stringify(liste))

        setDisplay(false)
        console.log(`${serie.name} deleted`)
    }

    // the style for the image
    const paysage = {
        maxWidth: '300px',
        aspectRatio: '13 / 8',
        width: '16.4vw',
        minWidth: '200px',
    }
    if (display){
    return(
        <div style={{
            display : 'flex', flexDirection : 'column', justifyContent : 'center',
            background : '#202020', filter : 'contrast(115%)', alignItems : 'center'
            , borderRadius : '10px', color : '#fff', maxWidth : '300px',
            textAlign : 'center', lineHeight : '50%', 
            fontSize : '0.5rem', overflow : 'hidden'

        }}>
            <a href={"/serie/"+serie.id}>
                <div style={paysage}>
                    <ImagePortrait src={serie.background_tof}
                        alt={serie.name}
                        style={paysage}
                        load={true}
                        />
                </div>
            </a>
            <div style={{
                display : 'flex', flexDirection : 'row`',flexWrap : 'nowrap', justifyContent : 'space-between', 
                alignItems : 'center', width : '80%', margin : '-0.7vmin auto',
                //  border : 'solid blue', 
            }}>
            <h2 style={{fontSize : '2.5vmin', 
            fontFamily : '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif', 
            // border : 'solid yellow', 
            }}>S{saison}| episode {episode}</h2>
            <h2 className="deleteur" onClick={()=>{handle_delete()}} >
<i style={{lineHeight : '30%', fontSize : '3vmin',}} className="fa-solid fa-xmark"></i>
            </h2>
            </div>
        </div>
    )
        }
} 

// function remove_item(arr, elem){
//     arr.indexOf
// }