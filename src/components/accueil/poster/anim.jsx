export default function Anim(){

    const deco = {
        position : 'absolute',
        top : '0',
        left : '0',
        zIndex : '0',
        width : '100%', height : '100%', overflow : 'hidden', 
        opacity : '0.6',
    } 
    
    

        return (
            // <div>
            <div style={deco}>
        <Big_window />
        </div>
    )

}

export function Big_window(){
    const dummies = Array(8).fill(0)
    return (
        <div style={{
            animation : 'fade_out 1700ms ease-out 0s both'
        }}>
        {dummies.map((x, i)=>{
            return(
                <div key={i} style={{
                    width : '50vw',  aspectRatio : '16 / 10', background : '#090909', display:'inline-block' ,
                    animation : 'smooth 1700ms ease-out 0s 1 both', animationDelay : 100 * i + 'ms'
                    
                }}>

                </div>
            )
        })}
        </div>
    )
}


// ONGLET ANIMATION

export function Single(){

    const dummies = [0, 0, 0, 0, 0, 0, 0, 0]

    return (
        <>
        <div className="container" style={{
            margin : '1rem auto',
            animation : 'animation: fade_in 1700ms ease-out 0s 1 both',
}}>
            {dummies.map((x, i)=>{
                return(
                    <Dummy key={i}/>
                     )
            })}
        </div>
        </>
    )
}

function Dummy(){
    // const dummies = Array(7).fill(0)
    return (
        <>
        <div className="contenu" style={{
            // animation : 'smooth 1700ms ease-out 0s 1 both',
            // animationDelay : (Math.random() * 500 )  + 'ms',
        }}>
            <Fake_details_small />
        </div>
        </>
    )
}

export function Fake_details_small(props){
    const index = props.index
    return (
        <>
            <h4 style={{
                width : '25%', margin : '0 1vmin', height : '3vmin', position : 'absolute',
                top : '10%', left : '0', background : '#303030', borderRadius : '7px',
                animation : 'fade_out 1700ms ease-out 0s reverse both', zIndex : index ? index : null ,
            }}></h4>
            <h4 style={{
                width : '80%', margin : '0 1vmin',height : '3vmin', position : 'absolute',
                top : '70%', left : '0', background : '#303030', borderRadius : '7px',
                animation : 'fade_out 1700ms ease-out 0s reverse both', zIndex : index ? index : null ,
            }}></h4>
            <h4 style={{
                width : '80%', margin : '0 1vmin', height : '2vmin', position : 'absolute',
                top : '80%', left : '0', background : '#303030', borderRadius : '7px',
                animation : 'fade_out 1700ms ease-out 0s reverse both', zIndex : index ? index : null ,
            }}></h4>
        </>
    )
}