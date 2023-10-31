// for storing and displaying the shows the user chose as inputs

import { useState } from "react";
import { useEffect } from "react";

import { ImagePortrait } from "../self-contained/image-portrait";

export const InputSeries = ({series_data}) => {
    const series = series_data
    // const [series, setSeries] = useState([])

    // useEffect(() => {
    //     setSeries(series)
    //     console.log("taille : ", series.length)
    // }, [series_data])
    
    if (series.length > 0){

        return (
        <>
            <section id="conteneur">
                {series.map((serie, i) => {
                    return <Element serie={serie}/>
                })}
            </section>
        </>
    )
}
}

const Element = ({serie}) => {
    console.log("showing : ", serie.name)
    return (
        <div className="flex-column card">

        <div className="contenu">

            <ImagePortrait 
            src={serie.tof_url}
            style={{}}
            alt={serie.name}
            load={true}
            />
        </div>
            
            <h2>{serie.name}</h2>

        </div>
    )
}