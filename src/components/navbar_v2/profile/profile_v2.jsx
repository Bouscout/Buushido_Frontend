import { useEffect, useState } from "react";

import Traffic_view from "../../../background_processes/metrics/traffic";
import Brief_visit from "../../../background_processes/metrics/brief_visit";
import CheckPage from "../../../background_processes/metrics/which_page";
import is_connected from "../../../background_processes/check_connection";

import ProfileDetails from "./profile_details";
import { Glass } from "../../self-contained/pop_up_message/pop_up_back_glass";

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
            <div className="icon">
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
