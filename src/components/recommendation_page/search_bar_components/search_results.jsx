
// getting the suggestion of the search words

import { useState } from "react";
import { ImageSmallDetails } from "../../self-contained/imageSmallDetails/ImageSmallDetails";
import { useEffect } from "react";

export default function SearchSuggestions(props){
    const [series, setSeries] = useState([])

    useEffect(() => {
        setSeries(props.data)
    }, [props.data])

    return (
        <>
        <section className="search-results">
            <div style={{
                 width : '96%', margin : '0.2em auto',
                 display : 'flex', flexDirection : 'column', gap : '0.3em'
            }}>     
                    {series.length > 0 ?
                    <>
                    {series.map((serie, i)=>{
                        return (
                            <Suggestion serie={serie} key={i}/>
                            )
                    })}
                    </>
                     : 
                    <h3 style={{fontSize : "0.5em", color : 'var(--light-white)',
                    fontWeight : '500', marginLeft : '1em',
                    }}>Entrez une serie a chercher...</h3>

                    }
            </div>
        </section>
        </>
    )
}

const Suggestion = ({serie}) => {
    serie.note = null
    
    return (
        <ImageSmallDetails
        serie={serie}
        picWidth={3}
        picMaxWidth={100}
        picMinWidth={50}
        picAspectRatio={[10, 16]}
        />
    )
}