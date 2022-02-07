
export interface AccessoryFile {
    accessoryId: string;//附件唯一标识
    accessoryUrl: string;//附件路径
    accessoryType: string;//附件类型
    userId: string;//附件所属人
    createDate: string;
    _id:string;

}
export interface AccessoryConfig {
    configTypeId: string;
    configTypeName: string;
    accessoryFileLists: AccessoryFile[],
    canDownload:number;
    canPrev:number;
}

export interface BaseResonseType {
    errCode: number;
    errMsg: string;
}
export interface ResponseType<V> {

    [props: string]: V;

}

export type ResponseAll<T> = ResponseType<T> & BaseResonseType;

