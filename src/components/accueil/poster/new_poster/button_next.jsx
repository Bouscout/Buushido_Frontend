

export default function The_buttons(props){
    const watch = props.watch
    const next = props.next
    return (
        <>
        <div id="watch">
            <Button_watch func={watch} />
            <Button_next func={next}/>
        </div>
        </>
    )
}

function Button_next(props){
    const func = props.func
    return(
        <button onClick={()=>{func()}}
         style={{
            outline : 'none', borderRadius : '50%', width : '5vmax', aspectRatio : ' 1/1',
            background : 'linear-gradient(to right, #14141481, #14141481) padding-box,linear-gradient(to top right, #5770ff,#8d0696, #c44bc1, #ff7c6b) border-box',
            border : ' 2px solid transparent',
            boxShadow : '0 4px 15px 0 rgba(229, 66, 10, 0.75)' ,
            
        }}>
            <h1 style={{
                fontSize : '3vmin', overflow : 'hidden', 
            }}><i className="fa-solid fa-chevron-left"></i></h1>
        </button>
    )
}


function Button_watch(props){
    const func = props.func
    return (
        <>
        <button onClick={()=>{func()}}
         style={{
            outline : 'none', borderRadius : '8px',
        }}>
            <h2>Watch</h2>
        </button>
        </>
    )
}