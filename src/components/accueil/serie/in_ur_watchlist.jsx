import { useEffect, useState } from "react"
import is_connected from "../../self-contained/check_connection"
import { ImagePortrait } from "../../self-contained/image-portrait"
const BASE_URL = "https://buushido.com"

export default function In_watchliste(){
    const [watch, setWatch] = useState([])
    //check if user is connected
    
    useEffect(()=>{
        // is_connected(setNotConnected)
        if(is_connected()){
            // getting the new token
           const [access, refresh] = JSON.parse(sessionStorage.getItem('tokens')) 
           
           const reqestFetchOptions = {
               method : 'GET', 
               headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': `Bearer ${access}`,
                }
            }
            fetch(`${BASE_URL}/api/watchlist/`, reqestFetchOptions)
            .then(response => response.json())
            .then(data =>{
                // console.log('les donnees sont : ', data)
                let size = data.length
                if (size > 14){
                    data = data.slice(size - 14 , size)
                    
                }
                setWatch(data)
            })
        } else {
            console.log('not connected')
            // window.location.href = '/login'
        }
        
    }, [])

    if (watch.length > 0){
        const paysage = {
            maxWidth: '300px',
            aspectRatio: '13 / 8',
            width: '16.4vw',
            minWidth: '180px',
            borderRadius : '10px',
        }
        return (
            <section className="onglet">
                <a href="/watchlist"><h1 className="onglet-name"
                style={{
                    color : '#fee'
                }}
                >Dans votre Watchliste</h1></a>
                <div className="container">
                    {watch.reverse().map((serie, i)=>{
                        return(
                            <a href={"/serie/"+serie.id} key={i}>
                            <div style={paysage} >
                                <ImagePortrait 
                                src={serie.background_tof}
                                alt={serie.name}
                                style={paysage}
                                load={true}
                                />
                            </div>
                                </a>
                        )
                    })}

                </div>
            </section>
        )
    }

}