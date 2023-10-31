import "./barre.css"
import "./animations.css"
import "./container.css"

import { useState } from "react"

import { InputSeries } from "./inputsSeries"
import BigSearchBar from "./search_bar_components/big_search_bar"

export default function RecommendationPage(){

    const [seriesArray, setSerieArray] = useState([])
    const [recommended, setRecommended] = useState([])

    function AddInput(show){
        const fake = seriesArray.slice()
        fake.push(show)
        // console.log(inputSeries.length)
        setSerieArray(fake)
    }

    return (
        <>
        <BigSearchBar func={AddInput}/>

        <InputSeries series_data={seriesArray} />
        </>
    )
}