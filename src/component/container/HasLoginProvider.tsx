import React from 'react';
import {connect} from "react-redux";
interface OperProps{

}
let HasLoginProvider:React.FC<OperProps> =()=> {
    return (
        <div>
            
        </div>
    )
}

export default connect((state)=>({userinfo:state.user}))(HasLoginProvider);
