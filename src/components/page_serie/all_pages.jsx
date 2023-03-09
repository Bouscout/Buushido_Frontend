import { useEffect, useState } from "react";
// import './serie.css'
export default function Pages(props){
    const data = props.donne
    const [status, setEtat] = useState([true, false, false])
    const [episodes, setEpisodes] = useState([])
    const active = {borderBottom : 'solid #f8a100',}
    const inactive = {borderBottom : 'solid transparent',}

    //let's fetch the updated episodes list from the api
    useEffect(()=>{
        fetch('https://buushido.ml/api/episode/'+props.id+'/')
        .then(response => response.json())
        .then(data => {
            console.log('API CAllED')
            console.log('les donnes recueillis sont : ', data)
            setEpisodes(data)
        })
    }, [])
    console.log('after api called : ', episodes)
    function handleclick(x){
        let fake = [false, false, false]
        fake[x] = true
        setEtat(fake)

    }
    if(status[0]){
    return(
        <>
        {/* the different buttons for the different options of pages, we'll add border to check which one is selected */}
        <div className="option">
            <button onClick={()=>{handleclick(0)}} style={status[0] ? active : inactive}>Details</button>
            <button onClick={()=>{handleclick(1)}} style={status[1] ? active : inactive}>Episodes</button>
            <button onClick={()=>{alert("Desole, cette section n'est pas finie")}} style={status[2] ? active : inactive}>Commentaires</button>
        </div>
    <Detail_serie donne={data[0]} />
    {/* <Episodes donne={data[1]} serie={data[0].name} /> */}
        </> 
    )
    }else {
    return(
        <>
        {/* the different buttons for the different options of pages, we'll add border to check which one is selected */}
        <div className="option">
            <button onClick={()=>{handleclick(0)}} style={status[0] ? active : inactive}>Details</button>
            <button onClick={()=>{handleclick(1)}} style={status[1] ? active : inactive}>Episodes</button>
            <button onClick={()=>{handleclick(2)}} style={status[2] ? active : inactive}>Commentaires</button>
        </div>
    {/* <Detail_serie donne={data[0]} /> */}
    <Episodes donne={episodes} serie={data[0].name} />
    {/* <Episodes donne={episodes.length > 0 ? episodes : data[1]} serie={data[0].name} /> */}
        </> 
    )
    }
}

// the first page composed of the description
function Detail_serie(props){
    // passing the api data
    const data = props.donne
    return (
        <div  id="details-serie">
            <h1 style={{color : '#fee', lineHeight : '100%',}}>{data.name}</h1>
            <h3 style={{color : '#fee',}}>{data.description}</h3>
            <div style={{
                display : 'grid', gridTemplateColumns : 'repeat(auto-fit, minmax(20px, 25vw))',
                justifyContent : 'center', color : '#f2f2f2',  textAlign : 'center',
                gap : '2rem', padding : '0 0',
            }}>
                <div className="compact-details">
                <h2> Audio </h2>
                <h3> Japonais</h3>
                </div>
                <div className="compact-details">
                <h2> Sous-titres </h2>
                <h3> Francais</h3>
                </div>
                <div className="compact-details">
                <h2> Nombre d'episodes </h2>
                <h3> 24</h3>
                </div>
                <div className="compact-details">
                <h2> Nombre de Saisons </h2>
                <h3> 2</h3>
                </div>
            </div>
            <h1 style={{color : '#fee', fontSize : '1rem',}}>Publie : <span>{data.date}</span></h1>
        </div>
    )
}

