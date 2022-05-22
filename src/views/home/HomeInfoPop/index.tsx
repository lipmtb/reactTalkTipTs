

import React from 'react';
import { RouteComponentProps } from 'react-router';
import "./homeInfoPopStyle.less";
interface HomeInfoProps {
    homeInfo: {
        name: string;
        age: number;
    } | null,
    onClose: () => void;
}
const HomeInfoPopUp: React.FC<RouteComponentProps & HomeInfoProps> = props => {
    console.log("props666666", props)
    return (
        <div className="home-info-popup-wrapper">
            <header>
                <button onClick={() => {
                    props.onClose();
                }}>返回</button>
            </header>
            <h1>HomeInfoPopUp</h1>
        </div>
    )
}
export default HomeInfoPopUp;
