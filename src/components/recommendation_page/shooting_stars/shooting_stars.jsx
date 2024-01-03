import { useEffect, useState } from "react"
import "./shooting_stars.css"


export default function NightSky(props){
    // console.log("animation is : ", props.animate)
    const [falling, setFalling] = useState(props.animate)
    const [starsPosition, setStarsPosition] = useState([])

    const numStars = 20
    const StarsPerSection = Math.floor(numStars / 4)
    const margin = 2

    const NumFallingStarts = 20

    useEffect(() => {
        const allStars = []

        // left half
        for (let i = 0; i < 4; i++) {
            const Section = []

            let upperX, lowerX
            let upperY, lowerY
            if (i >= 2){
                upperX = 100 - margin
                lowerX = 50 + margin
            }else { 
                upperX = 50 - margin
                lowerX = margin
            }
            
            for (let x = 0; x < StarsPerSection; x++){
                upperY = ((i % 2) * 50) + 50 - margin
                lowerY = ((i % 2) * 50) + margin
                
                Section.push([
                    Math.floor(Math.random() * (upperX - lowerX + 1)) + lowerX,
                    Math.floor(Math.random() * (upperY - lowerY + 1)) + lowerY
                ])
            }
            allStars.push(Section)

        }
        setStarsPosition(allStars)

    }, [])

    // for triggering animation of shooting starts
    useEffect(() => {
        setFalling(props.animate)
    }, [props.animate])   

    return (
        <section id="sky" style={{
            animation : falling ? " exploring 10s linear 0s 1 both " : null
        }} >
            {starsPosition.map((starSection, i)=> {
                return starSection.map((star, i) => {
                    return <BlinkingStar xPosition={star[0]} yPosition={star[1]} key={i}/>
                })

                
            })}

            {falling && 
            <>
            {Array(NumFallingStarts).fill(1).map((star, i)=>{
                return <FallingStars key={i}/>
            })}
            </>
            }
       
       
        </section>
    )

}

const BlinkingStar = ({xPosition, yPosition}) => { 
    const ShiningDelay = Math.floor(Math.random() * 2000)

    return <div className="star" style={{
        top : `${yPosition}%` , left : `${xPosition}%`, 
        "--delay" : `${ShiningDelay}ms`,
        "--duration" : '2s',
    }}></div>
}

const FallingStars = () =>{
    const xPosition = Math.floor(Math.random() * (30))
    const yPosition = Math.floor(Math.random() * (90 - 10 + 1)) + 10

    const ShiningDelay = Math.floor(Math.random() * 5)

    return (
        <div className="star" style={{
            top : `${yPosition}%` , left : `${-xPosition}%`, 
            "--duration" : "3s",
            "--delay" : `${ShiningDelay}s`,
            animation : "tail var(--duration) ease-in-out var(--delay) infinite, falling var(--duration) ease-in-out var(--delay) infinite "
        }}></div>
    )
}