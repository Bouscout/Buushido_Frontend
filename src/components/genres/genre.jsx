import ImagePortrait from '../self-contained/image-portrait'
// import './genre.css'
export default function Genres_serie(props){
    //getting data from top level api
    const series = props.data
    const name = props.name
    return (
        <>
        <Header name={name} />
        <Series data={series} />
        </>
    )
}




function Header(props){
    return (
        <>
        <section id="header">
            <div id="heading">{props.name}</div>
        </section>
        </>
    )
}

function Series(props){
    const series = props.data
    const styling = {
        width : '15.5vw',
        height : 'auto', 
        minWidth : '117px'
    }
    return (
        <>
        <section id="conteneur">
            {series.map((serie, i)=>{
                return(
                <div key={i} className="contenu">
                    <a href={'/serie/'+serie.id}>
                    <ImagePortrait style={styling} src={serie.tof_url} alt={serie.name} />
                    </a>
                </div>
                )
            })}
        </section>
        </>
    )
}