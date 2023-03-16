// import './navbar.css'
import Search_bar from './search_bar';
import logo from './logo.jpg.webp'
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
            <a href='/' id='logo'>
                <img id='icon-image' src={logo} alt='logo'></img>
                <h3 id='icon-text'>Buushido</h3>
                {/* <h2 className='lightray' style={{visibility : 'hidden'}}>Home</h2> */}
            </a>
            {/* <a href="/"  className={ray[0] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(0)}}>
                <i className="fa-solid fa-house-chimney-window "></i>
            <span className="small">  Home</span></a> */}
            <a href="/agenda" className={ray[1] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(1)}}><i className="fa-regular fa-calendar-days "></i>
                <span className="small">  Agenda</span></a>
            {/* <a href="#" className={ray[2] ? 'lightray':'lightray-off'} onClick={()=>{spotlight(2)}}><i className="fa-solid fa-list"></i>
                <span className="small">  Watchliste</span></a> */}
            <Search_bar />
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
                   
            </>
        )

    }
}



function Genres(){
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