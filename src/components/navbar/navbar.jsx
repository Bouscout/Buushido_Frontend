// import './navbar.css'
import Search_bar from './search_bar';
import Dropdown from './dropdown';
import Profil from './profile';
import { Social, Genres, Glass } from './dropdown';
// import logo from './logo.jpg.webp'
import logo from './torii_2.jpg.webp'
import { useState } from "react";
export default function Navi(){
    const [show, setShow] = useState(false)


    // function to handle click on login button
    // function check_ls(){
    //     let value = JSON.parse(sessionStorage.getItem('tokens'))
    //     console.log('valeur de ls is : ', value)
    // }
    return (
        <>
        <nav id="navbar">
            {/* show hidden menu */}
            {show ? <Hidden /> : null}

            <div id='navbar-left-side' >
            <div id='hidden-menu' onClick={()=>{setShow(!show)}}><h1 style={{
                color : 'white', fontSize : '6vmin',
            }}>{show ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}</h1></div>
            <div id='logo'>
                <a href='/'><img src={logo} alt='logo'></img></a>
                <a href='/'><h3>Buushido</h3></a>
                </div>
            <div className='navbar-extra'>

           
                <Dropdown />
            <a href="/genre/Film" style={{
                zIndex : '3'
            }} ><i className="fa-solid fa-film"></i>
                <span className="small">  Film</span></a>
            <a href="/agenda" style={{
                zIndex : '3'
            }} ><i className="fa-regular fa-calendar-days "></i>
                <span className="small">  Agenda</span></a>
            <a href="/anonces"  ><i className="fa-brands fa-ioxhost "></i>
                <span className="small">  Annonces</span></a>
            </div>

            </div>

          

            <div className='navbar-main'>
                <Search_bar />
                <div className='navbar-main-small'>

                <a href="/watchlist" ><i className="fa-solid fa-bookmark"></i>
                    <span className="small">  Watchlist</span></a>
                    <Profil />
                {/* <a href="/login" ><i className="fa-solid fa-user"></i>
                    <span className="small">  Profil</span></a> */}
                </div>
            </div>           
        </nav>
        
        </>
    )
}

function Hidden(){
    const [drop, setDrop] = useState(false)
    if (drop){
        return (
            <>
            <Glass />
        <section id='hidden-dropdown'>
            <h1>Buushido</h1>
            <h2 onClick={()=>{setDrop(false)}} style={{
                margin : '-1.5rem 0'
            }}><i className="fa-solid fa-arrow-left-long"></i> Retour</h2>
            <Genres />     
            <a href='/see_all'><h2 style={{
                width : '100%', textAlign : 'center', borderBottom : 'solid purple', fontFamily : 'odachi' 
            }}>Voir tout le Catalogue</h2></a>       
        </section>
        </>
        )
    }else{
        return (
            <>
            <Glass />
        <section id='hidden-dropdown'>
            <h1>Buushido</h1>
            
            <h2 onClick={()=>{setDrop(true)}}><i className="fa-solid fa-layer-group"></i>  Categories </h2>
            <a href="/genre/Film"  ><h2><i className="fa-solid fa-film"></i>  Film</h2></a>
            <a href="/agenda"  ><h2><i className="fa-regular fa-calendar-days "></i>  Agenda</h2></a>
            <a href="/anonces"  ><h2><i className="fa-brands fa-ioxhost "></i>  Annonces</h2></a>
            <Social />
        </section>
        </>
    )
    }
}

