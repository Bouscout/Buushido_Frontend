// for fetching and displaying the predictions

import { ImagePortrait } from "../self-contained/image-portrait";

import { useEffect, useState } from "react";

const BASE_URL = "https://buushido.com"


export default function Predictions(props){
    const [predicted, setPredicted] = useState([])
    const [parameters, setParams] = useState('')

    // fetching the predictions
    useEffect(() => {
        // parse the information from the array
        const strInputs = props.inputs.map(watch => watch.id).join(",")

        const userInfos = {
            'userOnWifi' : navigator.onLine,
            'userLanguage' : navigator.language,
            "userParams" : parameters, 
        }
        
    
        let recomendation_url = `${BASE_URL}/api/recommendations`
        
        const url = new URL(recomendation_url)
    
    
        url.searchParams.append("watched", strInputs)
        
        for (const info of Object.keys(userInfos)){
            if(userInfos[info]){
                url.searchParams.append(info, userInfos[info])
            }
        }

        // fetching
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const series = data.series
            const params = data.userParams

            if (parameters !== ""){
                // perform operation with new params

                setParams(params)
            }
            console.log("recommended : ", series)
            setPredicted(series)            

    })

    }, [])

    if (predicted.length > 0){

        return (
                <Labeliseur series={predicted}/>   
            )
        }

}


// sub components
const Labeliseur = ({series}) => {
    const Labels = {}

    function giveLabel(id, rate){
        Labels[id] = rate
        console.log(Labels)
    }

    return (
        <section id="conteneur">
           {series.map((serie, i) => {
                return <LabelCard serie={serie} key={i} pos={i} giveLabel={giveLabel}/>
           })}
        
        </section>
    )
}

const LabelCard = ({serie, pos, giveLabel}) => {
    const [rating, setRating] = useState(0.5)
    const name = serie.name

    function giveRating(rate){
        setRating(rate)
        giveLabel(serie.id, rate)
    }

    return (
        <>
        <div className="flex-column card" style={{
            animationDelay : `${pos * 150}ms`
        }}>
                <div className="contenu">
                    <ImagePortrait 
                    src={serie.tof_url}
                    alt={name}
                    load={true}
                    style={{}}
                    />
                </div>

            {/* like and dislike label */}
            <div style={{
                display : 'flex', justifyContent : 'space-around', width : '100%'
            }}>
                <i onClick={()=>giveRating(0)} style={{
                    color : rating === 0 ? "var(--accent-dark-red)" : null
                }} className={`fa-${rating === 0 ? "solid" : "regular"} fa-thumbs-down`}></i>

                <i onClick={()=>giveRating(1)} style={{
                    color : rating === 1 ? "pink" : 'var(--accent-white)'
                }} className={`fa-${rating === 1 ? "solid" : "regular"} fa-heart`}></i>
            
            </div>
            {/* like and dislike label */}

        </div>
        </>
    )
}