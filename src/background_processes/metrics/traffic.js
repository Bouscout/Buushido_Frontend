
// this function will send a request to the api stating that this user is viewwing the website
// the request can only be sent every 6 hours or VIEW_DELTA variable amount of time
// if user doesn't have a precedent request, request we'll be sent
// if user has record of sent request, time will be verified and if the lenght is higher than 6 then new request

// this will also pass as a parameter the information about the page that the user visited
// we will not add an additional view for each page visited but we still pass the infos of the pages individually
import CheckPage from "./which_page"


const BASE_URL = "https://buushido.com"

export default async function Traffic_view(){
    const VIEW_DELTA = 6 //value for which new view is taken
    
    // actual time
    const now = new Date()
    let day = now.getDate()
    let hour = now.getHours()

    try{
        const time_stamps = JSON.parse(localStorage.getItem('buushido_time'))
        // console.log('the time stamps are : ', time_stamps)
        // we are going to loop through the element inside and find the one corresponding to the view
        time_stamps.forEach(pair => {
            if (pair[0] === 'view'){
                const[lastDay, lastHour] = pair[1] // last update times 
                
                // in case the days are completly differents
                if (parseInt(lastDay) < day){ 
                    // Report_page(first_time=1)
                    view_plus_one()
                    update_state(day, hour)
                    console.log('sending view different day')

                }else if(parseInt(lastDay) === day && (hour - lastHour) > VIEW_DELTA ){
                    
                    view_plus_one()
                    // Report_page(first_time=1)
                    update_state(day, hour)
                    console.log('sending view same day')
                }else {
                    // Report_page(first_time=0) // just report the actual page
                    console.log('no need for a new view')
                }
            }else {
                // meaning nothing in the storage
                // Report_page(first_time=1)
                view_plus_one()
                update_state(day, hour)
                console.log('nothing were inside')
            }
        });
        
    }catch(e){
        
        if (e instanceof TypeError){
            // we are going to assume first time visiting user
            console.log('caught an typerror ')
            let status = 'view'
            let pair = [status, [day, hour]]
            
            if(view_plus_one()){
                const metrics = [pair]
                localStorage.setItem('buushido_time', JSON.stringify(metrics))
                console.trace('new time stamp added')
            }else {
                console.log('failed to add the view')
            }
            
        }else{
            
            console.log('trouve une solution')
            console.log('the error is : ', e)
        }
    }

}

function view_plus_one(){

    let fait = false
    fait = fetch(`${BASE_URL}/metrics/webtraffic/`)
    .then(response => {
        let etat = response.status
        console.log('sending new view : ', etat)
        if (etat == 200 ){
            return true
        }else {
            return false
        }
    })
    console.log('fait is : ', fait)
    return fait
}

function Report_page(first_time=0){
    const page = CheckPage(first_time)
    
    success = false

    if (page){
        API_request = `${BASE_URL}/metrics/webtraffic/?page_visited=${page}&first_time=${first_time}`
        let success = fetch(API_request)
        .then(response => {
            const etat = response.status

            if (etat == 200){
                return true
            }

            return false

        })
    }

    return success

}


function update_state(actualday, actualhour){
    const pair = [actualday, actualhour]
    const etat = [['view', pair]]
    localStorage.setItem('buushido_time', JSON.stringify(etat))
}
