import { useEffect, useState } from "react";

import Traffic_view from "../../background_processes/metrics/traffic";
import Brief_visit from "../../background_processes/metrics/brief_visit";
import CheckPage from "../../background_processes/metrics/which_page";
import is_connected from "../../background_processes/check_connection";

export default function Profil(){
    const [show, setShow] = useState(false)
    const [connected, setConnected] = useState(false)
    useEffect(()=>{
        Traffic_view()
        Brief_visit()
        CheckPage()
        setConnected(is_connected())
    }, [])

    return (
        <>
        <div onClick={()=>{setShow(!show)}} style={{
            color : '#fff', marginTop : '12px', fontSize : '18px', cursor : 'pointer', zIndex : '3',
            }}><i className="fa-solid fa-user"></i>
                    <span className="small">  Profil</span>
                    {show && 
                    <Details conn={connected} regle={setConnected}/>
                    }    
                    </div>
        </>
    )
}

function Details(props){

    return (
        <>
        <div style={{
            position : 'fixed', width : '115px', height : '120px', 
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