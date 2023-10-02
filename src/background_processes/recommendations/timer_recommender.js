// this function  will set up a small timer to check the time ellapsed in order to measure the interest of a user into a certain show
// that delta time we'll give us a direct label
// we need to account for bias or unexpected event before setting up th label

import { startTimer, stopTimer } from "../timer";
import SetLabel from "./label";

export default async function interestTimer(start=false, showId){
    const timerPath = "buushido_timer"

    if (start){
        console.log("start timer")
        startTimer(timerPath)
        return
    }

    // check the timer status 0 for time elapsed, 1 for right on time, 2 for still in the start and bias interval
    const minimum_delay = 1 * 60 * 1000 // 1 minutes
    const status = stopTimer(timerPath, null, minimum_delay)

    console.log("stopped timer and status is : ", status)
    if (status === 1){
        SetLabel(showId, 1)
        return
    }

    if (status == 2){
        SetLabel(showId, 0.5)
        return
    }

    else {
        SetLabel(showId, 0)
    }

    // clear timer
    sessionStorage.removeItem(timerPath)

}
