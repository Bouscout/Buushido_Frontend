// function for the floating pic on the right side 
import Pic_with_controls from '../pic_with_controls.jsx'
import { useEffect, useState } from 'react'
export default function Floating_pic(props){
    if (window.innerWidth > 800){

        const [top_position, setTop_position] = useState(60)
        const body = document.querySelector('body')
        const max_percent_off = 20

        // simple animation
        // making the picture go down with you as you scroll
        window.addEventListener('scroll', (e)=>{
            const max = body.scrollHeight - window.innerHeight
            // console.log('the scroll is : ', max)
            
            let percent_offset = (window.scrollY * max_percent_off ) / max
            // console.log('the offset is : ', percent_offset)
            let new_top_position = 60 - percent_offset 
            setTop_position(new_top_position)
        })

        return (
            <>
        <div id="floater" style={{
            top : `${top_position}%`
        }}>
        <Pic_with_controls id={props.id}
         data={props.data}
         in_watchlist={props.in_watchlist}
         boutton={props.boutton}
         image={true}
         
         />

        </div>
        </>
    )
}
}