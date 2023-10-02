import { useState } from "react"

export default function Dropdown(){
    const [active, setActive] = useState(false)

    window.onclick = (e) => {
        if(!e.target.matches('#dropdown')){
            setActive(false)
      }
    }
    function show_drop(){
        setTimeout(()=>{
            setActive(true)
        }, 200)
        // setActive(true)
    }

    if (active){
    return(
        <>
        <Glass />
        <a id="dropdown">
        <i className="fa-solid fa-layer-group"></i>
        <span className="small">  Catalogue</span>
                <section id="dropdown-content" >
                    <Genres />  
                    <a href="/see_all"><h1 style={{
                        fontSize : '1.5rem', fontFamily : 'odachi', lineHeight : '10%', 
                        margin : '-1rem 0rem', marginTop : '0.3rem'                        
                    }}>Voir tout les animes</h1></a>              
                    <Social />               
                </section>
                    </a>
        </>
    )
}else{
        return(
            <>
            <a  id="dropdown" onClick={()=>{show_drop()}}><i className="fa-solid fa-layer-group"></i>
                <span className="small">  Catalogue</span>
                </a>
                   
            </>
        )

    }
}



export const Genres = ()=>{
    return (
        <>
        <div id="genres">
            <div>
                <a href='/genre/Aventure'>Aventure</a>
                <a href='/genre/Horreur'>Horreur</a>
                <a href='/genre/Action'>Action</a>
                <a href='/genre/Romance'>Romance</a>
                <a href='/genre/Drama'>Drama</a>
                <a href='/genre/Mystere'>Mystere</a>
            </div>
            <div>
                <a href='/genre/Comedie'>Comedie</a>
                <a href='/genre/Fantaisie'>Fantaisie</a>
                <a href='/genre/Thriller'>Thriller</a>
                <a href='/genre/Sci-fi'>Sci-fi</a>
                <a href='/genre/Seinen'>Seinen</a>
                <a href='/genre/Shonen'>Shonen</a>
            </div>
            <div>
                <a href='/genre/Slice of life'>Slice of life</a>
                <a href='/genre/Shojo'>Shojo</a>
                <a href='/genre/Isekai'>Isekai</a>
                <a href='/genre/Ecchi'>Ecchi</a>
                {/* <a>Drama</a>
                <a>Mystere</a> */}
            </div>
        </div>
                
        </>
    )
}

export const Social = ()=>{
    return(
        <>
        <div id="social">
        <h1><a href="https://discord.gg/F5gpNtGD"><i className="fa-brands fa-discord"></i></a></h1>
        <h1><a><i className="fa-brands fa-whatsapp"></i></a></h1>
        <h1><a href="https://t.me/buushidoadmin"><i className="fa-brands fa-telegram"></i></a></h1>        
        </div>
        </>
    )
}


export const Glass = ()=>{
    return (
        <div style={{
            position : 'fixed', top : '0', left : '0', zIndex : '1',
            width : '100%', height : '100%', backgroundColor :'#ffffff10',
            backdropFilter : 'blur(12px)',
            WebkitBackdropFilter : 'blur(12px)',
        }}></div>
    )
}