import { useState, useContext } from "react";
// import './serie.css'
import Detail_serie from "./details_serie";
import Episodes from "./episodes";
// import {quickContext} from "./page_serie";


export default function Pages(props){
    const data = props.donne
    const [status, setEtat] = useState([true, false, false])
    // const [episodes, setEpisodes] = useState(data[1])
    const active = {borderBottom : 'solid mediumvioletred',}
    const inactive = {borderBottom : 'solid transparent',}

    const quick = props.quick


    //let's fetch the updated episodes list from the api
    // useEffect(()=>{
    //     fetch('https://buushido.ml/api/episode/'+props.id+'/')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('API CAllED')
    //         // console.log('les donnes recueillis sont : ', data)
    //         setEpisodes(data)
    //     })
    // }, [])
    function handleclick(x){
        let fake = [false, false, false]
        fake[x] = true
        setEtat(fake)
    }
    // passing the props for quick watch
    if(quick){
        return(
            <>
        {/* the different buttons for the different options of pages, we'll add border to check which one is selected */}
        <div className="option">
            <button onClick={()=>{handleclick(0)}} style={status[0] ? active : inactive}>Details</button>
            <button onClick={()=>{handleclick(1)}} style={status[1] ? active : inactive}>Episodes</button>
            <button onClick={()=>{alert("Desole, cette section n'est pas finie")}}>Commentaires</button>
        </div>
    {/* <Detail_serie donne={data[0]} /> */}
    <Episodes id={props.id} donne={data[1]} serie={data[0].name} quick={quick} />
    {/* <Episodes donne={episodes.length > 0 ? episodes : data[1]} serie={data[0].name} /> */}
        </> 
    )

    }
    else if(status[0]){
    return(
        <>
        {/* the different buttons for the different options of pages, we'll add border to check which one is selected */}
        {/* <div className="option">
            <button onClick={()=>{handleclick(0)}} style={status[0] ? active : inactive}>Details</button>
            <button onClick={()=>{handleclick(1)}} style={status[1] ? active : inactive}>Episodes</button>
            <button onClick={()=>{alert("Desole, cette section n'est pas finie")}} style={status[2] ? active : inactive}>Commentaires</button>
        </div> */}
    <Detail_serie donne={data[0]} num={data[1].length} />
    {/* <Episodes donne={data[1]} serie={data[0].name} /> */}
    <hr style={{color : '#4e4e4e25', width : '90%', opacity : '0.25'}}/>

    <Episodes id={props.id} donne={data[1]} serie={data[0].name} 
        saison_info={data[0].saisons} films={data.length === 3 ? data[2] : null}
         />
        </> 
    )
    }else {
    
        return(
                <>
            {/* the different buttons for the different options of pages, we'll add border to check which one is selected */}
            {/* <div className="option">
                <button onClick={()=>{handleclick(0)}} style={status[0] ? active : inactive}>Details</button>
                <button onClick={()=>{handleclick(1)}} style={status[1] ? active : inactive}>Episodes</button>
                <button onClick={()=>{alert("Desole, cette section n'est pas finie")}}>Commentaires</button>
            </div> */}
        {/* <Detail_serie donne={data[0]} /> */}
        <Episodes id={props.id} donne={data[1]} serie={data[0].name} 
        saison_info={data[0].saisons} films={data.length === 3 ? data[2] : null}
         />
        {/* <Episodes donne={episodes.length > 0 ? episodes : data[1]} serie={data[0].name} /> */}
            </> 
        )
    }
    }



