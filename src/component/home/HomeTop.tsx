
import React, { useState } from "react";
import CommonUserPopUp from "../common/popUp/CommonUserPopUp";
import JJccModal from "../common/popUp/JJccModal";
import "./homeTop.less";
interface HomeTopProps {
    onChageVal?: (val: string) => void;
}
const HomeTop: React.FC<HomeTopProps> = (props: HomeTopProps) => {
    const [showUserPopup, setShowUserPopup] = useState<Boolean>(false);
    const closeModal = () => {
        setShowUserPopup(false);
    }
    return (
        <div className="home-top-user">


            <div onClick={() => setShowUserPopup(true)}>
                用户详情&gt;&gt;
            </div>
            {/* 方式一：通过props传递 */}
            {/* {showUserPopup && <JJccModal cancelCb={closeModal} title="用户详情" onChangeModalVal={props.onChageVal}
                childCpn={CommonUserPopUp as unknown as React.ComponentType<{ [props: string]: unknown }>}></JJccModal>} */}
            {/* 方式二：通过context传递 */}
            {showUserPopup && <JJccModal cancelCb={closeModal} title="用户详情"
                childCpn={CommonUserPopUp as unknown as React.ComponentType<{ [props: string]: unknown }>}></JJccModal>}
        </div>
    )
}
export { HomeTop }