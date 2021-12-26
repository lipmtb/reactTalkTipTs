import { SUCCESSLOGIN, CLEARLOGIN } from "../actionType";
import { userInfoState, actionType } from '../interface';
import { ResponseLoginProps } from "../../network/loginReg/loginReg";
const initLoginInfo = { userName: "", userId: "", jjccToken: "" };
const userStorage = sessionStorage.getItem("userInfo");
let userInfoFromStorage = null;
if (userStorage) {
  userInfoFromStorage = JSON.parse(userStorage);
}
if (userInfoFromStorage && userInfoFromStorage.jjccToken) {
  initLoginInfo.jjccToken = userInfoFromStorage.jjccToken;
  initLoginInfo.userId = userInfoFromStorage.userId;
  initLoginInfo.userName = userInfoFromStorage.userName;
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