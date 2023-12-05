// some buttons components

// buttons with glowy aspect and bright color
export const SpecialButton = ({
    text, link, color, icon, style={}
}) => {
    let glowStyle
    if (color){
        glowStyle ={
            background : `var(--${color})`,
            boxShadow : `0 0 40px -8px var(--${color})`,
            cursor : "pointer",
            ...style
        }
    }
    return (
        <a href={link}>

            <h2 style={glowStyle}>
                <div className="icon" style={{justifyContent : 'left', marginRight : "0.5em"}}>
                <i className={icon}></i>
                    {text}
                </div>
            </h2>

        </a>
    )
}

// normal button with grey aspect and white letters
export const NormalButton = ({
    text, icon, func, link, color
}) =>{
    color = color ? `var(--${color})` : "var(--dark-blue)"
    return (
        
        <a href={link}>
            <h2 style={{
                background : color, fontWeight : '600', 
                textAlign : 'center', cursor : "pointer",
            }} onClick={()=>{func ? func() : null}}>
                    <div className="icon" style={{justifyContent : 'left', marginRight : '0.5em'}}>
                        <i className={icon}></i>
                        {text}
                    </div>
            </h2>
        </a>
    )
}