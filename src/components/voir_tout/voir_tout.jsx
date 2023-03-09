// import './voir.css'

export default function Voir_tout(props){
    //getting the data from the api
    const couplet = props.data
    const indexes = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return (
        <>
        <All_index data={indexes} />
        <div id='contenu-tout'>
        {couplet.map((duo, i) => {
            return (
                <Lettre key={i} index={duo[0]} data={duo[1]}/>
                )
            })}
            </div>
        </>
    )

}

function All_index(props){
    let index = props.data
    return (
        <section style={{marginTop : '4rem'}}>
        <h1 style={{textAlign : 'center', fontSize : '2.5rem',}}>Choississez une lettre</h1>
        <div id="indexes">
            {index.map((letter, i) => {
                return (
                    <a key={i} href={"#"+letter}><h1 className='serie-name'>{letter}</h1></a>
                    )
                })}
        </div>
                </section>
    )
}


function Lettre(props){
    let index = props.index
    let serie = props.data
    return (
        <section className="boite" id={index}>
            <h1>{index}</h1>
            <hr style={{background : 'gold', width : '70%', height : '3px', border : 'none'}}></hr>
            <div style={{display : 'flex', flexDirection : 'column',}}>
            {/* <div id='ferme'><h1><i className="fa-regular fa-circle-xmark"></i></h1></div> */}

                {serie.map((serie, i) => {
                    return (
                        <div className='show'>
                        <a href="javascript:void(0);"><h3>{serie.name}</h3></a>
                        <Extra serie={serie} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}




//a little bubble that would display more details about the show without directly switching page
function Extra(props){
    let serie = props.serie

    return (
        <>
        <div className='extra'>
        <h1 style={{fontSize : '1.5rem'}}>{serie.name}</h1>
        <div style={{display : 'flex', justifyContent : 'space-evenly', color : '#f8a100'}}>
            <h1>note : {serie.note}/10 </h1>
            <h1>statut : {serie.en_cours ? 'En cours' : 'Finie'}</h1>
        </div>
        <h3>{serie.lesstext}</h3>
            <div style={{display : 'flex', justifyContent : 'space-around'}}>
            <h2>{serie.genre_1}</h2>
            <h2>{serie.genre_2}</h2>
            <h2>{serie.genre_3}</h2>
            <h2>{serie.genre_4}</h2>
            </div>
                <button>
            <a href={'/serie/'+serie.id}>
                    <h2>Regarder</h2>
                </a>
                </button>
        </div>
        </>
    )
}