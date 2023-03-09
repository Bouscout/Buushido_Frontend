import { useState } from "react";
import { useEffect } from "react";
import TopPoster from "./poster/poster";
// import './decorations/index.css'

export default function TopHead(props){
    //getting the data from the api about the poster and then setting them and set the state of every poster
    const [data, setData] = useState(props.choix)
    const [etat, setEtat] = useState([])
    let active = 0 ;
    
    useEffect(()=>{
       //get api data
        // axios.get("https://buushido.ml/api/poster/")
        // .then((res) => {
        //     let donne = res.data
        //     setData(donne)
        // }) 
        setData(props.choix)
        console.log('API CALLED')
        
    }, [props.choix])
    
    useEffect(() => {
        //setting the states of the poster after receiving data from api
        setEtat(new_etat())
        change_posteur()
    }, [])
    
    //function to set the states of all the poster for the first time before passing them
    function new_etat(){
        let fake = []
        for (let i=0 ; i < data.length ; i++ ){
            let state = false
            if (i===0){
                state = true
            }
            fake.push(state)
        }
        return fake
    }
   
    // when one of the cards is clicked    
    function handleclick(i){
        let fake = etat.splice()
        fake[active] = false
        fake[i] = true
        active = i
        setEtat(fake)
    }
    //recursively change the poster every 7 seconds
    function change_posteur(){
        let nouveau = active +1
        nouveau = nouveau > 4 ? 0 : nouveau 
        handleclick(nouveau)
        setTimeout(change_posteur, 7000)
    }


    return(
        <>
        <section id="head">
            {data.map((elem, id) => {
                // console.log('element is : '+elem+' id is : '+id)
                return(
                    <>
                    <TopPoster key={id} etat_main={etat[id]} serie={elem} 
                    onClick={() => {handleclick(id)}}
                    />
                    </>
                    
                    )
                })}
        </section>
        
        </>
    )
}
