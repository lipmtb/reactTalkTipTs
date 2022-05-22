

// import React, { useContext, useEffect, useState } from "react";
import React, { useState, useRef, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, NavLink, Route } from "react-router-dom";
import { MyStoreState } from "../../jjccredux/interface";
import { HomeTop } from "../../component/home/HomeTop";
import { AccessoryUpload } from "../../component/home/imgprevdwn/AccessoryUpload";
import { SubmitButton, ForObject } from "../../component/home/SubmitButton/SubmitButton";
import TestArrSplice from "../../component/home/TestArrSplice";
import TestSubObj from "../../component/home/TestSubObj";
import AddObjProps from "../../component/home/AddObjProps";
import { useOnPageScroll } from "../../component/common/hooks/useOnPageScroll";
import HomeInfoPopUp from "./HomeInfoPop";
import "./home.less";
const AccessoryUploadMemo = memo(AccessoryUpload);
export const HomeContext = React.createContext({
    cbFn: (__: string) => {

    }
});
const HomePage: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const [selItem, setSelItem] = useState<string>("");
    const [homeInfo, setHomeInfo] = useState<{ name: string; age: number } | null>(null);
    const userinfo = useSelector((state: MyStoreState) => state.user);

    const reportReachBottom = (top: number) => {
        // console.log("reportReachBottom", top)
    }
    const { currenTop } = useOnPageScroll(reportReachBottom);
    // console.log("----------HomePage render-----------------", currenTop);

    const subBtnRef: React.MutableRefObject<ForObject | null> = useRef<ForObject>(null);

    const onPageSubmit = () => {
        console.log("提交");
    }
    const onChangePropsVal = (val: string) => {
        setSelItem(val);
    }

    const testRefObject = () => {
        if (subBtnRef) {
            subBtnRef.current?.changeSubtn();
        } else {
            console.log("subBtnRef is null");
        }
    }

    const uploadSubmit = useCallback(() => {
        console.log("uploadsubmit6666666666666666************************");
    }, [])

    // 跳转到地图
    const toBaiduMap = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.history.push("/map/4401", {
            pathname: "/map",
            prevPathname: "/home",
            state: {
                jjcc: "fefefegesfse66",
                messagetext: "打发法啊说法"
            }
        })
    }
    const toHomeInfoHandle = () => {
        setHomeInfo({
            name: "1111",
            age: 22
        })
        console.log("homeInfo0000000")
        props.history.push("/home/homeInfo")
    }

    console.log("homeReneder0000000*****************")
    return (
        <div id="home-page-wrapper">
            <h2 style={{ width: '40%', margin: "0 auto", textAlign: "center" }}>首页{selItem}</h2>
            <ul className="nav-lists">
                <li className="nav-item">
                    {/* <NavLink to="/map">地图</NavLink> */}
                    <a onClick={toBaiduMap}>地图</a>
                </li>

                <li className="nav-item">
                    <NavLink to="/loadingGame">跳动的盒子</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/loadingArea">loadingArea</NavLink>
                </li>

                <li className="nav-item">
                    <a href="#userdetailpopup">用户详情20220101：弹窗，多层组件通信</a>
                </li>
                <li className="nav-item">
                    <a href="#downloaduploadaccessory">下载预览</a>
                </li>
                <li className="nav-item">
                <NavLink to="/pttMore">ppt</NavLink>
                </li>

                <li className="nav-item">
                    <a href="#test-subarr">useState arr splice</a>
                </li>
                <li className="nav-item">
                    <a href="#test-subObj">useState obj props change</a>
                </li>
                {/* <li className="nav-item">
                    <a href="#submitform-bottom">提交</a>
                </li> */}
            </ul>
            {/* 用户详情20220101：弹窗，多层组件通信 */}
            <div id="userdetailpopup">
                <HomeContext.Provider value={{ cbFn: onChangePropsVal }}>

                    <HomeTop onChageVal={onChangePropsVal} />

                </HomeContext.Provider>
            </div>

            <hr />
            {/* 附件上传和下载预览 */}
            <div id="downloaduploadaccessory">
                <AccessoryUploadMemo userInfo={userinfo} uploadSubmit={uploadSubmit} />

            </div>

            {/* useState arr splice */}
            <div id="test-subarr">
                {/* <TestArrSplice arr={[1,2,3,4,5,6]}></TestArrSplice> */}
            </div>


            {/* useState obj props change :TestSubObj减少属性，AddObjProps添加属性*/}
            <div id="test-subObj">
                {/* <TestSubObj subObj={{a:1,b:2,c:3}}></TestSubObj> */}
                {/* <AddObjProps subObj={{ a: 97, b: 98, c: 99 }}></AddObjProps> */}
            </div>

            {/* 提交 */}
            {/* <div id="submitform-bottom">
                <Button onClick={testRefObject}>change forwardRef</Button>
                <SubmitButton ref={subBtnRef} onConfirm={onPageSubmit} />
            </div> */}

            {/* 路由 */}
            {/* <div className="router-talk-tip">
                <NavLink to="/talk" key="talkpage">talk</NavLink>
                <NavLink to="/tip" key="tippage">tip</NavLink>
            </div> */}

            <div className="to-sub-home">
                {/* <NavLink to="/home/homeInfo"></NavLink> */}
                <button onClick={toHomeInfoHandle}>toHomeInfo</button>
            </div>

            <Route exact={true} path="/home/homeInfo" render={(props) => {
                return <HomeInfoPopUp {...props} homeInfo={homeInfo} onClose={() => {
                    props.history.goBack();
                }} />
            }} />
        </div>
    )
}

export default HomePage;




