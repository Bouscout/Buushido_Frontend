import { useState } from "react"
import { useEffect } from "react"
// import "../decorations/index.css"


export default function Poster_v2(props){
    const[etat, setEtat] = useState(props.etat_main)

    // poster url for production mode
    let url = "url('https://buushido.ml/static/media" + props.serie.poster_tof + "')"
    
    const i = props.pos
    const the_ref = props.innerRef
    // console.log(`the ref for ${props.serie.name} is ${the_ref}` )

    useEffect(()=>{
        setEtat(props.etat_main)
    }, [props.etat_main])
    if (etat){
        return (
            <div ref={the_ref} style={{
                width : '100%', scrollSnapAlign : 'start',
                // animation : '  fade_in 500ms ease-out 0s 1 both',                
            }}>
        
                <div className="poster"
                 style={{backgroundImage : "linear-gradient(to right, #141414, transparent 90%),  "+ url ,
                 borderTop : 'solid black' ,
                 borderBottom : 'solid black' ,
                 borderLeft : 'solid #f8a100',
                 borderRIght : 'solid #f8a100',
                 width : '99vw', margin : '0 auto'
                }}
                >
                    
                    <div className="info"
                    style={{display : "flex"}}
                    >
                        <h1>{props.serie.name}</h1>
                        <h3>{props.serie.lesstext}</h3>
                    </div>
                        <a href={'/serie/'+props.serie.id}><button className="watch">Regarder</button></a>
        
                </div>
        
            </div>
        
        
        )
    }else {
    
    return (
        
        <div ref={the_ref} style={{
            width : '100%',
            scrollSnapAlign : 'start'
            }}>
            <div className="poster" style={{backgroundImage : "linear-gradient(to right, #141414, transparent 90%), "+ url,
                width : '37.2vw',  
            }}
            onClick={() => {props.onClick()}}
            >
                {/* <Lantern /> */}
                <div className="info">
                    <div className="icone"><h1>1</h1></div>
                </div>

            </div>

        </div>
    )
} }