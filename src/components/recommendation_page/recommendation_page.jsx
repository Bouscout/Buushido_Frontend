import "./barre.css"
import "./animations.css"
import "./container.css"

import { useState } from "react"

import { InputSeries } from "./inputsSeries"
import BigSearchBar from "./search_bar_components/big_search_bar"
import Predictions from "./predictions"

import NightSky from "./shooting_stars/shooting_stars"

import { ReturnButton } from "./interactionsButton"
import BurgerButton from "./burger_menu/burger_button"

export default function RecommendationPage(){

    const [seriesArray, setSerieArray] = useState({})
    const [recommending, setRecommending] = useState(false)
    const [fetchPopular, setFetchPopular] = useState(false)

    function AddInput(show, refresh=true, del=false){
        // add or delete an element
        if (del){
            delete seriesArray[show.id]
        }else{
            console.log("adding : ", show)
            seriesArray[show.id] = show
        }
        // no need to display the changes directly
        console.log(seriesArray)
        if (!refresh){
            return
        }
        
        // creating new object
        const fake = {...seriesArray}
        
        if (recommending){
            setRecommending(false)
        }
        setSerieArray(fake)
        // in case we don't need to display the changes directly

    }

    function getPopular(){
        setFetchPopular(true)
        setRecommending(true)
    }

    function inputMode(){
        setRecommending(false)
    }

    return (
        <>
        <BurgerButton />

        <BigSearchBar func={AddInput} switch={setRecommending} popular={getPopular}/>
        <NightSky animate={recommending}/>

        {recommending ?
        <>
        <ReturnButton func={inputMode}/>
        <Predictions inputs={seriesArray} popular={fetchPopular} addFunc={AddInput}/>
        </> :
        <InputSeries series_data={seriesArray}/>
        }
        </>
    )

    if (recommending){
        return (
            <>
            <BigSearchBar func={AddInput} switch={setRecommending}/>
            <Predictions inputs={seriesArray}/>
            </>
        )
 
 
    }else {

        return (
            <>
        <BigSearchBar func={AddInput} switch={setRecommending}/>

        <InputSeries series_data={seriesArray} />
        </>
    )
}
}