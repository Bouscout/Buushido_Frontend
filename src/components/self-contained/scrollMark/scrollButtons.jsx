// left and right button for scrolling a div in a direction

export const RightButton = ({set}) => {
    return (
        <div style={{
            margin : "0 0.5em",
        }}>
            <button style={{
                width : "30px", height : '13px',  fontSize : '0.5em', cursor: "pointer",
                outline : 'none', border : "none", borderRadius : '5px',background : "var(--accent-dark-red)",
            }} onClick={()=>{set(1)}} />

        </div>
    )
}

export const LeftButton = ({set}) => {
    return (
        <div style={{
            margin : '0 0.5em'
        }}>
            <button style={{
                width : "30px", height : '13px',  fontSize : '0.5em', cursor : 'pointer',
                outline : 'none', border : "none", borderRadius : '5px',background : "var(--accent-dark-red)",
            }} onClick={()=>{set(-1)}}></button>

              
        </div>
    )
}

export const ButtonPlaceholder = () =>{
    return (
        <div style={{
            width : "20px", height : '20px',  borderRadius : '50%', background : "transparent",
            margin : '0 0.5em'
        }}/>
    )
}