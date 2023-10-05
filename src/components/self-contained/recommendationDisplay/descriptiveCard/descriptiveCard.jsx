// will display a serie with a short in a vertival fashion with a little description and different interactions options

import { ImagePortrait } from "../../image-portrait";
import "./descriptiveCard.css"

export const DescriptiveCard = ({
    serie,
    addFunc, // adding to watchlist
    delFunc, // removing the element
    launchFunc, // launching the show
    alreadyWatched, //
    customStyle,
    optionalText,
}) => {
    const width = 20

    const imageStyle = customStyle ? customStyle : {
        width : `${48}vw`,
        aspectRatio : '16 / 9',
        maxWidth : `${270}px`,
        borderRadius : '0.1em',
    }

   

    return (
        <div className="descriptive-card" >
            <div onClick={()=>{launchFunc()}} style={{display : 'grid', placeItems : 'center', overflow : 'hidden', cursor : 'pointer'}}>
                <ImagePortrait 
                src={serie.background_tof}
                alt={serie.name}
                load={true}
                style={imageStyle}
                />
            </div>

            <Options 
            addFunc={addFunc}
            delFunc={delFunc}
            watched={alreadyWatched}
            pre={optionalText}
            />
            
            <Details 
            text={serie.lesstext}
            genres={[serie.genre_1, serie.genre_2, serie.genre_3]}
            />

        </div>
    )


}


// informations

const Options = ({addFunc, delFunc, watched,pre}) => {

    return (
        <div style={{
            display : 'flex', justifyContent : 'space-around', gap : '0.3em', margin : "0 auto"
        }}>
            {pre ?
            <pre>{pre}</pre>
            : null
            }

            <SpecialButton 
            func={delFunc}
            color={"accent-red"}
            text={"Retirer"}
            icon={"fa-regular fa-circle-xmark"}
            />

          
            <SpecialButton 
            func={watched}
            color={"accent-green"}
            text={"regardé"}
            icon={"fa-solid fa-circle-check"}
            />

            <SpecialButton 
            func={addFunc}
            color={"accent-purple"}
            text={"Ajouter"}
            icon={"fa-solid fa-plus"}
            />
            
        </div>
    )
}

const Details = ({text, genres}) => {

    let trimmedText = text
    trimmedText = text.length > 210 ? text.substr(0, 210)+ '...' : text

    return(
        <div className="flex-column" style={{height : '95%', width : '90%', margin : "0 auto"}}>

             <div style={{display : "flex", justifyContent : 'left', alignItems : 'center',}}>
                {genres.map((genre, i)=> {
                    return <h4 key={i}><strong>{genre}</strong></h4>
                })}
            </div>

            <p>{trimmedText}</p>
        </div>
        ) 
}

const SpecialButton = ({
    func,
    color,
    text,
    icon,
}) => {
    const buttonStyle = {
        border :  `1px solid var(--${color})`,
    }
    
    return (
        <div className="icon" style={buttonStyle} onClick={()=>{func()}}>
            <i style={{color : `--${color}`}} className={`${icon}`}></i>
            <span style={{display : 'block'}}>{text}</span>
        </div>
    )
}