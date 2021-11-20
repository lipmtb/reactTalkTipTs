import React from 'react';
import {withRouter,RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import { Route,Redirect } from 'react-router-dom';
import {findRouter} from "../../routes/findRouter";
import {MyStoreState,userInfo} from "../../jjccredux/interface";

interface OperProps{
    userInfo:userInfo
}
let HasLoginProvider:React.FC<RouteComponentProps & OperProps> =(props:RouteComponentProps & OperProps)=> {
    console.log("HasLoginProvider",props);

    let {location:{pathname},userInfo}=props;
  
     if(!userInfo||!userInfo.userId){
        return <Redirect to="/login"></Redirect>
     }

     return <div>
  
         <Route path="/" component={findRouter("home")}></Route>
     </div>
   
}

export default connect((state:MyStoreState)=>({userInfo:state.user}))(withRouter(HasLoginProvider));
