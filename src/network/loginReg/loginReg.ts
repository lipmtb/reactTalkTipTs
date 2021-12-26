import baseRequest from "../baseRequest";
import { AxiosResponse } from "axios";

//响应的res.data
export interface ResponseLoginProps {
    errMsg?: string;
    errCode?: number | string;
    userInfo?: {
        userName: string;
        userId: string
    };
    jjccToken?: string
}


export interface RegParms {
    username: string;
    userpassword: string;
    phoneNum: string
}

//登录接口
export function loginRequest(data: Omit<RegParms, "phoneNum">) {
    return baseRequest.post<ResponseLoginProps, AxiosResponse<ResponseLoginProps>>("/login", data);
}




//注册接口
export function registRequest(data: RegParms) {
    return baseRequest.post<Partial<ResponseLoginProps>, AxiosResponse<Partial<ResponseLoginProps>>>("/regist", data);
}