import { useState } from 'react'
import Sign_up from './signup'
import { Social_log } from './signup'
// import './login.css'

const BASE_URL = "https://buushido.com"

export default function Formulaire(){
    const [login, setLogin] = useState(true)
    if (login){
    return (
        <>
        <Login reset={setLogin}/>
        </>
)
    }else {
        return(
            <>
            <Sign_up reset={setLogin}/>
            </>
        )
    }
}
function Login(props){
    const [name, setName] = useState('')
    const [psw, setPsw] = useState('')
    const [err, setErr] = useState('') 
    
    // setting up the value for the request to get the access and refresh tokens
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username : name, password1 : psw, password2 : 'maison', })
        body: JSON.stringify({ username : name, password : psw })
    };

    // send the value of the username and password with click of the confirm button
    function envoyer(evt){
        // we'll stop the initial submit button
        evt.preventDefault()

        fetch(`${BASE_URL}/api/token/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('les donnes recu sont : ', data) ;

                // getting the access and refresh token from the data
                const { access, refresh } = data
                // actual time
                const now = new Date()
                const day = now.getDate()
                const hour = now.getHours()
                const lastTime = [day, hour]

                // console.log('the access is : ', access)
                // console.log('the refresh is : ', refresh)
                const tokens = [access, refresh, lastTime]

                //checking if they are present then passing them into session storage
                if (access){
                    sessionStorage.setItem('tokens', JSON.stringify(tokens))
                    sessionStorage.setItem("username", JSON.stringify(name))
                    // console.log('the tokens are : ', tokens)
                    window.location.href = '/'
                }else{
                    setErr("Username ou mot de passe incorrect")
                }
                // setErr(Object.values(data[0][0]))
            }),
            (error) =>{
                console.log('something went wrong : ', error)
            };
        }

                 

    
    function upd_nom(update){
        setName(update)
    }
    function upd_psw(update){
        setPsw(update)
    }
    
    return (
        <>
        <Panneau />
        <section id='inscrire'>
            <div className='formule'>
                <h1 style={{
                    position : 'absolute',
                    top : '0',
                    left : '10px' ,
                    opacity : '0.4'
                    // translate : '-50% 0',
                }} onClick={()=>{props.reset(false)}}>Inscription</h1>
                <h1 style={{
                    position : 'absolute',
                    top : '0',
                    right : '10px' ,
                    // translate : '-50% 0',
                }}>Connexion</h1>
            {err != '' ? 
            <Erreur err={err}/>:null
            }
            <Social_log />
            <Username up={upd_nom} />
            <Password up={upd_psw} />
            <button onClick={e=>{envoyer(e)}}><h1>Confirmer</h1></button>
        </div>
        </section>
        
        </>
    )

}


function Username(props){
    const [nom, setNom] = useState('')

    const label_style = nom != '' ? {
        top : '-35px',
    } : null
    function naming(evt){
        props.up(evt.target.value)
        setNom(evt.target.value)
        
    }
    return (
        <>
        <div className='username'>
            {/* <input type='text' placeholder='Username'></input> */}
            <input type='text' name='username' value={nom} onChange={(event)=>{naming(event)}}></input>
            <label style={label_style}>Username</label>
            <h3>{nom}</h3>
        </div>
        </>
    )
}

function Password(props){
    const [nom, setNom] = useState('')

    const label_style = nom != '' ? {
        top : '-35px',
    } : null

    function naming(evt){
        let typed = evt.target.value
        props.up(typed)
        
        setNom(typed)
    }
    
    let passw = ''
    for (let i = 0 ; i < nom.length ; i++){
        passw = passw + '*'
    }
    return (
        <>
        <div className='username'>
            {/* <input type='text' placeholder='Username'></input> */}
            <input type='password' name='username'  value={nom} onChange={(event)=>{naming(event)}}></input>
            <label style={label_style}>{props.msg ? 'confirmer ':null}Mot de Passe</label>
            <h3>{passw}</h3>        
            </div>
        </>
    )
}


function Panneau(){
    return (
        <>
        <h1 id='pane'>BUUSHIDO</h1>
        </>
    )
}

function Erreur(props){
    let msg = props.err
    return (
        <h2 id='erreur'>{msg}</h2>
    )
}