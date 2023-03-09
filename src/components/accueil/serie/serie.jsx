import { useState, useEffect } from "react";
import React from "react";
import { Loader_dos } from "../../self-contained/load_test";
// import '../decorations/index.css' ;


export default function OngletSerie(props){
    const [data, setData] = useState(props.data ? props.data : [])
    if (props.data){
        useState(props.data) ;
    }else{
        useEffect(()=>{
            fetch('https://buushido.ml/api'+props.num+'/')
            .then(response => response.json())
            .then(data => {
                console.log('api called for video')
            // set the data from the api into the components
                setData(data)
        }) ; 
    }, [])
    }

        
    
    return (
        <>
        <Montre donne={data} />
        </>
    )
}

function Montre(props){
   
    
    if (props.donne.length > 0){
        let data = props.donne
        
        return (
            <>
            <section>
            {data.map((couplet, i)=>{
                return (
                    <section className="ongle" key={i}>
                        {/* <div className="lumiere"> */}
                        <div>
                        <h1 className="onglet-name"
                        >{couplet[0]}</h1>
                        </div>
                        <div className="container">
                        {couplet[1].map((serie, a) =>{
                            return(
                            <div className="contenu" key={a}>
                                <a href={'/serie/'+serie.id} >
                                <ImageNext 
                                src={serie.background_tof}
                                alt={serie.name}
                                />
                            </a>
                            </div>
                            )
                        })}
                        </div>
                    </section>
                )
            })}
            </section>
            </>
        )
    }else {
        return (
            <>
            {[1, 1, 1].map((cas, i) => {
                return (
                    <section className="ongle">
                        <h1 className="onglet-name">Tempo</h1>
                        <div className="container">
                        {[1,1,1,1,1,1,1].map(cas => {
                            return(
                                <div className="contenu">
                                    <Loader_dos />
                                </div>
                            )
                        })}
                        </div>
                    </section>
                )
            })}
            </>
        )
    }
}
const ImageNext = ({
    src, 
    alt, 
    mediatype = 'image/webp' ,
}) => {
    return (
        <picture>           
            <source srcSet={'https://buushido.ml'+src+'.webp'} type={mediatype} />
            <img src={'https://buushido.ml'+src} alt={alt} />
        </picture>
    )
}
