import { useState } from "react";
import { useEffect } from "react";
import TopPoster from "./poster";
// import './decorations/index.css'
import Anim from "./anim";

const BASE_URL = import.meta.env.SITE

export default function TopHead(){
    //getting the data from the api about the poster and then setting them and set the state of every poster
    const [data, setData] = useState([])
    const [etat, setEtat] = useState([false, true, false, false, false])
    let active = 1 ;
    
    // function check_connection(){
    //     try {
    //         const [access, refresh] = JSON.parse(sessionStorage.getItem('tokens'))
    //     }catch (e){
    //         console.log(e)
    //         window.location.href = '/login'
    //     }
    // }

    useEffect(()=>{
        
        fetch(`${BASE_URL}/api/poster/`)
        .then(response => response.json())
        .then(data => {
            console.log('api called for video')
        // set the data from the api into the components
            setData(data)
    },(error) => {
        console.log('the error is : ', error)
    }
    
    ) ; 
       //setting the states of the poster after receiving data from api
        // setEtat(new_etat())
        change_posteur()
}, [])


    
    
    // useEffect(() => {
     
    // }, [])
    
    
    async function handleclick(i){
        let fake = etat.splice()
        fake[active] = false
        fake[i] = true
        active = i
        setEtat(fake)
    }
    //recursively change the poster every 7 seconds
    async function change_posteur(){
        let nouveau = active +1
        nouveau = nouveau > 4 ? 0 : nouveau 
        handleclick(nouveau)
        setTimeout(change_posteur, 7000)
    }

    if (data.length > 0){

        return(
            <>
        <section id="head">
            {data.map((elem, i) => {
                // console.log('element is : '+elem+' i is : '+i)
                return(
                    <div key={i}>
                    <TopPoster etat_main={etat[i]} serie={elem} 
                    onClick={() => {handleclick(i)}}
                    />
                    </div>
                    
                    )
                })}
        </section>
        
        </>
    )
    }else{
        return (
            
                <Anim />
            // </section>
        )
    }

}