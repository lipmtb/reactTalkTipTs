

import React from 'react';
import LoadingCircle from '../../component/common/loading/LoadingCircle';
import LoadingThreeDot from '../../component/common/loading/LoadingThreeDot';
import "./index.less";


const LoadingPageIndex: React.FC = props => {
    return (
        <div className="loading-cpn-wrapper">
            <h1 className='loading-page-title'>loadingPage</h1>
            <div className='loading-show-content'>
                <ul className="loading-list">
                    <li className="loading-list-item-show">
                        <LoadingCircle />
                    </li>
                    <li className="loading-list-item-show">
                        <LoadingThreeDot />
                    </li>
                </ul>

            </div>
        </div>
    )
}
export default LoadingPageIndex;
