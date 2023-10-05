import { useRef, useState } from "react"
import { ImagePortrait } from "../../../self-contained/image-portrait"

const BASE_URL = "https://buushido.com"


export default function Posters_mobile(props){
    const [state, setState] = useState(null)

    const scrollValue = window.innerWidth / 1.5
    const bias = 50

    const [active, setActive] = useState([true, false, false, false, false])
    const posters = props.posters
    
    const containerRef = useRef(null)
    
    // for user clicking
    function ScrollToElement(dir){
        if (containerRef.current){
            
            if (containerRef.current.scrollLeft + 50 > window.innerWidth * 4){
                console.log("reseting")
                containerRef.current.scrollLeft = 0
                return
            }
            
            containerRef.current.scrollLeft += scrollValue * dir
            console.log("found it", containerRef.current.scrollLeft , " big value is  :", window.innerWidth * 4 )

        }
    }

    // animation
    function Animation(dir){
        const animation = {
            transform : 'scale(0.98)',
            webkitFilter : 'brightness(30%)',
            opacity : '0.3'
        }
        setState(animation)
        setTimeout(() => {
            ScrollToElement(dir)
            const animation = {
                transform : "scale(1)",
                webkitFilter : 'brightness(100%)',
                opacity : "1",
            }
            setState(animation)
        }, 200);
    }


    return (
        <>
        <div style={{position : 'relative'}}>

            <section id="head" 
            style={state}
            ref={containerRef}
             onClick={()=>{Animation(1)}}>
                {posters.map((poster, i)=> {
                    return (
                        <Poster key={i}
                        element={poster}
                        />
                        )
                    })}
            </section>

        <ChangeButtons change={Animation}/>
        </div>
        </>
    )
}

const Poster = ({element, playAnimation}) => {
    const imageUrl = element.tof_url 

    // const closure = ",linear-gradient(to top, rgb(25, 26, 28), transparent 90%)"
    const url = `url('${BASE_URL}/static/media` + imageUrl + "')"
    // const background ="linear-gradient(to right, #0e0e0eca, #0e0e0eca)," + url + closure
    const background = url 

    return (
        <div className="surface" style={{
            backgroundImage : background,
        }}>
            <Layout 
            element={element}
            playAnimation={playAnimation}
            />

        </div>
    )

}

const Layout = ({
    element, playAnimation
}) => {

    const genres = [element.genre_1, element.genre_2, element.genre_3]
    
    const imageStyle = {
        width : "32vw",
        aspectRatio : '10 / 16',
        minWidth : '150px',
        marginLeft : "0.2em",
    } 

    return(
        <>
        <div className="poster">

            {/* <div style={{display : 'flex', flexDirection : 'column', gap:'1vmin', marginLeft:"8px", border : 'solid red'}}> */}
            <ImagePortrait 
            src={element.tof_url}
            alt={element.name}
            load={true}
            style={imageStyle}
            />

            {/* <WatchButton id={element.id}/> */}
            {/* </div> */}

            <PosterDetails 
            name={element.name}
            description={element.lesstext}
            genres={genres}
            />

           

        </div>
        </>
    )

}

const PosterDetails = ({
    name,
    description,
    genres,
}) => {
    return (
        <>
        <div className="poster-details">
            <h2>{name}</h2>

            <div style={{
                display : 'flex', justifyContent : 'flex-start', gap : '0.5em',
            }}>
                {genres.map((genre, i)=>{
                    return <h3 key={i}>{genre}</h3>
                })}
            </div>

            <h4>{description}</h4>
        </div>
        </>
    )
}

// to select a poster serie's
const WatchButton = ({
    id,
}) =>{
  

    return (
        <a href={'/serie/'+id}>
            <button className="watch">
                <h2><strong><i className="fa-solid fa-play" style={{
                    color : "#3d0042",
                }}></i>  Regarder</strong></h2>
            </button>
        </a>
    )
}

// buttons changing the posters
const ChangeButtons = ({change}) =>{
    
    return (
        <>
        <button style={{
            position : "absolute", zIndex : '2',
            bottom : '-5%', left : '3%',
           
            fontSize : "15px",
            color : "#909090",
            background : 'transparent',
         
            border : 'none',
        }}
        onClick={() => {change(-1)}}
        ><h2><strong>
            <i className="fa-regular fa-circle-left"></i>
            </strong></h2></button>        
        <button style={{
             position : "absolute", zIndex : '2',
             bottom : '-5%', right : '3%',
            
             fontSize : "15px",
            //  color : "#740072",
             color : "#909090",
             background : 'transparent',
           
             border : 'none',
        }}
        onClick={()=>{change(1)}}
        ><h2><strong>
            <i className="fa-regular fa-circle-right"></i>
            </strong></h2></button>        
        </>
    )
} 
