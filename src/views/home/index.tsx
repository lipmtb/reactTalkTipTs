

// import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import React, { useState, useRef, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { MyStoreState } from "../../jjccredux/interface";
import { RouteComponentProps } from "react-router-dom";
import { HomeTop } from "../../component/home/HomeTop";
import { AccessoryUpload } from "../../component/home/imgprevdwn/AccessoryUpload";
import { SubmitButton, ForObject } from "../../component/home/SubmitButton/SubmitButton";
import TestArrSplice from "../../component/home/TestArrSplice";
import TestSubObj from "../../component/home/TestSubObj";
import AddObjProps from "../../component/home/AddObjProps";
import { useOnPageScroll } from "../../component/common/hooks/useOnPageScroll";
import "./home.less";
const AccessoryUploadMemo = memo(AccessoryUpload);
export const HomeContext = React.createContext({
    cbFn: (__: string) => {

    }
});
const HomePage: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const [selItem, setSelItem] = useState<string>("");
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
    return (
        <div id="home-page-wrapper">
            <h2 style={{ width: '40%', margin: "0 auto", textAlign: "center" }}>首页{selItem}</h2>
            <ul className="nav-lists">
                <li className="nav-item">
                    <a href="#userdetailpopup">用户详情20220101：弹窗，多层组件通信</a>
                </li>
                <li className="nav-item">
                    <a href="#downloaduploadaccessory">下载预览</a>
                </li>
                <li className="nav-item">
                    <a href="#test-subarr">useState arr splice</a>
                </li>
                <li className="nav-item">
                    <a href="#test-subObj">useState obj props change</a>
                </li>
                <li className="nav-item">
                    <a href="#submitform-bottom">提交</a>
                </li>
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
            <div id="submitform-bottom">
                <Button onClick={testRefObject}>change forwardRef</Button>
                <SubmitButton ref={subBtnRef} onConfirm={onPageSubmit} />
            </div>
            <p className="passage">passage1</p>
            <p className="passage">passage2</p>
            <p className="passage">passage3</p>
            <p className="passage">passage4</p>
            <p className="passage">passage5</p>
            <p className="passage">passage6</p>
            <p className="passage">passage7</p>
            <p className="passage">passage8</p>
            <p className="passage">passage9</p>
            <p className="passage">passage10</p>
            <p className="passage">passage11</p>
            <p className="passage">passage12</p>
            <p className="passage">passage13</p>
            <p className="passage">passage14</p>
            <p className="passage">passage15</p>
            <p className="passage">passage16</p>
            <p className="passage">passage17</p>
            <p className="passage">passage18</p>
            <p className="passage">passage19</p>
            <p className="passage">passage20</p>
            <p className="passage">passage21</p>
            <p className="passage">passage22</p>
            <p className="passage">passage23</p>
            <p className="passage">passage24</p>
            <p className="passage">passage25</p>
            <p className="passage">passage26</p>
            <p className="passage">passage27</p>
            <p className="passage">passage28</p>
            <p className="passage">passage29</p>
            <p className="passage">passage30</p>
            <p className="passage">passage31</p>
            <p className="passage">passage32</p>
            <p className="passage">passage33</p>
            <p className="passage">passage34</p>
            <p className="passage">passage35</p>
            <p className="passage">passage36</p>
            <p className="passage">passage37</p>
            <p className="passage">passage38</p>
            <p className="passage">passage39</p>
            <p className="passage">passage40</p>
            <p className="passage">passage41</p>
            <p className="passage">passage42</p>
            <p className="passage">passage43</p>
            <p className="passage">passage44</p>
            <p className="passage">passage45</p>
            <p className="passage">passage46</p>
            <p className="passage">passage47</p>
            <p className="passage">passage48</p>
            <p className="passage">passage49</p>
            <p className="passage">passage50</p>
        </div>
    )
}

export default HomePage;




