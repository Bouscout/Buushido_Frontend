import "./animations.css"
import "./serieCard/container.css"

import { useState } from "react"

import { InputSeries } from "./inputsSeries"
import BigSearchBar from "./search_bar_components/big_search_bar"
import Predictions from "./predictions"

import NightSky from "./shooting_stars/shooting_stars"

import { ReturnButton } from "./interactionsButton"
import UpMenu from "./burger_menu/up_menu"

import serieContext from "../../utils/serie_context"

import InfoPopUp from "./serieCard/informations_pop_up/info_pop_up"

export default function RecommendationPage(){
    const [focus, setFocus] = useState(false)
    const [seriesArray, setSerieArray] = useState({})
    const [blackList, setBlackList] = useState([])
    const [recommending, setRecommending] = useState(false)
    const [fetchPopular, setFetchPopular] = useState(false)

    // add show inside the seriesArray
    function AddInput(show, refresh=true, del=false){
        // add or delete an element
        if (del){
            delete seriesArray[show.id]
        }else{
            console.log(`adding ${show.id} : ${show.title} `)
            seriesArray[show.id] = show
        }
        // no need to display the changes directly
        console.log(seriesArray)
        if (!refresh){
            return
        }
        
        // creating new object
        const fake = {...seriesArray}
        
        setRecommending(false)
        setFocus(true)
        setSerieArray(fake)
        // in case we don't need to display the changes directly

    }

    // series the user don't want to see
    function addBlackList(show){
        blackList.push(show.id)
    }

    function getPopular(){
        setFocus(true)
        setFetchPopular(true)
        setRecommending(true)
    }

    // shift the seach bar to the top
    function inputMode(){
        setRecommending(false)
    }


    return (
        <serieContext.Provider value={{
            "addLiked" : AddInput,
            "addBlacklist" : addBlackList,
            "inputMode" : inputMode,
            "getPrediction" : setRecommending,
            "setFocus" : setFocus,
            "getPopular" : getPopular,
            "reset" : setSerieArray,
        }}>
            <InfoPopUp />

            <UpMenu />

            <BigSearchBar focus={focus} func={AddInput} switch={setRecommending} popular={getPopular}/>
            <NightSky animate={recommending}/>

            {recommending ?
            <>
            <ReturnButton func={inputMode}/>
            <Predictions inputs={seriesArray} blackList={blackList} popular={fetchPopular}/>
            </> :
            <InputSeries series_data={seriesArray}/>
            }

        </serieContext.Provider>
    )

   
}