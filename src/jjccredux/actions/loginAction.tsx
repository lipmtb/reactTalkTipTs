import { SUCCESSLOGIN, CLEARLOGIN } from "../actionType"
import { loginRequest, RegParms, ResponseLoginProps } from "../../network/loginReg/loginReg";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
type JcAction = {
    type: string,
    data: object
}

export function setLoginSuccessAction(data: ResponseLoginProps): JcAction {

    return {
        type: SUCCESSLOGIN,
        data: data as object
    }
}


export function toLoginAction(logindata: Omit<RegParms, "phoneNum">): Function {

    return (dispatch: Dispatch) => {
        loginRequest(logindata).then((res: AxiosResponse<Partial<ResponseLoginProps>>) => {
            if (res.data.errCode === 0) {
                console.log("登录成功", res.data);
                dispatch(setLoginSuccessAction(res.data));
            }
        }).catch((err) => {
            console.log("登录失败", err.message);
        })
    }
}


export function clearLoginAction(data: object = {}): JcAction {
    return {
        type: CLEARLOGIN,
        data: data
    }
}



