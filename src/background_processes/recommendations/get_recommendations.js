// this will return the recommendations stored from the server response
// we have different options for only returning section of the list

export default function GetRecommendations(shuffle=false, limit=null){
    // parse it from local storage
    try {
        let recommendations = JSON.parse(localStorage.getItem("buushido_recommendations"))

        if (shuffle){
            recommendations = shuffleArray(recommendations)
        }

        if (limit){
            recommendations = recommendations.slice(0, limit)
        }

        return recommendations
        
    } catch(e){
        console.log("the error is : ", e)
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
