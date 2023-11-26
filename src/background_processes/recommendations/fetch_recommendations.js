// Based on the recent interactions and shows watched of the user, we will send a get request to the server with that information
// the server will return us a response representing the shows recommended to the user
// we store those recommendations
import is_connected from "../check_connection"
const BASE_URL = "https://buushido.com"
// const BASE_URL = "http://10.0.0.89:8000"
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

    // stored informations on the user
    const userInfos = JSON.parse(localStorage.getItem("buushido_userInfos"))

    // if (is_connected()){
    //     RecommendationConnectedUser(strLastWatched, userParams)
    //     return
    // }
    
    let recomendation_url = `${BASE_URL}/api/recommendations`
    
    const url = new URL(recomendation_url)


    // appending without the encoding
    url.searchParams.append("watched", strLastWatched)
    
    for (const info of Object.keys(userInfos)){
        if(userInfos[info]){
            url.searchParams.append(info, userInfos[info])
        }
    }

    // before we fetch the suggestions, we try to post the labels we already have
    SendLabel()
    
    console.log("fetching with : ", strLastWatched)

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.series
        const params = data.userParams


        console.log("the series are : ", series)
        console.log("user params are : ", params)

        saveResponse(series, params, userInfos)

        return series
    })

}


function RecommendationConnectedUser(watchedStr, userParams){
    // implement this
}

function saveResponse(series, userParameters, userInfos){
    // save the response into the appropriate storage location
    localStorage.setItem("buushido_recommendations", JSON.stringify(series))

    if (userParameters) {
        userInfos.userParams = userParameters
        localStorage.setItem("buushido_userInfos", JSON.stringify(userInfos))
    }
}

export function fetchPopular(){
    const url = `${BASE_URL}/api/recommend_popular`
    const data = fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.series
        const runtime = data.runtime

        saveResponse(series)
        console.log("popular fetched")

        return series
    })
    .catch(error => {
        console.log("failed to fetch popular : ", error)
        return []
    })

    return data
}