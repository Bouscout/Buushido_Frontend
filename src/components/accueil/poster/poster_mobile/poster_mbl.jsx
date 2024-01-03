import { useRef, useState } from "react"
import { ImagePortrait } from "../../../self-contained/image-portrait"
import ScrollHandler from "../../../self-contained/scrollMark/scrollMark"

const BASE_URL = import.meta.env.SITE

export default function Posters_mobile(props){
    const [state, setState] = useState(null)

    const posters = props.posters
    
    const containerRef = useRef(null)
    
    

    // animation
    function Animation(){
        const animation = {
            transform : 'scale(0.98)',
            webkitFilter : 'brightness(30%)',
            opacity : '0.3'
        }
        setState(animation)
        setTimeout(() => {
            // ScrollToElement(dir)
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

        {/* <ChangeButtons change={Animation}/> */}
        <ScrollHandler 
        divRef={containerRef}
        numSection={5}
        specialFunc={Animation}
        delay={150}
        automaticScrolling={true}
        />
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
            <a href={'serie/'+element.id}>
                <ImagePortrait 
                src={element.tof_url}
                alt={element.name}
                load={true}
                style={imageStyle}
                />
            </a>

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
