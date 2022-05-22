import {useRef,useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
import "./loadingGameStyle.less";

const LoadingGamePage: React.FC<RouteComponentProps<{}>> = props => {
    console.log("LoadingGameCpnLoadingGameCpn******", props);
    const eyeBallRef1=useRef<HTMLDivElement|null>(null);
    useEffect(()=>{
        if(eyeBallRef1.current){
            let tmpDeg=0;
            const currenteEyes=eyeBallRef1.current;
            requestAnimationFrame(function frame(){
                currenteEyes.style.transform=`rotate(${tmpDeg++}deg)`
                // requestAnimationFrame(frame);
            })
        }
    },[eyeBallRef1.current])
    return <div className="loading-game-container">
        <div className="main-content">
            
            <div className="main-text">
                <h1>having a game</h1>
                <h4>who in light ?</h4>
            </div>

            <div className="main-monster">
                <div className="eye">
                    <div className="eyeball" ref={eyeBallRef1}></div>
                </div>
                <div className="mouth"></div>
            </div>

            <div className="main-monster monster-blue">
                <div className="eye">
                    <div className="eyeball animate-eyeball"></div>
                </div>
                <div className="mouth"></div>
            </div>
        </div>

    </div>
}
export default LoadingGamePage;
