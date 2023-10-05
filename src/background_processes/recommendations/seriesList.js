// handle all the logic about the data collection and user response as they interact with a show's episodes
import FetchRecommendations from "./fetch_recommendations"
import { fetchPopular } from "./fetch_recommendations"

export function updateSeriesList(serie){
    const INTERVAL = 3

    const liste = JSON.parse(localStorage.getItem("buushido_liste"))
    
    if (typeof liste === "object" && liste !== null){

        // checking if it already exist in the list
        let already_in = liste[serie.id]
        
        if (!already_in){
            
            liste[serie.id] = serie
            localStorage.setItem('buushido_liste', JSON.stringify(liste))

            const number_entries = Object.keys(liste).length

            console.log("inside number is : ", number_entries)
            if (number_entries !== 0 && number_entries % INTERVAL === 0){
                console.log("fetching now num is : ", number_entries)
                FetchRecommendations()
            }
            
        }else{
            console.log("already in")
            // in case it includes it we want to move it to the front
           
            
            already_in.last_episode = serie.last_episode
            already_in.last_saison = serie.last_saison
            
            liste[serie.id] = already_in
            
            console.log('moved to the front : ', liste)
            //saving changes
            localStorage.setItem('buushido_liste', JSON.stringify(liste))
        }

    }else {
        const newliste = {[serie.id] : serie}
        localStorage.setItem('buushido_liste', JSON.stringify(newliste))
        fetchPopular()
    }
}


export function RemoveFromList(serie, path="buushido_recommendations"){
    let la_liste = JSON.parse(localStorage.getItem("buushido_recommendations"))

    const filteredList = la_liste.filter(obj => obj.id !== serie.id);

    localStorage.setItem("buushido_recommendations", JSON.stringify(filteredList))

    console.log("removed from recommendations liste")
}