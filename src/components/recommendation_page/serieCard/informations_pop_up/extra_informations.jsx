// all small informations about an anime

export const SerieInformations = ({serie}) =>{
    return (
        <div className="flex-column" style={{
            width : '95%', margin : '0 auto', gap : '0px', 
        }}>
            <h2>{serie.title}</h2>
            <h3>Studio : {serie.studios}</h3>

            <h3>Statut : {serie.completed ? "Fini" : "En Cours"}</h3>

            <h3>Note : {serie.rating}</h3>

            <Genres genres={serie.genres}/>

            <LineBreak />

            <p>{serie.description}</p>

        </div>
    )
}

const LineBreak = () => {return  <hr style={{color : '#4e4e4e25', width : '90%', opacity : '0.25'}}/>}

const Genres = ({genres}) => {
    return (
        <div className="icon">
            {genres.map((genre, i)=> {
                return (
                    <h4 style={{
                        background : "var(--medium-black)", borderRadius : '0.3em'
                    }}>
                        {genre}
                    </h4>
                )
            })}
        </div> 
    )
}