
import React, { useEffect, useReducer, useMemo, useState } from 'react';
import { Modal } from 'antd';
import { AxiosResponse } from "axios";
import { ImgPrevDownload } from "./ImgPrevDownload";
import { userInfoState } from "../../../jjccredux/interface";
import { getAccessortConfig, isResponseSuccess, uploadfile, deleteUploadFile } from "./networkservice/getAccessoryConfig";
import { AccessoryConfig, AccessoryFile, ResponseAll } from "./interface";
import { deepClone } from "../../common/util/deepClone";
import "./uploadstyles/AccessoryUpload.less";
interface ImgOperProps {
    userInfo: userInfoState;
    uploadSubmit: () => void;
}
interface AccessoryInfoProps {
    configLists: AccessoryConfig[]
}
export const AccessoryUpload: React.FC<ImgOperProps> = props => {
    // console.log("AccessoryUploadAccessoryUploadAccessoryUpload render", props);
    const [curUploadTypeId, setCurUploadingTypeId] = useState("");
    const [isAllLoading, setIsAllLoading] = useState<boolean>(false);

    const [accessoryInfo, dispatchAccessoryInfo] = useReducer((prevState: AccessoryInfoProps, action: { type: string, value: AccessoryConfig[] | AccessoryFile[] | number }) => {
        let { type, value } = action;
        switch (type) {
            case "initConfig": {

                prevState.configLists = value as AccessoryConfig[];
                prevState.configLists.sort((itema: AccessoryConfig, itemb: AccessoryConfig) => {
                    return itema.configTypeId > itemb.configTypeId ? -1 : 1;
                })

                return deepClone(prevState) as AccessoryInfoProps;
            }
            case "initDefaultFiles": {
                setFileInConfig(prevState.configLists, value as AccessoryFile[])
                return deepClone(prevState) as AccessoryInfoProps;
            }
            case "successState": {
                return deepClone(prevState) as AccessoryInfoProps;
            }
            default: {
                return deepClone(prevState) as AccessoryInfoProps;
            }
        }
    }, {
        configLists: [{
            configTypeId: "",
            configTypeName: "",
            accessoryFileLists: [],
            canDownload: 0,
            canPrev: 0
        }]
    });
    const setFileInConfig = (configLists: AccessoryConfig[], defaultFileLists: AccessoryFile[]) => {
        for (const file of defaultFileLists) {
            configLists.forEach((config: AccessoryConfig) => {
                if (file.accessoryType === config.configTypeId) {
                    config.accessoryFileLists.push(file);
                }
            })
        }
    }
    //????????????????????????
    const getAccessoryConfigReq = async () => {
        const res = await getAccessortConfig<ResponseAll<AccessoryConfig[]>>({
            userConfig: props.userInfo
        });

        if (isResponseSuccess(res)) {
            dispatchAccessoryInfo({
                type: "initConfig",
                value: res.data.configLists
            })

        } else {
            Modal.error({
                title: "??????",
                content: "??????????????????"
            })
        }
        console.log("??????????????????", res.data);
    }



    useEffect(() => {
        if (props.userInfo && props.userInfo.jjccToken) {

            getAccessoryConfigReq().then(() => {
                setIsAllLoading(true);
            });
        }
    }, [props.userInfo])



    const configLists = useMemo(() => {
        if (!isAllLoading) {
            return [];
        }
        // console.log("useMemouseMemoconfigListsconfigListsconfigListsconfigLists--------", accessoryInfo.configLists.length)
        return accessoryInfo.configLists || [];
    }, [accessoryInfo.configLists, props.userInfo, isAllLoading]);

    //?????????????????????
    const setUploading = (configId: string) => {
        setCurUploadingTypeId(configId);
    }

    //?????????????????????
    const uploadfilehandle = (file: File, typeId: string) => {
        if (file) {
            let formdata = new FormData();
            formdata.append("userid", props.userInfo.userId);
            formdata.append("username", props.userInfo.userName);
            formdata.append("accessoryType", typeId);
            formdata.append("imgfile", file);

            return uploadfile<ResponseAll<{ uploadstate: number }>>(formdata, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
        }
        return Promise.resolve(0);
    }

    const deleteUploadFileHandle: (id: string) => Promise<AxiosResponse<ResponseAll<{ deleteState: number }>>> = (id: string) => {

        return deleteUploadFile<ResponseAll<{ deleteState: number }>>({
            userConfig: props.userInfo,
            file_id: id
        })
    }
    return (
        <div className='accessory-upload-wrapper'>
            <h4>??????????????????????????? img(png,jpeg,jpg),xlsx, pdf ,doc???</h4>
            <ul className="config-lists">
                {
                    configLists.map((config: AccessoryConfig) => {
                        return <ImgPrevDownload key={config.configTypeId} onSubmit={props.uploadSubmit}
                            userInfo={props.userInfo} typeConfig={config}
                            setCurrentUploading={setUploading}
                            isUploading={curUploadTypeId === config.configTypeId}
                            uploadfilehandle={uploadfilehandle}
                            deleteUploadFile={deleteUploadFileHandle}
                        />
                    })
                }
            </ul>


        </div>
    )
}
