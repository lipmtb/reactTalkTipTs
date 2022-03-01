
import React, { useRef, useEffect, useState } from "react";

/// <reference path="./interface.d" />

const BaseMap01: React.FC<any> = props => {
    const base01Ref = useRef<HTMLDivElement | null>(null);
    const [baseMap, setBaseMap] = useState<BaiduMap | null>(null);
    const initMap = () => {
        console.log("initMap000000000", base01Ref.current, baseMap, window.BMapGL);
        if (base01Ref.current && window.BMapGL) {
            if (!baseMap) {
                setBaseMap(new window.BMapGL.Map(base01Ref.current))
            }
        }
    }
    useEffect(() => {
        initMap();
    }, [base01Ref.current, window.BMapGL])

    const testBmap = () => {
        console.log(window.BMapGL)
    }
    return <div className="base-map01-wrapper" ref={base01Ref}>
        <button onClick={testBmap}>大苏打似的</button>
    </div>
}
export { BaseMap01 };