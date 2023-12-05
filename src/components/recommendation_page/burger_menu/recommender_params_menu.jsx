// additional input parameters for recommender

import { useState } from "react"
import { SpecialButton } from "../../self-contained/usefulButtons"

export const RecommenderParams = ({cancel}) => {
    let storedInfos = JSON.parse(localStorage.getItem("buushido_userInfos"))

    if (!storedInfos){
        storedInfos = {} // in case there is no infos saved
    }

    const [params, setParams] = useState({
        "gender" : storedInfos.gender && storedInfos.gender >= 0 ? storedInfos.gender : 3,
        "age" : storedInfos.age ? storedInfos.age : 16,
        "recency" : storedInfos.recency ? storedInfos.recency : 5,
        "genre" : storedInfos.genre ? storedInfos.genre : "Aucun",
    })

    function SaveChanges(){
        localStorage.setItem("buushido_userInfos", JSON.stringify(params))
        cancel() // closing the window
    }

    function changeValue(info, value){
        params[info] = value
        console.log(params)
    }

    return (
        <div className="flex-column" style={{
            gap : '1em',
            borderLeft : "2px solid white",
            width : '80%'
        }}>
            <Gender valeur={params.gender} setProperty={changeValue}/>
            <Age valeur={params.age} setProperty={changeValue}/>
            <Recency valeur={params.recency} setProperty={changeValue} />

            <div className="flex-column">
                <h3>Genre Prefere : </h3>
                <GenresOptions valeur={params.genre} setProperty={changeValue} />
            </div>

            <div onClick={()=>{SaveChanges()}}>
                <SpecialButton style={{
                    width : '50%', padding : '0.5em', margin : '0 auto', borderRadius : '0.3em'
                }} text={"Sauvegarder"} icon={"fa-regular fa-floppy-disk"} color={"accent-orange"} />
            </div>
        </div>
    )

}

// user age
const Age = ({valeur, setProperty}) => {
    const [age, setValeur] = useState(valeur)

    function changeValeur(evt){
        const newValue = evt.target.value
        setValeur(newValue)
        setProperty("age", newValue)
    }
    return (
        <div className="range-input">
            <label for="age-range"> Age : {age}</label>
            <input style={{
                width : '100%'
            }} type="range" name="age-range" min="10" max="70" value={age} step="1" onChange={(e)=>changeValeur(e)}></input>
        </div>
    )
}

// user gender
const Gender = ({valeur, setProperty}) => {
    const [select, setSelect] = useState(valeur)
    const choices = ["Masculin", "Feminin", "Ne pas Specifier"]
    const Icons = ["fa-solid fa-person" ,"fa-solid fa-person-dress", "fa-regular fa-user"]

    function Selection(idx){
        idx += 1
        setSelect(idx)
        setProperty("gender", idx)
    }
    return (
        <div style={{display : 'flex', justifyContent : 'space-around', gap : '0.5em', padding : '0.5em',}}>
            {choices.map((genre, i)=>{
                return (
                    <div onClick={()=>Selection(i)} style={{
                        borderRadius : '0.4em',
                        border : `solid 1px ${i + 1 === select ? "var(--accent-purple)" : "transparent"}`
                    }} key={i}>
                        <ChoiceOption name={genre} icon={Icons[i]} index={i}/>
                    </div>
                ) 
            })}
        </div>
    )
}

// preference of recency input
const Recency = ({valeur, setProperty}) => {
    const [recent, setValeur] = useState(valeur)

    function changeValeur(evt){
        const newValue = evt.target.value
        setValeur(newValue)
        setProperty("recency", parseInt(newValue))
    }
    return (
        <div className="range-input">
            <label for="date-range"> Anciennete minimum desiree : {recent} ans</label>
            <input style={{
                width : '100%'
            }} type="range" name="date-range" min="1" max="30" value={recent} step="1" onChange={(e)=>changeValeur(e)}></input>
        </div>
    )
}


// genres input options
const GenresOptions = ({valeur, setProperty}) => {
    const [select, setSelected] = useState(valeur)
    console.log("genre is : ", valeur)
    const all_the_genres = [
        "Aucun",
        'Aventure',
        'Horreur',
        'Action',
        'Romance',
        'Drama',
        'Mystere',
        'Comedie',
        'Fantaisie',
        'Thriller',
        'Sci-fi',
        'Seinen',
        'Shonen',  
        'Slice of life',
        'Shojo',
        'Isekai',
        'Ecchi',
    ] 

    function selection(idx){
        setSelected(all_the_genres[idx])
        setProperty("genre", all_the_genres[idx])
    }
    return (
        <div style={{
            display : 'grid', justifyContent : 'center', gap : '0.2em',
            gridTemplateColumns : 'repeat(auto-fit, minmax(25%, 30%))', 
        }}>
            {all_the_genres.map((genre, i) => {
                return(
                    <div onClick={()=>selection(i)} style={{
                        borderRadius : '0.4em',
                        border : `1px solid ${all_the_genres[i] === select ? "var(--accent-purple)" : "transparent"}`
                    }}>
                        <ChoiceOption name={genre} index={i} key={i} />
                    </div>
                ) 
            })}
        </div>
    )
}

// template for an option component
const ChoiceOption = ({
    name, icon
}) => {
    
    return (
        <div className="icon hover-color"  style={{
            display : 'flex',
            background : 'var(--medium-black)',
            borderRadius : 'inherit', padding : '0.3em 0.5em',
        }}>
            <h3>{name}</h3>
            {icon &&
            <i className={icon}></i>
            }
        </div>
    )
}