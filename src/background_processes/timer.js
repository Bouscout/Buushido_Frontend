// this function will check if a certain amount of time timedelta has elapsed or not

export function startTimer(path){
    // getting the time
    const now = new Date()
    
    // registering the time stamp
    sessionStorage.setItem(path, now.getTime())
}

// stop the timer and check for the time ellapsed
export function stopTimer(path, delta=null, bias=null){
    const TIME_LIMIT_DELTA = delta ? delate : 30 * 60 * 1000 // minutes
    const MINIMUM_DELAY = bias ? bias : 5 * 60 * 1000 // minutes

    // get actual time
    const timeStamp = new Date().getTime()

    try {
        // we checked if the start time is still in the session
        const startTime = parseFloat(sessionStorage.getItem(path))
              
        // time limit
        if (timeStamp - startTime > TIME_LIMIT_DELTA){
            return 0
        }

        // we are right on time and accounted for the bias
        if (timeStamp - startTime > MINIMUM_DELAY){
            return 1
        }
        
        return 2
        
        
    }catch (e) {
        // mean new session altogether
        return 0
    }
        
        
}