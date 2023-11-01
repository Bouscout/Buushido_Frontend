import "./shooting_starts.css"


export default function NightSky(){

    return (
        <section id="sky">
            <Star />
        </section>
    )

}

const Star = () => { 
    return <div className="star"></div>
}

