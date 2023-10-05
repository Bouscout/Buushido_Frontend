import { useEffect, useState } from 'react'
// import './watchlist.css'
import { ImagePortrait } from '../self-contained/image-portrait'
import is_connected from '../../background_processes/check_connection.js'
import Loader_numero_uno from '../self-contained/load_test'
const BASE_URL = "https://buushido.com"

export default function Watchliste(){
    const [series, setSeries] = useState([])
    const [not_connected, setNot_Connected] = useState(true)
    const [msg, setMsg] = useState(false)
    "Verifiez que vous avez d'abord ajouter des series a votre watchliste...📃"

    function fetching_data(){
        // is_connected(setNot_Connected)
       if(is_connected()){

           // getting the new token
           const [access, refresh] = JSON.parse(sessionStorage.getItem('tokens')) 
           
           const reqestFetchOptions = {
               method : 'GET', 
               headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': `Bearer ${access}`,
                }
            }
            fetch(`${BASE_URL}/api/watchlist/`, reqestFetchOptions)
            .then(response => response.json())
            .then(data =>{
                // console.log('les donnees sont : ', data)
                setSeries(data)
                console.log('connected and finished')
            })
        } else {
            console.log('not connected')
        }
    }


    useEffect(()=>{
        // start by refreshing the tokens
        fetching_data()
    }, [not_connected])

    useEffect(()=>{
        // connection timeout
        setTimeout(()=>{
            if (not_connected){
                console.error('connection timeout')
                // window.location.href = '/login'
                setMsg(true)
            }
        }, 3000)
    }, [])



    // check for the presence of at least an element in the data
    if(series.length > 0){       
        return (
            <>
            <h1 style={{
                width : '70%',
                marginLeft : '1rem',
                marginTop : '4rem'
            }}>Watchliste</h1>
            <Les_series series={series}/>
        </>
    )
    }else if(!msg) {
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
                <h1 style={{
                    position : 'fixed', top : '25%', left : '50%',
                    translate : '-50% -50%', lineHeight : '130%',
                    fontSize : '0.8rem'
                }}
                >{!msg ? "Verifiez que vous avez d'abord ajouter des series a votre watchliste...📃" : null}</h1>
                </>
                ) 
    }else if(msg){
        return (
            <h1 style={{
                position : 'fixed', top : '50%', left : '50%',
                translate : '-50% -50%', lineHeight : '130%',fontSize: '0.8rem'
            }}
            >On dirait que vous etes pas connecte <a href='/login' style={{
                color : 'red', textDecoration :'none',
            }}>Cliquez ici</a> pour vous connecter ou assurez vous d'avoir ajouter des series dans votre watchlist</h1>
    
        )
    }

}


function Les_series(props){
    const series = props.series.slice()
    series.reverse()
    
    // styling the image component
    const styling = {
        width : '14.2vw',
        minWidth : '110px',
        aspectRatio : '10 / 16',
    }

    // check if the first element is the an element or the 
    // false statement

    if(series[0]){

        
        return (
            <>

        <section id='watchliste'>
            {series.map((serie, id) => {
                return (
                    <a href={'/serie/'+serie.id} key={id}>
                    <div className='contenu' key={id} style={{
                                animationDelay : (Math.random() * 500 )  + 'ms',
                    }}>
                    <ImagePortrait 
                    src={serie.tof_url}
                    alt={serie.name}
                    style={styling}/>
                </div>
                    </a>
                    )
            })}

        </section>
        </>
    )
    }else {
        return (
            <h1>Votre Watchlist est vide, ajouter des series</h1>
        )
    }
    
}