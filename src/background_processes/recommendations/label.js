// this file will handle setting up the labels for the recommended shows
// based on the different scenario,  we will attribuate a numerical value representing how a user liked a show
// the response is to be send to the server for further training of the algorithm

export default function SetLabel(showId, label_value, enforce=false){
    // init the list of watched series
    const liste = JSON.parse(localStorage.getItem("buushido_liste"))

    if (typeof liste === "object" && liste !== null){

            const element = liste[showId]

            if (element) {
                // we change the label only if it was smaller or the change is to be enforced
                let make_changes = enforce ? enforce : parseFloat(element.label) < label_value
                
                if (make_changes){
                    element.label = label_value
                    
                    // save changes
                    localStorage.setItem("buushido_liste", JSON.stringify(liste))
                    console.log("set new label for : ", element.name, " to : ", label_value)
                }
                return

            }

            
        

        // if we get to this line, item was not found in recommendation liste
        console.log("item not found in r list")


    }else {
        // no recommendation liste
        return
    }

}