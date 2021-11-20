import {SUCCESSLOGIN,CLEARLOGIN} from "../actionType";
import type { userInfo, actionType } from '../interface';


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