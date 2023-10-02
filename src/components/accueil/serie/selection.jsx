import { useEffect, useState, useMemo } from "react"
const BASE_URL = "https://buushido.com"
const BlurAmount = 16
const MaxIndex = 10



export default  function Selection(props){
    const [data, setData] = useState(props.data ? props.data : [])
    if (props.data){
        useState(props.data) ;
    }else{
        useEffect(()=>{
            fetch(`${BASE_URL}/api6/`)
            .then(response => response.json())
            .then(data => {
                console.log('api called for video')
            // set the data from the api into the components
                let new_data = shuffle(data)
                setData(new_data)
        }),
        (error)=>{
            console.log('the call error : ', error)
        }
        
    }, [])
    }

    //function to handle parallax effect
    // we'll use the scroll event to find the scroll value and then update the images
    //object position through some percentage of the max scroll width
    const [scrl, setScrl] = useState(0)
    
    // console.log(shuffle([1,2,3,4]))   
 
    function handle_scroll(event){
        let value = event.target
        
        //find max scroll width
        let max = value.scrollWidth - value.clientWidth
        // find percentage
        let new_pos = (value.scrollLeft * 100) / max
        console.log(`scrolling new pos ${new_pos}`)

        // small addition
        // if (new_pos < 40){
        //     new_pos = 40
        // }else if(new_pos > 60){
        //     new_pos = 60
        // }
        
        setScrl(new_pos.toString())

    }

    function handleScrollBlur(event){
        let value = event.target

        // max possible scroll value
        const max = value.scrollWidth - value.clientWidth

        let scrollPercentage = value.scrollLeft / max

        setScrl(scrollPercentage)
    }
   
    

    return(
        <>
        {/* <section className="ongle"> */}
            {/* <h1 className="onglet-name">Notre selection personelle</h1> */}
            <div id="selection" onScroll={e=>{handleScrollBlur(e)}} >
            <Place_holder text={'Notre selection personelle'} />
            {data.map((serie, id)=>{
                //let's make sure the name of the show stay within a range
                let nom = serie.name
                nom = nom.length > 40 ? nom.substr(0, 35)+'...' : nom
                
                return (
                <a href={"/serie/"+serie.id} key={id} >

                <div className="contenu" >
                        <h1>{nom}</h1>
                        <div></div>
                         {/* <ImagePara 
                                src={serie.background_tof2 ? serie.background_tof2 : serie.background_tof}
                                alt={serie.name}
                                posX={scrl}
                                /> */}

                        <BluredImg 
                            src={serie.background_tof2 ? serie.background_tof2 : serie.background_tof}
                            alt={serie.name}
                            scrollPos={scrl}
                            index={id}
                        />
                </div>
                </a>
                    )
                })}
            <Place_holder />
            </div>
        {/* </section> */}
        </>
    )
}

function Place_holder(props){
    return (
        <div style={{
            width : '60vw',  height: 'auto', display : 'grid', placeItems : 'center',
        }}>
            <h1 className="onglet-name">{props.text}</h1>
        </div>
    )
}

const ImagePara = ({
    src,
    alt,
    posX,
    mediatype = 'image/webp'
}) => {
    let brightness = 98 + (posX / 100)
    let pos = {
        objectPosition : `${posX}% 50%`,
        filter : `brightness(${brightness}%)`
    }
    // src = src.split('/').at(-1)

    return (
        <picture>           
            {/* <source srcSet={'https://buushido.ml'+src+'.webp'} type={mediatype} />
            <img src={'https://buushido.ml'+src} alt={alt} loading='lazy' style={pos} /> */}

            {/* for production mode */}
            <source srcSet={`${BASE_URL}/static/media`+src+'.webp'} type={mediatype} />
            <img src={`${BASE_URL}/static/media`+src} alt={alt} style={pos} />
        </picture>
    )
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const BluredImg = ({
    src,
    alt,
    scrollPos,
    index,
    mediatype = 'image/webp',
    bias = 0.3,
}) => {
    // const indexSpectrum = (MaxIndex - index) / MaxIndex
    const indexSpectrum = index / (MaxIndex - 1)
    const indexAmplifier = (1 -indexSpectrum) + scrollPos

    // based on the index in relation to the scroll pos
    let Blur = BlurAmount -  Math.floor(BlurAmount * indexAmplifier)
    
    let brightness = indexAmplifier

    // in order to create a focus effect on the elements on center
    // expand focus area by incrementing bias variable
    if (scrollPos - bias < indexSpectrum && indexSpectrum < scrollPos + bias){
        brightness = 1
        // Blur = 0
    }
    
    const styling = {
        filter : `blur(${Blur}px) brightness(${brightness})`
    }
    return (
        <div>
            <picture>               
                {/* <source srcSet={'https://buushido.ml'+src+'.webp'} type={mediatype} />
            <img src={'https://buushido.ml'+src} alt={alt} loading='lazy' style={pos} /> */}

            {/* for production mode */}
            <source srcSet={`${BASE_URL}/static/media`+src+'.webp'} type={mediatype} />
            <img src={`${BASE_URL}/static/media`+src} alt={alt} style={styling} />
            </picture>
        </div>
    )

}