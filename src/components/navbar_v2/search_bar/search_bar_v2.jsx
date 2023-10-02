import { useEffect, useState } from "react";
import Results from "./search_results";
const BASE_URL = "https://buushido.com"

// function for updating the search value in a small window
export default function Search_bar_v2(){
    const [mobile, setMobile] = useState(window.innerWidth < 700)
    useEffect(()=>{
        setMobile(window.innerWidth < 700)
    }, [window.innerWidth < 700])

    // store research suggestions here
    const [suggest, setSuggest] = useState([])

    // for tracking search bar status
    const [isTyping, setIsTyping] = useState(false)

    //store the word typed in the search bar here
    const [word, setWord] = useState('')
    
    // Function to reset the searched word and the suggestions
    function ressetting(){
        setWord('')
        setSuggest([])
    }

    // updating the search word and storing the suggestions from api
    async function updating(evt){
        let value = evt.target.value 
        setWord(value)
        value = value === '' ? '$' : value

        //we'll use this line of code in case we want to make it a POST request, 
        //don't forget to set up the postman for the crsf token in django
        
        // const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json',
        //         "X-CSRFToken": token,
        //         },
        // body: JSON.stringify({ text : value })
        // }
        fetch(`${BASE_URL}/api/ajax/`+value+'/')
        .then(response => response.json())
        .then((data) => {
            setSuggest(data)
        },
        (error)=>{
            console.log('error : ', error)
        }
        
        )
    }

        function reset(){
            if (isTyping){
                setIsTyping(false)
                ressetting()
            }
            else {
                setIsTyping(true)
            }
        }
    
    let searchBarStyle

    if (mobile){
        if (isTyping){
            searchBarStyle = {
                position : 'fixed',
                top : "0%", left : '0',
                width : '100vw', height : '5vmax', zIndex : "5",
                margin : "0 auto",
            }
        }else {
            searchBarStyle = {
                width : "auto",
            }
        }
    }else {
        searchBarStyle = {
            width : isTyping ? '30vmax' : "15vmax",
            border : isTyping ? "solid purple" : null,
            borderRadius : '0.3em',
        }
    }
    
  
    return (
        <>
        <div id="search-bar" onClick={()=>{reset()}} style={searchBarStyle}>
            {mobile && isTyping && 
                <SearchBoxMobile 
                word={word}
                reset={reset}
                />
            }
            <input type='text' autoComplete="off" name='search' value={word}  onChange={event=>{updating(event)}}></input>

            {isTyping ? 
                <span>{word}</span> :
                <span>{!mobile && "Rechercher"}</span>
            }
            {isTyping && !mobile ?
                <i  style={{
                    color : 'white', background : 'var(--accent-red)', padding:"0.1em 0.17em", borderRadius : '0.1em'
                }} className="fa-solid fa-xmark"></i> :
                <i className="fa-solid fa-magnifying-glass"></i>
            }


            <Results search={word} typing={isTyping} data={suggest} reset={ressetting}/>
        </div>
        </>
    )
}

const SearchBoxMobile = ({word, reset}) =>{

    return (
    <>
    <div style={{
        position : 'fixed',
        top : "0%", left : '0', background : "var(--gray-blue)",
        width : '100vw', height : '6vmax', zIndex : "6",
        display : 'grid', placeItems : 'center', 
    }}>
        <div style={{
            width : "80%", margin : "0 auto",
            borderRadius : '0.3em', border : 'solid purple',
            display : 'flex', alignItems : 'center', justifyContent : 'space-between',
        }}>
            {
                word.length > 0 ? 
                <span>{word}</span> :
                <i className="fa-solid fa-magnifying-glass"></i>
            }
             <i onClick={()=>{reset()}}  style={{
                    color : 'white', background : 'red', padding:"0.1em 0.17em", borderRadius : '0.1em'
                }} className="fa-solid fa-xmark"></i>
        </div>

    </div>
    </>)
}

