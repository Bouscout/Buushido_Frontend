
// import './index.css'
import {ImagePortrait} from '../self-contained/image-portrait.jsx'
import { useEffect, useRef, useState } from 'react'

import Tracker from './tracker'

// this file will handle the structure of the annonce page
export default function Anonces(props){
    const [start, setStart] = useState(false)
    useEffect(()=>{
        setStart(true)
    }, [])

     
    if (start){

        return(
            <>
            <Day_box day={props.name} liste={props.series}/>
            
        </>
    )
}else {
    return (
        <section id={props.name} style={{
            width : '90vw',  opacity : '0.1'
        }} />
    )
}
}



const Day_box = ({liste, day}) =>{
    const actual = useRef(null)
    
    const [more, setMore] = useState(false)

    useEffect(()=>{
        const elementHeight = actual.current.clientHeight;
        const elementScrollHeight = actual.current.scrollHeight;
        

        if(elementScrollHeight > elementHeight){
            setMore(true)
        }

    }, [])

    function next_section(up){
        // function to scroll the series in case of an overflow
        const element = actual.current ;

        // in case we need to scroll up
        const direction = up ? -element.scrollHeight : element.scrollHeight

        // element.scrollTop = direction
        element.scrollTo({
            top: direction,
            behavior: 'smooth',
          });
    }


    return(
        <>
        <section id={day} className='day-section' style={{
            animation: 'emerging 1500ms linear 500ms 1 both'
        }}>
            {more && 
            <NextSection scroller={next_section}/>
            }
        <h2>{day}</h2>
            <div ref={actual} className='container'>
            {liste.map((x, i) =>{
                let source = x.slice(32, (x.length - 5))
                const name = 'S1| episode 4'


                let delay = 1500 + (i * 200)  
                
                const style = {
                   width : '16.3vw',
                   aspectRatio : '13 / 8',
                   borderRadius : '8px',
                   maxWidth : '300px', minWidth : '180px', 
                   animation: 'appear 500ms linear 0s 1 both',
                   animationDelay : `${delay}ms`, 
               }
                return (
                    <div key={i} style={{
                        display : 'flex', flexDirection : 'column', rowGap : '0px',
                    }}>
                    <a>
                        <ImagePortrait 
                        style={style}
                        src={source}
                        alt={'son nom'}
                        load={true}
                        />
                    </a>
                    <h3 style={{
                        animation: 'appear 500ms linear 0s 1 both',
                        animationDelay : `${delay + 1000}ms`,
                    }}>{name}</h3>
                        </div>
                )
            })}
            </div>
            </section>
        </>
    )

}

const NextSection = ({scroller}) =>{
    const [up, setUp] = useState(false)
    const handleclick = ()=>{
        scroller(up)
        setUp(!up)
    }
    return (
        <>
        <div className='next' onClick={handleclick}>
        <h2><i className={`fa-solid fa-circle-chevron-${up ? 'up' : 'down'}`}></i></h2>
        </div>
        </>
    )
}