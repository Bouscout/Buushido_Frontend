// card for presenting information about predictions
// this card should have an option to be labeled and present the basic informaitons

import { ImagePortrait } from "../../self-contained/image-portrait"
import { useState } from "react"

export const LabelCard = ({serie, pos, giveLabel}) => {
    const offset = 2.4 // to avoid 100% rating
    const [rating, setRating] = useState(0.5)

    let name = serie.title
    name = name.length > 40 ? name.substr(0, 35)+'...' : name

    function giveRating(rate){
        setRating(rate)
        giveLabel(serie, rate)
    }

    let affinity = serie.distance ? Math.floor(100 -  (serie.distance + offset)) : null
    function updateColor(value) {
        if (!value){
            return "var(--accent-white)"
        }
        value = Math.max(50, value)
        const red = 255 - ((value - 50) * 255) / 100;
        const green = (value * 245) / 100;
        const blue = 0;
    
        const color = `rgb(${red}, ${green}, ${blue})`;
        return color
      }


    return (
        <>
        <div className="flex-column card label" style={{
            animationDelay : `${pos * 150}ms`
        }}>
                <div className="contenu">
                    <ImagePortrait 
                    src={serie.portrait_pic}
                    alt={name}
                    load={true}
                    style={{}}
                    direct={true}
                    />
                </div>

           
            {/* like and dislike label */}
            <CardInfos giveRating={giveRating} updateColor={updateColor} affinity={affinity} name={name} rating={rating} />
            {/* like and dislike label */}

            {/* placeholder */}
            <div style={{display : 'flex', alignItems : 'center'}}>
                <i className="fa-solid fa-heart"></i>
            </div>
            {/* placeholder */}

        </div>
        </>
    )
}

const CardInfos = ({giveRating, updateColor, affinity, name, rating}) => {
    return (
        <div className="flex-column" style={{
            position : 'absolute', zIndex : '2', bottom : "0", left : "0", width : '100%',
            justifyContent : 'center', alignItems : 'center'
        }}>
        
        <h2 style={{width : '90%', margin : '0 auto'}}>{name}</h2>

        <div style={{
            display : 'flex', justifyContent : 'space-around', width : '100%', alignItems : 'center',
        }}>
            <i onClick={()=>giveRating(0)} style={{
                color : rating === 0 ? "var(--accent-dark-red)" : null
            }} className={`fa-${rating === 0 ? "solid" : "regular"} fa-thumbs-down`}></i>
            
            {affinity ?
            <h3 style={{color : updateColor(affinity)}}>Affinité : {affinity}%</h3> :
            <h3>Affinité : ???</h3>
            }

            <i onClick={()=>giveRating(1) } style={{
                color : rating === 1 ? "pink" : 'var(--accent-white)'
            }} className={`fa-${rating === 1 ? "solid" : "regular"} fa-heart`}></i>
        
        </div>

        </div>
    )
}