// this code will handle all the logic concerning the metric gathering of which page the user has visited
// it will register information about the page visited and if its a new page, a report will be made

const BASE_URL = "https://buushido.com"



export default function CheckPage(firstTime){
    let rawUrl = window.location.href
    let currentPage = rawUrl.split('/').at(-1)

    if (currentPage === ""){
        currentPage = "home"
    }

    if (firstTime){
        handleFirstTime(currentPage)
        return currentPage
    }


    try {
        // getting the page already visited
        page_dictionnary = localStorage.getItem("buushido_page_visited")

        // checking if the page is in dict
        if (page_dictionnary.includes(currentPage)){
            // no need to go further
            return false
        }
        else {
            page_dictionnary.push(currentPage)
            
            saveLocal(page_dictionnary)
            return currentPage
        }
        

    }catch(e){
        if (e instanceof TypeError){
            // meaning first time visitor or an error with local storage
            handleFirstTime(currentPage)
            return currentPage
        
        }else{
            console.log(`find a solution the error is : ${e}`)
            return false
        }
    }

}

function saveLocal(element){
    localStorage.setItem("buushido_page_visited", JSON.stringify(element))
}

function handleFirstTime(url){
    // in case it is a first time visitor no need to go through all the process
    const pageDict = [url]
    saveLocal(pageDict)
}

