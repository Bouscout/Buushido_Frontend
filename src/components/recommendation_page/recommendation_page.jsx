import "./barre.css"
import "./animations.css"

import BigSearchBar from "./search_bar_components/big_search_bar"
import { useState } from "react"

export default function RecommendationPage(){

    const [inputSeries, setInputSerie] = useState([])
    const [recommended, setRecommended] = useState([])

    function AddInput(showId){
        inputSeries.push(showId)
        console.log(inputSeries)
    }

    return (
        <BigSearchBar func={AddInput}/>
    )
}