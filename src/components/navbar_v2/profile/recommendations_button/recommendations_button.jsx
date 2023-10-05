// file to handle all the logic concernning the recommendations button option inside the profile menu in the navbar
import { useState } from "react"
import FetchRecommendations from "../../../../background_processes/recommendations/fetch_recommendations"
import RecommendationWindowPopUp from "../../../self-contained/recommendationDisplay/recommendationWindow"

export const RecommendationButton = () => {

    const [show, setShow] = useState(false)

    return (
        <>
            <a>
                <h2 onClick={()=>{setShow(true)}} style={{
                    background : 'var(--dark-blue)', fontWeight : '600', 
                    textAlign : 'center', 
                }}> 
                <div className="icon" style={{justifyContent: 'left'}}>
                    {/* <NormalButton text={"Voir series recommendees"} icon={"fa-solid fa-list"}/> */}

                        <div className="icon" style={{fontSize : "0.8em", whiteSpace : "nowrap"}}>
                            <i className={"fa-solid fa-list"}></i>
                            {"Series Recommandées"}
                        </div>

                        {/* beta label */}
                        <h2 style={{background : 'var(--accent-purple)', padding : '0 0.4em', fontSize : "0.7em"}}>Beta</h2>
                </div>
                </h2>
            </a>

            {show && 
                <RecommendationWindowPopUp reset={setShow}/>
            }
        </>
    )
}

function getRecommendations(){
    FetchRecommendations()
    console.log("recommendations fetched")
}