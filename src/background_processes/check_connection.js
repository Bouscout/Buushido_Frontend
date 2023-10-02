// function to check if the user is connected and refresh the token
// return true if connected otherwise return false
const BASE_URL = "https://buushido.com"

export default function is_connected(not_connected=null){

    const TOKEN_ACCESS_DELTA = 3
    const TOKEN_REFRESH_DELTA = 1

    var valid ;

    // actual time
    const now = new Date()
    const day = now.getDate()
    const hour = now.getHours()

    try{
        const tokens = JSON.parse(sessionStorage.getItem('tokens'))
        // console.log(tokens)
            let [oldAccess, oldRefresh, lastTime] = tokens
            const [lastDay, lastHour] = lastTime

            // in the case that we have an old token in store
            if(oldAccess && Array.isArray(lastTime)){
            
            //in the case more than one day passed, everything is expired
                if ((day - lastDay) > TOKEN_REFRESH_DELTA){
                    valid = false
                    console.log('tk : tkx')
                    return valid

                }else{

                    // in the case the day just flipped the hours difference will be negative
                    if(day - lastDay == 1 && (hour - lastHour) < (-24 + TOKEN_ACCESS_DELTA) ){
                    // meaning the token is still active
                    valid = true
                    console.log('connected new day')
                    return valid
                }
                // in the case same day and hours are within range
                     else if((day == lastDay && (hour - lastHour) <= TOKEN_ACCESS_DELTA)){
                        valid = true
                        console.log('tk : ap')
                        return valid
                                
                    }else{
                        // this means that the refresh token at least didn't expire
                        console.log(' tk : rtf')
                        valid = fetching_token(oldRefresh, day, hour)
                        return valid
                    }
                            

                    
                }


            }else{ 
                // this means that no token is in store
                // so create it
                // window.location.href = '/login'
                valid = false
                return valid
            }
            
        }catch(e){
            if(e instanceof TypeError){
                // console.log(e)
                console.log('tk : ncts')
            }else{

                console.log('nc error : ', e)
            }
            // not_connected(true)
            valid = false
            return valid
        }
        return valid
}

function fetching_token(oldRefresh, day, hour){
    var connected ;

    // creating the request options
    const requestOptionsRefresh = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(
            {refresh : oldRefresh}
            )
        }
        try {

            // fetching and assigning value to connected
            connected = fetch(`${BASE_URL}/api/token/refresh/`, requestOptionsRefresh)
            .then(response => response.json())
            
            .then(data =>{
                const {access} = data
                if(access){
                    const lastTime = [day, hour] 
                    const tokens = [access, oldRefresh, lastTime]
                    sessionStorage.removeItem("tokens")
                    sessionStorage.setItem('tokens', JSON.stringify(tokens))
                    // not_connected(false)
                    console.log('should return true')
                    connected = true
                    
                }else{
                    // not_connected(true)
                    connected = false
                }
            })
            return connected
        } catch (e){
            // connection failed
            console.log("connexion failed : ", e)
            connected = false
            return connected
        }
    }