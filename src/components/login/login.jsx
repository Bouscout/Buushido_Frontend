import { useState } from 'react'
// import './login.css'
export default function Formulaire(){
    
    return (
        <>
        <Login />
        </>
    )
}
function Login(){
    const [name, setName] = useState('')
    const [psw, setPsw] = useState('')
    const [err, setErr] = useState('') 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username : name, password1 : psw, password2 : 'maison', })
    };
    function envoyer(evt){
        evt.preventDefault()
        fetch('http://10.0.0.89:8000/api/signup/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('les donnes recu sont : ', Object.values(data)[0]) ;
                setErr(Object.values(data[0][0]))
            });
    }
    function upd_nom(update){
        setName(update)
    }
    function upd_psw(update){
        setPsw(update)
    }
    return (
        <>
        <div id="decoration"></div>
        <section id='formulaire'>
            <h4>Nouveau compte ?</h4>
            <h3 style={{color : 'red'}}>{err}</h3>
            <h1>Connexion</h1>
            <form>
                <Username up={upd_nom} />
                <Password msg={'Mot de passe'} up={upd_psw} />
                <input id='confirme' type='submit' onClick={(event)=>{envoyer(event)}} value='confirmer'/>
                <a><h3 style={{textAlign:'center'}}>mot de passe oublie ?</h3></a>
            </form>
        </section>
        </>
    )
}


function Username(props){
    const [nom, setName] = useState('')
    let label_style = null
    if (nom != ''){
        label_style = {
            top : '-30px',
            left : '0',
            fontSize : '14px',
        }
    }
    function naming(typing){
        setName(typing.target.value)
        props.up(typing.target.value)
    }
    return (
        <div id='username'>
            {/* <input type='text' placeholder='Username'></input> */}
            <input type='text' name='username' value={nom} onChange={(event)=>{naming(event)}}></input>
            <label style={label_style}>Username</label>
            <h3>{nom}</h3>
        </div>
    )
}

function Password(props){
    function updating(evt){
        props.up(evt.target.value)
    }
    return (
        <div id="password">
            <input name='password' onChange={(event)=>{updating(event)}} type='password'></input>
            <label>{props.msg}</label>
        </div>
    )
}

// Your password must contain at least 8 characters.
// Your password can’t be a commonly used password.
// Your password can’t be entirely numeric.
// Your password can’t be too similar to your other personal information.
function Sign_up(){
    
    return (
        <>
        <div id="decoration"></div>
        <section id='inscription'>
            <h1>Inscription</h1>
            <Username />
            <div>
            <h2>Votre mot de passe doit contenir au moins 8 caracteres</h2>
            <h2>Votre mot de passe ne doit pas etre trop similaire a vos autres infos</h2>
            <h2>Veuiilez ne pas choisir un mot de passe trop commun</h2>
            <h2>Votre mot de passe ne peut pas etre constitue que de numero</h2>
            </div>
            <Password msg={'Mot de passe'} />
            <Password msg={'Confirmer Mot de passe'} />
            <input id='confirme' type='submit' value='confirmer' style={{
                fontSize : '16px',
                width : '35%' ,
            }}/>
        </section>
            </>
    )
}