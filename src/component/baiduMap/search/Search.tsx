import React, { useCallback, useEffect, useState } from 'react';
import fandou from "../../common/util/fandou";
import "./searchstyle.less";

type TSearch = {
    text: string;
    confirmFinalChange: (text: string) => void;
    map: BaiduMap | null,
    confirmPoint: (p: Point) => void;
}

const Search: React.FC<TSearch> = props => {
    const { text, confirmFinalChange, map, confirmPoint } = props;
    const [localSearch, setLocalSearch] = useState<LocalSearch | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [reativeAddrLists, setRelativeAddrLists] = useState<ResultItem[]>([]);
    // const [chooseAddrName, setChooseAddrName] = useState<ResultItem[]>([]);
    //输入起点和终点
    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("localSearchlocalSearchlocalSearchlocalSearch", localSearch, map)
        confirmFinalChange(e.target.value || "");
        e.target.value && localSearch?.search(e.target.value || "");
    };

    const confirmHandle = useCallback(fandou(onInput, 2000), [localSearch, map]);



    // 显示搜索结果列表
    const completeSearch = useCallback(() => {
        let pp = localSearch?.getResults()?.getPoi(0)?.point;
        if (pp) {

            console.log("search complete0000", searchResults);
            if (localSearch?.getStatus() == window.BMAP_STATUS_SUCCESS) {
                let s: ResultItem[] = [];
                for (let i = 0; i < searchResults?.getCurrentNumPois(); i++) {
                    s.push(searchResults?.getPoi(i) as ResultItem);
                }

                setRelativeAddrLists(s);
                console.log("sssssss", s, localSearch?.getResults(), searchResults, searchResults === localSearch?.getResults());

            }
        } else {
            console.log("未查询到数据")
        }

    }, [localSearch, map, searchResults])

    useEffect(() => {
        if (searchResults) {
            completeSearch();
        }
    }, [searchResults])

    useEffect(() => {
        if (map && !localSearch) {
            // console.log("setLocalSearchsetLocalSearchsetLocalSearch", map);

            setLocalSearch(new window.BMapGL.LocalSearch(map as BaiduMap, {
                onSearchComplete: (results: SearchResult) => {
                    setSearchResults(results)//解决completeSearch 一直localSearch=null闭包问题
                }
            }))
        }

    }, [map])

    // 选择某个搜索结果地址
    const pointAddrItem = (item: ResultItem) => {
        const { point, title, address } = item;
        return () => {
            // map?.clearOverlays();
            confirmPoint(point);
            confirmFinalChange(title);
            map?.addOverlay(new window.BMapGL.Marker(point));
            const infoWindow = new window.BMapGL!.InfoWindow(address || "详细地址", {
                width: 100,
                height: 40,
                title: title,
                message: address + "的撒法发方法"
            });
            map?.openInfoWindow(infoWindow, point);
            console.log("point result", point);
            setRelativeAddrLists([]);
        }
    }
    return (
        <div className="search-wrapper">
            <input className="input-addr-text" type="text" placeholder={text} onChange={confirmHandle} />
            <ul className="relative-lists">
                {
                    reativeAddrLists.map((item: ResultItem) => {
                        return <li className='addr-item' key={item.uid} onClick={pointAddrItem(item)}>{item.title}</li>
                    })
                }
            </ul>
        </div>
    )
}


export default Search;
