import axios from "axios";
// import { useStore } from "react-redux";
import store from "../jjccredux";
import historyHook from "../routes/historyHook";
import { clearLoginAction } from "../jjccredux/actions/loginAction";
import { Modal } from "antd";
export const ServerBaseUrl = "http://182.61.150.162:208/";
const baseAxiosIns = axios.create({
    baseURL: ServerBaseUrl,
    timeout: 5000
})

baseAxiosIns.interceptors.request.use((config) => {
    const token = store.getState() ? store.getState().user['jjccToken'] : "";
    console.log("请求头带上token baseAxiosIns", store.getState());
    //请求头带上token
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
}, (e) => {
    return Promise.reject(e);
})


baseAxiosIns.interceptors.response.use((res) => {

    return res;
}, (error) => {
    if (error.response && error.response.status === 401) {
        //退出登录,清除登录信息
        store.dispatch(clearLoginAction({}))
        //重新登录router.history.push('/login?redirectUrl=currentRoute.path')

        Modal.confirm({
            title: "是否重新登录",
            onOk: () => {
                const curPath = window.location.pathname.slice(1);
                const historyMe = store.getState() ? store.getState().hist['historyme'] : historyHook;
                historyMe && historyMe.push(`/login?redirectUrl=${curPath}`)
            },
            onCancel: () => {
                console.log("取消")
            }
        })


    }
    return Promise.reject(error);
})


export default baseAxiosIns;