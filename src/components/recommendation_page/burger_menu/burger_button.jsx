// burger button to trigger a menu, switches between an activated and deactivated mode

import { useState } from "react";

import "./burger.css"

export default function BurgerButton(props){
    const [activated, setActivated] = useState(false)

    const customStyle = {
        color : 'var(--accent-white)',
        position : 'fixed',
        zIndex : '6',
        top : '5%',
        left : "5%",
        fontSize : '3vmax',
        ...props.style
    }

    return (
        <>
        <div style={customStyle} onClick={()=>{setActivated(!activated)}}>
            {activated ?
            <Active state={!activated}/> :
            <Inactive state={!activated}/>    
            }
        </div>
        </>
    )
}

const Inactive = ({state}) => {
    return (
        <div className="flex-column" style={{justifyContent : 'space-around', height : '20px'}}>
            <Bar delay={0} active={state}/>
            <Bar delay={0} active={state}/>
        </div>
    )
}

const Active = ({state}) => {
    state = true
    return (
        <div style={{
            position : 'relative', width : '30px', height : '20px', 
        }}>

            <Bar active={state} extraClass={"absolute-center"} delay={300} style={{rotate : "45deg" , }} />
            <Bar active={state} extraClass={"absolute-center"} delay={300} style={{rotate : "-45deg", }} />
        </div>
    )
}


const Bar = ({style, extraClass, delay=0, active=false}) => {
    const customStyle = {
        // width : active ? "30px" : null ,
        animation : `get-in 800ms ease-out 0ms 1 ${!active ? "reverse" : ''} both`,
        ...style
    }
    return <div className={`bar ${extraClass}`} style={customStyle}/>
}