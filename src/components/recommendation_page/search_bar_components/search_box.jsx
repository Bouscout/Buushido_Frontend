import { useState , useEffect, useContext} from "react"
import SearchSuggestions from "./search_results"
import serieContext from "../../../utils/serie_context"

const BASE_URL = import.meta.env.SITE

export const SearchBox = () => {
    // store research suggestions here
    const [suggest, setSuggest] = useState([])
    const [cursor, setCursor] = useState(0)

    // for tracking search bar status
    const [isTyping, setIsTyping] = useState(false)

    //store the word typed in the search bar here
    const [word, setWord] = useState('')

    const {addLiked, setFocus} = useContext(serieContext)

    function wordChanger(evt){
        const new_word = evt.target.value
        setWord(new_word)
    }

    // pressing enter function
    function EnterFunc(evt){
        const key = evt.key
        if (key == "Enter"){
            // saving the most likely search
            if (suggest.length > 0){
                // check if they match to a certain extent
                const match = checkMatch(word, suggest[0].title, 7)
                if (cursor !== 0 || match ){
                    console.log(`${word} and ${suggest[0].title} match`, match)
                    addLiked(suggest[cursor])
                    ressetting()
                }else {
                    // make a direct querry to find better match
                    console.log("don't match")
                    DirectQuery()
                }
            }else{
                console.log("making an enter request")
                DirectQuery()
            }
            setFocus(true)
        }
        else if (key == "ArrowUp"){
            setCursor(cursor >= 1 ? cursor - 1 : 0)
        }
        else if (key == "ArrowDown"){
            setCursor(cursor <= 3 ? cursor + 1 : 4)
        }
        
    }

    // make a direct query
    function DirectQuery(){
        fetch(`${BASE_URL}/recommendations/direct_query?query=${word}`)
        .then(response => response.json())
        .then((data) => {
            setSuggest(data)
            console.log("found directly : ", data)

        }, (error)=>{
            console.log("error : ", error)
        }
        )
    }

    // Function to reset the searched word and the suggestions
    function ressetting(){
        setWord('')
        setSuggest([])
        setCursor(0)
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

        const url = new URL(`${BASE_URL}/recommendations/query`)
        url.searchParams.append("query", word)

        // fetch(`${BASE_URL}/api/ajax/`+word+'/', {
        //     signal : controller.signal 
        // })

        fetch(url, { signal : controller.signal})
        .then(response => response.json())
        .then((data) => {
            setCursor(0)
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

    return (
        <>
        <div onClick={()=>reset()} className="search-box" style={{border : isTyping ? "1px solid var(--accent-purple)" : "1px solid transparent"}}>
            <i className="fa-brands fa-searchengin"></i>

            <input type='text' placeholder="Rechercher" autoComplete="off" name='search' value={word} onKeyDown={(event)=>{EnterFunc(event)}}  onChange={event=>{wordChanger(event)}}></input>
            <CancelSearch visible={isTyping}/>

            {isTyping && 
            <SearchSuggestions data={suggest} cursor={cursor}/>
            }
        </div>
        </>
    )
}

const CancelSearch = ({visible}) => {
    return  <i style={{
            fontSize : '1em',color : 'white', 
            // background : 'var(--accent-dark-red)', 
            padding:"0.02em 0.15em", borderRadius : '0.1em', transition : "all 200ms",
            visibility : visible ? "visible" : "hidden", scale : '0.8'
            }} className="fa-solid fa-xmark"></i>
}

// check if two names matches up to a certain point
function checkMatch(name_1, name_2, num=5){
    let char1, char2

    // convert to lowercase
    name_1 = name_1.toLowerCase()
    name_2 = name_2.toLowerCase()

    // Adjust num to be within the length of the shorter name
    num = Math.min(num, Math.min(name_1.length, name_2.length));

    for (let index = 0; index < num; index++) {
        char1 = name_1[index]
        char2 = name_2[index]

        if (char1 !== char2){
            return false
        }
    }
    return true
}