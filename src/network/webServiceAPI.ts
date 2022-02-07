import baseRequest from "./baseRequest";

export interface ReqParams {
    [props: string]: unknown;
}

export interface ReqConfig {
    headers: { [props: string]: string },
    [props: string]: unknown;
}
export default function <T>(url: string, req: ReqParams) {
    return baseRequest.post<T>(url, req);
}

export const accessoryBaseReq = <T>(url: string, req: FormData, config: ReqConfig) => {
    return baseRequest.post<T>(url, req, config);
}

export const serviceGet = <T>(url: string) => {
    return baseRequest.get<T>(url,{
       responseType:"arraybuffer"
    });
}