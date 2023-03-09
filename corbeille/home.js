import { useState, useEffect } from "react";
import axios from "axios";
import Serie from "./page_serie";
import Panneau from "./extra";
import Navi from "./navbar";

// this section is about the poster oart
export default function Head(){
    //getting the data from the api about the poster and then setting them and set the state of every poster
    const [data, setData] = useState([])
    const [etat, setEtat] = useState([])
    let active = 0 ;
    
    useEffect(()=>{
       //get api data
        axios.get("https://buushido.ml/api/poster/")
        .then((res) => {
            let donne = res.data
            setData(donne)
        }) 
        
        console.log('API CALLED')
        
    }, [])

    useEffect(() => {
        //setting the states of the poster after receiving data from api
        setEtat(new_etat())
        change_posteur()
    }, [data])
    
    //function to set the states of all the poster for the first time before passing them
    function new_etat(){
        let fake = []
        for (let i=0 ; i < data.length ; i++ ){
            let state = false
            if (i===0){
                state = true
            }
            fake.push(state)
        }
        console.log('function runned')
        return fake
    }
   
    // when one of the cards is clicked    
    function handleclick(i){
        let fake = etat.splice()
        fake[active] = false
        fake[i] = true
        active = i
        setEtat(fake)
    }
    //recursively change the poster every 7 seconds
    function change_posteur(){
        let nouveau = active +1
        nouveau = nouveau > 4 ? 0 : nouveau 
        handleclick(nouveau)
        setTimeout(change_posteur, 7000)
    }


    return(
        <>
        <Navi />
        <section id="head">
            {data.map((elem, id) => {
                // console.log('element is : '+elem+' id is : '+id)
                return(
                    
                    <Poster key={id} etat_main={etat[id]} serie={elem} 
                    onClick={() => {handleclick(id)}}
                    />
                    
                    )
                })}
        </section>
        <Panneau />
        <Serie />
        </>
    )
}

function Poster(props){
    const[etat, setEtat] = useState(false)
    let url = "url('https://buushido.ml" + props.serie.poster_tof + "')"
    // let url = "url('http://127.0.0.1:8000" + props.serie.background_tof + "')"
    let link = "https://buushido.ml/home/"+props.serie.id+"/"
    // let link = "http://127.0.0.1:8000/home/"+props.serie.id+"/"
    useEffect(() => {
        setEtat(props.etat_main)

    }, [props.etat_main])
    // console.log('la serie est : ', props.serie)
    // console.log('etat is :  '+ url +' for '+ props.serie.name)
    if (etat){
        return (
            <>
        
                <div className="poster"
                 style={{backgroundImage : "linear-gradient(to right, #141414, transparent 90%), "+ url ,
                        borderTop : 'solid purple' ,
                        borderBottom : 'solid purple' ,
                        width : '70vw',
                }}
                 >
                    
                    <div className="info"
                    style={{display : "flex"}}
                    >
                        <h1>{props.serie.name}</h1>
                        <h3>{props.serie.lesstext}</h3>
                        <a href={link}><button className="watch">Regarder</button></a>
                    </div>
        
                </div>
        
            </>
        

        )
    }else {
    
    return (
        
        <>
            <div className="poster" style={{backgroundImage : "linear-gradient(to right, #141414, transparent 90%), "+ url,
                width : '6vw',
            }}
            onClick={() => {props.onClick()}}
            >
                
                <div className="info">
                    <div className="icone"><h1>1</h1></div>
                </div>

            </div>

        </>
    )
} }