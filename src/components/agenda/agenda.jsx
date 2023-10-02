// import '../agenda/agenda.css'
import { ImagePortrait } from '../self-contained/image-portrait'


export default function The_agenda(props){
    // storing everyday with its series
    const Lundi = props.lundi   
    const Mardi = props.mardi
    const Mercredi = props.mercredi
    const Jeudi = props.jeudi
    const Vendredi = props.vendredi
    const Samedi = props.samedi
    const Dimance = props.dimanche

    const jour = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    // console.log('the new for agenda monday is : ', props.lundi) 

    // storing everything in a big array
    const semaine = [Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimance]

    return (
        <>
        <section id='agenda'>
            <Big_title />
            {semaine.map((day, i)=>{
                // retrieving the name
                const name = jour[i]
                // console.log('le jour est : ', day, ' for ', name)

                return(
                    <div key={i} className='jour'>
                        <h1>{name}</h1>

                        <div className='series'>

                            {/* displaying all the series name */}
                            {day.map((serie, i)=>{
                                return(
                                    // <a href={`/serie/${serie.id}`} key={i}><h3>{serie.name}</h3></a>
                                    <Serie_info key={i} serie={serie}/>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </section>
        </>
    )
}


const Serie_info = ({
    serie, // getting the serie object
}) =>{
    // setting up the style of the image
    // console.log('la serie est : ', serie)

    const paysage = {
        maxWidth: '300px',
        aspectRatio: '13 / 8',
        width: '16vw',
        minWidth: '180px',
    }

    // defining the name en ensuring it has decent size
    let nom = serie.name
    nom = nom.length > 40 ? nom.substr(0, 35)+'...' : nom
    return(
        // the wrapper
        <div style={{
            display : 'flex', flexDirection : 'column', justifyContent : 'center',
            background : '#191919', borderRadius : '10px', color : '#fff', width : '16vw',
            minWidth : '180px',
            textAlign : 'center', lineHeight : '50%',
            fontSize : '0.5rem', overflow : 'hidden', 
            border : 'solid black',

        }}>
            <a href={"/serie/"+serie.id}>
                <div style={paysage}>
                    <ImagePortrait src={serie.background_tof}
                        alt={serie.name}
                        style={paysage}
                        load={true}
                        />
                </div>
            </a>
            <h2 style={{fontSize : '2vmin', lineHeight : '70%'}}>{nom}</h2>
        </div>
    )
} 


const Big_title = ()=>{
    return (
        <>
        <div id='title'>
            <h1>Agenda</h1>
        </div>
        </>
    )
}