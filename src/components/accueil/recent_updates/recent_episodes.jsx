// contain the logic for displaying the most recent posted episodes in the database
import { useEffect, useRef, useState, useCallback } from "react";
import { ImageSmallDetails } from "../../self-contained/imageSmallDetails/ImageSmallDetails";

const BASE_URL = "https://buushido.com"

export default function Recent_episodes(){
    // make api call and get data
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch(`${BASE_URL}/api/recent/`)
        .then(response => response.json())
        .then(data => {
            setData(data)
        })
    }, [])

    // establist conditions for display style
    // rendering conditions
    const divider = 700
    const [isMobile, setIsMobile] = useState(window.innerWidth < divider)
   
    // handling changes
    const handleWindowResize = useCallback(event => {
        setIsMobile(window.innerWidth < divider);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);
    // display
    if (data.length > 0)
    {

        return (
            <Tab
            series={data}
            isMobile={isMobile} 
            />
            )
        }

}

// tab container
const Tab = ({series, isMobile}) =>{
    let containerRef = null
    let scrollFunction = null
    if (isMobile){
        const Ref = useRef(null)

        function ScrollToElement(dir){
            if (containerRef.current){
                const width = containerRef.current.offsetWidth
                containerRef.current.scrollLeft += width * dir
                
                console.log("performed scrolling with : ", width)
            }
        }

        containerRef = Ref
        scrollFunction = ScrollToElement
        
    }
    const numSections = Math.floor(series.length / 5)  // num of divisions 

    let sections = series
    if (series.length > 18){
        sections = series.slice(0, 18)
    }

    // divide into three sections
    let numPerSection = Math.floor(sections.length / numSections)
    let parts = null
   
    parts = Array(numSections)
    
    let index = 0
    for (let i=1; i<numSections+1; i++){
        parts[index] = sections.slice(index*numPerSection, i*numPerSection)
        index += 1
    }

    // styling
    const styleMobile = `repeat(${numSections}, 100%)`

    const tab_style = {
        display : 'grid',
        width : isMobile ? "100%" : "85%",
        gridTemplateColumns: !isMobile ? `repeat(${numSections}, minmax(min-content, 30%))` : styleMobile,
        justifyContent : !isMobile ? "center" : null,
        gap : !isMobile ? '2em' : "0",
        scrollSnapType : 'x mandatory',
        scrollBehavior : "smooth",
        overflowX : 'scroll',
    }

    return (
        <>
        <section className="flex-column" style={{position : 'relative', paddingBottom : '1.5em', }}>

        <Title isMobile={isMobile}/>

        <div style={tab_style} className="onglet-serie-details" ref={isMobile ? containerRef : null}>

            {isMobile && 
                <ScrollButton set={scrollFunction}/>
            }

            {parts.map((episodes, i)=>{
                return (
                    <SingleTab 
                    key={i}
                    series={episodes}
                    mobile={isMobile}
                    />
                    )
                })}
        </div>
        </section>
        </>
    )
}
const Title = ({isMobile})=>{
    return (
        <h2 style={{
            color : 'var(--accent-white)',  fontFamily: "'Poppins', sans-serif", fontSize : '1em',
            width : isMobile ? "96%" : "85%", margin : '1em auto'
        }}>Ajoutes Recemment</h2>
    )
}

const SingleTab = ({series, mobile}) => {
    // finding the actual time
    let rightNow = new Date()
    rightNow = rightNow.getDate()

    const tabStyle = {
        display : 'flex',
        flexDirection : 'column',
        scrollSnapAlign : 'start',
        padding : '0.5em',
        borderRadius : '0.3em',
        // background : mobile ? "var(--dark-blue)" : "var(--dark-gray)",
        background :  "var(--dark-blue)",
    }
    
    return (
        <div style={tabStyle}>
            {series.map((episode, i) => {
                // disable the genres displaying
                // episode.serie.genre_1 = null
                episode.serie.note = null
                let extraMessage = `Saison ${episode.saison} episode ${episode.episode}`
                let date = episode.date.split("-")
                
                const diff = rightNow - parseInt(date.at(-1))
                let answer 
                if (diff == 0){
                    answer = " aujourd'hui"
                }else {
                    answer = `      il y'a ${diff} jour${diff > 1 ? "s" : ""}` 
                }

                extraMessage = extraMessage + answer 
            return (
                <ImageSmallDetails
                key={i}
                serie={episode.serie}
                picWidth={3}
                picMaxWidth={100}
                picMinWidth={50}
                picAspectRatio={[10, 16]}
                extraDetails={extraMessage}
                extraStyle={{}}
                rounded={2}
                preserve={true}
                />
                )      
})  }
        </div>
    )
}

const ScrollButton = ({set}) => {
    
    return (
        <>
        {/* right button */}
        <button style={{
            bottom : '2%', right : '2%', zIndex : "2", position : 'absolute', outline : 'none', border : 'none', borderRadius : '50%',
            background : "#303030",
        }} onClick={()=>{set(1)}}><h2><i className="fa-solid fa-arrow-right"></i></h2></button>
        {/* right button */}

        {/* left button */}
        <button style={{
            bottom : '2%', left : '2%', zIndex : "2", position : 'absolute', outline : 'none', border : 'none', borderRadius : '50%',
            background : '#303030'
        }} onClick={()=>{set(-1)}}><h2><i className="fa-solid fa-arrow-left"></i></h2></button>
        {/* left button */}
        
        </>
    )
}