// contain the component that will display informations about a selected show

// we need an image, the genres, a description, the rating and a way to give a rating over 10
// also a button if it's available on buushido to access it

import { PickWithRating } from "./pick_with_rating"
import { SerieInformations } from "./extra_informations"
import { Glass, BlackGlass } from "../../../self-contained/pop_up_message/pop_up_back_glass"

export default function InfoPopUp({serie, cancel}) {
    // if no serie object is passed, do not render anything
    // serie = serie_test
    if (!serie){
        return
    }
    
    return (
        <>
        <BlackGlass />

        <section id="serie-pop-up-container">
            <div id="serie-info">
            <PickWithRating serie={serie}/>
            <SerieInformations serie={serie}/>

            <CloseButton closeFunc={cancel}/>
            </div>
        </section>
        </>
    )
}

const CloseButton = ({closeFunc}) =>{
    return (
        <div style={{
            position : 'absolute', top : "0", right : '0', fontSize : '1.8em'
        }} className="hover-color icon" onClick={()=>{closeFunc(false)}}>
            <i className="fa-solid fa-circle-xmark"></i>
        </div>
    )
}

const serie_test = {
    anime_id
: 
37403,
buushido_id
: 
null,
completed
: 
true,
description
: 
"Lacking what is considered the most important asset in basketball, baklec bb edj wjc hcjwe w jcxwnixwkm ceiwunciwn ixe jc ejkce jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjSora Kurumatani has struggled with his short height since the inception of his love for the game. Despite missing this beneficial aspect, Sora's unwavering drive never allowed his small stature to dictate his ability to play, believing strongly in trying his hardest and persistently practicing to prove his capability.  In hopes of satisfying his mother's wishes, Sora enters Kuzuryuu High School to become a member of the basketball club and compete wholeheartedly in tournaments. However, Sora is disappointed to find out that the boy's basketball team is nothing but a retreat for punks who have no interest in the sport. Sora also comes to learn that brothers Chiaki and Momoharu Hanazono—whom he becomes acquainted with—have also lost their once spirited motivation to play.  Determined to revive the basketball team, Sora challenges the boys to a match against him, where his quick feet and swift movements overwhelm the group. Gradually affected by Sora's impressive skills, sheer effort, and tireless devotion to basketball, the boys unexpectedly find their burnt-out passion for the game rekindling once again.  "
,genres
: 
['Comedy', 'Drama', 'School', 'Shounen', 'Sports'],
id
: 
2070,
nsfw
: 
false,
num_episodes
: 
50,
portrait_pic
: 
"https://cdn.myanimelist.net/images/anime/1975/108030.jpg"
,rating
: 
"7.21",
start_date
: 
"2019-10-02",
studios
: 
"Diomedéa",
title
: 
"Ahiru no Sora",
}