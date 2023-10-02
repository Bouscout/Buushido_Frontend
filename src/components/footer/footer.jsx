
export default function Footer(){
    return (
        <section id="stars">
            <div id='main'></div>
            <div><a href='/see_all'>
                <h1 style={{textAlign: 'center'}}><i className="fa-solid fa-table-list"></i>  Jetez un coup d'oeil a tout le catalogue</h1></a></div>
            <section id='contacts'>
                <div className='compact' >
                    <h2>Vous voulez nous soutenir ?</h2>
                    <div>
                    <a href="https://discord.gg/F5gpNtGD"><h3>Rejoindre le discord</h3></a>
                    <a href="mailto:nianime090@gmail.com"><h3>Faire un don Paypal</h3></a>
                    </div>
                </div>
                    <div>
                <div className='compact' >
                    <h2>Partager</h2>
                    <div>
                  <a onClick={()=>{
                                    navigator.share({
                                        title : data.name ,
                                        url : 'https://t.me/buushidoadmin',
                                    })} }><h3>Telegram</h3></a> 
                    <a  onClick={()=>{
                                    navigator.share({
                                        title : data.name ,
                                        url : 'https://buushido.ml',
                                    })} }><h3>Whatsapp</h3></a>
                    </div>
                    </div>
                </div>
                    <div>
                <div className='compact'>
                    <h2>Signaler un bug </h2>
                    <a href="mailto:buushidobug1@gmail.com"><h3>Envoyer un mail</h3></a>
                    <a href="mailto:buushidobug1@gmail.com"><h3>Urgent !!</h3></a>
                    </div>
                </div>
                    <div>
                    <h2>Vous pensez pouvoir nous aider ?</h2>
                <div className='compact'>
                    <a href="mailto:buushidobug1@gmail.com" ><h3>Contactez nous ici...</h3></a>
                    </div>
                </div>
            </section>
        </section>
    )
}