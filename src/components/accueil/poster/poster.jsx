import { useState } from "react"
import { useEffect } from "react"
// import "../decorations/index.css"

export default function TopPoster(props){
    const BASE_URL = "https://buushido.com"
    const[etat, setEtat] = useState(props.etat_main)

    // poster url for production mode
    let url = `url('${BASE_URL}/static/media` + props.serie.poster_tof + "')"

    const i = props.pos
    // poster url for debug mode
    // let url = "url('https://buushido.ml" + props.serie.poster_tof + "')"

    // for server serving image files

    //for testing server
    // let url = "url('http://10.0.0.89:8000" + props.serie.background_tof + "')"

    useEffect(()=>{
        setEtat(props.etat_main)
    }, [props.etat_main])
    if (etat){
        return (
            <>
        
                <div className="poster"
                 style={{backgroundImage : "linear-gradient(to right, #141414, transparent 90%), "+ url ,
                 borderTop : 'solid black' ,
                 borderBottom : 'solid black' ,
                 width : '70vw',
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
        
            </>
        
        
        )
    }else {
    
    return (
        
        <>
            <div className="poster" style={{backgroundImage : "linear-gradient(to right, #141414, transparent 90%), "+ url,
                width : '7.2vw',
            }}
            onClick={() => {props.onClick()}}
            >
                {/* <Lantern /> */}
                <div className="info">
                    <div className="icone"><h1>1</h1></div>
                </div>

            </div>

        </>
    )
} }