
import { Fake_details_small } from "../poster/anim"
const BASE_URL = "https://buushido.com"

// Basic container for the a serie onglet box 
// represented by the name of the onglet and the series inside


export default function ContainerSeries(props){
    let mobile = window.innerWidth > 756 ? false : true
    const series = props.all_series

    let shuffle_data ;
    if(props.conserve){
        const conserved = series.slice(0, 10)
        shuffle_data = shuffle(series.slice(10, series.length))
        shuffle_data = conserved.concat(shuffle_data)

    }else{
        shuffle_data = shuffle(series)
    }

    return(
        <div className="container" >
            {shuffle_data.map((serie, i) => {
                //let's make sure the name of the show stay within a range
                let nom = serie.name
                nom = nom.length > 40 ? nom.substr(0, 35)+'...' : nom

                // the loading animation for fake details
                // let animation = "fade_in 1700ms ease-out 0s 1 both"
                
                return (
                    <a key={i} href={"/serie/"+serie.id}>
                    
                    <div style={{display: 'flex', flexDirection : 'column', }}>
                        <div className="contenu" key={i} 
                        style={{
                            animation : ' smooth 1700ms ease-out 0s 1 both',
                            animationDelay : (Math.random() * 500 )  + 'ms',
                        }}
                        >
                            <Fake_details_small />
                            {/* <h3 >{serie.note}<i className="fa-solid fa-star"></i></h3> */}



                            <ImageNext 
                                    src={mobile ? serie.tof_url : serie.background_tof}
                                    alt={nom} 
                                    />
                            </div>

                        <h5 className="sub-name">{nom}</h5>
                    </div>
                        </a>
                )
            })}
        </div>
    )
}

const ImageNext = ({
    src, 
    alt, 
    mediatype = 'image/webp' ,
}) => {
    // function for serving in production
    // src = src.split('/').at(-1)
    return (
        <picture>           
            {/* for when the server is serving the files */}
            <source srcSet={`${BASE_URL}/static/media`+src+'.webp'} type={mediatype} />
            <img src={`${BASE_URL}/static/media`+src} alt={alt} loading='eager' />

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
