// information to display on the burger menu
import { RecommenderParams } from "./recommender_params_menu"
import { NavigationUpMenu } from "./navigation_menu"
import PopUpWarning from "../../self-contained/pop_up_message/pop_up_warning"
import { useState } from "react"

export default function MenuContent({cancel}){
    const [warning, setWarning] = useState(false)
    const [warningTitleMsg, setWarningTitleMsg] = useState([])

    function displayWarning(title, msg, icon=false){
        setWarningTitleMsg([title, msg, icon])
        setWarning(true)
    }

    return (
        <div className="flex" style={{
            width : '100%', justifyContent : 'space-evenly',
            animation : "slide-in-top 700ms linear 500ms 1 both"
        }}>
            <NavigationUpMenu cancel={cancel} displayWarning={displayWarning}/>
            <RecommenderParams cancel={cancel} displayWarning={displayWarning}/>

            {warning && 
            <PopUpWarning title={warningTitleMsg[0]} msg={[warningTitleMsg[1]]} icon={[warningTitleMsg[2]]} func={setWarning} />
            }

        </div>
    )
}

