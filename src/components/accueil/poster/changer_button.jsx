// buutons to change the poster on the top of the main page

export default function Change_buttons(props){
    const [left, right] = props.directions
    return (
        <>
        {right && 
        <Button_1 func={props.makeScroll} />
        }
        {left !== null && 
        <Button_2 func={props.makeScroll} />
        }
        </>
    )
}

// right button
const Button_1 = ({func}) => {
    return (
        <button onClick={()=>{func(0)}} style={{
            position : 'absolute', zIndex : '2',
            bottom : '10%', right : '5%',
            background : " linear-gradient(to right, #141414, #141414) padding-box, linear-gradient(to top right, #5770ff,#8d0696, #c44bc1, #ff7c6b) border-box ",
            border : '3px solid transparent',
            color : '#fff', outline : 'none',
            lineHeight : '20%', padding : '0 1.5vmin',

        }}><h1><i className="fa-solid fa-caret-right"></i></h1></button>
    )
}

// left button
const Button_2 = ({func}) => {
    return (
        <button onClick={()=>{func(1)}} style={{
            position : 'absolute', zIndex : '2',
            bottom : '10%', right : '13%',
            background : " linear-gradient(to right, #141414, #141414) padding-box, linear-gradient(to top right, #5770ff,#8d0696, #c44bc1, #ff7c6b) border-box ",
            border : '3px solid transparent',
            color : '#fff', outline : 'none',
            lineHeight : '20%', padding : '0 1.5vmin',

        }}><h1><i className="fa-solid fa-caret-left"></i></h1></button>
    )
}