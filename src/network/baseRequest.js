import axios from "axios";
// import store from "../store"
let baseAxiosIns=axios.create({
    baseURL:"http://127.0.0.1:82",
    timeout:5000
})

baseAxiosIns.interceptors.request.use((config)=>{

    let token=store.getState()?store.getState().user['token']:"";
    // console.log("baseAxiosIns",store,store.getState());
    //请求头带上token
    if(token){
        config.headers.Authorization="Bearer "+token;
    }
    return config;
},(e)=>{
    return Promise.reject(e);
})


baseAxiosIns.interceptors.response.use((res)=>{
   
    return res.data;
},(error)=>{
    if(error.response&&error.response.status===401){
       //退出登录,清除登录信息
   
        //重新登录router.history.push('/login?redirectUrl=currentRoute.path')
        
    }
    return Promise.reject(error);
})


export default baseAxiosIns;