

declare class BaiduMap {

    constructor(current: HTMLElement) {
        this.current = current;
    }

}

declare interface Window {
    BMapGL: {
        Map: { new(current: HTMLElement): BaiduMap }
    }
}