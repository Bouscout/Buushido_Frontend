

export default function All_cards(props){
    const posters = props.posters
    const pos = props.pos
    console.log('the position are : ', pos)
    return (
        <>
       <Card url={posters[0]} pos={pos.indexOf(0)}  />
       <Card url={posters[1]} pos={pos.indexOf(1)}  />
       <Card url={posters[2]} pos={pos.indexOf(2)}  />
       <Card url={posters[3]} pos={pos.indexOf(3)}  />
       <Card url={posters[4]} pos={pos.indexOf(4)}  />
        </>
    )
}


function Card(props){
    // const url = props.url
    const serie = props.url
    const url = `url('https://buushido.ml/static/media${serie.poster_tof}')`
    const fond = 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent 30%), '

    const position = props.pos
    if(position !== -1){

        let pos = `translateX(${(position * 33)}vmin)`
        
        let name = serie.name
        // console.log(`${name} is at position ${props.pos}`)
        
        return (
            <>
        <div className="poster" style={{
            backgroundImage : fond + url ,  
            transform : pos ,
            pointerEvents : 'none',
            display : 'flex', flexDirection : 'column', justifyContent : 'flex-end',
            zIndex : '1',
            // animation : position !== -1 ? '' : 'fade_in 1000ms linear 0s 1 both'
        }}><h1 style={{
            fontSize : '3vmin', color : '#fff', textAlign : 'center'
        }}>{name}</h1></div>
        </>
    )
    }
}