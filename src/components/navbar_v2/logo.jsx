
// file to assemble the logo
import logo from "./logo/buushidoLogo.png"
import logoText from "./logo/buushidoText.png"

export default function Logo(props){
    const lien = props.link ? props.link : "/"
    return (
        <a href={lien} style={props.style}>

        <div style={{
            position : "relative", width : '17vmax', height : '6vmax',
        }}>
            <img style={{
                position : 'absolute', left : '-8%', top : '1%', width : '8vmax', 
            }} src={logo} alt="logo"></img>

            <img style={{
                position : 'absolute', right : '-8%', top : '1%', width : '14vmax'
            }} src={logoText} alt="Buushido"></img>
        </div>

        </a>
    )
}

export const LogoWriting = ({lien, style}) =>{
    return (
        <a href={lien}>
        <div style={style}>
            <img style={{
                width : '14vmax', 
            }} src={logoText} alt="Buushido"></img>
        </div>
        </a>
    )
}

export const LogoDrawing = ({lien, style}) =>{
    return (
        <a href={lien}>
            <div>
                <img style={{
                    width : '8vmax', height : '6vmax'
                }} src={logo} alt="Buushido logo">
                </img>
            </div>

        </a>
    )
}