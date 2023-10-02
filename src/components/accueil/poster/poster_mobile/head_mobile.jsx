// the poster for the mobile version
import Anim from '../anim'
import Posters_mobile from './poster_mbl'
import { useEffect, useState } from 'react'
// import './poster_mobile.css'

const BASE_URL = "https://buushido.com"

export default function Head_Mobile(){
    const [data, setData] = useState([])
    
    // retrieving the poster data
        
    useEffect(()=>{
        fetch(`${BASE_URL}/api/poster/`)
        .then(response => response.json())
        .then(donne => {
            console.log('supposed : ', donne)
            setData(donne)

        },(error)=>{
            console.log("error fetching : ", error)
        }
        
        )
    }, [])
        
    
    if (data.length > 0){
        // display the poster
        console.log("they are : ",data)
        return (
            <>
            <Posters_mobile posters={data}/>
            
            </>
        )
    }

    else {
        <Anim />
    }
}