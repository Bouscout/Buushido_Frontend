import { useMemo, useState } from "react";



export function Dropdown_epi(props){

    //in order to display the options of saison selection
    // const movies = props.movies

    const movies = useMemo(()=>preparing_movies(props.movies), [props.movies])
    // the value is gonna be saved and the calculation is not goona be performed again
    const saisons_values = useMemo(()=>arrange_saisons(), [props.saison])


    // function to find the saisons to display in the dropdown
    function arrange_saisons(){
        const saison_info = get_saisaon_info(props.infos)
        const saisons = Array(parseInt(props.saison)).fill(0)

        // if name has been defined for the saisons
        if (saison_info){
            let pair ;
            for (let i = 1 ; i < parseInt(props.saison) +1 ; i++){
                if (saison_info[i]){ // if it exists in the disctionary
                    pair = `${i} : ${saison_info[i]} `
                }else {
                    pair = i
                }
                // we need to offset the index since we are starting from one
                saisons[i-1] = pair
            }
        }

        // in case no names has been defined
        else{
            for (let i = 1 ; i < parseInt(props.saison) + 1 ; i++){
                saisons[i-1] = i
            }
        }

        return saisons
    }

    // a state for checking if under menu is being displayed
    const [etat, setEtat] = useState(false)
    function show(){
        setEtat(!etat)
    }

   

    //check for the under menu
    console.log('movies now are : ', movies)
    if(etat){
        return (
            <>
            <div className="drop" onClick={()=>{show()}}>
                <h1><strong>Saison <span id="arrow"><i className="fa-solid fa-caret-down"></i></span></strong></h1>
                <div style={{
                    display : 'flex',
                    fontSize : '0.6rem',
                    width : '100%' ,
                    flexDirection : 'column',
                    justifyContent : 'center',
                    position : 'absolute',
                    backgroundColor: '#141414f0',
                    color : '#fee',
                    borderRadius : '15px',
                    border : 'solid black'
                }}>
                    {/* In order to have the function display all the episodes
                    but it is very bad for show with 100+ episodes
                    <h2 onClick={()=>{props.filter(false)}}>...</h2> */}
                    {saisons_values.map((sais, i)=>{
                        let movie_list = Array.isArray(movies[i+1]) ? movies[i+1] : []
                        console.log('the movie is : ', movie_list)
                        return (
                            <>
                        <h2  onClick={()=>{props.filter(i, 0)}} key={i}>Saison {sais}</h2>
                        {movie_list.map((film, i)=>{
                            return (
                                <>
                                {/* <h1>Je suis la putain</h1> */}
                                <h2 key={i} onClick={()=>{props.request(film)}}>film : {film.special_name}</h2>
                                </>
                            )
                        })}
                            </>
                        
                        )
                    })}
                    
                </div>
            </div>
            </>
        )
    }else{
        return (
            <>
             <div className="drop" onClick={()=>{show()}}>
                <h1>Saison <span id="arrow"><i className="fa-solid fa-caret-down"></i></span></h1>
            </div>
            </>
        )
    }
}

// in case we have additional info about the saisons
// const [saisonInfo, setSaisonInfo] = useState(null)
function get_saisaon_info(informations){

    if (informations){
        let saison_info = informations
        saison_info = saison_info.split('|')

        const info_pair = {} // storing the info in an object
        for (let i=0; i < saison_info.length ; i++){
            // checking for the sentinel value
            if (saison_info[i] === '<end>'){
                break
            }
            // storing the values in the array
            let [num, name] = saison_info[i].split('-')
            info_pair[num] = name
        }
        // setSaisonInfo(info_pair)
        // console.log('la reponse est : ', info_pair)
        return info_pair
    }

    return false
}

function preparing_movies(movies){
    const report = {};
    let actual ;

    // checking if it has movies inside 
    if (Array.isArray(movies)){

            // classifying the movies by saison
            movies.forEach(movie => {
            actual = report[movie.saison]

            // if the saison is already populated
            if (Array.isArray(actual)){
                    actual.push(movie)
                    report[movie.saison] = actual
            }
            else {
                    report[movie.saison] = [movie] 
            }
            
        });
    }
        
    return report
}