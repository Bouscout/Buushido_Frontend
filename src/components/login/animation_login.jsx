import { Nuage_1, Nuage_2, Nuage_3, Nuage_4, Nuage_5 } from "../accueil/decorations/decor";
import './anim.css'
export default function Anim_login(){
    return (
        <>
        <Nuage_1 style={{top : '5%', zIndex : '5',}}/>
        <Nuage_2 style={{
            top : '5%',
            zIndex : '5', left : '110%' ,
            }}/>
        <Nuage_3 style={{
            top : '5%',  zIndex : '5', left: '110%',
        }} />
        <Nuage_4 style={{
            top : '5%', left : '110%', zIndex : '5',
        }} />
        <Nuage_5 style={{
            top : '15%', left : '110%', zIndex : '5',
        }} />
        </>
    )
}