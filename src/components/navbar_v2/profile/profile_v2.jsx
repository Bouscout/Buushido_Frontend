import { useEffect, useState } from "react";

import Traffic_view from "../../../background_processes/metrics/traffic";
import Brief_visit from "../../../background_processes/metrics/brief_visit";
import CheckPage from "../../../background_processes/metrics/which_page";
import is_connected from "../../../background_processes/check_connection";

import ProfileDetails from "./profile_details";
import { Glass } from "../sous-menu/Genres_menu";

export default function Profil_v2(props){
    const [show, setShow] = useState(false)
    const [blur, setBlur] = useState(false)
    const [connected, setConnected] = useState(false)

    useEffect(()=>{
        Traffic_view()
        Brief_visit()
        CheckPage()
        setConnected(is_connected())
    }, [])

    console.log("the value of connected is :", connected)

    function reset_auth(){
        sessionStorage.clear()
        setConnected(false)

        console.log("disconnecting")
    }

    // function for displaying and hiding the sub menu
    window.onclick = (e) => {
        if(e.target.matches('#glass')){
            setShow(false)
            setBlur(false)
            props.reset()
      }
    }

    function ShowSubMenu(){
        if(!show){   
            setTimeout(()=>{
                setShow(true)
                BlurBackground()
            }, 100)
        }
    }

    function BlurBackground(){
        setTimeout(()=>{
            setBlur(true)
        }, 200)
    }



    return (
        <>
        <h2 onClick={()=>{ShowSubMenu()}}>
            <div className="icon" style={{position : 'relative'}}>
            <i className="fa-solid fa-user"></i>
                    <span>Profil</span>
                    {show && 
                    // <Details conn={connected} regle={setConnected}/>
                    <>
                    <ProfileDetails connected={connected} reset={reset_auth}/>
                        {blur &&
                        <Glass />
                        }
                </>
                }    
            </div>
                    </h2>
        </>
    )
}

function Details(props){

    return (
        <>
        <div style={{
            position : 'absolute', width : '115px', height : '120px', 
            flexDirection : 'column', justifyContent : 'flex-end', border : 'solid black',
            top :'60px', right : '0', gap : '0px', background : '#161616', borderRadius : '10px'
        }}>
            {props.conn ? 
            <>
            <h4 style={{fontSize : '14px', background : '#060606', borderRadius : '7px', textAlign : 'center', color : '#f8a100'}}>Online</h4>
            <h4 onClick={()=>{deco(props.regle)}} style={{fontSize : '14px', background : '#060606', borderRadius : '7px', textAlign : 'center'}}>Se deconnecter</h4>
            </>
            :
            <a href="/login"><h4 style={{fontSize : '14px', background : '#060606', borderRadius : '7px', textAlign : 'center'}}>Se connecter</h4></a>
        }
        </div>
        </>
    )
}


function deco(setting){
    sessionStorage.clear()
    setting(false)
}