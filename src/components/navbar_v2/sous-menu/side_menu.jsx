import { useState } from "react";
import Logo from "../logo";
import { GenresMenu } from "./Genres_menu";
import { NormalButton, SpecialButton } from "../../self-contained/usefulButtons";

export default function SideMenuLeft(){

        return (
            <>
            <section className="side-menu" style={{
                left : '0',
                borderRight : '1px solid var(--dark-gray)',
                justifyContent : "space-between", 
                animation : "slide-right 100ms linear 0s 1 both",
            }}  >
                <div className="flex-column" style={{marginLeft : '1em', justifyContent : 'space-between', height : '80%'}}>

                    <div className="flex-column" style={{gap : "1em"}}>
                        <Logo />
                      
                        <BreakLine />

                        <HomeButton />

                        <SpecialButton text={"Film"} icon={"fa-solid fa-clapperboard"} link={"/genre/Film"} color={"dark-blue"}/>
                       
                        <SpecialButton text={"Agenda"} icon={"fa-solid fa-calendar-days"} link={"/agenda"} color={"dark-blue"}/>
                       

                        <GenresMenu />

                        <SpecialButton text={"Recommendations Engine"} icon={"fa-solid fa-gear"} link={"/recommendations"} color={"accent-purple"}/>
                        {/* <a href="/recommendations">
                            <h2>
                                <div className="icon"><i className="fa-solid fa-gear"></i>Recommendation Engine</div>
                            </h2>
                        </a> */}

                    </div>

                    <Social />

                </div>


            </section>
            </>
        )
}

const HomeButton = () =>{
    return (
        <SpecialButton text={"Home"} icon={"fa-solid fa-house"} color={"accent-orange"} link={"/"}/>
    )
}

const BreakLine = () =>{
    return <hr style={{
        width : '90%', color : "var(--accent-purple)"
    }}></hr>
}

const Social = ({}) =>{

    return (
        <>
        

        <div style={{
            display : 'flex', justifyContent : 'space-evenly', width : '90%', margin : '0 auto',
            fontSize : '1.8em', padding : '0.7em 0', borderTop : '1px solid var(--accent-white)'
        }}>
            <i className="fa-brands fa-telegram hover-color"></i>
            <i className="fa-brands fa-square-x-twitter hover-color"></i>
            <i className="fa-brands fa-discord hover-color"></i>
        </div>
        
        </>
    )
}

