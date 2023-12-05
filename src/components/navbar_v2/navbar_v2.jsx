// import "./navbar_v2.css"
import Profil_v2 from "./profile/profile_v2"
import Search_bar_v2 from "./search_bar/search_bar_v2"
import SideMenuLeft from "./sous-menu/side_menu"
import Logo from "./logo"
import { Glass } from "../self-contained/pop_up_message/pop_up_back_glass"
import { useState, useEffect, useCallback } from "react"


export default function Navbar_v2(){
     // rendering conditions
     const divider = 700
     const [isMobile, setIsMobile] = useState(window.innerWidth < divider)
    
     // handling changes
     const handleWindowResize = useCallback(event => {
         setIsMobile(window.innerWidth < divider);
     }, []);
     
     useEffect(() => {
         window.addEventListener('resize', handleWindowResize);
         return () => {
             window.removeEventListener('resize', handleWindowResize);
         };
     }, [handleWindowResize]);
    const mobile = isMobile
    // reduce or hide menu
    const [blur, setBlur] = useState(false)

    const [showMenu, setShowMenu] = useState(false)

    // function to disable menu if click elsewhere
    window.onclick = (e) => {
        if(e.target.matches('#glass') && showMenu){
            setShowMenu(false)
            setBlur(false)

            console.log("deactivate")
      }else {
        console.log("target is : ", e.target)
      }
    }

    function reset_all(){
        setShowMenu(false)
        setBlur(false)
    }

    function ShowSubMenu(){
        setTimeout(()=>{
            setShowMenu(true)
            BlurBackground()
        }, 100)
    }

    function BlurBackground(){
        setTimeout(()=>{
            setBlur(true)
        }, 200)
    }

    return (
        <>
        <nav>
            {showMenu && 
            <>
                <SideMenuLeft />
                {blur && 
                    <Glass index={1}/>
                }
            </>
            }

            {/* <h1>Menu</h1> */}
            <div style={{width : mobile ? "100%" :'87%', margin : '0 auto', display : 'flex',
            justifyContent : 'space-between',
            alignItems :"center"}}>

                {/* left side of the nav bar */}
                <div className="flex">
                    <h2 style={{margin : "0 1em"}} onClick={()=>{ShowSubMenu()}}><i className="fa-solid fa-layer-group"></i></h2>
                    <Logo />
                </div>

                {/* right side of the nav bar */}
                <div className="flex">

                    <Search_bar_v2 />

                    <Profil_v2 reset={reset_all}/>

                </div>

            </div>
        </nav>
        
        </>
    )

}
