import { useEffect } from "react"
import { ImagePortrait } from "../self-contained/image-portrait"
import { useState } from "react"
import Loader_numero_uno from "../self-contained/load_test"
const BASE_URL = "https://buushido.com"
// import './genre.css'
export default function Genres_serie(props){

    const [series, setSeries] = useState([])
    const name = props.name

    useEffect(()=>{
        fetch(`${BASE_URL}/api/genre/`+name+'/')
        .then(response => response.json())
        .then(data =>{
            console.log('les donnes sont : ', data)
            setSeries(data)
        },(error)=>{
            console.log('error : ', error)
        }
        )
    }, [])
    //getting data from top level api

    if (series.length > 0){
        
        return (
            <>
            <Header name={name} />
            <Series data={series} />
            </>
        )
    }else {
        <Header name={name} />
        let style = {
            position : 'fixed',
            zIndex : '2',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
          textAlign : 'center',
          top : '50%',
          left : '50%',
          width : '80vw',
          height : '100vh',
          translate : '-50% -50%'
            }
            return(
                <>
                <div style={{
                    margin : '120vh 0',
                }}></div>
                <Loader_numero_uno style={style} />
                </>
                ) 
    }
}




function Header(props){
    return (
        <>
        <section id="header">
            <div id="heading">{props.name}</div>
        </section>
        </>
    )
}

function Series(props){
    const series = props.data
    const styling = {
        width : '14.2vw',
        minWidth : '110px',
        aspectRatio : ' 10 / 16',
    }

        return (
            <>
        <section id="conteneur">
            {series.map((serie, i)=>{
                return(
                <div key={i} className="contenu" style={{
                    animationDelay : (Math.random() * 500 )  + 'ms',
                }}>
                    <a href={'/serie/'+serie.id}>
                    <ImagePortrait style={styling} src={serie.tof_url} alt={serie.name} />
                    </a>
                </div>
                )
            })}
        </section>
        </>
    )
   

}