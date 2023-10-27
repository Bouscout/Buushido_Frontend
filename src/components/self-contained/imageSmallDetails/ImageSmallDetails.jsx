// component with a image and some details to its side
import { ImagePortrait } from "../image-portrait"

// import "./imgSmallDetails.css"

export const ImageSmallDetails = ({
    serie,
    picWidth,
    picMinWidth,
    picMaxWidth,
    picAspectRatio,
    extraDetails = null,
    extraStyle,
    rounded,
    preserve,
    gap_between,
}) => {
    rounded = rounded ? rounded : 1

    // trimming the name if too long
    const MaxNameLength = 35
    let nom = serie.name
    nom = nom.length > MaxNameLength ? nom.substr(0, 30)+"..." : nom

    const genres = serie.genre_1 ? [serie.genre_1, serie.genre_2, serie.genre_3, serie.genre_4] : null

    // setting up the picture shape
    const pictureWidth = picWidth
    const pictureMinWidth = picMinWidth
    const pictureMaxWidth = picMaxWidth

    const aspectRatio = picAspectRatio[0] / picAspectRatio[1]

    const imageStyle = {
        width : `${pictureWidth}vw`,
        aspectRatio : '10 / 16',
        minWidth : `${pictureMinWidth}px`,
        maxWidth : `${pictureMaxWidth}px`,
        borderRadius : '0.3em',
    } 

    let ComponentStyle;
    // check if specific style was passed
    if (extraStyle){
        extraStyle.height = `clamp(${pictureMinWidth/aspectRatio}px, ${pictureWidth/aspectRatio}vw, ${pictureMaxWidth/aspectRatio}px)`
        extraStyle.display = "flex"
        extraStyle.justifyContent = "flex-start"
        extraStyle.padding = "0.3em"
        extraStyle.borderRadius = rounded === 1 ? '0.3em' : null ,

        ComponentStyle = extraStyle
    }else{
        ComponentStyle = {
            display : 'flex', justifyContent : 'flex-start', 

            // we adjust the size of the container in function of the picture height
            height: `clamp(${pictureMinWidth/aspectRatio}px, ${pictureWidth/aspectRatio}vw, ${pictureMaxWidth/aspectRatio}px)`,

            borderRadius : rounded === 1 ? '0.3em' : null ,
            padding : '0.3em',
        }
    }

    return (
        <>
        <div style={ComponentStyle} className="image-small-details">
            <ImagePortrait 
            src={serie.tof_url}
            alt={nom}
            load={true}
            style={imageStyle}
            />

            <SmallDetails 
            nom={nom}
            note={serie.note}
            statut={serie.en_cours}
            genres={genres}
            extra={extraDetails}
            preserve={preserve}
            gap_between={gap_between}
            />

        </div>
        </>
    )

}




// code for the details on the right side of the image
const SmallDetails = ({
    nom, note, statut, genres, extra, preserve, gap_between
}) => {
    const statutStyle = {
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        // background : '#3d3d3d',
        background : '#2c2c2c',
        padding : "0.1em 0.4em", 
        borderRadius : '0.25em' ,
        height : '100%',
        fontWeight : "300",
    }

    // small light beacon indicating the if a serie is on going or not
    const StatutLight = () => {
        if (statut){
            return <div style={statutStyle}>
                        <h3>En cours</h3>
                        <h6 style={{background : "var(--status-green)"}}/>
                    </div>
        }else{
            return <div style={statutStyle}>
                        <h3>Complet</h3>
                        <h6/>
                    </div>
        }

    }

    // all the styles
    

    return (
        <div style={{
            display : 'flex', flexDirection : 'column', overflow : 'hidden', justifyContent : 'flex-start',
            height : '100%', marginLeft : "2vmin", gap : gap_between ? `${gap_between}em` : null ,
        }}>
            <h2>{nom}</h2>

            {note &&
            <div style={{display : 'flex', justifyContent: "left", alignItems : 'center',
            height : '12%', gap: "4vmin", 
        }}>
                <h3>
                    <strong>{note} <i className="fa-regular fa-star"></i></strong>
                </h3>
                <StatutLight />

            </div>
            }

            {/* the genres */}
            { genres &&
            <div style={{display : "flex", justifyContent : 'left', height : "5%", alignItems : 'center', marginTop: '0.6em'}}>
                {genres.map((genre, i)=> {
                    return <h4 key={i}><strong>{genre}</strong></h4>
                })}
            </div>
            }
            {/* the genres */}
            
            {!preserve && 
                <p>{extra ? extra : null}</p>
            }

            {/* if there is extra details being passed, we display it */}
            {preserve &&
                <pre>{extra ? extra : null}</pre>
            }
            {/* <p>{date}</p> */}
           

        </div>
    )
}

/*
.onglet-serie-details{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    width: 83%;
    margin: 0 auto;
    font-size: clamp(15px, 2vmin, 17px);
    font-family: 'Poppins', sans-serif;
    gap: 1vmin;
    text-decoration: none;
    overflow: hidden;
  }
  .onglet-serie-details h2{
    color: #fff;
    font-size: 1em;
    font-weight: 700;
    line-height: 100%;
    height: 14%;
    margin: 0.3em 0;
  }
  .onglet-serie-details h6{
    --circleRadius : 1.2em ;
    width: var(--circleRadius);
    height: var(--circleRadius);
    border-radius: 50%;
    background: lightseagreen;
  
    margin-left: 0.8em;
  }
  
  .onglet-serie-details h3{font-size: 0.8em;
    color: #fff;
    line-height: 50%;}
  
    .onglet-serie-details h4{
    color: #fff;
    font-size: 0.7em;
    margin-right: 0.7em;
    font-weight: 500;
    line-height: 20px;
  }
  
  .onglet-serie-details p{
    color: #fff;
    font-weight: 500;
    margin-top: 8px;
    font-size: 0.85em;
    line-height: 1.3em;
    overflow: hidden;
  }

  for mobile
  .onglet-serie-details{
  grid-template-columns: repeat(auto-fit, minmax(min-content, 100%));
  width: 90%;
}
  */