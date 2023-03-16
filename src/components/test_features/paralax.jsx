// import './para.css'
import { useState } from "react";

export default function Paralax(){
  const [scrlY, setScrlY] = useState('0%')
  
    return (
        <section id='big'>
            <Onglet />
        </section>
    )
}
function Onglet(){
  
  const [scrl, setScrl] = useState('0')
    function handle_the_scroll(event){
      let valeur = event.target
      let max = valeur.scrollWidth - valeur.clientWidth
      let theorical_pos = (valeur.scrollLeft * 100) / max
      // console.log(`percentage is ${theorical_pos}%`)
      setScrl(theorical_pos.toString()+'%')
    }
    return (
      <>
      <div id="conteneur-para" onScroll={e=>{handle_the_scroll(e)}}>
        <Image src='https://images.unsplash.com/photo-1678382154583-b45867cfc331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://images.unsplash.com/photo-1678257355149-6eda1755b1a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://plus.unsplash.com/premium_photo-1676199592603-56932ca83d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://images.unsplash.com/photo-1678815927938-0fb01822962c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://images.unsplash.com/photo-1678802250711-c2a46f579cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://images.unsplash.com/photo-1678811118426-7a445633d350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://images.unsplash.com/photo-1678816438629-18c69ebdd19a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
        <Image src='https://images.unsplash.com/photo-1678815918041-658c2ba8c10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OXx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60' pos={scrl} />
      </div>
      </>
    )
}



function Image(props){
  let position = {
    objectPosition : props.pos+' 50%' ,
  }
  return (
    <img src={props.src} style={position} />
  )
}