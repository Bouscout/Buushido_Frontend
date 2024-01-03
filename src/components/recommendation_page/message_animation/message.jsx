// message displaying on the main recommender page to explain the concept
import "./letter_style.css"

export const Message = () => {
    const message = "✨Entrez les animés que vous appreciez et nous vous recommenderons les prochaines perles✨".split(" ")

    return (
        <div id="message" >
            {message.map((word, i) => {
                return <Word key={i} elem={word} pos={i}/>
            })}
        </div>
    )
}

const Word = ({elem, pos}) => {
    return (
        <h1 style={{
            animationDelay : `${pos * 100}ms`
        }}>{elem}</h1>
    )
}