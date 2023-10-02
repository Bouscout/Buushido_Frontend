
// the first page composed of the description
// represent all the little details about the show that the user can trigger to see


import { useState } from "react"

export default function Detail_serie(props){
    // passing the api data
    const data = props.donne
    return (
        <div  id="details-serie">
            <h2 style={{
                color : '#fff', fontFamily : 'odachi', fontWeight : 'bolder', marginLeft : '2vmin',
            }}>Description</h2>

        
           

            <Extra_details num={props.num} date={data.date} genres={[data.genre_1, data.genre_2, data.genre_3, data.genre_4]} description={data.description}/>

            {/* <h1 style={{color : '#fee', fontSize : '1rem',}}>Publie : <span>{data.date}</span></h1> */}
        </div>
    )
}


function Extra_details(props){
    const [show, setShow] = useState(false)

    const genres = props.genres

    if(show){
        return (
            <>
            
            <h3 style={{color : '#fff', fontSize : '3vmin', fontWeight : '300', width : '95%', margin : '0 auto',
                        marginBottom : '1rem', lineHeight : '150%', color : 'rgb(187, 187, 187)'
                        
                        }}>{props.description}</h3>

            <div style={{
                display : 'flex', flexDirection : 'column', width : '97%', margin : '0 auto'
            }}>
                <div className="compact-details">
                <h2> Audio </h2>
                <h3> Japonais</h3>
                </div>
                <div className="compact-details">
                <h2> Sous-titres </h2>
                <h3> Francais</h3>
                </div>
                <div className="compact-details">
                <h2> Nombre d'episodes </h2>
                <h3> {props.num}</h3>
                </div>
                {/* <div className="compact-details">
                <h2> Nombre de Saisons </h2>
                <h3> 2</h3>
            </div> */}
                <div className="compact-details">
                <h2> Publication </h2>
                <h3> {props.date}</h3>
                </div>
            </div>

            <div id="genres-serie">
                {genres.map((gen, i)=>{
                    if (gen){

                        return (
                            <a href={'/genre/'+gen} key={i}><h2>{gen}</h2></a>
                            )
                        }
                })}

            </div>

            <h2 style={{
                color : 'purple', textAlign : 'right', marginRight : '5vmin', fontWeight : '250', cursor : 'pointer',
                fontFamily : 'odachi',
            }} onClick={()=>{setShow(false)}}>Voir moins...</h2>
            </>
        )

    }else{
        return (
            <>
             <h3 style={{color : '#fff', fontSize : '3vmin', fontWeight : '300', width : '95%', margin : '0 auto',
                        marginBottom : '1rem', lineHeight : '150%', color : 'rgb(187, 187, 187)',
                        
                        }}>{props.description.slice(0, 150)}...</h3>
            <h2 style={{
                color : 'purple', textAlign : 'right', marginRight : '5vmin', fontWeight : '250', cursor : 'pointer',
                fontFamily : 'odachi',
            }} onClick={()=>{setShow(true)}}>Voir plus...</h2>
            </>
        )
    }

}