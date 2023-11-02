// menu with parameters for the model and option to exit to main site

import { useState } from "react"
import BurgerButton from "./burger_button"

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
        <BurgerButton func={trigger}/>

        {show &&
        <section id="up-menu" style={{
            animation : "slide-down 500ms ease-in 0ms both" 
        }}>


        </section>
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

const Menu = ()=>{
    return (
        <section id="up-menu" style={{
            animation : `slide-down 500ms ease-in 0ms ${!show ? "reverse" : "both"}` 
        }}>
        </section>
    )
}