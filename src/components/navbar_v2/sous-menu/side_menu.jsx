import { useState } from "react";
import Logo from "../logo";
import { GenresMenu } from "./Genres_menu";


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

                        <a>
                            <h2>
                            <div className="icon"><i className="fa-solid fa-clapperboard"></i>Film</div>
                            </h2>
                        </a>

                        <a>
                            <h2>
                            <div className="icon"><i className="fa-solid fa-calendar-days"></i>Agenda</div>
                            </h2>
                        </a>

                        <GenresMenu />

                    </div>

                    <Social />

                </div>


            </section>
            </>
        )
}

const HomeButton = () =>{
    return (
        <a>
            <h2>
            <div className="icon" style={{
                background : 'var(--accent-orange)',  
            }}><i className="fa-solid fa-house"></i>Home</div>
            </h2>
        </a>
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
            <i className="fa-brands fa-telegram"></i>
            <i className="fa-brands fa-square-x-twitter"></i>
            <i className="fa-brands fa-discord"></i>
        </div>
        
        </>
    )
}

