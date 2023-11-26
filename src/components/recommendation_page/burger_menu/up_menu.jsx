// menu with parameters for the model and option to exit to main site

import { useState } from "react"
import BurgerButton from "./burger_button"

import MenuContent from "./menu_content"
export default function UpMenu(props){
    const [show, setShow] = useState(false)
    const [first, setFirst] = useState(true)
    
    function trigger(){
        if (first){
            setFirst(false)
        }
        setShow(!show)
    }


    return (
        <>
        <BurgerButton status={show} func={trigger}/>

        {show &&
        <Menu cancel={trigger}/>
        }
        
        {/* animation of closing */}
        {!show && !first &&
         <section id="up-menu" style={{
             animation : "slide-down 500ms ease-in 0ms reverse" 
            }}>
        </section>}
        {/* animation of closing */}

        </>
    )
}

const Menu = ({cancel})=>{
    return (
        <section id="up-menu" style={{
            animation : "slide-down 500ms ease-in 0ms both" 
        }}>
            <MenuContent cancel={cancel}/>
        </section>
    )
}