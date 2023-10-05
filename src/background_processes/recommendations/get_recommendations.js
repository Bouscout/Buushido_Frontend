// this will return the recommendations stored from the server response
// we have different options for only returning section of the list
import { fetchPopular } from "./fetch_recommendations"
export default function GetRecommendations(shuffle=false, limit=null, forceResponse=false){
    // parse it from local storage
    let recommendations = JSON.parse(localStorage.getItem("buushido_recommendations"))
    if (typeof recommendations === "object" && recommendations !== null) {

        if (recommendations.length > 0){

            console.log("returning normal pick")
            
            if (shuffle){
                recommendations = shuffleArray(recommendations)
            }
            
            if (limit){
                recommendations = recommendations.slice(0, limit)
            }
            
            return recommendations
       
        } else {
            if (forceResponse){
                return PopularPicks()
            }
            return []
        }
        
    } else {
        if (forceResponse){

            return PopularPicks()
        }
        return []
    }
    

    // return it
}

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function PopularPicks(){
    console.log("returning popular picks")
    const series = fetchPopular()
    return series
}