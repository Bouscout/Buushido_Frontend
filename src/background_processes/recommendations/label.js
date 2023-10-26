// this file will handle setting up the labels for the recommended shows
// based on the different scenario,  we will attribuate a numerical value representing how a user liked a show
// the response is to be send to the server for further training of the algorithm

export default function SetLabel(showId, label_value, enforce=false){
    // init the list of watched series
    const liste = JSON.parse(localStorage.getItem("buushido_label"))

    if (typeof liste === "object" && liste !== null){

            const value = liste[showId]

            if (value) {
                // we change the label only if it was smaller or the change is to be enforced
                let make_changes = enforce ? enforce : parseFloat(value) < label_value
                console.log("label func called, label_valuec: ", label_value, " enforce : ", make_changes)
                if (make_changes){
                    liste[showId] = label_value
                    
                    // save changes
                    save_change(liste)
                    console.log("set new label for : ", showId, " to : ", label_value)
                    console.log(liste)
                }
                return

            }else {
                liste[showId] = label_value
                console.log("set label to : ", liste)
                save_change(liste)
            }

            825473


    }else {
        // no recommendation liste
        const liste = {[showId] : label_value}
        save_change(liste)
    }

}

function save_change(liste){
    localStorage.setItem("buushido_label", JSON.stringify(liste))
}