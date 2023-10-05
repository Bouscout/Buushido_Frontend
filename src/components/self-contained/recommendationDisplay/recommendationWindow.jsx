// this file handles the logic for the displaying all the recommendations in pop-up window
// for the label options, the user will have the option to add a show to its watchliste (label = 2)
// delete the show from the options (label = 0)

import { DescriptiveCard } from "./descriptiveCard/descriptiveCard";
import SetLabel from "../../../background_processes/recommendations/label";
import GetRecommendations from "../../../background_processes/recommendations/get_recommendations";
import { updateSeriesList, RemoveFromList } from "../../../background_processes/recommendations/seriesList";
import { useEffect, useState } from "react";

export default function RecommendationWindowPopUp(props) {
    const [recommendations, setRecommendations] = useState(null)
    // const recommendations = GetRecommendations();

    function initRecommendations(){
        const recommended = GetRecommendations(true, null, true)
        if (Array.isArray(recommended)){
            setRecommendations(recommended)
            return true
        }

        return false
    }

    useEffect(() => {
       const initialized = initRecommendations()
       
       if (!initialized){
        setTimeout(()=>{
            console.log("using time out")
            initRecommendations()
        }, 500)
       }
 
    }, [])

    const isMobile = window.innerWidth < 700;
    const width = isMobile ? 98 : 55;
    return (
        <section
            className="pop-up"
            style={{
                left : "0", top : "0",
                width : '100vw', height : "100vh",
                // backdropFilter: 'blur(4px)',
                // WebkitBackdropFilter: 'blur(4px)',
                display: 'flex',
                justifyContent: 'center',
                background : 'rgba(0, 0, 0, 0.551)'
            }}
        >
            <div style={{
                    width: `100%`,
                    height : '100%',
                }}
            >   
                <div className="hide-scrollbar" style={{
                    background: 'var(--medium-black)',
                    borderRadius : '0.2em',
                    overflowX : 'hidden',
                    width : `${width}%`,
                    margin : '1.5em auto',
                }}
                >
                    <h2 style={{
                        fontSize : "clamp(22px, 3vmin, 25px)", margin : '1em 0.5em'
                        }}>
                        <div className="icon" style={{justifyContent : "space-between", width : '95%'}}>
                            Recommendées pour vous...
                            <i onClick={()=>{props.reset(false)}} style={{fontSize : '1.5em', color : 'var(--light-white)'}} className="fa-regular fa-circle-xmark"></i>
                        </div>
                    </h2>

                        {Array.isArray(recommendations) && 
                        <Container series={recommendations} changer={setRecommendations}/>
                        }


                </div>
            </div>
        </section>
    );
}




const Container = ({series, changer}) => {    
    return (
        <div className="grid-repeat">
            {series.map((serie, i)=>{
                function posLabel(){
                    serie.last_saison = 1
                    serie.last_episode = 1
                    updateSeriesList(serie)
                    RemoveFromList(serie)
                    SetLabel(serie.id, 1, true)
                    window.location.href = `/serie/${serie.id}`
                }

                function negLabel(){
                    SetLabel(serie.id, 0, true)
                    changer(series.filter(obj => obj.id !== serie.id))
                }

                function launching(){
                    updateSeriesList(serie)
                    SetLabel(serie.id, 1)
                    window.location.href = `/serie/${serie.id}`
                }

                function alreadyWacthed(){
                    RemoveFromList(serie)
                    SetLabel(serie.id, 1, true)

                    changer(series.filter(obj => obj.id !== serie.id))
                }

                return (
                    <DescriptiveCard
                    key={i} 
                    serie={serie}
                    addFunc={posLabel}
                    delFunc={negLabel}
                    launchFunc={launching}
                    alreadyWatched={alreadyWacthed}
                    />
                )
            })}
        </div>
    )
}
