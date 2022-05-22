
import React, { useRef, useEffect, useState } from "react";
import { Modal } from "antd";
import SearchItem from "./search/Search";

import "./baidumap.less";

const MAP_POINT = {
    longitude: 116.404,
    latidute: 39.915
}
const CityDict = {
    ["4401"]: "广州市",
    ["4402"]: "北京市",
    ["4403"]: "珠海市",
    ["4404"]: "长沙市",
    ["4405"]: "北海市"
}

interface Tprops {
    initMapId: keyof typeof CityDict | string;
}
const BaseMap01: React.FC<Tprops> = props => {
    const { initMapId } = props;
    const base01Ref = useRef<HTMLDivElement | null>(null);
    const [baseMap, setBaseMap] = useState<BaiduMap | null>(null);
    // const [bMap, setBMap] = useState<BaiduMap | null>(null);
    const [startAddrText, setStartAddrText] = useState<string>("");
    const [endAddrText, setEndAddrText] = useState<string>("");
    const startPoint = useRef<Point | null>(null)
    const endPoint = useRef<Point | null>(null)
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
        if (baseMap && initMapId) {
            console.log("baseMapbaseMap", initMapId, baseMap);

            // baseMap.centerAndZoom(new window.BMapGL.Point(MAP_POINT.longitude, MAP_POINT.latidute), 12); // 初始化地图,设置中心点坐标和地图级别

            baseMap.centerAndZoom(CityDict[initMapId as keyof typeof CityDict], 12); // 初始化地图,设置中心点坐标和地图级别
            baseMap.enableScrollWheelZoom(true);//滚轮滚动改变zoom,setZoom功能
        }
    }, [baseMap, initMapId])

    //输入起点和终点
    const onTextChange = (text: string = "startText") => {
        return (newText: string) => {
            console.log("safafa", text, newText);
            if (text === "startText") {
                setStartAddrText(newText);
            } else {
                setEndAddrText(newText);
            }
        }
    }

    /** 计算路线 */
    const calcCarRoute = () => {
        if (!startPoint.current || !startAddrText) {
            Modal.error({
                title: "错误",
                content: "请先输入开始地址"
            });
            return;
        }
        if (!endPoint.current || !endAddrText) {
            Modal.error({
                title: "错误",
                content: "请先输入结束地址"
            });
            return;
        }
        if (!baseMap) {
            console.log("地图未初始化", baseMap)
            return;
        }
        const drivingRouter = new window.BMapGL.DrivingRoute(baseMap, {
            renderOptions: {
                map: baseMap,
                autoViewport: true
            }
        })
        startPoint.current && endPoint.current && drivingRouter.search(startPoint.current, endPoint.current)
        console.log("发发发", startPoint.current, endPoint.current);
    }
    /** 保存起始点 */
    const confirmPoint = (tag: string) => {
        return (p: Point) => {
            if (tag === "start") {
                startPoint.current = p;
            } else if (tag === "end") {
                endPoint.current = p;
            }
        }
    }
    return <div className="map-wrapper">
        <div className="search-point-top">
            <p>起点：{startAddrText},终点：{endAddrText}</p>
            <SearchItem text="请输入起点" confirmFinalChange={onTextChange("startText")} key="start-in-search" map={baseMap} confirmPoint={confirmPoint("start")}></SearchItem>
            <SearchItem text="请输入终点" confirmFinalChange={onTextChange("endText")} key="start-end-search" map={baseMap} confirmPoint={confirmPoint("end")}></SearchItem>
            <button onClick={calcCarRoute}>根据起点和终点经纬度驾车导航路线</button>

        </div>
        <div className="base-map01-wrapper" ref={base01Ref} >

        </div>


    </div>
}
export { BaseMap01 };