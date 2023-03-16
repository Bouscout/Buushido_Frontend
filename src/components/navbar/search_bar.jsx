import { useState } from "react";
// import './search_bar.css'
import ImagePortrait from "../self-contained/image-portrait";
import Loader_1 from "../self-contained/load_test";


export default function Search_bar(){
    const [suggest, setSuggest] = useState([])
    const [word, setWord] = useState('')
    
    function ressetting(){
        setWord('')
        setSuggest([])
        console.log('should have reset')
    }

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
        fetch('https://buushido.ml/api/ajax/'+value+'/')
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
        <div id="s_bar">
        <div id='search-input'>
            {/* <input type='text' placeholder='Username'></input> */}
            <input type='text' autoComplete="false" name='search' value={word}  onChange={event=>{updating(event)}}></input>
            <label><i className="fa-solid fa-magnifying-glass"></i> <span id="search-hide">Search</span></label>
            <h3>{word}</h3>
        </div>
        <Results search={word} data={suggest} reset={ressetting}/>
        </div>
        </>
    )
}

function Results(props){
    let reultats = props.data
    console.log('new list : ', props.data)
    const style_pic = {
        width : '15vw', height : 'auto', minWidth : '117px', borderRadius : '8px'
    }
    if (reultats.length > 0){
        return (
            <>
        <section id="resultat">
            <div className="search-control">
            <h1 style={{
                marginLeft : '1rem', cursor : 'pointer', fontSize : '2rem',
                }} onClick={()=>{props.reset()}}><i className="fa-regular fa-circle-xmark"></i></h1>
            <h2>Resultats :</h2>
            </div>
            {reultats.map((serie, i) => {
                return(
                    <a key={i} href={'/serie/'+serie.id}>
                    <div  className="search-compact">
                    <ImagePortrait src={serie.tof_url} alt={serie.name} style={style_pic} />
                    <div className="details-search">
                        <h2>{serie.name}</h2>
                        <div className="genre-details-search" style={{
                            display : 'flex', justifyContent : 'space-between', 
                            maxWidth : '50vw',
                        }}>
                        <h3 className="search-genre">{serie.genre_1}</h3>
                        <h3 className="search-genre">{serie.genre_2}</h3>
                        <h3 className="search-genre">{serie.genre_3}</h3>
                        </div>
                    </div>
                    </div>
                        </a>
                    )
            })}
            <a href="/see_all" id="voir_tout">
            <h2 style={{
                fontSize : '1.5rem', margin : '1rem 0', textAlign : 'center'
            }}>Voir tout les animes</h2>
            </a>

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