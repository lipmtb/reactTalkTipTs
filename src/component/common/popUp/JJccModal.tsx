import React from "react";
import { useRef } from "react";
import { AttrRefBtn } from "./CommonUserPopUp";
import "./less/modal.less";
interface modalProps {
    title: string;
    cancelCb: () => void;
    childCpn: React.ComponentType<{ [props: string]: unknown }>,
    onChangeModalVal?: (val: string) => void
}
//弹出遮罩层
export default function JJccModal(props: modalProps) {
    const ChildCpn = props.childCpn;
    const refSubBtn: React.RefObject<AttrRefBtn> = useRef<AttrRefBtn>(null);
    const runChildBtn = () => {
        if (refSubBtn && refSubBtn.current) {
            console.log(refSubBtn.current);
            refSubBtn.current.submitAllData();
        }
    }
    return (
        <div className="pop-up-modal">
            <button onClick={runChildBtn}>执行子组件的方法</button>
            <div className="modal-content">
                <h1 className="modal-title">{props.title}</h1>
                <div className="slot-main-content">
                    <ChildCpn {...props} ref={refSubBtn} />
                </div>
            </div>

        </div>
    )
}
