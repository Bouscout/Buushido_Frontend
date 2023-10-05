import { useState } from "react";
// import './search_bar.css'
import { ImagePortrait } from "../self-contained/image-portrait";
import { ImageSmallDetails } from "../self-contained/ImageSmallDetails/ImageSmallDetails";
import Loader_1 from "../self-contained/load_test";
const BASE_URL = "https://buushido.com"

// function for updating the search value in a small window
export default function Search_bar(){

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
  

    return (
        <>
        <div id="s_bar" style={{
            border : 'solid blue' , width : '100%'
        }}>
        <div id='search-input' style={{
             border: "solid red",

        }}>
            {/* <input type='text' placeholder='Username'></input> */}
            <h1 style={{color : 'white'}}><i className="fa-solid fa-magnifying-glass"></i></h1>
            <input type='text' autoComplete="false" name='search' value={word}  onChange={event=>{updating(event)}}></input>
            <label htmlFor="search"> <span id="search-hide">Rechercher</span></label>
            <h3>{word}</h3>
        </div>
        <Results search={word} data={suggest} reset={ressetting}/>
        </div>
        </>
    )
}

// function for displaying the suggestions from the api
function Results(props){
    let reultats = props.data

    // style to pass to the next gen image component
    const style_pic = {
        width : '13vw', aspectRatio : ' 10/16', minWidth : '117px', borderRadius : '8px'
    }

    // only render when we have result otherwise display loading animation
    if (reultats.length > 0){
        return (
            <>
            {/* button for canceling the search */}
        <h1 id="result-closer" onClick={()=>{props.reset()}}><i className="fa-regular fa-circle-xmark"></i></h1>

        <section id="resultat">
            <div style={{
                width : "96%", margin : "2% auto",
                display : 'flex', flexDirection : 'column', gap : '0.02em',
            }}>

            {reultats.map((serie, i) => {
                
                
                return (
                    <a href={"/serie/"+serie.id}>

                    <ImageSmallDetails
                    key={i}
                    serie={serie}
                    picWidth={3}
                    picMaxWidth={100}
                    picMinWidth={60}
                    picAspectRatio={[10, 16]}
                    rounded={1}
                    gap_between={true}
                    />
                    </a>
                    )
                    
                })}
            <a href="/see_all" id="voir_tout">
            <h2 style={{
                fontSize : '1.5rem', margin : '1rem 0', textAlign : 'center'
            }}>Voir tout les animes</h2>
            </a>

            </div>
        </section>
        </>
    )
    }else if(props.search != ''){
        return (
            <>
            <section id="resultat">
                <Loader_1 />
            </section>
            </>
        )
    }
}