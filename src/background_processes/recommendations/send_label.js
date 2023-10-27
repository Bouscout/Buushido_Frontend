// this file handle the logic to send the recolted label to the server for further training

const BASE_URL = "https://buushido.com"
// const BASE_URL = "http://10.0.0.89:8000"

export default function SendLabel(){
    let labels = JSON.parse(localStorage.getItem("buushido_label"))

    let userParams = getUserParams()

    if (!labels){
        console.log("no label to post")
        return
    }
        
    // preparing the informations dictionary,
    const data_to_post = {
        "userParams" : userParams,
        "serieLabels" : labels,
    }

    // preparing the request
    const requestOptions = {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json ; charset=utf-8"
        },
        body : JSON.stringify(data_to_post)
    }

    const url = `${BASE_URL}/api/post_label`
    // making the request
    fetch(url, requestOptions)
    .then(response => {
        if (response.status == 202){
            console.log("posted label : ", data_to_post )
            
            // remove the information
            localStorage.removeItem("buushido_label")
            localStorage.removeItem("buushido_userParams")
        }
    })
    .catch(error => {
        console.log("label posting error : ", error)
    })
    
}

function getUserParams(){
    let userParams = localStorage.getItem("buushido_userParams")
    if(!userParams){

        let lastWatched = JSON.parse(localStorage.getItem("buushido_liste"))
        if (typeof lastWatched === "object" && lastWatched !== null){
            lastWatched = Object.values(lastWatched)
            lastWatched.reverse()
        }else{
            lastWatched = []
        }
        
        
        const strLastWatched = lastWatched.map(watch => watch.id).join("|")
        userParams = strLastWatched

        return userParams
    }

    userParams = userParams.replace(/,/g, '|')

    return userParams
}