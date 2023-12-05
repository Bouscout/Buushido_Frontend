// glass to bring the focus on the front elements

export const Glass = ({index=2})=>{
    return (
        <div style={{
            position : 'fixed', top : '0', left : '0', zIndex : index,
            width : '100vw', height : '100vh', backgroundColor :'#ffffff10',
            backdropFilter : 'blur(4px)',
            WebkitBackdropFilter : 'blur(4px)',
        }} id="glass"></div>
    )
}

export const BlackGlass = () => {
    return (
        <div style={{
            position : 'fixed', top : '0', left : '0', zIndex : '2',
            width : '100vw', height : '100vh',
            // backgroundColor :'#ffffff10',
            background : 'rgba(0, 0, 0, 0.551)',
            backdropFilter : 'blur(4px)',
            WebkitBackdropFilter : 'blur(4px)',
        }} id="glass"></div>
    )
}