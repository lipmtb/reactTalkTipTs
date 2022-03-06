import React, { useCallback, useEffect, useState } from 'react';
import fandou from "../../common/util/fandou";
import "./searchstyle.less";

type TSearch = {
    text: string;
    confirmFinalChange: (text: string) => void;
    map: BaiduMap | null
}
const Search: React.FC<TSearch> = props => {
    const { text, confirmFinalChange, map } = props;
    const [localSearch, setLocalSearch] = useState<LocalSearch | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [reativeAddrLists, setRelativeAddrLists] = useState<ResultItem[]>([]);
    //输入起点和终点
    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("localSearchlocalSearchlocalSearchlocalSearch", localSearch, map)
        confirmFinalChange(e.target.value || "");
        localSearch?.search(e.target.value || "");
    };

    const confirmHandle = useCallback(fandou(onInput, 2000), [localSearch, map]);



    //搜索
    const completeSearch = useCallback(() => {
        map?.clearOverlays();
        let pp = localSearch?.getResults().getPoi(0).point;
        map?.addOverlay(new window.BMapGL.Marker(pp));
        console.log("search complete0000", searchResults);
        if (localSearch?.getStatus() == window.BMAP_STATUS_SUCCESS) {
            let s: ResultItem[] = [];
            for (let i = 0; i < searchResults?.getCurrentNumPois(); i++) {
                s.push(searchResults?.getPoi(i) as ResultItem);
            }
            setRelativeAddrLists(s);
            // console.log("sssssss", s, localSearch?.getResults(), searchResults, searchResults === localSearch?.getResults());

        }
    }, [localSearch, map, searchResults])

    useEffect(() => {
        if (localSearch && searchResults) {
            completeSearch();
        }
    }, [searchResults])

    useEffect(() => {
        if (props.map && !localSearch) {
            console.log("setLocalSearchsetLocalSearchsetLocalSearch", map);

            setLocalSearch(new window.BMapGL.LocalSearch(map as BaiduMap, {
                onSearchComplete: (results: SearchResult) => {
                    setSearchResults(results)//解决completeSearch 一直localSearch=null闭包问题
                }
            }))
        }

    }, [props.map])


    return (
        <div className="search-wrapper">
            <input type="text" placeholder={text} onChange={confirmHandle} />
            <ul className="relative-lists">
                {
                    reativeAddrLists.map((item: any) => {
                        return <li className='addr-item' key={item.point}>{item.title}</li>
                    })
                }
            </ul>
        </div>
    )
}


export default Search;
