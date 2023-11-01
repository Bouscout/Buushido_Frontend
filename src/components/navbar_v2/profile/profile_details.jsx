// file for displaying the details when the user click on the profile icon
import { RecommendationButton } from "./recommendations_button/recommendations_button"
import { SpecialButton, NormalButton } from "../../self-contained/usefulButtons"

export default function ProfileDetails(props){
    /* 
    COde for showing the user informations
    */
    let username = null
    if (props.connected){
        username = JSON.parse(sessionStorage.getItem("username"))
    }

    return <RightSideMenu 
            connected={props.connected}
            username={username}
            reset={props.reset}
            />

}


const RightSideMenu = ({
    connected,
    username,
    reset,
}) =>{
    console.log("connected is : ", connected)
    return(
        <section className="side-menu" style={{
            right : '0px', borderLeft : '1px solid var(--dark-gray)',
            animation : "slide-left 100ms linear 0s 1 both",
        }}>
            <div className="flex-column" style={{margin : '0 1em', justifyContent : 'space-between', height : '80%'}}>
                {/* <h2>Bienvenue Bouscout</h2> */}
                <UserInfo connected={connected} username={username}/>

                <div className="flex-column" style={{gap : '0.5em'}}>
                <BreakLine />
                <WatchlistButton />
                <NormalButton func={resetReprendre} text={'Vider Reprendre-liste'} icon={"fa-regular fa-trash-can"}/>
                <RecommendationButton />
                {/* <NormalButton text={"Voir series recommendees"} icon={"fa-solid fa-list"}/> */}
                </div>

                <div className="flex-column" style={{gap : '0.5em'}}>
                <ReportButton />
                <NormalButton text={"Faire une Suggestion"} icon={"fa-solid fa-clipboard-list"} link={"mailto:buushidobug1@gmail.com"}/>
                </div>


                <div className="flex-column" style={{gap : '0.5em'}}>
                <BreakLine />
                {connected ?
                <DeconnexionButton reset={reset}/> :
                <LoginButton />
                }
                </div>
                
            </div>
        </section>
    )
}

const BreakLine = () =>{
    return <hr style={{
        width : '90%', color : "var(--accent-purple)"
    }}></hr>
}

const UserInfo = ({
    connected,
    username,
}) =>{
    return (
        <div className="flex-column" style={{justifyContent : 'center', gap : '0.5em'}}>

            <h2 style={{
                fontSize:"2em", 
                borderRadius : '50%', textAlign : 'center', aspectRatio : "1/1", width : "40%",
                margin : "0 auto", marginTop : '1em',
                display : 'grid', placeItems : 'center', color : connected ? "var(--accent-green)" : "var(--accent-orange)"
            }}>
                <i className="fa-regular fa-user"></i>

            </h2>

            <span style={{
                fontSize : '1.4em', color : 'white', textAlign : 'center', 
                width : '100%', lineHeight : '50%', display : 'block'
            }}>
                {connected && 
                    username ? username : ""
                }
                {!connected && "Visiteur"}
            </span>

        </div>
    )
}

const WatchlistButton = () =>{
    return <SpecialButton 
            text={"Watchliste"}
            link={"watchlist"}
            color={"accent-purple"}
            icon={"fa-solid fa-bookmark"}
            />
}

const ReportButton = () =>{
    return (
        <SpecialButton 
        text={"Signaler un Probleme"}
        link={"mailto:buushidobug1@gmail.com"}
        color={"accent-dark-red"}
        icon={"fa-solid fa-bug"}
        />
    )
}

const LoginButton = () => {
    return <SpecialButton 
            text={"Se Connecter"}
            link={"/login"}
            color={"accent-orange"}
            />
}

const DeconnexionButton = ({reset}) =>{
    return (
       <div onClick={()=>{reset()}}>
        <SpecialButton 
                text={"Se Deconnecter"}
                link={null}
                icon={"fa-solid fa-right-from-bracket"}
                />
        </div>
)
}


function resetReprendre(){
    localStorage.removeItem("buushido_liste")
    localStorage.removeItem("buushido_label")
    localStorage.removeItem("buushido_recommendations")
    window.location.href = "/"
}