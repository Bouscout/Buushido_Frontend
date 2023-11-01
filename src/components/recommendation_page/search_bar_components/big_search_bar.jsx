// search bar to find the inputs
import { useEffect, useState } from "react";

import { LogoWriting } from "../../navbar_v2/logo";
import { SearchBox } from "./search_box";
import { SpecialButton } from "../../self-contained/usefulButtons"


const BASE_URL = "https://buushido.com"

export default function BigSearchBar(props){
    // store research suggestions here
    const [suggest, setSuggest] = useState([])

    // for tracking search bar status
    const [isTyping, setIsTyping] = useState(false)

    //store the word typed in the search bar here
    const [word, setWord] = useState('')

    const [focus, setFocus] = useState(false)

    // pressing enter function
    function EnterFunc(evt){
        if (evt.key == "Enter"){
            if (!focus){
                // entering focus mode
                setFocus(true)
            }
            
            // saving the most likely search
            if (suggest.length > 0){
                props.func(suggest[0])
                ressetting()
            }
        }
    }

    function AddFunc(serie){
        props.func(serie)
    }

    // Function to reset the searched word and the suggestions
    function ressetting(){
        setWord('')
        setSuggest([])
    }

    // global reset
    function reset(){
        if (isTyping){
            setIsTyping(false)
            ressetting()
        }
        else {
            setIsTyping(true)
        }
    }

    useEffect(() => {
        if (word === "" || word === "$"){
            setSuggest([])
            return
        }

        const controller = new AbortController()

        fetch(`${BASE_URL}/api/ajax/`+word+'/', {
            signal : controller.signal 
        })
        .then(response => response.json())
        .then((data) => {
            setSuggest(data)
            console.log("found : ", data)
        },
        (error)=>{
            console.log('error : ', error)
        }
        )

        // before running a new useEffect
        return () => controller.abort()

    }, [word])

    async function updating(evt){
        
        let value = evt.target.value 
        // value = value === '' ? '$' : value
        // value = value === '' ? '$' : value

        setWord(value)
        
    }

    function focusing(){
        if (focus){
            props.switch(true)
        }
        else {
            setFocus(true)
        }
        
    }

    function getPopular(){
        props.popular()
        focusing()
    }

    const focusStyle = {
        top : "8%", flexDirection : 'row', 
        animationDuration : '300ms'
    }

    return (
        <section className={`big-search-bar ${focus ? "fade-in" : ""}`} style={focus ? focusStyle : null}>
            <BuushidoLogo />

            <SearchBox 
            word={word} wordChanger={updating}
            reset={reset}
            isTyping={isTyping}
            suggestions={suggest}
            func={EnterFunc}
            addFunc={AddFunc}
            />

            <div id="special-buttons">
                <PredictionButton func={focusing}/>

                {!focus &&
                <PopularPredictionButton func={getPopular}/>
                }
            </div>
        
        </section>
    )

}

const PredictionButton = ({func}) =>{
    return (
        <div style={{padding : "2.7em"}} onClick={()=>{func ? func() : null}}>
        <SpecialButton 
                color={'accent-purple'}
                text={"Predire"}
                link={null}
                icon={"fa-solid fa-dice"}
                />
        </div>
    )
}

const PopularPredictionButton = ({func}) =>{
    return (
        <div onClick={()=>{func ? func() : null}}>
        <SpecialButton 
                color={"accent-orange"}
                text={"Populaire"}
                link={null}
                icon={"fa-solid fa-fire"}
                />
        </div>
    )
}

const BuushidoLogo = () => {
    const style = {
        margin : '1em 0.1em', border : '3px solid transparent', transition : 'all 200ms',
        borderRadius : '0.3em', height : '6vmax', display : 'grid', placeItems : 'center',
        background: "linear-gradient(to right, #090909, #090909 ) padding-box, linear-gradient(to top right, #000c4e,#5f0067, #740072, #8f1100) border-box"
    }
    return <LogoWriting lien={"/recommendations"} style={style}/>
}