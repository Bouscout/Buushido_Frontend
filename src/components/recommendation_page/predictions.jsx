// for fetching and displaying the predictions

import SetLabel from "../../background_processes/recommendations/label";
import SendLabel from "../../background_processes/recommendations/send_label";

import { LabelCard } from "./serieCard/labelCard";

import { useEffect, useState, useContext } from "react";
import serieContext from "../../utils/serie_context";
import InfoPopUp from "./serieCard/informations_pop_up/info_pop_up";

const BASE_URL = import.meta.env.SITE


export default function Predictions({inputs, blackList, popular}){
    const [predicted, setPredicted] = useState([])
    const [parameters, setParams] = useState('')

    const delay = 4000

    // fetching the predictions
    useEffect(() => {
        let url
        const series = Object.values(inputs)

        if (series.length == 0 && popular){
            url = `${BASE_URL}/recommendations/get_popular`
            console.log("fetching popular")
        
        }else {
            console.log("fetching regular")
        // parse the information from the array
        const strInputs = series.map(watch => watch.id).join(",")        
    
        // let recomendation_url = `${BASE_URL}/api/recommendations`
        let recomendation_url = `${BASE_URL}/recommendations/get_recommendations_visitor`
        url = new URL(recomendation_url)
        
        // url.searchParams.append("watched", strInputs)
        url.searchParams.append("animes", strInputs)

        // element to avoid
        if (blackList.length > 0){
            console.log("blacklist is : ", blackList)
            const blacklistStr = blackList.join(",")
            url.searchParams.append("black_list", blacklistStr)
        }
        
        const userInfos = JSON.parse(localStorage.getItem("buushido_userInfos"))
        if (userInfos !== null){

            for (const info of Object.keys(userInfos)){
                if(userInfos[info]){
                    url.searchParams.append(info, userInfos[info])
                }
            }
        }
        }

        // fetching
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // const series = data.series
            const series = data
            const params = data.userParams

            // if (parameters !== ""){
            //     // perform operation with new params
            //     setParams(params)
            // }
            console.log("recommended : ", data)

            setTimeout(() => {
                setPredicted(series)            
            }, delay)

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

    const [serieFocus, setSerieFocus] = useState(null)
    const {addLiked, addBlacklist} = useContext(serieContext)

    function giveLabel(show, rate){
        Labels[show.id] = rate
        console.log(Labels)

        if (rate === 1){
            // we add the show to the list of liked
            addLiked(show, false)
        }else if(rate === 0){
            // we delete the show from liked show list
            addLiked(show, false, true)
            addBlacklist(show)
        }

    }

    return (
        <>

        {serieFocus && 
        <InfoPopUp serie={serieFocus} cancel={setSerieFocus}/>
        }
        
        <section id="conteneur">
           {series.map((serie, i) => {
               return <LabelCard serie={serie} key={i} pos={i} giveLabel={giveLabel} setFocus={setSerieFocus}/>
            })}
        
        </section>
        </>
    )
}
