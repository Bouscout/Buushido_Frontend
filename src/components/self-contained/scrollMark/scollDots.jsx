
export default function ScrollDots(props){
    return (
        <>
        
            <div style={{
                width : '100%', display : 'grid', placeItems : 'center', margin : "10px 0"
            }}>
            <ScrollDot layout={props.layout} func={props.scroller} />
            </div>
        
        </>
    )

}

const ScrollDot = ({
    layout, func
}) => {

    
    const circleRadius = "13px"

    const circleStyle = {
        width: "20px" ,
        height: circleRadius ,
        borderRadius: '5px' , 
        background : "var(--accent-purple)",
        cursor : "pointer",
        margin : "0 0.2em",
        transition : "all 300ms",
    }


    return (
        <>
        <div style={{
            display : 'flex', justifyContent : 'space-between'
        }}>
            
            {layout.map((num, i) => {
                
                return(
                    <div key={i} onClick={()=>{func(i)}}>

                        <Dot 
                        active={num}
                        style={circleStyle}
                        />

                    </div>

                    ) 
            })}

        </div>
        </>
    )
}

const Dot = ({active, style}) => {
    let dotStyle;

    if (active === 1){
        dotStyle = {
            ...style
        }
        dotStyle.width = "40px"
        // dotStyle.background = "var(--status-green)"
    
    }else {
        dotStyle = style
    }

    return (
        <div style={dotStyle}>
        </div>
    )
}