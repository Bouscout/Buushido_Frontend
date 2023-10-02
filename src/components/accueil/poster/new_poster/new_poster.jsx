
import { useEffect, useState } from 'react'
// import './index.css'
import All_cards from './cards'
import Next_elem from './next_elements'


// function for the third alternative to the big poster on home screen

export default function New_poster(){
  
  const [choix, setChoix] = useState(0)
  const [next, setNext] = useState(1)
  const [posters, setPosters] = useState([])

  // fetching the posters data from api
  useEffect(()=>{
    fetch('https://buushido.ml/api/poster/')
    .then(response => response.json())
    .then(data => {
        console.log('api called for video : ', data)
    // set the data from the api into the components
        setPosters(data)
    },(error) => {
    console.log('the error is : ', error)
    }

    ) ; 
    }, [])

    if (posters.length > 0){

    
    const serie = posters[choix]
    let back_url = `url('https://buushido.ml/static/media${serie.poster_tof}')`
    // let back_url = posters[choix].poster_tof
    // let next_url = posters[next].poster_tof
    let next_url = `url('https://buushido.ml/static/media${posters[next].poster_tof}')`

  // function to put the choices behind each other even if we hit the last one
  function Arrange_array(){
    let suivant = next
    const final = [next]

    for (let i=0 ; i< 3 ; i++){
      if (suivant + 1 > 4){
        suivant = 0
      }else {
        suivant = suivant + 1
      }
      final.push(suivant)
    }

    return final
  
  }
  
  const Rest = Arrange_array()
  
  function handle_click(i){
    
    let new_back = i + 1
    if (new_back > 4){
      new_back = 0
    }
    
    // console.log(`clicked is : ${i} and next is ${new_back} `)
    
    setChoix(i)
    setNext(new_back)
  }
  // console.log('the rest is : ', Rest)
  

    return (
      <>
      <section id='head' style={{
        backgroundImage : 'linear-gradient(to right, rgba(0, 0, 0, 0.409), rgba(0, 0, 0, 0.302)),' + back_url ,
        // backgroundImage : 'linear-gradient(to right, black, transparent 40%) ,' + back_url ,
      }}>
          <Next_elem func={handle_click} next={next}  url={next_url} watch_id={serie.id}/>
       
       
          <All_cards pos={Rest} posters={posters} />
       
        <div className='info'>
          <h1>{serie.name}</h1>
          <h3>{serie.lesstext}</h3>
        </div>       

      </section>
      </>
    )

    }
}
