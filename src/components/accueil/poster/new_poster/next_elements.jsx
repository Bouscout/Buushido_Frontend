
import The_buttons from "./button_next"
import { useState } from "react"

export default function Next_elem(props){
    const [active, setActive] = useState(false)
    const watch_id = props.watch_id
    const clicker = props.func
    const next = props.next
    let url = props.url
    // let url = `url('https://buushido.ml/static/media${serie.poster_tof}')`

  
    // console.log('next is : ', next, ' and active is :  ', active)
  
    function clicking(){
      setTimeout(()=>{
        clicker(next)
      }, 1200)
      // clicker(next)
      // alert('clicked')
      setActive(true)
      setTimeout(()=>{
        setActive(false)
      }, 1200)
    }

    function watching(){
        window.location.href = `/serie/${watch_id}`
    }
    if (active){
      return(
        <>
        {/* <div className='smoother' style={{
          zIndex : '1'
        }}> */}
              <The_buttons next={clicking} watch={watching}/>
          <div className='smooth' style={{
            backgroundImage : url, width:'100%', height : '95vh',
            zIndex : '-1',
            top : '50%',
            animation : 'disparait 10000ms linear 0s 1 both',
          }}></div>
        {/* </div> */}
        </>
      )
      
    }else{
      return(
        <>
        <The_buttons next={clicking} watch={watching}/>
        <div className='poster' style={{
          backgroundImage : url,
          overflow : 'hidden',
          top : '50%',
          animation : 'fade_in 1800ms linear 0s 1 both',
          zIndex : '1',
        
        }} onClick={()=>{clicking() }}></div>
        </>
      )
    }
    
  }