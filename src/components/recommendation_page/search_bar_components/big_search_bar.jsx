// search bar to find the inputs
import { useEffect, useState, useContext } from "react";
import { LogoWriting } from "../../navbar_v2/logo";
import { SearchBox } from "./search_box";
import { SpecialButton } from "../../self-contained/usefulButtons"
import "./barre.css"

import serieContext from "../../../utils/serie_context";

export default function BigSearchBar({focus}){
    const {addLiked} = useContext(serieContext)

    const {setFocus, getPopular, getPrediction} = useContext(serieContext)
    
    function predict(){
        if(!focus){
            setFocus(true)
            return
        }
        getPrediction(true)
    }
    
    const focusStyle = {
        top : "8%", flexDirection : 'row', 
        animationDuration : '300ms'
    }

    return (
        <section className={`big-search-bar ${focus ? "fade-in" : ""}`} style={focus ? focusStyle : null}>
            <BuushidoLogo />

            <SearchBox />

            <div id="special-buttons">
                <PredictionButton func={predict}/>

                {!focus &&
                <PopularPredictionButton func={getPopular}/>
                }
            </div>
        
        </section>
    )

}

const PredictionButton = ({func}) =>{
    return (
        <div style={{padding : "2.7em"}} onClick={()=>{func ? func() : null}}>
        <SpecialButton 
                color={'accent-purple'}
                text={"Predire"}
                link={null}
                icon={"fa-solid fa-dice"}
                />
        </div>
    )
}

const PopularPredictionButton = ({func}) =>{
    return (
        <div onClick={()=>{func ? func() : null}}>
        <SpecialButton 
                color={"accent-orange"}
                text={"Populaire"}
                link={null}
                icon={"fa-solid fa-fire"}
                />
        </div>
    )
}

const BuushidoLogo = () => {
    const style = {
        margin : '1em 0.1em', border : '3px solid transparent', transition : 'all 200ms',
        borderRadius : '0.3em', height : '6vmax', display : 'grid', placeItems : 'center',
        background: "linear-gradient(to right, #090909, #090909 ) padding-box, linear-gradient(to top right, #000c4e,#5f0067, #740072, #8f1100) border-box"
    }
    return <LogoWriting lien={"/recommendations"} style={style}/>
}