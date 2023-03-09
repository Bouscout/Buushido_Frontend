import axios from "axios"
import { useEffect, useState } from "react"
import Pages from "./all_pages"
import "./serie.css"
export default function Serie_accueil(props){
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/serie/19/')
        .then((res)=>{
            setData(res.data)
        })
    }, [])
    if (data.length > 0){
        console.log('premier : ', data)
        let url = "url('http://127.0.0.1:8000" + data[0].background_tof +"')"
        // let url = "url('http://127.0.0.1:8000" + props.serie.poster_tof + "')"
        return (
            <>
            <div id="water" style={{
                    backgroundImage: "linear-gradient(to right,#141414, transparent 90%) ,linear-gradient(to bottom, transparent 90%, purple)," + url ,
            }}>
            </div>
            
            <Details donne={data[0]} />
            <Pages />
            </>
        )
    }
}

function Details(props){
    let data = props.donne
    console.log('les donnes sont :',data)
    return (
        <>
        <section id="heading">
        <div>
        <Imagetop 
        src={'http://127.0.0.1:8000'+data.tof_url}
        alt={data.name}
        />
        <div className="controle">
            <button>Regarder</button>
            <button><i id="icon" className="fa-regular fa-circle-check"></i> <span id="watch">Watchlist</span></button>
            <div style={{
                display : 'grid',
                gridTemplateColumns : 'auto 35%',
            }}>
                <button>Partager</button>
                <button><i className="fa-solid fa-bug"></i></button>
            </div>
        </div>
        </div>
        <div id="details">

            {/* all the little details for serie next to the image  */}

        <h1>{data.name}</h1>          
        <h2 style={{textAlign : 'center'}}><span style={{
            fontSize : '2rem',
        }}> <i className="fa-solid fa-star"></i>  9.2/10</span>  <span style={{
            fontSize : '0.5rem',
        }}>sur MyAnimeList and Nautijlon</span> </h2>
        <div style={{
            display : 'flex',
            justifyContent : 'space-around' ,
            color : '#1ffff0',
            textShadow : '0 -40px 100px, 0 0 2px, 0 0 1em #1ffff0, 0 0 0.5em #1ffff0, 0 0 0.1em #1ffff0, 0 10px 3px #000',
        }}>
            <h2>{data.genre_1}</h2>
            <h2>{data.genre_2}</h2>
            <h2>{data.genre_3}</h2>
            <h2>{data.genre_4}</h2>
        </div>
        <h2>Statut : <span style={{
            fontSize : '2rem'
        }}>En cours</span></h2>
        </div>
        </section>
        </>
    )
        
}

const Imagetop = ({
    src , 
    alt , 
    mediatype = 'image/webp' ,
}) => {
    return (
        <picture>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={src} type={mediatype} />
            <img src={src} alt={alt} />
        </picture>
    )
}