// function for the big pic with different button underneath
import is_connected from "../../background_processes/check_connection"
import { ImagePortrait } from "../self-contained/image-portrait"
import { useState, useEffect } from "react"
const BASE_URL = "https://buushido.com"

export default function Pic_with_controls(props) {
    // in order to quickly start watching where they left

    const W_button = props.boutton
    let data = props.data
    const [in_watch, setIn_watch] = useState(props.in_watchlist)
    // console.log('la reponse est : ', props.in_watchlist)

    useEffect(()=>{
        setIn_watch(props.in_watchlist)
    }, [props.in_watchlist])


    // function to handle the watchlist operations

    function watchli(){

        // checking if the user is connected        

        // getting the new token
        const tokens = JSON.parse(sessionStorage.getItem('tokens'))
        let token_valid = is_connected()
        // if (tokens[0]){
            console.log('the token valid ; ', token_valid)
        if(token_valid){

        
        try{
            const requestOptions = {
                method : 'GET' ,
                headers : {
                    'Content-Type' : 'appliacation/json',
                    'Authorization': `Bearer ${tokens[0]}`,
                }
            };



            fetch(`${BASE_URL}/api/watchlist/update/`+props.id+'/', requestOptions)
            .then (response => {
                let statut = response.status
                console.log('status : ', statut)
                if (statut === 401){
                    window.location.href = '/login'
                }
               
                return response.json()
            })
            .then(data =>{
                setIn_watch(!in_watch)
            })

        }catch (e){
            console.log(e)
            window.location.href = '/login'
        }
    }else{
        console.log('token not valid')
        window.location.href = '/login'
    }
    }

    return (
        <>
        <div style={{marginLeft : '0.5rem' }}>
                        {props.image && <ImagePortrait style={{
                            width : '17vw',
                            aspectRatio : '10 / 16',
                            minWidth : '150px',
                            maxWidth : '250px',
                            borderRadius : '7px',
                        }} 
                        src={data.tof_url}
                        alt={data.name}
                        load={true}
                        />}

                        <div className="controle">
                            <W_button />
                            {in_watch ? 
                            <button onClick={()=>{watchli()}}><strong><i id="icon" className="fa-solid fa-circle-check"></i> <span id="watch">In Watchlist</span></strong></button> : 
                            <button onClick={()=>{watchli()}}><strong><i id="icon" className="fa-solid fa-plus"></i> <span id="watch">Watchlist</span></strong></button> 
                        }
                                
                            
                            
                                <button onClick={()=>{
                                    navigator.share({
                                        title : data.name ,
                                        url : `${BASE_URL}/serie/`+props.id,
                                    })
                                }}><strong>Partager</strong></button>
                                <button><a style={{
                                    textDecoration : 'none', color : '#fff'
                                }} href="mailto:buushidobug1@gmail.com"><strong>Bug <i className="fa-solid fa-bug"></i></strong></a></button>
                            

                        </div>
                        </div>
        </>
    )
}

export const Imagetop = ({
    src , 
    alt , 
    style,
    mediatype = 'image/webp' ,
}) => {
    return (
        <picture style={style ? style : {}}>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={src+'.webp'} type={mediatype} />
            <img src={src} alt={alt} />
        </picture>
    )
}