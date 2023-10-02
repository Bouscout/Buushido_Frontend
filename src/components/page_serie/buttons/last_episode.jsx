// this function would allow the user to skip directly to the last episode of
// a show if they are not interested in scrolling through everything
import Watch_episode from "../watch_episode/watch_episode";


export default function GoLastEpisode(props){
    if (props.episode){       
        return (
            <>
        <ButtonLastEpisode
        episode={props.episode}
        activator={props.request}   
        />
        </>
    )
}

}

const ButtonLastEpisode = ({
    episode,
    activator, // for trigerring or canceling the pop up
}) =>{

    // styling it differently
    const special = {
        background: 'linear-gradient(to  right, #090909, #090909 ) padding-box,linear-gradient(to top right, #000c4e,#3d0042, #740072, #5e0b00) border-box ',
        border: '2px solid transparent',
        width : "35vmin",
    }


    

    return (
        <>
        <div className="drop" style={special} onClick={()=>{activator(episode)}}>
                <h3><strong><i className="fa-solid fa-play" style={{
                    color : "rgb(157, 0, 97)",
                }}></i>   Dernier Episode : S{episode.saison}|EP{episode.episode}</strong></h3>
        </div>
        </>
    )
}
{/* <button onClick={()=>{quick_watch()}} style={special}><strong><i className="fa-solid fa-play"></i> {watching ? watching : 'Watch'}</strong></button> */}
