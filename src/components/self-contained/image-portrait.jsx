export default function ImagePortrait (props){
     
    let style = props.style ? props.style : {
        width : '17vw',
        height : 'auto',
        minWidth : '200px',
    } ;
    let mediatype = 'image/webp' ;

    return (
        <picture>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={'https://buushido.ml'+props.src+'.webp'} type={mediatype} />
            <img style={style} src={'https://buushido.ml'+props.src} alt={props.alt} loading='lazy' />
        </picture>
    )
}