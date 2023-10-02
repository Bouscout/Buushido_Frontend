
import { useState, useEffect, useContext } from "react" ;
import Watch_episode from "./watch_episode/watch_episode";
import { Dropdown_epi } from "./dropdowns";
import GoLastEpisode from "./buttons/last_episode";

// the second page concerning the episodes of the show
export default function Episodes(props){
    // passing the name and the api data
    //contains all the episodes to display
    const [epi, setEpi] = useState([])

  
const quick = props.quick
    //structures all the episodes in saison
    // the first element of the array correspond to the actual number of saison
    const [last_saison, setLastSaison] = useState(1)
    const [choixSaison, setChoixSaison] = useState([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []])
    
    const [selectSaison, setSelectSaison] = useState(0)
    const [page, setPage] = useState(false)
    
    //function and variable to handle when user watch episode
    const [watching, setWatching] = useState(false)
    function watch_request(request){
        setWatching(request ? request : false)
    }
    
    
    let lastEpisode = choixSaison[last_saison-1].at(-1) 
    if (Array.isArray(lastEpisode)){
        lastEpisode = lastEpisode.at(-1)
    }
    
    //setting up the saison structures
    
    useEffect(()=>{
        let new_last_saison = 1
        
        const the_episodes = props.donne

        // epi.map(epis => {

        // put each episode inside its saison arrays according to its saison attribute
        // then conclude a last saison variable for tracking
        async function crasher(){
        the_episodes.map(epis => {
            //let's add the episode with a specific saison to the array corresponding
            // console.log(epis)
            choixSaison[epis.saison - 1].push(epis)
            
            //let's also set up the value for the last saison concurently
            new_last_saison = parseInt(epis.saison) > parseInt(new_last_saison) ? parseInt(epis.saison) : new_last_saison
            
            if(new_last_saison > last_saison){
                setLastSaison(new_last_saison)
                // console.log('last saison is : ', new_last_saison )

            }
        })
       

        // let's separate the epysodes in pages for each saison
        // console.log('the last episode of last saison is : ', choixSaison[9].at(-1))
        const magic_number = 13
        choixSaison.forEach((saison, i)=> {
            // ensuring that we make multiple pages only when needed
            const taille = saison.length
            if (taille > magic_number){
                let pages_index = Math.floor(taille / magic_number)

                // if there is not enough to make a full pages make it anyway

                
                // if(Number(taille) > Number(pages_index * magic_number)){
                if(taille > (pages_index * magic_number)){
                   
                    pages_index = pages_index + 1                   
                }

                let pages = Array(pages_index).fill(0) // where we'l store episodes
                // separate the epi in sets of 24 and store them in pages

                // we will add 5 to the sentinel value,                                           
                for (let i=1 ; i <= pages_index + 1 ; i++){
                    // in order to get slices of 12 episodes per page
                    let index = i * (magic_number - 1) 
                    let last_index = (i-1) * (magic_number - 1) 

                    if (index > taille){
                        index = taille
                        if(saison[last_index]){
                            pages[i-1] = saison.slice(last_index, index)
                        }
                        break
                    }
                    // last_index = last_index < taille ? last_index : taille
                    pages[i-1] = saison.slice(last_index, index)
                }

                console.log(pages)

                saison.length = pages_index // clear the array
                saison.fill(0)

                // fill it with the pages
                pages.forEach((pg, i) => {
                    saison[i] = pg
                } )

            }
        });
        // check if it quick start up
        if(Array.isArray(quick)){
            let sais = quick[1] - 1 // to fit array index
            let epi = quick[2] - 1

            let episode = choixSaison[sais].flat()[epi]
            setSelectSaison(sais)
            setWatching(episode)
            setEpi(choixSaison[sais])

        }else{
            
            // let's set it so that only the first season appears on screen
            setEpi(choixSaison[0])
            setSelectSaison(0)
        }

    }
     crasher()   // function to find next and previous episode to selected episode
    }, [])

    // checking if we are starting a new episode
    useEffect(()=>{
        if(Array.isArray(quick)){
            let sais = quick[1] - 1 // to fit array index
            let epi = quick[2] - 1

            let episode = choixSaison[sais].flat()[epi]
            setSelectSaison(sais)
            setWatching(episode)
            setEpi(choixSaison[sais])

        }
    }, [quick])


    // function to handle then user choose to filter episodes by saison

    function filter_by_saison(request=null, page=0){
        // in enable the possibility to show all episodes at the same time 
        // then uncomment the line bellow
        // setEpi(request ? choixSaison[request] : props.donne)
        if (request || request === 0){
            setSelectSaison(request)
            let choice = choixSaison[request]
            setEpi(choice)
            
        
        }else{
           
            let choice = choixSaison[selectSaison]
            try {
                if (choice.length > 1){
                    choice = choice[page]
                    setPage(page)
                    setEpi(choice)
                }
            }catch(e){} //caught the error

        }

        
    }
    // checking if we selected an episode and then display it
    if (watching){ 

        // disabling the scroll for the window
    return (
    <section id="page_2">
       
        <Watch_episode epi={watching} cancel={watch_request} others={choixSaison[watching.saison - 1]} id={props.id} />
</section>
    )
    // check if selected saison has more than 1 page
    }else if (Array.isArray(choixSaison[selectSaison][0])){
            let num_pages = []
            let selected = page ? page : 0
            for(let i=0 ; i < choixSaison[selectSaison].length ; i++){
                num_pages.push(i === selected ? [i +1, 'red']:[i + 1, 'purple'])
            }

            //function for checking the element on the last page
            // let all_pages = choixSaison[selectSaison]
            let last_page = choixSaison[9].at(-1)
            // console.log('the last page episode is : ', last_page.at(-1))
            return(
                <section id="page_2">

                    <div style={{
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems : 'center'
                        
                    }}>


                {/* for selecting the saison */}
                <Dropdown_epi filter={filter_by_saison} saison={last_saison} infos={props.saison_info}
                 request={watch_request} movies={props.films}
                 />

                  {/* for going to the last episode */}
                  <GoLastEpisode 
                 episode = {lastEpisode}
                 request = {watch_request}
                 />

                 </div>

                        <section id="episodes">
                        {Array.isArray(epi[0]) && 
                            filter_by_saison(null, 0) 
                        }
                        <Chosen_epis donne={epi} name={props.serie} request={watch_request}/>
                        </section>

                <div style={{
                    display : 'flex', width : '100%', flexWrap : 'wrap', justifyContent : 'center', 
                    }}>
                        <h1 style={{margin : '0', color : '#fff'}}>Pages : </h1>
                    {num_pages.map((x, i)=>{
                        return <h1 key={i} style={{
                            margin : '0 1rem', color : x[1], cursor : 'pointer', lineHeight:'150%'
                        }}
                        onClick={()=>{filter_by_saison(null, x[0]-1)}}>{x[0]}</h1>
                    })}
                </div>
                </section>
        )

    } else {
            

            return(
                <section id="page_2">
            <div style={{
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems : 'center'
                        
                    }}>
            <Dropdown_epi filter={filter_by_saison} saison={last_saison} infos={props.saison_info}
             request={watch_request} movies={props.films}
             />

            
                 {/* for going to the last episode */}
                 <GoLastEpisode 
                 episode = {lastEpisode}
                 request = {watch_request}
                 />

             </div>

            <section id="episodes">
            <Chosen_epis donne={epi} name={props.serie} request={watch_request}/>
            {/* {choixSaison[selectSaison]} */}
            </section>
            </section>
            )
    }
    }



function Chosen_epis(props){
    const request = props.request
    const epi = props.donne
    const name = props.name.length < 25 ? props.name : props.name.substr(0, 25) + '...'
    return (
        <>
       {epi.map((epis, i) => {
                return (
                    <div className="epi" onClick={()=>{request(epis)}} key={i}>
                    <iframe frameBorder={0} src={epis.url} style={{pointerEvents : 'none'}}/>
                    <div style={{paddingLeft : '1rem',}}>
                    <h3>{name}</h3>
                    <h3 style={{
                        color : 'rgb(187, 187, 187)', fontWeight : '600',
                    }}>Saison <span>{epis.saison}</span> episode  {epis.episode} {epis.special ? epis.special : null}</h3>
                </div>
                </div>
            )}
            )
        }
        </>
    )
}