import { useEffect, useContext, useState } from "react"
import Brief_visit from "../../../background_processes/metrics/brief_visit";
import serieContext from "../../../utils/serie_context"
import { updateSeriesList } from "../../../background_processes/recommendations/seriesList";
import interestTimer from "../../../background_processes/recommendations/timer_recommender";

//function for taking care of video displaying

export default function Watch_episode(props){
    const serie = useContext(serieContext)
    //the id of the show
    const id = serie.id

    // we will have an array with all the episodes of the actual saison 
    // flat it to avoid bugs with the page set up
    
    //we make a state with the actual episode
    const [actual, setActual] = useState(props.epi)
    const [lect, setLect] = useState(props.epi.url)

    //updating the episode in the in_watching list
    useEffect(()=>{
        // launch timer
        setTimeout(()=>{
            interestTimer(true, serie.id)
        }, 2000)

        // checking if the next episode is the last episode to remove the item from recently watch
        let liste = JSON.parse(localStorage.getItem('buushido_liste'))
        if((all_episodes.indexOf(actual) + 1) >= all_episodes.length - 1 && Array.isArray(liste)){            
            
            for (const serie of liste){
                console.log("try : ", liste)
                if (serie.id === parseInt(id)){
                    serie.last_episode = null
                    serie.last_saison = null
                    console.log("removed : ", serie)
                } 

                break
            }

            //update the list 
            localStorage.setItem('buushido_liste', JSON.stringify(liste))
        }else{
            // we create a simple serie object, with small details and the last episode
            const serieInfo = {
                'id' : serie.id,
                "name" : serie.name,
                "tof_url" : serie.tof_url,
                "background_tof" : serie.background_tof,
                "last_saison" : actual.saison,
                "last_episode" : actual.episode, 
            }

            updateSeriesList(serieInfo)
        
            console.log('not the last episode')
        }
         
    }, [actual])
    
    let all_episodes
    if(props.epi.special_name){
        all_episodes = []
        all_episodes.length = 0
        actual.episode = 1
    }else{
        all_episodes = props.others.flat()
        // console.log('the last episode of the saison is : ', all_episodes.at(-1))
    }
    

    function next(){
        // making the report of presence
        Brief_visit()

        interestTimer(false, serie.id)
       

        // we know that the episode number of actual we'll correspond to it's index -1 in the list so
        // by just changing the index to +1 we get the next
        let present = all_episodes[all_episodes.indexOf(actual) + 1]
        // let present = all_episodes[parseInt(actual.episode)]
        setActual(present)
        setLect(present.url)
        // setActual(all_episodes[parseInt(actual.episode)])
    }
    function precedent(){
        // reporting the presence
        Brief_visit()
        
        interestTimer(false, serie.id)

        // let present = all_episodes[parseInt(actual.episode) - 2]
        let present = all_episodes[all_episodes.indexOf(actual) - 1]
        setActual(present)
        setLect(present.url)
        // setActual(all_episodes[parseInt(actual.episode) - 2])
    }

    function change_lecteur(lien){
        setLect(lien)
    }

    // exit from watching window
    function exit(){
        props.cancel(false)
        interestTimer(false, serie.id)
    }


    return (
        <>
        <div id="watching">
            <h1 onClick={()=>{exit()}} id="close"><i className="fa-regular fa-circle-xmark"></i>  Retour</h1>
        <div>
        <div style={{
            width : '91vw', aspectRatio : '16 / 9', margin : '0 auto', 
        }}>
        <iframe id="buushido_frame" src={lect} frameBorder={0} allowFullScreen />
        </div>

        <div style={{display : 'flex', justifyContent : 'space-between', height : '5vh',}}>

                    <div><a href="mailto:buushidobug1@gmail.com"><button><h1>Signaler bug</h1></button></a></div>
                   
                    <div style={{
                        display : 'flex', justifyContent : 'center',
                    }}>

                    {(all_episodes.indexOf(actual) - 1) < 0 ?  null : <button onClick={()=>{precedent()}}><h1>Precedent</h1></button>}
                    {/* {parseInt(actual.episode) -1 === 0 ?  null : <button onClick={()=>{precedent()}}><h1>Precedent</h1></button>} */}

                    {/* <button onClick={()=>{window.open(lect, '_blank')}}><h1>Forcer Play</h1></button> */}

                    {(all_episodes.indexOf(actual) + 1) >= all_episodes.length ? null : <button onClick={()=>{next()}}><h1>Prochain</h1></button>}
                    {/* {parseInt(actual.episode) >= all_episodes.length ? null : <button onClick={()=>{next()}}><h1>Prochain</h1></button>} */}

                    {/* setting up the other lecteurs */}
                    </div>

                    
                    <div style={{
                        display : 'flex', justifyContent : 'center',
                    }}>
                        {/* <button onClick={()=>{change_lecteur(actual.url)}}><h1>Lecteur 1</h1></button> */}
                        <Lecteur serie={actual} swap={change_lecteur}/>
                        {/* <button onClick={()=>{change_lecteur(actual.url2)}}><h1>Lecteur 2</h1></button>
                        {actual.url3 ? <button onClick={()=>{change_lecteur(actual.url3)}}>Lecteur 3</button> : null} */}
                    </div>
        </div>
        </div>
        <h2 style={{
            textAlign : 'center', color :'#fff'
        }}> saison {actual.saison} episode {actual.episode}</h2>


        <h1 style={{
            fontSize : '9vmin', color : '#f8a100', lineHeight : '130%', textAlign : 'center', marginTop : '30px'
        }}>Comments will be here when finished ⌚</h1>

        </div>

        </>
    
    )
}

function Lecteur(props){
    let serie = props.serie
    const choixx = [serie.url]
    if (serie.url2){
        choixx.push(serie.url2)
    }if(serie.url3){
        choixx.push(serie.url3)
    }

    function change_lect(evt){
        let lien = evt.target.value
        props.swap(lien)
    }

    return (
        <>
        <div id="buush">
        <label htmlFor="lecteur_buushido">Lecteur <i className="fa-solid fa-chevron-down"></i></label>
        <select name="lecteur_buushido" onChange={(e)=>{change_lect(e)}}>
        {choixx.map((lien, i)=>{
            return(
                <option key={i} value={lien} >{i+1}</option>
                )
            })}
        </select>
            </div>
        </>
    )
}