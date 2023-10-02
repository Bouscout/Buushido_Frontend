

// function to have a large barre showing the progression of the scroll with time stamp

import { useEffect, useMemo, useState } from "react"

export default function Tracker(props){
    const jour = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    
    // element.addEventListener('scroll', (e)=>{
    //     console.log('scrolling')
    //     const scrolled = window.scrollY
    //     const total = window.scrollHeight
    // })
    return (
        <>
        <Prog_bar />
        <Prog_bar days={jour}/>
        </>
    )
}

const Prog_bar= ({days}) =>{

    const [progression, setProg] = useState(0)
    useEffect(()=>{
        const element = document.querySelector('#app')
        const maxPossible = 0.80 // value possible with scroll snap

        element.addEventListener('scroll', e=>{
            const total = element.scrollHeight
            const scrolled = element.scrollTop

            const progres = (scrolled / total) / maxPossible
            // console.log((scrolled / total) / maxPossible)
            setProg(progres)
        })
    }, [])
   
    const barStyle =  {
        position : 'relative',
        width : '100%',
        height : '1px'
    }
    if (Array.isArray(days)){

    return (
        <>
        <div className="tracker">
            <div style={barStyle}>
                <hr className="progres" style={{
                    borderWidth : '4px',
                    transform : `scaleX(${progression})`
                }}></hr>

                {/* placing the days on the progress bar */}
                {days.map((day, i)=>{
                    let decal = (i * 13) + 13 
                    return (
                        <Stamp key={i} day={day} left={decal}/>
                    )
                })}
            </div>
        </div>
        </>
        )
    }else{


        // meaning it is the white bar
       
    
        const barType = {
            background : '#888888ac',
            color : '#888888ac',
            transform : 'scaleX(1)',
            borderWidth : '1px',
        } 


        return (
            <>
            <div className="tracker" style={{zIndex : '4'}}>
                <div style={barStyle}>
                    <hr className="progres" style={barType}></hr>
                </div>
            </div>
            </>
            )

    }
}



const Stamp = ({left, day}) => {

  

    return (
        <>
            <div className="stamp" style={{
                left : `${left}%`
            }}>
                <a href={'#' + day}>
                <h3>{day[0]}</h3>
                </a>
            </div>
        </>
    )
}
