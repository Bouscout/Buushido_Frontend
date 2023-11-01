// small button with position absolute

export const ReturnButton = ({
    style, func, 
}) =>{

    console.log("showing the button")

    const customStyle = {
        color : 'var(--accent-white)',
        position : 'fixed',
        zIndex : '6',
        top : '5%',
        right : "5%",
        fontSize : '3vmax',
        ...style
    }
    return (
        <div className="hover-color" style={customStyle} onClick={()=>{func()}}>
        <i className="fa-solid fa-x"></i>
        </div>
    )
}