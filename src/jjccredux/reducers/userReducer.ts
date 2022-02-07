import { SUCCESSLOGIN, CLEARLOGIN } from "../actionType";
import { userInfoState, actionType } from '../interface';
import { ResponseLoginProps } from "../../network/loginReg/loginReg";
import store from "../index";
import { setLoginSuccessAction } from "../actions/loginAction";
/// <reference path="../../windowvar.d.ts" />

const initLoginInfo = { userName: "", userId: "", jjccToken: "" };
const userStorage = sessionStorage.getItem("userInfo");
console.log("get islogin getStorage", userStorage);
let userInfoFromStorage = null;
if (userStorage) {
  userInfoFromStorage = JSON.parse(userStorage);
}
if (userInfoFromStorage && userInfoFromStorage.jjccToken) {
  initLoginInfo.jjccToken = userInfoFromStorage.jjccToken;
  initLoginInfo.userId = userInfoFromStorage.userId;
  initLoginInfo.userName = userInfoFromStorage.userName;
} else {
  console.log("noLogin");
  window.newLogin = (token: string) => {
    store.dispatch(setLoginSuccessAction({
      errMsg: "登录成功",
      errCode: 0,
      userInfo: {
        userName: "加减乘除jjcc",
        userId: "qwerererer"
      },
      jjccToken: token || ""
    }))
  }
}

export default function userReducerHandle(prevState: userInfoState = initLoginInfo, action: actionType) {

  const { type, data } = action;
  const reponseLogin = data as ResponseLoginProps;
  switch (type) {
    case SUCCESSLOGIN: {
      sessionStorage.setItem("userInfo", JSON.stringify({
        ...reponseLogin?.userInfo,
        jjccToken: reponseLogin.jjccToken
      }))
      return {
        ...reponseLogin?.userInfo,
        jjccToken: reponseLogin.jjccToken
      };
    }
    case CLEARLOGIN: {
      sessionStorage.clear();
      return { userName: "", userId: "", jjccToken: "" };
    }
    default: {
      return prevState;
    }
  }

}