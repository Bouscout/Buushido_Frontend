// Based on the recent interactions and shows watched of the user, we will send a get request to the server with that information
// the server will return us a response representing the shows recommended to the user
// we store those recommendations
import is_connected from "../check_connection"
const BASE_URL = "https://buushido.com"
import SendLabel from "./send_label"

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


    url.searchParams.append("watched", strLastWatched)
    
    for (const info of Object.keys(userInfos)){
        if(userInfos[info]){
            url.searchParams.append(info, userInfos[info])
        }
    }

    // before we fetch the suggestions, we try to post the labels we already have
    SendLabel()
    
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.series
        const params = data.userParams


        console.log("the series are : ", series)
        console.log("user params are : ", params)

        saveResponse(series, params)
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

export async function fetchPopular(){
    const url = `${BASE_URL}/api/recommend_popular`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.series
        const runtime = data.runtime

        saveResponse(series)
        console.log("popular fetched")
    })
    .catch(error => {
        console.log("failed to fetch popular : ", error)
    })
}