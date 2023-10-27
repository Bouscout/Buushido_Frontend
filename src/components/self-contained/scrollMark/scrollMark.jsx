import { useEffect, useState } from "react";
import ScrollDots from "./scollDots";
import { LeftButton, RightButton, ButtonPlaceholder } from "./scrollButtons"



export default function ScrollHandler(props){
    const [loaded, setLoaded] = useState(false)
    const [current, setCurrent] = useState(0)

    
    const divRef = props.divRef
    
    const numSection = props.numSection
    
    let active = 0

    let layout = Array(numSection).fill(0)
    layout[current] = 1

    useEffect(()=>{
        if(divRef.current){
            setLoaded(true)
            if (props.automaticScrolling){
                AutoScroll()
            }
        }
    }, [divRef])

    function AutoScroll(){
        const delay = 8000

        if (active >= numSection){
            active = 0
        }
        SpecialScroll(active)
        active += 1
        
        setTimeout(AutoScroll, delay)
    }

   



    function ScrollToElement(dir){
        if (divRef.current){
            const width = divRef.current.offsetWidth

            // handling animation delay
            if (props.delay){
                setTimeout(() => {
                    divRef.current.scrollLeft += width * dir
                }, props.delay);
                
            }else{
                divRef.current.scrollLeft += width * dir
            }
            
            let actual = current + dir
            if (actual < 0){
                actual = 0
            }else if (actual === numSection ){
                actual = numSection - 1
            }

            layout = Array(numSection).fill(0)
            layout[actual] = 1

            
            if (actual !== current){
                
                setCurrent(actual)
                console.log("the actual is : ", actual, current,layout)
            
                    // in case a function has to been called in the parent on scroll
                    if (props.specialFunc){
                        props.specialFunc()
                    }
                
            }

            }
    }

    function SpecialScroll(index){
        if (divRef.current){
            active = index

            const width = divRef.current.offsetWidth

            // handling animation delay
            if (props.delay){
                setTimeout(() => {
                    divRef.current.scrollLeft = width * index
                }, props.delay);
                
            }else{
                divRef.current.scrollLeft = width * index
            }

            layout = Array(numSection).fill(0)
            layout[index] = 1

            if (index !== current){
            
                    setCurrent(index)
            
                    // in case a function has to been called in the parent on scroll
                    if (props.specialFunc){
                        props.specialFunc()
                    }
                
            }
        }
    }


    return (
        <section style={{
            display : 'flex', justifyContent : 'space-between', width : '100%'
        }}> 
            {
                layout[0] !== 1 ?
                <LeftButton set={ScrollToElement}/> :
                <ButtonPlaceholder />
            }

            <ScrollDots layout={layout} scroller={SpecialScroll}/>

            {
                layout[layout.length - 1] !== 1 ?
                <RightButton set={ScrollToElement}/> :
                <ButtonPlaceholder />
            }


        </section>
    )
}