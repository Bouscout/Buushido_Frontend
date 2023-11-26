// this card are the animes that the user have liked
// they just need basic informations and should have an option allowing the user to take them out

import { ImagePortrait } from "../../self-contained/image-portrait"
import serieContext from "../../../utils/serie_context"
import { useContext } from "react"

// card representing a my_anime_db element
export const Element_My_Anime = ({serie}) => {
    let name = serie.title
    name = name.length > 40 ? name.substr(0, 35)+'...' : name

    const {addLiked} = useContext(serieContext)

    function removeFunc(){
        addLiked(serie, true, true) // removing and re-rendering
    }

    return (
        <div className="flex-column card" style={{position : 'relative'}}>

            <RemoveButton removeFunc={removeFunc}/>

            <div className="contenu">
                <ImagePortrait 
                src={serie.portrait_pic}
                style={{}}
                alt={serie.title}
                load={true}
                direct={true}
                />

            </div>
            <h2>{name}</h2>
        </div>
    )
}

// card reoresenting a buushido_db element
export const Element = ({serie}) => {
    return (
        <div className="flex-column card">

        <div className="contenu">

            <ImagePortrait 
            src={serie.tof_url}
            style={{}}
            alt={serie.name}
            load={true}
            />
        </div>
            
            <h2>{serie.name}</h2>

        </div>
    )
}

const RemoveButton = ({removeFunc}) => {
    return (
        <div  className="hover-scale" style={{
            position : 'absolute', top : '1%', left : '2%', zIndex : '3', border : '2px solid var(--accent-red)', width : '30px', height : '30px',
            borderRadius : "50%", display : 'grid', placeItems : 'center'
        }} onClick={()=>removeFunc()}>

            <div className="bar" style={{transform : "scaleX(0.7)", background : "var(--accent-red)"}}></div>

        </div>
    )
}