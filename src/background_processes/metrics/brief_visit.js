// function to check if the user is immediately leaving the website or if 
// he is staying for at least 30min meaning he is using the website
const BASE_URL = "https://buushido.com"

export default async function Brief_visit(){
    const BRIEF_DELTA = 30 // minutes
    const MINIMUM_DELAY = 5

    const now = new Date()
    const day = now.getDate()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    try {
        // checking for the info in store
        // this will trigger an error if no prior registration was not made in storage
        const [status, lastTime] = JSON.parse(localStorage.getItem('buushido_brief'))
        
        
        const [lastDay, lastHour, lastMinutes] = lastTime
        // in case it is the same day we are checking if the last checkup was 30min ago
        // we also have to make sure sure that the check up is 10 minutes after the checking
        // just to avoid user just scrolling through fast
        if(lastDay === day){
        // checking if we need to make a reset based on the day
            if(status !== 'done' ){
                // meaning the status is on cheked_in

                // we have to check if at least 10min passed before checking
                if(hour == lastHour && (minutes - lastMinutes) < MINIMUM_DELAY){
                    // we just have to wait then
                    console.log('rp : tsnn', minutes- lastMinutes)
                    return 
                }

                else if (hour == lastHour && (minutes - lastMinutes) <= BRIEF_DELTA ){
                    
                    let etat = Report_presence()
                    if(etat){
                        const report = ['done', [day, hour, minutes]]
                        localStorage.setItem('buushido_brief', JSON.stringify(report))
                        return 
                    }
                }else{
                    // we were checked in but didn't reply on time
                    // so just reset the time for a new trial
                    const report = ['checked_in', [day, hour, minutes]]
                    localStorage.setItem('buushido_brief', JSON.stringify(report))
                    console.log('rp : tslw')
                    return
                }
            }else{
                // meaning the status is on done
                // we have to wait till the day change to make a new report
                console.log('rp : :)')
                return
            }

        }else{ 
            // we have to check in again cause day different
            const pair = [day, hour, minutes]
            console.log('not the same day', pair)

            const report = ['checked_in', pair]
            localStorage.setItem('buushido_brief', JSON.stringify(report))
            return

        }

            
        }catch(e){
        if (e instanceof TypeError){
            
            // no prior registration so make one
            const report = ['checked_in', [day, hour, minutes]]
            localStorage.setItem('buushido_brief', JSON.stringify(report))
            console.log('first time reporting')
            return
        }
        console.log('error reporting brief : ', e)
    }
}


function Report_presence(){
    var reported ;
    reported = fetch(`${BASE_URL}/metrics/brief_user/`)
    .then(response => {
        if (response.status == 200){
            console.log('au rapport')
            return true
        }else {
            console.log('au rapport mistake')
            return false
        }
    })

    return reported
}