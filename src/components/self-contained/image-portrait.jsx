// Basic image card component

const BASE_URL = "https://buushido.com"
export const ImagePortrait = ({
    src,
    alt,
    style,
    load,
}) =>{
     
    style = style ? style : {
        width : '17vw',
        aspectRatio : '10 / 16',
        minWidth : '200px',
    } ;
    let mediatype = 'image/webp' ;

    return (
        <picture>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={`${BASE_URL}/static/media`+src+'.webp'} type={mediatype} />
            <img style={style} src={`${BASE_URL}/static/media`+src} alt={alt} loading={load ? 'eager' : 'lazy' } />
        </picture>
    )
}