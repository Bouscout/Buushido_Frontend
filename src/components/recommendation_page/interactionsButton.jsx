// small button with position absolute

export const ReturnButton = ({
    style, func, 
}) =>{

    
    const customStyle = {
        position : 'fixed',
        zIndex : '6',
        top : '5%',
        right : "1%",
        fontSize : '1vmax',
        border : "1px solid var(--light-white)",
        borderRadius : '0.4em',
        padding : "0 0.4em",
        ...style
    }
    return (
        <div className="icon hover-color" style={customStyle} onClick={()=>{func()}}>
        <h3>Nouvelle prediction </h3>
        <i className="fa-solid fa-right-to-bracket"></i>
        </div>
    )
}