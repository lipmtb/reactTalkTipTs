import axios from "axios";
// import { useStore } from "react-redux";
import store from "../jjccredux";
import { useLocation } from "react-router-dom";
import { history as historyMe } from "../routes/historyHook";
import { clearLoginAction } from "../jjccredux/actions/loginAction";
const baseAxiosIns = axios.create({
    baseURL: "http://127.0.0.1:82",
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


        const curPath = useLocation().pathname;
        historyMe.push(`/login?redirectUrl=${curPath}`)

    }
    return Promise.reject(error);
})


export default baseAxiosIns;