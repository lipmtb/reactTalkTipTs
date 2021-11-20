import {SUCCESSLOGIN,CLEARLOGIN} from "../actionType";
interface userInfo{
    userName:string,
    userId:string,
    token:string
}

interface actionType{
    type:string,
    data:userInfo
}
export default function userReducerHandle(prevState:userInfo={userName:"",userId:"",token:""},action:actionType){

    let {type,data}=action;
      switch(type){
          case SUCCESSLOGIN:{
            return data;
          }
          case CLEARLOGIN:{
            return {userName:"",userId:""};
          }
          default:{
              return prevState;
          }
      }

}