// left side of the up-menu for the navigation handling

import { SpecialButton } from "../../self-contained/usefulButtons"

export const NavigationUpMenu = ({cancel}) => {

    return (
        <div className="flex-column" style={{
            justifyContent : 'left', alignItems : 'center', 
        }}>
            <ChoiceOption text={"Voir liste likes"}/>
            <ChoiceOption text={"Reinitialiser liste likes"}/>
            <ChoiceOption text={"Reinitialiser infos utilisateur"}/>
            <ChoiceOption text={"Infos"}/>

            <a href="/">
                <ChoiceOption text={"Aller sur Buushido"}/>
            </a>
        </div>
    )
}


const ChoiceOption = ({text, }) => {

    const style = {
        textAlign : 'left',
        fontSize : '5vmin',
        padding : '0.5em',
        borderRadius : '0.1em',
        textDecoration : "none",
        color : 'var(--accent-white)'
    }
    return (
        <SpecialButton text={text} color={"medium-black"} style={style}/>
    )
}