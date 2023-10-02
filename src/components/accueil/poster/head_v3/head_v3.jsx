

import { useState } from "react";
import { useEffect } from "react";
import TopPoster_v3 from "./poster_v3";
import Anim from '../anim.jsx'
// import './poster_v3.css'

export default function TopHead_v3(){
    //getting the data from the api about the poster and then setting them and set the state of every poster
    const [data, setData] = useState([])
    const [etat, setEtat] = useState([true, false, false, false, false])
    const [selected, setSelected] = useState(0)
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
        fetch('https://buushido.com/api/poster/')
        .then(response => response.json())
        .then(data => {
            console.log('api called for video')
        // set the data from the api into the components
            setData(data)
    },(error) => {
        console.log('the error is for poster video : ', error)
    }
    
    ) ; 
       //setting the states of the poster after receiving data from api
        // setEtat(new_etat())
}, [])


    
    
    // useEffect(() => {
     
    // }, [])
    
    
    async function handleclick(i){
        let fake = etat.splice()
        fake[active] = false
        fake[i] = true
        active = i
        setSelected(i)
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
        // the actual background
        const back = data[selected]

        // next background would be next in list or if last would come back to first
        let next = (selected + 1) < 5 ? selected + 1 : 0
        next = data[next]
        // console.log('selected is : ', back)

        let url = `url('https://buushido.com/static/media${back.poster_tof}')`
        let next_url = `url('https://buushido.ml/static/media${next.poster_tof}')`
        return(
            <section style={{
                position : 'relative', width : '100%', height : '90vh'
            }}>
        <section id="head2" 
        style={{
            backgroundImage : url ,
        }}
        >
            <div className="smooth" style={{
                backgroundImage : next_url ,
                
            }}>

            </div>
            <div id="palette">
            {data.map((elem, id) => {
                // console.log('element is : '+elem+' id is : '+id)

                return(
                    <>
                    <TopPoster_v3 key={id} etat_main={etat[id]} serie={elem} 
                    onClick={() => {handleclick(id)}}
                    />
                    </>
                    
                    )
                })}
                    </div>
        </section>
        
        </section>
    )
    }else{
        return (
            
                <Anim />
            // </section>
        )
    }

}