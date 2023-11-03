

// this function will take an onglet which has been clicked on to display a more detailled description of the onglet
// it will display a small description for it
// it will display all the shows in the onglet with if disponible a link to a category to more of the genre
import { ImagePortrait } from "../../self-contained/image-portrait"
import { useState } from "react"
import { ImageSmallDetails } from "../../self-contained/imageSmallDetails/ImageSmallDetails"
import { Fake_details_small } from "../poster/anim"

export default function Onglet_info(props){
    // const mobile = true
    const [showDetails, setShowDetails] = useState(false)
    // const show = props.show
    const mobile = window.innerWidth > 756 ? false : true
    const onglet = props.onglet
    const series = props.series

    if(showDetails){

        
        return (
            <>
            {/* juste the button name  */}
            <h1 onClick={()=>{setShowDetails(true)}} className="onglet-name">{onglet.name}  <span style={{
                    fontWeight : '100', fontSize : mobile ? '5.5vmin' : "4vmin",
                    fontFamily : 'monospace'
                }}>
                    <i className="fa-solid fa-arrow-right"></i>
                </span></h1>


             {/* the actual details */}
            <section id="hidden-details" style={{
            position : 'fixed', inset: '0',background : 'var(--black-carbon)', zIndex : '6', overflowY : 'scroll',
            }}>
                <div style={{
                    marginTop : '8vmax', marginLeft : '3vmax', display : 'grid', gridTemplateColumns : '15% 80%',
                    justifyContent : 'center', color : '#fff', alignItems : 'center'
                }}>

                    {/* button to cancel and go back */}
                    <h3 className="liens" onClick={()=>{setShowDetails(false)}} style={{
                        fontSize : mobile ? '8vmin' : '4vmin' , cursor : 'pointer', 
                        fontWeight : '200', 
                    }}><i className="fa-solid fa-xmark"></i>  {mobile ? null : 'Retour'}</h3>


                    {/* name and description of the page */}
                    <div>
                <h2>{onglet.name}</h2>

                <h3 style={{
                    fontFamily : "'Poppins', sans-serif", fontWeight : '250',
                    color : 'rgba(255, 255, 255, 0.8)', fontSize : '2.5vmin',
                }}>{onglet.description}</h3>
                </div>
                </div>
                <hr style={{width : '85%', color : 'mediumvioletred', backgroundColor : 'mediumvioletred', border : '1px solid #7c7c7ccd'}}></hr>

                 {/* all the shows on the page */}

                {/* <Series_box series={series} mobile={mobile}/> */}
                <DetailsSerieContainer series={series}/>

                {/* if it's link to a specific page it will be displayed here */}
                {onglet.link && 
                <a href={'genre/'+onglet.link} 
                style={{
                    textDecoration : 'none', textAlign : 'right',
                    fontSize : mobile ? '8vmin' : '4vmin' , fontWeight : '100', cursor : 'pointer'
                }}><h4 className="liens" style={{marginRight : '10vmax', marginBottom : '8vmax'}}>Voir plus...   </h4></a>
                }

            </section>
            </>
        )
    }
    else{
        return (

            <h1 onClick={()=>{setShowDetails(true)}} className="onglet-name">{onglet.name} 
            
                <i className="fa-solid fa-circle-chevron-down"></i>
              
                </h1>
            
            )
        }
}


// to handle all the series that will be displayed in this page


const Series_box = ({series}) => {
    const my_style = {
        width : '14vw',
        minWidth : '110px',
        aspectRatio : '10/16',
    }
    return (
        <>
        <div style={{
            display : 'grid', 
            gridTemplateColumns : 'repeat(auto-fit, minmax(110px, 15vw))',
            gap : '3vmin',
            width : '95%', margin : '5vmax auto',
            justifyContent : 'center',
        }}>
            {series.map((serie, i)=>{

                let nom = serie.name
                nom = nom.length > 40 ? nom.substr(0, 35)+'...' : nom

                return(
                    <a href={'/serie/'+serie.id}>
                    <div className="contenu-info">
                    
                    <div style={{
                        position : 'absolute', inset : '0', 
                        background: 'linear-gradient(to top ,rgba(0, 0, 0, 0.71) 15%, transparent 30%) ',
                        // background : 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9) 95%)',
                        display : 'flex', flexDirection : 'column', justifyContent : 'flex-end', zIndex : '3', borderRadius : 'inherit'
                    }}>
                        <h4 style={{
                            fontFamily : '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif', fontWeight : '500',
                            color : '#fff',  fontSize : '2.8vmin',
                             textAlign : 'center', lineHeight : '84%',
                        }}>{nom}</h4>
                    </div>

                    {/* <Fake_details_small index={'-1'} /> */}

                    <ImagePortrait key={i}
                    src={serie.tof_url}
                    style={my_style}
                    // src={mobile ? serie.tof_url : serie.background_tof}
                    alt={serie.name}
                    load={true}
                    />
                    </div>
                    </a>
                    )
            })}

        </div>
        </>
    )
}

const DetailsSerieContainer = ({series}) => {
    return (
        <section className="onglet-serie-details"
        >
            {series.map((serie, i)=>{

                return <a href={"/serie/"+serie.id}>
                    <ImageSmallDetails 
                    serie={serie}
                    picWidth={9}
                    picMinWidth={110}
                    picMaxWidth={140}
                    picAspectRatio={[10, 16]}
                    extraDetails={serie.lesstext}
                    gap_between={0.4}
                    />
                    </a>
            })}

        </section>
    )
}
