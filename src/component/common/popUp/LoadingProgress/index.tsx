import { useEffect, useState } from "react";
import { Button } from "antd";
import "./loadingProgress.less";

interface LoadingProps {
    children: React.ReactNode,
    loadingState: number,
    setCurrentUploading: (configId: string) => void;//设置正在上传的附件类型
}
//进度条组件
export default function LoadingProgress(props: LoadingProps) {
    const { children, loadingState, setCurrentUploading } = props;
    const [curWidth, setCurWidth] = useState(0);
    const [confirmBtn, showConfirmBtn] = useState(false);
    useEffect(() => {

        let tmp: null | number = null;
        let curwd: number = curWidth;
        requestAnimationFrame(function frame(stamp) {
            if (!tmp) {
                tmp = stamp;
            }
            if (stamp - tmp > 200) {
                tmp = stamp;
                console.log("闭包****", curWidth);
                setCurWidth(curWidth => {
                    curwd = curWidth + 5;
                    if (curwd > loadingState) {
                        curwd = loadingState;
                    }
                    return curwd;
                });
            }
            if (curwd < loadingState) {
                requestAnimationFrame(frame);
            } else {
                //进度条完成
                if (loadingState === 100) {
                    showConfirmBtn(true);
                }
            }
        })
    }, [loadingState])

    const clearProgress = () => {
        setCurWidth(0);
        setCurrentUploading("");
    }
    return <div className="loading-progress-banner">
        <span className="title-text">{children}:{curWidth}%</span>

        <div className="bottom-line">
            <span className="codetext" style={{ width: curWidth + "%" }}> o&#x25ac;&#x25ac;&#x25d9;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x2596;&#x25e4;</span>
            {confirmBtn && <Button className="btn-mid" size="small" onClick={clearProgress}>确定</Button>}
        </div>
    </div>;

}
