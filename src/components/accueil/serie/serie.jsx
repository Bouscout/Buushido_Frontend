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
    const [scrl, setScrl] = useState('0%')

    // we'll use the scroll event to find the scroll value and then update the images
    //object position through some percentage of the max scroll width
    function handle_scroll(event){
        let value = event.target
        
        //find max scroll width
        let max = value.scrollWidth - value.clientWidth
        // find percentage
        let new_pos = (value.scrollLeft * 100) / max
        // console.log(`new pos ${new_pos}`)
        setScrl(new_pos.toString()+'%')
    }
    
    if (props.donne.length > 0){
        let data = props.donne
        
        return (
            <>
            <section>
            {data.map((couplet, i)=>{
                return (
                    <section className="ongle" key={i} >
                        {/* <div className="lumiere"> */}
                        <div>
                        <h1 className="onglet-name"
                        >{couplet[0]}</h1>
                        </div>
                        <div className="container" onScroll={e=>{handle_scroll(e)}}>
                        {couplet[1].map((serie, a) =>{
                            return(
                            <div className="contenu" key={a}>
                                <a href={'/serie/'+serie.id} >
                                <ImageNext 
                                src={serie.background_tof}
                                alt={serie.name}
                                posX={scrl}
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
    posX,
}) => {
    let pos = {
        objectPosition : posX + ' 50%',
    }
    return (
        <picture>           
            <source srcSet={'https://buushido.ml'+src+'.webp'} type={mediatype} />
            <img src={'https://buushido.ml'+src} alt={alt} loading='lazy' style={pos} />
        </picture>
    )
}
