import React, { useState, useEffect, useRef } from "react";
export const useOnPageScroll = (cb: (top: number) => void) => {

    const refTop: React.MutableRefObject<number> = useRef<number>(0);
    const [currenTop, setCurrentTop] = useState<number>(0);
    useEffect(() => {
        refTop.current = currenTop;
        cb(refTop.current);

    }, [currenTop])
    const onscrollView = () => {
        // console.log("useCallbackuseCallback", currenTop);

        const appHeight = document.body.clientHeight || document.documentElement.clientHeight;
        if (window.scrollY + appHeight >= document.body.scrollHeight) {
            setCurrentTop(window.scrollY);


        }
    }



    useEffect(() => {

        window.addEventListener("scroll", onscrollView);
        return () => {
            window.removeEventListener("scroll", onscrollView);
        }
    }, [])

    return {
        currenTop,
        setCurrentTop
    }
}