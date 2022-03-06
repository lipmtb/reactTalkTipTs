
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
    title: string; address: string, point: Point
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

}


declare interface Window {
    BMapGL: {
        Map: { new(current: HTMLElement): BaiduMap };
        Point: { new(longitude: number, latitude: number): Point };
        Marker: { new(Point): Marker };
        LocalSearch: { new(map: BaiduMap, config: { onSearchComplete: (results: SearchResult) => void }): LocalSearch };
    },
    BMap: {
        LocalSearch: { new(map: BaiduMap, config: { onSearchComplete: () => void }): LocalSearch }
    },
    BMAP_STATUS_SUCCESS: string

}