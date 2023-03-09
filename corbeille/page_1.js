export default function All_details(props){
    let data = props.donne
    return (
        <>
        <div id="all_details">
            <h2>{data.description}</h2>
            <div style={{
                display : 'flex',
                justifyContent : 'space-around',
            }}>
            <h2>{data.genre_1}</h2>
            <h2>{data.genre_2}</h2>
            <h2>{data.genre_3}</h2>
            <h2>{data.genre_4}</h2>
            </div>
            <h2>poste : Decembre 2022</h2>
        </div>
        </>
    )
}<end>