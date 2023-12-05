// for displaying the genres sub menu when user click or hoven on the genre button
import { useState } from "react"

export const GenresMenu = () => {
    /* 
    Sub menu for displaying all the genres options when user hover or click on the button
    to close user can either reclick the button or click anywhere outside of that component 
    */
    const [show, setShow] = useState(false)


    return (
        <>
        <h2 onClick={()=>{setShow(!show)}} style={{
            display : 'flex', justifyContent : 'space-between', alignItems : 'center', position : 'relative'
        }}>
            <div className="icon"><i className="fa-solid fa-book-open"></i>Genres</div>

            {show && 
            <AllGenres />
            }

        <i style={{color : "var(--accent-orange)"}} className="fa-solid fa-chevron-right"></i>
        </h2>
        </>
    )
}


const AllGenres = () => {
    const all_the_genres = [
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

    return (
        <section>

            <div className="flex-column" style={{margin : '0.5em'}}>
                {all_the_genres.map((genre, i)=>{
                    return (
                        <a href={"genre/"+genre}>
                        <h2 key={i}>{genre}</h2>
                        </a>
                    )
                })}

            </div>
        </section>
    )
}


