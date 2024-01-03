// all small informations about an anime

export const SerieInformations = ({serie}) =>{
    return (
        <div className="flex-column" style={{
            width : '95%', margin : '0 auto', gap : '0px', 
        }}>
            <Titles main={serie.title} english={serie.english_title} japan={serie.other_name}/>

            <h3><span>Studio</span> : {serie.studios} | {serie.producers}</h3>

            <h3><span>Statut</span> : {serie.completed ? "Fini" : "En Cours"}</h3>

            <h3><span>Note</span> : {serie.rating}</h3>

            <h3><span>Classification</span> : {serie.classification}</h3>

            <Genres genres={serie.genres}/>

            <LineBreak />

            <p style={{
                height : '100%', overflowY : "scroll"
            }}>{serie.description}</p>

        </div>
    )
}

const LineBreak = () => {return  <hr style={{color : '#4e4e4e25', width : '90%', opacity : '0.25'}}/>}

const Genres = ({genres}) => {
    return (
        <div className="icon">
            {genres.map((genre, i)=> {
                return (
                    <h4 key={i} style={{
                        background : "var(--medium-black)", borderRadius : '0.3em'
                    }}>
                        {genre}
                    </h4>
                )
            })}
        </div> 
    )
}

const Titles = ({main, english, japan}) =>{
    return (
        <div className="flex-column" style={{lineHeight : '1em', height: "100%"}}>
            <h2>{main}</h2>
            <h3><span>{english}</span></h3>
            <h3><span>{japan}</span></h3>
        </div>
    )
}