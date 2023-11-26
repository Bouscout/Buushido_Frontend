// Basic image card component

const BASE_URL = "https://buushido.com"
export const ImagePortrait = ({
    src,
    alt,
    style,
    load,
    direct=false,
}) =>{
     
    style = style ? style : {
        width : '17vw',
        aspectRatio : '10 / 16',
        minWidth : '200px',
    } ;
    let mediatype = 'image/webp' ;

    let webp_src, normal_src

    // choosing the url links
    if (direct){
        webp_src = src
        normal_src = src
    } else {
        webp_src = `${BASE_URL}/static/media`+src+'.webp'
        normal_src = `${BASE_URL}/static/media`+src
    }

    return (
        <picture>
            {/* <source srcSet={'http://127.0.0.1:8000/'+src+'.webp'} type={mediatype} /> */}
            <source srcSet={webp_src} type={mediatype} />
            <img style={style} src={normal_src} alt={alt} loading={load ? 'eager' : 'lazy' } />
        </picture>
    )
}