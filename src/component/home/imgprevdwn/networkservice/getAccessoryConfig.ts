
import { AxiosResponse } from "axios";
import webServiceAPI, { accessoryBaseReq, ReqConfig, serviceGet } from "../../../../network/webServiceAPI";



interface AccessoryConfigReq {
    [props: string]: unknown;
    userConfig: unknown;
}



//获取附件配置
export const getAccessortConfig = <T>(req: AccessoryConfigReq) => {
    return webServiceAPI<T>("/upload/getAllAccessoryConfigLists", req);
}

//上传附件
export const uploadfile = <T>(req: FormData, config: ReqConfig) => {
    return accessoryBaseReq<T>("/upload/uploadfiles", req, config);
}

//删除某个附件
export const deleteUploadFile = <T>(req: AccessoryConfigReq) => {
    return webServiceAPI<T>("/upload/deleteFileById", req);
}


//下载附件
export const downloadFileByAccessoryUrl = <T>(req: { accessoryUrl: string }) => {
    return serviceGet<T>("/upload/downloadimg?filepath=" + req.accessoryUrl);
}
export function isResponseSuccess(res: AxiosResponse) {
    if (res.data) {
        if (res.data.errCode === 0) {
            return true;
        }
        return false;
    }
    return false;
}


