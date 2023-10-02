import { ImageSmallDetails } from "../../self-contained/imageSmallDetails/ImageSmallDetails"
import GetRecommendations from "../../../background_processes/recommendations/get_recommendations";
import Loader_1 from "../../self-contained/load_test";
import RecommendationWindowPopUp from "../../self-contained/recommendationDisplay/recommendationWindow";
import { useState } from "react";

// function for displaying the suggestions from the api
export default function Results(props){
    let reultats = props.data

    const [ShowTab, setShowTab] = useState(false)

    if (ShowTab){
        return <RecommendationWindowPopUp reset={setShowTab}/>
    }

    // only render when we have result otherwise display loading animation
    if (reultats.length > 0){
        return (
            <>

        <section>
            <div style={{
                width : "96%", margin : "2% auto",
                display : 'flex', flexDirection : 'column', gap : '0.5em',
            }}>

            {reultats.map((serie, i) => {
                
                
                return (
                    <a key={i} href={"/serie/"+serie.id}>

                        <ImageSmallDetails
                        serie={serie}
                        picWidth={3}
                        picMaxWidth={100}
                        picMinWidth={60}
                        picAspectRatio={[10, 16]}
                        rounded={1}
                        gap_between={0.7}
                        />
                    </a>
                    )
                    
                })}
            <a href="/see_all" id="voir_tout">
            <h3 style={{
                fontSize : '1.2em', margin : '1rem auto', textAlign : 'center', background : "var(--light-gray)", width : '50%',
                borderRadius : '0.3em'
            }}>Voir tout les animes</h3>
            </a>

            </div>
        </section>
        </>
    )
    }else if(props.search != ''){
        const loader_style = {
            position : 'absolute',
            display : 'flex',
            justifyContent : 'center',
            textAlign : 'center',
            top : '50%',
            left : '50%',
            translate : '-50% -50%',
            color : "var(--accent-white)",
        }
        return (
            <>
            <section>
                <Loader_1 style={loader_style}/>
            </section>
            </>
        )
    }else if(props.typing) {
        return (

            <section>
                 <div style={{
                width : "96%", margin : "2% auto",
                display : 'flex', flexDirection : 'column', gap : '0.5em',
                }}>

                    <h3 style={{fontSize : "0.8em", color : 'var(--light-white)',
                    fontWeight : '500', marginLeft : '1em',
                    }}>Entrez une serie a chercher...</h3>

                    <RecommendationsTab activate={setShowTab}/>

                </div>
            </section>
            )
    }
}

const RecommendationsTab = ({activate}) =>{
    const recommended = GetRecommendations(true, 5)

    const glowStyle ={
        background : `var(--accent-purple)`,
        boxShadow : `0 0 40px -8px var(--accent-purple)`,
        textAlign : 'center'
    }
    
    return (
        <>
        {recommended.length > 0 ?
        <>
        <h2 onClick={()=>{activate(true)}} style={glowStyle}>Suggestions</h2> 

        {recommended.map((serie, i)=>{
            return (
                <a key={i} href={"/serie/"+serie.id}>

                        <ImageSmallDetails
                        serie={serie}
                        picWidth={3}
                        picMaxWidth={100}
                        picMinWidth={60}
                        picAspectRatio={[10, 16]}
                        rounded={1}
                        gap_between={0.7}
                        />
                    </a>
            )
        })}
        </>


        : null
        }
        </>
    )

}