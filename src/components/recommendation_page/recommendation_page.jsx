import "./barre.css"
import "./animations.css"
import "./container.css"

import { useState } from "react"

import { InputSeries } from "./inputsSeries"
import BigSearchBar from "./search_bar_components/big_search_bar"
import Predictions from "./predictions"

import NightSky from "./shooting_stars/shooting_stars"

export default function RecommendationPage(){

    const [seriesArray, setSerieArray] = useState([])
    const [recommending, setRecommending] = useState(false)

    function AddInput(show){
        const fake = seriesArray.slice()
        fake.push(show)
        // console.log(inputSeries.length)
        setSerieArray(fake)
    }

    return <NightSky />

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