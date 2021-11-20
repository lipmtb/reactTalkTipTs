import {SUCCESSLOGIN,CLEARLOGIN} from "../actionType"

type JcAction={
    type:string,
    data:object
}

export function setLoginSuccessAction(data:object):JcAction{

    return {
        type:SUCCESSLOGIN,
        data:data
    }
}


export function toLoginAction():void{
  return undefined;
}


export function clearLoginAction(data:object):JcAction{
    return {
        type:CLEARLOGIN,
        data:data
  }
}
  


