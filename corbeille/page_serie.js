import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Serie(){
    const [data, setData] = useState([]) ;

    useEffect(()=>{
    //   axios.get("https://buushido.ml/api/")
      axios.get("https://buushido.ml/api/")
      .then((res)=>{
        let donne = res.data ;
        setData(donne)
      })
    }, [])

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
                        style={{
                            animationDelay : ''+Math.random()*10+'s'
                        }}
                        >{couplet[0]}</h1>
                        </div>
                        <div className="container">
                        {couplet[1].map((serie, a) =>{
                            return(
                            <div className="contenu" key={a}>
                                <ImageNext 
                                src={serie.background_tof}
                                alt={serie.name}
                                />
                                <div className="nom">
                                    <h3>{serie.name}</h3>
                                </div>
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
        return <h1> rien a signaler</h1>
    }
}
const ImageNext = ({
    src, 
    alt, 
    mediatype = 'image/webp' ,
}) => {
    return (
        <picture>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={'https://buushido.ml'+src} type={mediatype} />
            <img src={'https://buushido.ml'+src} alt={alt} />
        </picture>
    )
}
