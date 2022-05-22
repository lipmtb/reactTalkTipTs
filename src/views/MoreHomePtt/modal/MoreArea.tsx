
import React from "react";
import setClassName from "classnames";
interface AreaProps {
    visible: boolean;
    data?: string;
    closeModal?: () => void;
}
const MoreArea: React.FC<AreaProps> = props => {
    const { data = "福", visible, closeModal } = props;
    return (
        <div className={setClassName("more-popup-wrapper", visible ? "runIn" : undefined)} style={{ display: visible ? "block" : "none" }}>
            <div className="close-modal" onClick={closeModal || (() => { })}>
                <span>关闭</span>
            </div>
            <p className="center-text">{data}</p>
        </div>
    )
}



export default MoreArea;
