// for storing and displaying the shows the user chose as inputs

import { ImagePortrait } from "../self-contained/image-portrait";
import { Element_My_Anime } from "./serieCard/likedCard";

export const InputSeries = ({series_data}) => {
    const series = Object.values(series_data)
      
    if (series.length > 0){

        return (
        <>
            <section id="conteneur">
                {series.map((serie, i) => {
                    // return <Element serie={serie}/>
                    return <Element_My_Anime serie={serie}/>
                })}
            </section>
        </>
    )
}
}
