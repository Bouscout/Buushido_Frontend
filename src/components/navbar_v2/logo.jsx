
// file to assemble the logo
import logo from "./logo/buushidoLogo.png"
import logoText from "./logo/buushidoText.png"

export default function Logo(){

    return (
        <a href="/">

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
