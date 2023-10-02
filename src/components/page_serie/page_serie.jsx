import Pages from "./all_pages"
import Loader_numero_uno from "../self-contained/load_test.jsx"
// import "./serie.css"
import is_connected from "../../background_processes/check_connection";

import { useEffect, useState, createContext, useContext } from "react"

import Pic_with_controls from "./pic_with_controls"
import Floating_pic from "./buttons/pic_floater"

import FastStart from "./buttons/pop_up"

const BASE_URL = "https://buushido.com"

import serieContext from "../../utils/serie_context"


export default function Serie_accueil(props){
    // to stock the data from the api
    const [allData, setAllData] = useState([])

    const [serieInfo, setSerieInfo] = useState(null)
    // to check if the api call has been maed
    const [fetched, setFetched] = useState(false)

    // quick start
    const [quick, setQuick] = useState(false)
    
    const id = props.id

    //check if the show is in the user watchlisst
    const [in_watchlist, setIn_watchlisst] = useState(false)
    

    function fetcher(){    
        fetch(`${BASE_URL}/api/serie/`+id+'/')
        .then(response => response.json())
        .then(data => {
            // fetched = true
            setAllData(data)
            setFetched(true)
            setSerieInfo(data[0]) // creating the serie object
        })
    }
    
    async function watchlist_checker(){

        // check if the user is connected and then refresh the token
       
        let connected = is_connected()
        if (connected){

            // checking if the serie is in the api
            const [access, refresh] = JSON.parse(sessionStorage.getItem('tokens'))
            const requestOptions = {
                method : 'GET', 
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            }
            fetch(`${BASE_URL}/api/watchlist/check/`+id+'/', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log('premiere : ', data)
                setIn_watchlisst(data ? true : false)
            })
        }

    }

    useEffect(()=>{
        watchlist_checker()
        fetcher()
        // console.log('the serie data is : ', allData)
        setFetched(true)

    }, [])

    
    // logics for quickwatch function
    // const Watch_button = <Watch_button id={props.id} quick={props.quick} start={props.quickStart} />

    const Watch_button = () =>{

        const is_quick = quick
        const start = setQuick

        let special = null
        
        // retrieving last watch episode
        //all logics
        let to_watch = JSON.parse(localStorage.getItem('buushido_liste'))
        const serie = to_watch[id]
        

        let watching ;
        if(typeof serie === "object" && serie !== null){
            if (serie.last_saison){
                watching = 'Watch | S'+serie.last_saison+' EP' + serie.last_episode
                special = {
                    background: 'linear-gradient(to  right, #090909, #090909 ) padding-box,linear-gradient(to top right, #000c4e,#3d0042, #740072, #5e0b00) border-box ',
                    border: '2px solid transparent',
                    fontSize : '2.5vmin'
                }

                to_watch = [serie.id, serie.last_saison, serie.last_episode]

            }
            
        }else{
            to_watch = [props.id, 1, 1]
        }
        
        // when quick is updated, the chosen index will be selected and displayer
        function quick_watch(){
            if (is_quick){
                setTimeout(()=>{
                    start(to_watch) // start = setQuick
                }, 1500)
                start(false)
        }else {
            start(to_watch)
        }
        
    }
    return (
        <button onClick={()=>{quick_watch()}} style={special}><strong><i className="fa-solid fa-play"></i> {watching ? watching : 'Watch'}</strong></button>
    )
}


    // check if we have actual data in the api then render the page
    if (allData.length > 0){
        let back_tof = allData[0].background_tof.split('/').at(-1) + '.webp'
        if(quick){
            
            let url = `url('${BASE_URL}/static/media/paysage/` + back_tof +"')"
            console.log('context created')

            // context provider absolutely not working
            // always return undefined maybe doesn't work with astro
            return (
                <serieContext.Provider value={serieInfo}>
                
                    {/* <h1>On est dans le context</h1> */}
                    <div id="layer">
                    <div style={{
                    width : '100%', height : '10px',
                    //  background : 'linear-gradient(to  right, #ff7c6b , #5770ff 30%,  #b86bff)', 
                    marginTop : '11.4vmin', marginBottom : '55vmin'
                }}/>
                    <div id="water" style={{
                        backgroundImage: "linear-gradient(to right,#141414, transparent 90%) ,linear-gradient(to bottom, transparent 90%, purple)," + url ,
                        // borderTop : '3px solid purple',
                    }}>
                    </div>
                    <section id="serie-app">

                    <Floating_pic src={allData[0].tof_url} id={props.id} data={allData[0]} boutton={Watch_button}/>

                    <Details id={props.id} donne={allData[0]} in_watchlist={in_watchlist} watch_button={Watch_button} />
                    {/* <Upper /> */}
                    <Pages id={props.id} donne={allData} quick={quick}/>

                    </section>
                    </div>
                    <hr style={{color : '#4e4e4e25', width : '70%', opacity : '0.25'}}/>
                {/* </> */}
                </serieContext.Provider>
            )

        }else{

            
            let url = `url('${BASE_URL}/static/media/paysage/` + back_tof +"')"
            return (
                <serieContext.Provider value={serieInfo}>
                <FastStart id={props.id} launcher={setQuick}/>
                
                <div id="layer">

                    <div style={{
                        width : '100%', height : '10px',
                        //  background : 'linear-gradient(to  right, #ff7c6b , #5770ff 30%,  #b86bff)', 
                        marginTop : '11.4vmin', marginBottom : '42vmin', 
                    }}/>

                    <div id="water" style={{
                        backgroundImage: "linear-gradient(to right,#141414, transparent 90%) ,linear-gradient(to bottom, transparent 70%, black)," + url ,
                        // borderTop : '3px solid purple',
                    }}>
                    </div>

                    <section id="serie-app">

                    
                        <Floating_pic src={allData[0].tof_url} id={props.id} data={allData[0]} boutton={Watch_button}/>



                        <Details id={props.id} donne={allData[0]} in_watchlist={in_watchlist} watch_button={Watch_button} />
                        {/* <Upper /> */}
                        <Pages id={props.id} donne={allData}/>

                    </section>


            </div>
            <hr style={{color : '#4e4e4e25', width : '70%', opacity : '0.25'}}/>
            </serieContext.Provider>
    )
}

    }else {
        // loading screen
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

    const mobile = window.innerWidth < 800 ? true : false

    // logics for quickwatch function
    // const Watch_button = <Watch_button id={props.id} quick={props.quick} start={props.quickStart} />
    const Watch_button = props.watch_button

    const serie = useContext(serieContext)
   
        return (

        <section id="top">
            <section id="heading">
               
                {mobile && <Pic_with_controls id={props.id} data={data} in_watchlist={props.in_watchlist} boutton={Watch_button}/>}

                        <div id="details">

                            {/* all the little details for serie next to the image  */}

                                <h1 style={{
                                    textShadow : `0 -4px 10px, 0 0 2px, 0 0 1em ${data.couleur || 'pink'}, 0 0 0.5em ${data.couleur || 'pink'}, 0 0 0.1em ${data.couleur || 'pink'}`,
                                }}>{data.name}</h1>   


                                <h2 style={{color : '#707070', fontWeight : 'lighter',
                                 fontSize : '1rem',  margin : '0',
                                }}>Statut : <span style={{
                                    fontSize : '3vmin', lineHeight : '70%',
                                }}>{data.en_cours ? 'En cours':'Fini'}</span></h2>
                                
                                
                                <h2 style={{color : '#808080', fontWeight : 'lighter',
                                 fontSize : '1rem',  margin : '0',
                                }}>Note : <span style={{
                                    fontSize : '3vmin', lineHeight : '70%', 
                                }}> {data.note}  <span style={{fontWeight : '200',}}>sur MyAnimeList & Nautijlon</span></span> </h2>
                                {/* <Watch_button /> */}
                        </div>
        </section>
                                <hr style={{color : '#4e4e4e25', width : '90%', opacity : '0.25'}}/>
        </section>
    )
        
}
