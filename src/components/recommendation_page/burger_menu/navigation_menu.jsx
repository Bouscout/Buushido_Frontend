// left side of the up-menu for the navigation handling

const pageInfos = `
Bonjour cher Utilisateurs,

Nous sommes ravis de vous présenter notre nouveau système de recommandation d'anime, conçu pour faire correspondre vos goûts uniques avec les animes qui pourraient vous plaire. Ce n'est que le début de notre voyage, et au fil du temps, le système de recommandation subira des améliorations significatives pour fournir des suggestions encore plus précises et personnalisées.

Votre contribution est inestimable pour nous aider à affiner et à améliorer le système de recommandation. Plus nous aurons d'informations sur vos préférences, plus vite nous pourrons affiner l'algorithme afin d'adapter les recommandations à vos besoins spécifiques. N'hésitez pas à nous fournir des détails supplémentaires sur vos genres et thèmes préférés, ou sur des animes spécifiques que vous avez appréciés.

Vos commentaires sont essentiels pour faire de ce système de recommandation un outil indispensable pour découvrir des animes parfaitement adaptés à vos goûts. Nous apprécions votre participation à cette aventure passionnante, car nous nous efforçons de rendre votre expérience de visionnage d'animes encore plus agréable.

Merci de faire partie de notre communauté !

Avec mes meilleures salutations,`

import { SpecialButton } from "../../self-contained/usefulButtons"
import serieContext from "../../../utils/serie_context"
import { useContext } from "react"

export const NavigationUpMenu = ({cancel, displayWarning}) => {

    const {getPrediction, reset} = useContext(serieContext)

    function voirListeLiked(){
        getPrediction(false)
        cancel(false)
    }

    function resetSerieList(){
        reset([])
        getPrediction(false)
        cancel(false)
    }

    function resetUserInfos(){
        localStorage.removeItem("buushido_userInfos")
        cancel(false)
    }

    function Infos(){
        displayWarning(
            "Découvrez notre système de recommandation d'anime 🌟",
            pageInfos,
            "fa-regular fa-star"
        )
    }

    return (
        <div className="flex-column" style={{
            // justifyContent : 'left', alignItems : 'center', 
        }}>
            <ChoiceOption text={"Voir liste likes"} func={voirListeLiked}/>
            <ChoiceOption text={"Reinitialiser liste likes"} func={resetSerieList}/>
            <ChoiceOption text={"Reinitialiser infos utilisateur"} func={resetUserInfos}/>
            <ChoiceOption text={"Infos"} func={Infos}/>

            <a href="/">
                <ChoiceOption text={"Aller sur Buushido"}/>
            </a>
        </div>
    )
}


const ChoiceOption = ({text, func}) => {

    const style = {
        textAlign : 'left',
        fontSize : '5vmin',
        padding : '0.5em',
        borderRadius : '0.1em',
        textDecoration : "none",
        color : 'var(--accent-white)'
    }
    return (
        <div onClick={()=>{func()}}>
            <SpecialButton text={text} color={"transparent"} style={style}/>
        </div>
    )
}