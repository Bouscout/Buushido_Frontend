
// buttons for start watching a show from a click


// logics for quickwatch function

// export function Watch_button = ({quick, quickStart, id}) =>{
export function Watch_button (props){

        const quick = props.quick
        const start = props.quickStart

        let special = {gridRow : '1'}
        
    // retrieving last watch episode
     //all logics
     let to_watch = JSON.parse(localStorage.getItem('buushido_liste'))
     const serie = to_watch[serie.id]

     console.log("the button found : ", serie)
     // if found last episode styling the button to display the information
     if(typeof serie === "object" && serie !== null){
         if (serie.last_episode){
             watching = 'Watch | S'+serie.last_saison+' EP' + serie.last_episode
            special = {
                background: 'linear-gradient(to  right, #090909, #090909 ) padding-box,linear-gradient(to top right, #000c4e,#3d0042, #740072, #5e0b00) border-box ',
                border: '2px solid transparent',gridRow : '1',
            }

            to_watch = [serie.id, serie.last_saison, serie.last_episode]

            }
            
        }else{
            to_watch = [props.id, 1, 1]
        }
        
        // when quick is updated, the given index will be the episode displayed
        function quick_watch(){
            if (quick){
                setTimeout(()=>{
                    start(to_watch) // start = setQuick
                }, 1500)
                start(false)
        }else {
            start(to_watch)
        }
        
    }
    return (
        <button onClick={()=>{quick_watch()}} style={special}><strong><i className="fa-solid fa-play"></i> {watching ? watching : 'Watch'}</strong></button>
    )
}