
// getting the suggestion of the search words

import { useState, useContext } from "react";
import { ImageSmallDetails } from "../../self-contained/imageSmallDetails/ImageSmallDetails";
import { useEffect } from "react";

import serieContext from "../../../utils/serie_context";

export default function SearchSuggestions({data, cursor}){
    const [series, setSeries] = useState([])

    const {addLiked} = useContext(serieContext)

    useEffect(() => {
        setSeries(data)
    }, [data])

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
                            <div key={i} onClick={()=>{addLiked(serie)}} style={{
                                border : `1px solid ${i === cursor ? "var(--accent-orange)" : "transparent"}`
                            }}>
                            <Suggestion serie={serie}/>
                            </div>
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
    serie.tof_url = serie.portrait_pic
    serie.name = serie.title
    return (
        <ImageSmallDetails
        serie={serie}
        picWidth={3}
        picMaxWidth={100}
        picMinWidth={50}
        picAspectRatio={[10, 16]}
        direct={true}
        />
    )
}