import { useEffect, useState } from "react"
import "./shooting_starts.css"


export default function NightSky(){
    const [falling, setFalling] = useState(false)
    const [starsPosition, setStarsPosition] = useState([])

    const numStars = 20
    const StarsPerSection = Math.floor(numStars / 4)
    const margin = 2

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
                
                let xPosition = Math.floor(Math.random() * (upperX - lowerX + 1)) + lowerX
                let yPosition = Math.floor(Math.random() * (upperY - lowerY + 1)) + lowerY
                
                Section.push([
                    Math.floor(Math.random() * (upperX - lowerX + 1)) + lowerX,
                    Math.floor(Math.random() * (upperY - lowerY + 1)) + lowerY
                ])
            }
            allStars.push(Section)

        }
        setStarsPosition(allStars)

    }, [])



    const NumFallingStarts = 15

    function ActivateFalling(){
        console.log("function ac : ")
        setFalling(true)
    }

    console.log(starsPosition)

    return (
        <section id="sky" onClick={()=>{ActivateFalling()}}>
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
        "--delay" : `${ShiningDelay}ms`
    }}></div>
}

const FallingStars = () =>{
    const xPosition = Math.floor(Math.random() * (20))
    const yPosition = Math.floor(Math.random() * (90 - 10 + 1)) + 10

    const ShiningDelay = Math.floor(Math.random() * 4000)

    console.log("falling star : ")
    return (
        <div className="star" style={{
            top : `${yPosition}%` , left : `${-xPosition}%`, 
            "--duration" : "3s",
            "--delay" : `${ShiningDelay}ms`,
            animation : "tail var(--duration) ease-in-out var(--delay) infinite, falling var(--duration) ease-in-out var(--delay) infinite "
        }}></div>
    )
}