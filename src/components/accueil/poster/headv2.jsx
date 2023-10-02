import { useRef, useState } from "react";
import { useEffect } from "react";
import Poster_v2 from "./posterV2";
import { Nuage_9 } from "../decorations/decor.jsx";
import Change_buttons from "./changer_button";

// import './decorations/index.css'

import Anim from "./anim";

export default function TopHead_v2(){
    //getting the data from the api about the poster and then setting them and set the state of every poster
    const [data, setData] = useState([])
    const [etat, setEtat] = useState([true, false, false, false, false])

    // to select the next poster
    const NextRef = useRef(null)
    const LastRef = useRef(null)
    let active = 1 ;

    useEffect(()=>{
        fetch('https://buushido.ml/api/poster/')
        .then(response => response.json())
        .then(data => {
            console.log('api called for video : ')
        // set the data from the api into the components
            setData(data)
    },(error) => {
        console.log('the fetch error is : ', error)
    }
    
    ) ;

    // const data = {
    //     name : 'Demon Slayer',
    //     lesstext : 'Ceci est un example ne faites pas du tout attention a ce que je suis entrain de taper',
    //     id : '40',
    // }
    // const series = [data, data, data, data, data]
    // setData(series)

}, [])

    function Find_next_last(){
        const len_of_states = 5

        let left_right ;
        for (let i=0 ; i < len_of_states ; i++){
            if(etat[i]===true && i !== 0){
                let left = i -1
                // in case there is no element to the right
                let right = i+1 < len_of_states ? i+1 : null
                left_right = [left, right]
                return left_right

            }else if(etat[i]===true && i ===0){
                // in case nothing at the left so first element of array
                return [null, i+1]
            }
        }
    }
    
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

    // the next and precedent poster to scroll to
    const [left, right] = Find_next_last()
    console.log(`the right is ${right} and the left is ${left}`)

    function Scrolling_poster(dir){
        // console.log('the value of the scroll is : ', Myref.current)
        let Myref = dir === 0 ? NextRef : LastRef
        Myref.current.scrollIntoView({
            behavior : 'smooth', 
        })
        let destination = dir===0 ? right : left
        handleclick(destination)
    }


    if (data.length > 0){

        return(
            <>
            {data.map((elem, id)=>{
                return (
                    <link rel="preload" src={'https://buushido.ml/static/media' + elem.poster_tof}/>
                )
            })}
            <section style={{
                position : 'relative', 
            }}>
                <Change_buttons makeScroll={Scrolling_poster} directions={[left, right]} />
        <div id="head">
        {/* <Nuage_9 style={{
        position : 'absolute',
        top : '32%',
        filter : 'brightness(30%)'
    }} /> */}
            {data.map((elem, id) => {
                // checking if left or right
                if(id===left){
                    return(
                        <>
                    <Poster_v2 innerRef={LastRef} key={id} etat_main={etat[id]} serie={elem}                     />
                    </>
                        )
                }else if(id===right){
                    return(
        <>
                        <Poster_v2 innerRef={NextRef} key={id} etat_main={etat[id]} serie={elem}                         />
                        </>
                        
                        )
                        
                }else {
                        
                    return(
                            <>
                    <Poster_v2 key={id} etat_main={etat[id]} serie={elem}                     />
                    </>
                    
                    )
                }
                })}
        </div>
        
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