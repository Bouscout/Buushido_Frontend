import Pages from "./all_pages"
import Loader_numero_uno from "../self-contained/load_test.jsx"
// import "./serie.css"
import ImagePortrait from "../self-contained/image-portrait.jsx"
import { useEffect, useState } from "react"

export default function Serie_accueil(props){
    // to stock the data from the api
    const [allData, setAllData] = useState([])

    // to check if the api call has been maed
    const [fetched, setFetched] = useState(false)
    
    const id = props.id

    function fetcher(){    
        fetch('https://buushido.ml/api/serie/'+id+'/')
        .then(response => response.json())
        .then(data => {
            // fetched = true
            setAllData(data)
        })
    }
    
    useEffect(()=>{
        fetcher()
        // console.log('the serie data is : ', allData)
        setFetched(true)
    }, [fetched])
    // console.log('fetched is : ', allData[1])

    // check if we have actual data in the api then render the page
    if (allData.length > 0){
    // let url = "url('http://buushido.ml" + data[0].background_tof +".webp')"
    let url = "url('https://buushido.ml" + allData[0].background_tof +"')"
    // let url = "url('http://127.0.0.1:8000" + props.serie.poster_tof + "')"
    return (
        <>
        <div id="water" style={{
                backgroundImage: "linear-gradient(to right,#141414, transparent 90%) ,linear-gradient(to bottom, transparent 90%, purple)," + url ,
        }}>
        </div>
        {/* <Nuage_9 />         */}
        <Details donne={allData[0]} />
        <Pages id={props.id} donne={allData}/>
        </>
    )
    }else {
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

// the details to be rendered on the first page
function Details(props){
    let data = props.donne
    return (

        <section id="top">
            <section id="heading">
                <div style={{marginLeft : '2.5rem' }}>
                        <ImagePortrait style={{
                            width : '17vw',
                            height : 'auto',
                            minWidth : '150px',
                        }} 
                        src={data.tof_url}
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
                                <button>Bug <i className="fa-solid fa-bug"></i></button>
                            </div>

                        </div>
                        </div>
                        <div id="details">

                            {/* all the little details for serie next to the image  */}

                                <h1>{data.name}</h1>          
                                <h2 style={{color : '#f8a100',}}>Statut : <span style={{
                                    fontSize : '2rem'
                                }}>{data.en_cours ? 'Fini':'En cours'}</span></h2>
                                
                                
                                <h2 style={{textAlign : 'left', color : '#f8a100',}}>Note : <span style={{
                                    fontSize : '2rem',
                                }}> <i className="fa-solid fa-star"></i>  {data.note}/10</span>  <span style={{
                                    fontSize : '1rem',
                                }}>sur MyAnimeList and Nautijlon</span> </h2>
                        
                        </div>
        </section>
        
        
        <div id="genres" style={{
            display : 'flex', justifyContent : 'space-evenly', width : '80%', margin : '0 auto',
        }}>
            <h2>{data.genre_1}</h2>
            <h2>{data.genre_2}</h2>
            <h2>{data.genre_3}</h2>
            <h2>{data.genre_4}</h2>
        </div>
        </section>
    )
        
}

export const Imagetop = ({
    src , 
    alt , 
    style,
    mediatype = 'image/webp' ,
}) => {
    return (
        <picture style={style ? style : {}}>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={src+'.webp'} type={mediatype} />
            <img src={src} alt={alt} />
        </picture>
    )
}