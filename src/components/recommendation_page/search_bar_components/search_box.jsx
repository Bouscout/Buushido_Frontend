
import SearchSuggestions from "./search_results"

export const SearchBox = ({
    word, wordChanger, isTyping, reset, suggestions, func
}) => {
    return (
        <>
        <div onClick={()=>reset()} className="search-box" style={{border : isTyping ? "1px solid var(--accent-purple)" : "1px solid transparent"}}>
            <i className="fa-brands fa-searchengin"></i>

            <input type='text' placeholder="Rechercher" autoComplete="off" name='search' value={word} onKeyDown={(event)=>{func(event)}}  onChange={event=>{wordChanger(event)}}></input>
            <CancelSearch visible={isTyping}/>

            {isTyping && 
            <SearchSuggestions data={suggestions}/>
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
