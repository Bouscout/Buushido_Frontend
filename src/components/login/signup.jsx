import { useState } from 'react'
// import './signup.css'
const BASE_URL = "https://buushido.com"

export default function Sign_up(props){
    const [user, setUser] = useState('')
    const [psw1, setPsw1] = useState('')
    const [psw2, setPsw2] = useState('')
    const [erreur, setErreur] = useState('')
    
    function inscrire(evt){
        evt.preventDefault()
        if (psw1.localeCompare(psw2) != 0){
            setErreur('Les mots de passe sont differents')
            return
        }
            const requestOptions = {
                method : 'POST',
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify({username : user , password : psw2})
            }

            fetch(`${BASE_URL}/api/signup/`, requestOptions)
            .then(response => {
                console.log(response.status)
                return  response.json()
            })
            .then(data => {
                const {username} = data
                if (username == user){
                    // function to go to home page and set token
                    fetch(`${BASE_URL}/api/token/`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        // console.log('les donnes recu sont : ', data) ;
                        const {access, refresh} = data
                        if (access){
                            console.log('token', access)
                            console.log('token', refresh)
                             // actual time
                            const now = new Date()
                            const day = now.getDate()
                            const hour = now.getHours()
                            const lastTime = [day, hour]
                            const tokens = [access, refresh, lastTime]
                            sessionStorage.setItem('tokens', JSON.stringify(tokens))
                            window.location.href = '/'
                        }
                    })

                
                }else {
                    setErreur(Object.values(data)[0])
                    // console.log('les donnes sont : ', Object.values(data)[0])
                }
            }),
            (error) =>{
                console.log('errors : ', error)
            }
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
                    // translate : '-50% 0',
                }}>Inscription</h1>
                <h1 style={{
                    position : 'absolute',
                    top : '0',
                    right : '10px' ,
                    opacity : '0.4',
                    // translate : '-50% 0',
                }} onClick={()=>{props.reset(true)}}>Connexion</h1>
            {erreur != '' ? 
            <Erreur err={erreur}/>:null
            }
            <Social_log />
            <Username up={setUser} />
            <Password up={setPsw1} />
            <Password up={setPsw2} msg={true} />
            <button onClick={e=>{inscrire(e)}}><h1>Confirmer</h1></button>
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

export function Social_log(){
    return (
        <>
        <div style={{
            display : 'flex' , 
            flexWrap : 'nowrap',
            width : '80%',
            margin : '0 auto',
            justifyContent : 'space-evenly' ,
        }}>
            <h3 onClick={()=>{alert('Desole cette function sera disponible plus tard')}} className='social'><i className="fa-brands fa-google"></i></h3>
            <h3 onClick={()=>{alert('Desole cette function sera disponible plus tard')}} className='social'><i className="fa-brands fa-discord"></i></h3>
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