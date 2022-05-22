
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import MoreArea from "./modal/MoreArea";
import "./index.less";

const MoreHomePtt: React.FC<RouteComponentProps> = props => {
    console.log("talk props111111", props);
    const [modalVisible, setModalVisible] = useState(false);
    const [curText, setText] = useState("");

    const closeModal = () => {
        setModalVisible(false);
        setText("")
    }
    return (
        <div className="more-home-ppt">
            <div className="list-header">
                <p className="more-header">大</p>
                <span className="more-ppt-text" onClick={(e: React.MouseEvent) => {
                    setModalVisible(true)
                    setText(e.currentTarget?.previousElementSibling?.textContent || "666")
                }}>查看更多</span>
            </div>
            <div className="list-header">
                <p className="more-header">小</p>
                <span className="more-ppt-text" onClick={(e: React.MouseEvent) => {
                    setModalVisible(true)
                    setText(e.currentTarget?.previousElementSibling?.textContent || "666")
                }}>查看更多</span>
            </div>
            <div className="list-header">
                <p className="more-header">无</p>
                <span className="more-ppt-text" onClick={(e: React.MouseEvent) => {
                    setModalVisible(true)
                    setText(e.currentTarget?.previousElementSibling?.textContent || "666")
                }}>查看更多</span>
            </div>
            <div className="list-header">
                <p className="more-header">说</p>
                <span className="more-ppt-text" onClick={(e: React.MouseEvent) => {
                    setModalVisible(true)
                    setText(e.currentTarget?.previousElementSibling?.textContent || "666")
                }}>查看更多</span>
            </div>

            <MoreArea visible={modalVisible} data={curText} closeModal={closeModal} />
        </div>
    )
}



export default MoreHomePtt;
