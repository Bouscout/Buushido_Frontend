// Based on the recent interactions and shows watched of the user, we will send a get request to the server with that information
// the server will return us a response representing the shows recommended to the user
// we store those recommendations
import is_connected from "../check_connection"
// const BASE_URL = "https://buushido.com"
const BASE_URL = "http://10.0.0.89:8000"

export default async function FetchRecommendations(){
    // chech last watched show and order them according to an order of importance
    // the server will be adding more weight to the first element of the entries 
    
    let lastWatched = JSON.parse(localStorage.getItem("buushido_liste"))
    if (typeof lastWatched === "object" && lastWatched !== null){
        lastWatched = Object.values(lastWatched)
        lastWatched.reverse()
    }else{
        lastWatched = []
    }
    
    
    const strLastWatched = lastWatched.map(watch => watch.id).join(",")

    // parsing parameters sent from server, it will be a string with comma separated values
    const userParams = localStorage.getItem("buushido_userParams")

    // if (is_connected()){
    //     RecommendationConnectedUser(strLastWatched, userParams)
    //     return
    // }
    
    // getting extra information about the user
    // console.log("user agent : ", navigator.userAgent)
    const userInfos = {
        // 'userAgent' : navigator.userAgent,
        'userOnWifi' : navigator.onLine,
        'userLanguage' : navigator.language,
        "userParams" : userParams, 
    }
    

    let recomendation_url = `${BASE_URL}/api/recommendations`
    
    const url = new URL(recomendation_url)


    url.searchParams.append("lastWatched", strLastWatched)
    
    for (const info of Object.keys(userInfos)){
        if(userInfos[info]){
            url.searchParams.append(info, userInfos[info])
        }
    }
    
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.series
        const params = data.userParams

        console.log("the series are : ", series)
        console.log("user params are : ", params)

        // saveResponse(series, params)
    })

}


function RecommendationConnectedUser(watchedStr, userParams){
    // implement this
}

function saveResponse(series, userParameters){
    // save the response into the appropriate storage location
    localStorage.setItem("buushido_recommendations", JSON.stringify(series))

    if (userParameters) {
        localStorage.setItem("buushido_userParams", userParameters)
    }
}