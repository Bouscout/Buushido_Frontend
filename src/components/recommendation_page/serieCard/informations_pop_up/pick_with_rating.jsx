// picture with rating options on a scale to 10 stars

import { useState } from "react"
import { ImagePortrait } from "../../../self-contained/image-portrait"

export const PickWithRating = ({serie}) => {
    const [active, setActive] = useState(0)

    function changeActive(value){
        setActive(value)
        // storing information for label
    }
    // --image-min-width : 100px;
    // --image-width : 11vw;
    const picStyle = {
        aspectRatio: "11.45 / 16",
        width : "100%",
        minWidth : "var(--image-min-width)",
        borderRadius : "0.2em",
    }

    return (
        <div className="flex-column center">
            <ImagePortrait 
            src={serie.portrait_pic}
            alt={serie.title}
            style={picStyle}
            load={true}
            direct={true}
            />

            <RatingStars active={active} changeActive={changeActive}/>
        </div>
    )

}


const RatingStars = ({active, changeActive}) => {
    const MaxScale = 10

    return (
        <div className="flex" style={{
            justifyContent : 'space-around'
        }}>
            {Array(MaxScale).fill(0).map((x, i)=> {
                return (
                    <div key={i} onClick={()=>{changeActive(i+1)}}>
                        <i class={`${i >= active ? "fa-regular fa-star" : "fa-solid fa-star"} hover-scale`}></i>
                    </div>
                )
            })}
        </div>
    )
}