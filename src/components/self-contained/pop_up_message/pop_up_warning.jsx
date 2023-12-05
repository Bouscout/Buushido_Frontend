// component to display a pop-up warning message in the middle of screen
// there need to be a button to cancel it
// it need to also disable itself after a certain time
// the rendering state of this component should be handled by the component that called it
import "./pop_up.css"
import { Glass, BlackGlass } from "./pop_up_back_glass"

export default function PopUpWarning({title, msg, func, icon=false}){
    icon = icon ? icon : "fa-solid fa-triangle-exclamation"
    return(
        <>
        <div id="pop-up-window">
            <div id="inner-window">
            <CloseButton closeFunc={func}/>
            

            {/* warning sign */}
            <h2 className="icon">
                <i className={icon}></i>    
                {title}
            </h2>
            
            <p>{msg}</p>


            </div>
        </div>

        <Glass />
        </>
    )
}

const CloseButton = ({closeFunc}) =>{
    return (
        <div id="close-button" className="hover-color icon" onClick={()=>{closeFunc(false)}}>
            <i className="fa-solid fa-circle-xmark"></i>
        </div>
    )
}