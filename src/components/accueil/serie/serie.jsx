import { useState, useEffect } from "react";
import React from "react";
import { Loader_dos } from "../../self-contained/load_test";
import ContainerSeries from "./containeur_serie";
import { Single } from "../poster/anim";
import Onglet_info from "./onglet_info";
const BASE_URL = "https://buushido.com"

// import '../decorations/index.css' ;


export default function OngletSerie(props){
    const [data, setData] = useState(props.data ? props.data : [])

    // to handle the presence of the extra details on click
    
    // in case data are being passed as static
    if (props.data){
        useState(props.data) ;
    }else{
        useEffect(()=>{
            fetch(`${BASE_URL}/api${props.num}/`)
            .then(response => response.json())
            .then(data => {
                
                console.log('api called for video : ')
            // set the data from the api into the components
                setData(data)
        },(error) => {
            console.log('the error is : ', error)
        }
        
        ) ; 
    }, [])
    }
    return (
        <>
        <Wrapper donne={data} conserve={props.conserve}/>
        </>
    )
}

function Wrapper(props){
    
    if (props.donne.length > 0){
        let data = props.donne
        
        return (
            <>
            <section>
            {data.map((couplet, i)=>{
                const onglet = couplet[0]
                const series = couplet[1]
                return ( 
                    <section key={i} className="onglet">
                       <Onglet_container onglet={onglet} series={series} conserve={
                        Array.isArray(props.conserve) ? props.conserve[i]:false 
                            }  key={i}/>
                    </section>
                )
                    }
            )}
            
            
            </section>
            </>
        )
    }
   
    
    else {
        return (
            <>
          
            <section className="onglet">
                <h1 className="onglet-name">Onglet</h1>
                <Single />
            </section>
            </>
        )
    }
}

function Onglet_container(props){
    const series = props.series
    const onglet = props.onglet  

    // in order to ensure that only 14 series would be displayed on the main page
    let trimmed_serie = series.length > 14 ? series.slice(0, 15) : series
    
    return (
        <>
            <Onglet_info onglet={onglet} series={series}/>
                        
            <ContainerSeries all_series={trimmed_serie} conserve={props.conserve}/>
        </>
    )
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  