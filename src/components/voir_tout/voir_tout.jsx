// import './voir.css'

import { useEffect, useState } from "react";
import Loader_numero_uno from "../self-contained/load_test";
const BASE_URL = "https://buushido.com"

export default function Voir_tout(){
    //getting the data from the api
    const [couplet, setcouplet] = useState([])
    // const couplet = props.data
    const indexes = 'abcdefghijklmnopqrstuvwxyz'.split('');

    useEffect(()=>{
        fetch(`${BASE_URL}/api/all/`)
        .then(response => response.json())
        .then(data => {
            setcouplet(data)
        },(error)=>{
            console.log('error : ', error)
        }
        )
    }, [])
    if(couplet.length > 0){

        return (
            <>
        <All_index data={indexes} />
        <div id='contenu-tout'>
        {couplet.map((duo, i) => {
            return (
                <Lettre key={i} index={duo[0]} data={duo[1]}/>
                )
            })}
            </div>
        </>
    )

}else{
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

function All_index(props){
    let index = props.data
    return (
        <section style={{marginTop : '4rem'}}>
        <h1 style={{textAlign : 'center', fontSize : '1.4rem', whiteSpace : 'nowrap', }}>Choississez une lettre</h1>
        <div id="indexes">
            {index.map((letter, i) => {
                return (
                    <a key={i} href={"#"+letter}><h1 className='serie-name'>{letter}</h1></a>
                    )
                })}
        </div>
                </section>
    )
}


function Lettre(props){
    let index = props.index
    let serie = props.data
    return (
        <section className="boite" id={index}>
            <h1>{index}</h1>
            <hr style={{background : 'gold', width : '70%', height : '3px', border : 'none'}}></hr>
            <div style={{display : 'flex', flexDirection : 'column',}}>
            {/* <div id='ferme'><h1><i className="fa-regular fa-circle-xmark"></i></h1></div> */}

                {serie.map((serie, i) => {

                    return (
                        <Serie_name key={i} serie={serie} />
                    )
                })}
            </div>
        </section>
    )
}

function Serie_name(props){
    const [details, setDetails] = useState(false)
    const serie = props.serie

    async function hide_again(){
        console.log('on est dedans ', details)
        setTimeout(()=>{setDetails(false)}, 7000)
        
    }

    return (
        <div className="show">
            <a><h3 onClick={()=>{setDetails(!details) ; !details ? hide_again():null}}>{serie.name}</h3></a>
            {details ? <Extra serie={serie} /> : null}
        </div>
    )
}



//a little bubble that would display more details about the show without directly switching page
function Extra(props){
    let serie = props.serie
    // let show = props.etat
    return (
        <>
        {/* <div className='extra' style={show ? {display : 'flex',}:{display : 'none',}}> */}
        <div className='extra'>
        <h1 style={{fontSize : '1.5rem'}}>{serie.name}</h1>
        <div style={{display : 'flex', justifyContent : 'space-evenly', color : '#f8a100'}}>
            <h1>note : {serie.note}/10 </h1>
            <h1>statut : {serie.en_cours ? 'En cours' : 'Finie'}</h1>
        </div>
        <h3>{serie.lesstext}</h3>
            <div style={{display : 'flex', justifyContent : 'space-around'}}>
            <h2>{serie.genre_1}</h2>
            <h2>{serie.genre_2}</h2>
            <h2>{serie.genre_3}</h2>
            <h2>{serie.genre_4}</h2>
            </div>
                <button>
            <a href={'/serie/'+serie.id}>
                    <h2>Regarder</h2>
                </a>
                </button>
        </div>
        </>
    )
}