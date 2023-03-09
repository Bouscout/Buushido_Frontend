import { useState } from "react";
export default function Navi(){
    const [ray, setRay] = useState([true, false, false, false, false])
    const [actif, setActif] = useState(0)
    function spotlight(i){
        let fake = [...ray]
        fake[i] = true
        fake[actif]=false
        setActif(i)
        setRay(fake)
      
    }
    return (
        <>
        <nav id="navbar">
            <a href="http://localhost:3000/Maison" className={ray[0] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(0)}}>
                <i className="fa-solid fa-house-chimney-window "></i>
            <span className="small">  Home</span></a>
            <a href="#" className={ray[1] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(1)}}><i className="fa-regular fa-calendar-days "></i>
                <span className="small">  Agenda</span></a>
            <a href="#" className={ray[2] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(2)}}><i className="fa-solid fa-list"></i>
                <span className="small">  Watchliste</span></a>
            <Dropdown />           
            <a href="#" className={ray[4] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(4)}}><i className="fa-solid fa-user"></i>
                <span className="small">  Profil</span></a>
        </nav>
        
        </>
    )
}

function Dropdown(){
    const [active, setActive] = useState(false)
    const darker = 'body{opacity : 0.8 ;} '

    window.onclick = (e) => {
        if(!e.target.matches('#dropdown')){
            setActive(false)
            console.log('reverse it')
        }
    }
    function show_drop(){
        setTimeout(()=>{
            setActive(true)
        }, 200)
        // setActive(true)
        console.log('show dropdown')
    }
    console.log('now it is ',active)

    if (active){
    return(
        <>
        <style>{darker}</style>
        <a href="#" className='lightray'id="dropdown"><i className="fa-brands fa-ioxhost "></i>
        <span className="small">  Categories</span></a>
                <section id="dropdown-content" style={{
                    display : 'grid', 
                }}>
                    <Genres />                
                    <Social />               
                </section>
        </>
    )
}else{
        return(
            <>
            <a className="lightray-off" id="dropdown" onClick={()=>{show_drop()}}><i className="fa-brands fa-ioxhost "></i>
                <span className="small">  Categories</span></a>
                    <section id="dropdown-content">
                    </section>
            </>
        )

    }
}



function Genres(){
    return (
        <>
        <div id="genres">
            <div>
                <a>Aventure</a>
                <a>Horreur</a>
                <a>Action</a>
                <a>Romance</a>
                <a>Drama</a>
                <a>Mystere</a>
            </div>
            <div>
                <a>Aventure</a>
                <a>Horreur</a>
                <a>Action</a>
                <a>Romance</a>
                <a>Drama</a>
                <a>Mystere</a>
            </div>
            <div>
                <a>Aventure</a>
                <a>Horreur</a>
                <a>Action</a>
                <a>Romance</a>
                <a>Drama</a>
                <a>Mystere</a>
            </div>
        </div>
                
        </>
    )
}

function Social(){
    return(
        <>
        <div id="social">
        <h1><i class="fa-brands fa-discord"></i></h1>
        <h1><i class="fa-brands fa-whatsapp"></i></h1>
        <h1><i class="fa-brands fa-telegram"></i></h1>        
        </div>
        </>
    )
}