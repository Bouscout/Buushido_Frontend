// this file handles the logic for the displaying all the recommendations in pop-up window
// for the label options, the user will have the option to add a show to its watchliste (label = 2)
// delete the show from the options (label = 0)

import { DescriptiveCard } from "./descriptiveCard/descriptiveCard";
import SetLabel from "../../../background_processes/recommendations/label";
import GetRecommendations from "../../../background_processes/recommendations/get_recommendations";
import { updateSeriesList, RemoveFromList } from "../../../background_processes/recommendations/seriesList";
import { useState } from "react";

export default function RecommendationWindowPopUp(props) {
    const [recommendations, setRecommendations] = useState(GetRecommendations())
    // const recommendations = GetRecommendations();
    const isMobile = window.innerWidth < 700;
    const width = isMobile ? 95 : 55;
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
                border : 'solid red',
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
                            Recommendees pour vous...
                            <i onClick={()=>{props.reset(false)}} style={{fontSize : '1.5em', color : 'var(--light-white)'}} className="fa-regular fa-circle-xmark"></i>
                        </div>
                    </h2>
                    <Container series={recommendations} changer={setRecommendations}/>
                </div>
            </div>
        </section>
    );
}




const Container = ({series, changer}) => {    
    return (
        <div className="grid-repeat" style={{
            margin : '0 0.5em', justifyContent : 'center', gap : '0.2em',
            overflowY : "auto", 
        }}>
            {series.map((serie, i)=>{
                function posLabel(){
                    RemoveFromList(serie)
                    updateSeriesList(serie)
                    SetLabel(serie.id, 1, true)
                }

                function negLabel(){
                    updateSeriesList(serie)
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
                    updateSeriesList(serie)
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
