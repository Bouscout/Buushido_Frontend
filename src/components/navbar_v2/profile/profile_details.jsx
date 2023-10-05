// file for displaying the details when the user click on the profile icon
import { RecommendationButton } from "./recommendations_button/recommendations_button"

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
            right : '0', borderLeft : '1px solid var(--dark-gray)',
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
                <NormalButton text={"Faire une Suggestion"} icon={"fa-solid fa-clipboard-list"}/>
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
                    username ? username : "Connected"
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
        link={"bug"}
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

const SpecialButton = ({
    text, link, color, icon
}) => {
    let glowStyle
    if (color){
        glowStyle ={
            background : `var(--${color})`,
            boxShadow : `0 0 40px -8px var(--${color})`,
        }
    }
    return (
        <a href={link}>

            <h2 style={glowStyle}>
                <div className="icon" style={{justifyContent : 'left', marginRight : "0.5em"}}>
                <i className={icon}></i>
                    {text}
                </div>
            </h2>

        </a>
    )
}

const NormalButton = ({
    text, icon, func
}) =>{
    return (
        
        <a>
            <h2 style={{
                background : 'var(--dark-blue)', fontWeight : '600', 
                textAlign : 'center', 
            }} onClick={()=>{func ? func() : null}}>
                    <div className="icon" style={{justifyContent : 'left', marginRight : '0.5em'}}>
                        <i className={icon}></i>
                        {text}
                    </div>
            </h2>
        </a>
    )
}



function resetReprendre(){
    localStorage.setItem("buushido_liste", null)
    localStorage.removeItem("buushido_label")
    window.location.href = "/"
}