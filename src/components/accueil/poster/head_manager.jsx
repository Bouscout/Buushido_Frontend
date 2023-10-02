// choose which type of poster to display depending on the user window width

import { useEffect, useState, useCallback } from "react";
import TopHead from "./head";
import Head_Mobile from "./poster_mobile/head_mobile";

export default function HeadManager(){
    // rendering conditions
    const divider = 700
    const [isMobile, setIsMobile] = useState(window.innerWidth < divider)
   
    // handling changes
    const handleWindowResize = useCallback(event => {
        setIsMobile(window.innerWidth < divider);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);


    if (isMobile){
        return <Head_Mobile />
    }
    else {
        return <TopHead />
    }
    

}