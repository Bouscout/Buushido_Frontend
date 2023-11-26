// information to display on the burger menu
import { RecommenderParams } from "./recommender_params_menu"
import { NavigationUpMenu } from "./navigation_menu"

export default function MenuContent({cancel}){

    return (
        <div className="flex" style={{
            width : '100%', justifyContent : 'space-evenly',
            animation : "slide-in-top 700ms linear 500ms 1 both"
        }}>
            <NavigationUpMenu cancel={cancel}/>
            <RecommenderParams cancel={cancel}/>
        </div>
    )
}

