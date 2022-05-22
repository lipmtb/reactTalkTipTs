
declare class LocalSearch {
    getResults: any;
    search: (string) => void;
    getStatus: () => string;
}

declare class Point {

    constructor(longitude: number, latitude: number) {

    }

}

declare class Marker {

}

declare type ResultItem = {
    "title": string;
    "uid": string;
    "point": Point;
    "url": string;
    "detailUrl": string;
    "address": string;
    "city": string;
    "province": string;
    "type": number;
    "isAccurate": boolean;
}
declare type SearchResult = {
    getCurrentNumPois: Function;
    getPoi(i: number): ResultItem,

}
declare class BaiduMap {

    constructor(current: HTMLElement) {
        this.current = current;
    }
    centerAndZoom(point: Point, num: number) {

    }
    enableScrollWheelZoom(isZoom: boolean) {

    }
    getZoom() {
        return 12;
    }
    setZoom(zoom: number) {

    }
    zoomIn() {

    }

    zoomOut() {

    }

    setCenter(newPoint: Point) {

    }
    getCenter() {

    }
    clearOverlays() {

    }
    Marker() {

    }
    addOverlay(mark: Marker) { };
    openInfoWindow(winArgs: InfoWindow, pt: Point) { }

}

declare type WindOpts = {
    width: number;
    height: number;    // 信息窗口高度
    title: string; // 信息窗口标题
    message: string;
}


declare class InfoWindow {
    constructor(name: string, opts: WindOpts) {

    }
}


declare class DrivingRoute {
    constructor(map: BaiduMap, opts: { renderOptions: { map: BaiduMap, autoViewport: boolean } }) {

    }
    search(p1:Point,p2:Point){

    }
}
declare interface Window {
    BMapGL: {
        Map: { new(current: HTMLElement): BaiduMap };
        Point: { new(longitude: number, latitude: number): Point };
        Marker: { new(Point): Marker };
        LocalSearch: { new(map: BaiduMap, config: { onSearchComplete: (results: SearchResult) => void }): LocalSearch };
        InfoWindow: { new(title: string, opts: WindOpts): InfoWindow };  // 创建信息窗口对象 
        DrivingRoute: { new(map: BaiduMap, opts: { renderOptions: { map: BaiduMap, autoViewport: boolean } }): DrivingRoute };
    },
    BMap: {
        LocalSearch: { new(map: BaiduMap, config: { onSearchComplete: () => void }): LocalSearch }
    },
    BMAP_STATUS_SUCCESS: string

}