// the second page concerning the episodes of the show
function Episodes(props){
    // passing the name and the api data
    const name = props.serie
    const [epi, setEpi] = useState(props.donne)
    //function and variable to handle when user watch episode
   
    const [watching, setWatching] = useState(false)
    function watch_request(request){
        setWatching(request ? request : false)
    }
   
    let last_saison = epi.slice(-1)
    last_saison = last_saison[0].saison
    // let's split the episodes bwtween the different saisons in an array
    let saison_split = []
    for (let i= 0 ; i< last_saison;i++){
        saison_split.push([])
    }
    epi.map(epis => {
        saison_split[epis.saison -1].push(epis)
    })

    // function to handle then user choose to filter episodes by saison

    function filter_by_saison(request){
        setEpi(request ? saison_split[request] : props.donne)
    }
    
    if (watching){
    return (
        <section id="page_2">
        <Dropdown_epi filter={filter_by_saison} saison={last_saison}/>
        <section id="episodes">
            {epi.map((epis, i) => {
                return (
                    <div className="epi" onClick={()=>{watch_request(epis.url)}} key={i}>
                    <iframe frameBorder={0} src={epis.url} style={{pointerEvents : 'none'}}/>
                    <div style={{paddingLeft : '1rem'}}>
                    <h3>{name}</h3>
                    <h3>Saison <span>{epis.saison}</span> episode  {epis.episode}</h3>
                    </div>
                </div>
            )}
            )}
        </section>
        <Watch_episode url={watching} cancel={watch_request} />
</section>
    )
    }else {
        return(
            <section id="page_2">
        <Dropdown_epi filter={filter_by_saison} saison={last_saison}/>
        <section id="episodes">
            {epi.map((epis, i) => {
                return (
                    <div className="epi" onClick={()=>{watch_request(epis.url)}} key={i}>
                    <iframe frameBorder={0} src={epis.url} style={{pointerEvents : 'none'}}/>
                    <div style={{paddingLeft : '1rem',}}>
                    <h3>{name}</h3>
                    <h3>Saison <span>{epis.saison}</span> episode  {epis.episode}</h3>
                </div>
                </div>
            )}
            )}
        </section>
            </section>
        )
    }
}


export function Watch_episode(props){
    let lien = props.url
    return (
        <>
    <div id="watching">
            <h1 onClick={()=>{props.cancel(false)}} id="close"><i className="fa-regular fa-circle-xmark"></i></h1>
        <div>
        <iframe src={lien} frameBorder={0} />
        <div style={{display : 'flex', justifyContent : 'center', height : '5vh',}}>
            <button><h1>Precedent</h1></button>
            <button><h1>Voir tout</h1></button>
            <button><h1>Prochain</h1></button>
        </div>
        </div>
    </div>
        </>
    
    )
}

function Dropdown_epi(props){
    let saison = [];
    console.log('nombre de saison est : ', props.saison)
    for (let i = 1 ; i < parseInt(props.saison) +1 ; i++){
        saison.push(i)
        console.log('une fois')
    }
    const [etat, setEtat] = useState(false)
    function show(){
        setEtat(!etat)
    }
    if(etat){
        return (
            <>
            <div id="drop" onClick={()=>{show()}}>
                <h1 style={{fontSize : '1.5rem',}}>Saison <span id="arrow"><i class="fa-solid fa-caret-down"></i></span></h1>
                <div style={{
                    display : 'flex',
                    fontSize : '0.6rem',
                    width : '100%' ,
                    flexDirection : 'column',
                    justifyContent : 'center',
                    position : 'absolute',
                    backgroundColor: '#141414f0',
                    color : '#fee',
                    borderRadius : '15px',
                }}>
                    <h2 onClick={()=>{props.filter(false)}}>...</h2>
                    {saison.map((sais, i)=>{
                        return <h2  onClick={()=>{props.filter(i)}} key={i}>Saison {sais}</h2>
                    })}
                    
                </div>
            </div>
            </>
        )
    }else{
        return (
            <>
             <div id="drop" onClick={()=>{show()}}>
                <h1 style={{fontSize : '1.5rem',}}>Saison <span id="arrow"><i class="fa-solid fa-caret-down"></i></span></h1>
            </div>
            </>
        )
    }
}