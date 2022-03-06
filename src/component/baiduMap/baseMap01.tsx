
import React, { useRef, useEffect, useState } from "react";
import SearchItem from "./search/Search";
import "./baidumap.less";

const MAP_POINT = {
    longitude: 116.404,
    latidute: 39.915
}
const BaseMap01: React.FC<any> = props => {
    const base01Ref = useRef<HTMLDivElement | null>(null);
    const [baseMap, setBaseMap] = useState<BaiduMap | null>(null);
    // const [bMap, setBMap] = useState<BaiduMap | null>(null);
    const [startAddrText, setStartAddrText] = useState<string>("");
    const [endAddrText, setEndAddrText] = useState<string>("");

    // 初始化BMapGL实例
    const initMap = () => {

        if (base01Ref.current && window.BMapGL) {
            if (!baseMap) {
                setBaseMap(new window.BMapGL.Map(base01Ref.current))

            }

        }
    }

    //设置地图实例
    useEffect(() => {
        initMap();
    }, [base01Ref.current, window.BMapGL])


    // 设置中心位置
    useEffect(() => {
        if (baseMap) {
            console.log("baseMapbaseMap", baseMap)
            // baseMap.centerAndZoom(new window.BMapGL.Point(MAP_POINT.longitude, MAP_POINT.latidute), 12); // 初始化地图,设置中心点坐标和地图级别
            baseMap.centerAndZoom('广州市', 12); // 初始化地图,设置中心点坐标和地图级别
            baseMap.enableScrollWheelZoom(true);//滚轮滚动改变zoom,setZoom功能
        }
    }, [baseMap])

    //输入起点和终点
    const onTextChange = (text: string = "startText") => {
        return (newText: string) => {
            if (text === "startText") {
                setStartAddrText(newText)
            } else {
                setEndAddrText(newText);
            }
        }
    }
    return <div className="map-wrapper">
        <div className="search-point-top">
            <p>起点：{startAddrText},终点：{endAddrText}</p>
            <SearchItem text="请输入起点" confirmFinalChange={onTextChange("startText")} key="start-in-search" map={baseMap}></SearchItem>
            <SearchItem text="请输入终点" confirmFinalChange={onTextChange("endText")} key="start-end-search" map={baseMap}></SearchItem>

        </div>
        <div className="base-map01-wrapper" ref={base01Ref} >

        </div>


    </div>
}
export { BaseMap01 };