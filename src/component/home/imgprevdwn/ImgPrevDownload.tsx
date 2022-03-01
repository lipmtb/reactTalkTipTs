
import React, { useState, useReducer, useMemo, useRef, useEffect } from 'react';
import { AccessoryConfig, ResponseAll, AccessoryFile } from "./interface";
import { isResponseSuccess, downloadFileByAccessoryUrl } from "./networkservice/getAccessoryConfig";
import JJccModal from "../../common/popUp";
import LoadingProgress from "../../common/popUp/LoadingProgress";
import { ImgPrev20220205 } from "./prev/ImgPrev20220205";
import { Button, Modal, Icon } from "antd";
import { AxiosResponse } from "axios";

import { ServerBaseUrl } from "../../../network/baseRequest";
interface ImgOperProps {
    userInfo: unknown;
    onSubmit: () => void;
    typeConfig: AccessoryConfig,
    setCurrentUploading: (configId: string) => void;//设置正在上传的附件类型
    isUploading?: boolean;//是否显示上传进度
    uploadfilehandle: (file: File, typeId: string) => Promise<AxiosResponse<ResponseAll<{ uploadstate: number }>> | number>;
    deleteUploadFile: (id: string) => Promise<AxiosResponse<ResponseAll<{ deleteState: number }>>>;//删除附件

}
export const ImgPrevDownload: React.FC<ImgOperProps> = props => {
    const downloadlink = useRef<HTMLAnchorElement>(null);
    const [uploadState, setUploadState] = useState(0);
    const [fileItem, setFileItem] = useReducer((prevState: {
        fileitem: null | File;
        hasUpload: boolean;
    }, action: { type: string, payload: File | null }) => {
        const { type, payload } = action;
        switch (type) {
            case "newFileSelect": {
                return {
                    ...prevState,
                    fileitem: payload,
                    hasUpload: false
                }
            }
            case "clearFile": {
                return {
                    ...prevState,
                    fileitem: null,
                    hasUpload: false
                }
            }
            case "finishUpload": {
                return {
                    ...prevState,
                    hasUpload: true
                }
            }
            default: {
                return prevState;
            }
        }
    }, {
        fileitem: null,
        hasUpload: false
    });
    const [imgurl, setImgUrl] = useState<string>("");//上传图片后的预览图blob
    const [showDel, setshowDel] = useState<boolean>(false);//显示删除按钮
    const [curPreImgUrl, setCurPreImgUrl] = useState<string>("");
    const { typeConfig, onSubmit, setCurrentUploading, isUploading } = props;

    const [deletedArr, setDeleted] = useState<string[]>([]);
    const [downdatasting, setdowndatasting] = useState("");
    const [downfilename, setdownfilename] = useState("");
    const accessoryFileLists = useMemo(() => {
        return typeConfig.accessoryFileLists.filter((itemfile) => {
            return deletedArr.findIndex((item) => item === itemfile._id) === -1;
        });
    }, [props.typeConfig, deletedArr]);

    //显示附件预览图
    const selectNewFilePre = (file?: File) => {
        if (file) {
            const filename = file?.name;
            const fileExtend = filename.slice(filename.lastIndexOf("."));
            //图片展示
            if (fileExtend === ".jpg") {
                const tmpUrl = window.URL.createObjectURL(file);
                setImgUrl(tmpUrl);
            }
        }
    }
    //选择附件和显示附件
    const selectNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        const filelists = e.currentTarget.files;
        setFileItem({
            type: "newFileSelect",
            payload: filelists?.[0] as File
        });
        selectNewFilePre(filelists?.[0]);
    }

    //上传
    const uploadFileLoading = (typeId: string) => {
        if (!fileItem.fileitem) {
            Modal.error({
                title: "请先点击+按钮选择文件"
            })
            return;
        }
        if (fileItem.fileitem && fileItem.hasUpload) {
            Modal.error({ title: "该文件上传过了" });
            return;
        }

        if (setCurrentUploading) {
            setCurrentUploading(typeConfig.configTypeId)
        }
        setUploadState(0);
        props.uploadfilehandle(fileItem.fileitem as File, typeId).then((res) => {
            console.log("上传结果", res);
            if (typeof res === "number" || !res) {
                return new Error("暂无附件")
            } else {
                if (res.data && isResponseSuccess(res)) {

                    setUploadState(res.data.upload.uploadstate)
                    setFileItem({
                        type: "finishUpload",
                        payload: null
                    })
                } else {
                    console.log("服务端上传失败");

                }
            }

        }).catch((e: Error) => {
            console.log("上传失败", e);
        })
    }

    //显示或隐藏删除按钮
    const showDelHandle = (isShow: boolean) => {
        return (e: React.MouseEvent) => {
            if (isShow) {

                setshowDel(isShow)
            } else {
                const imgitem = e.currentTarget;

                const imgItemClientInfo = imgitem as HTMLElement;
                const clientDect = imgItemClientInfo.getBoundingClientRect();

                if (clientDect.left + 6 > e.clientX || clientDect.right - 6 < e.clientX || clientDect.top + 6 > e.clientY || clientDect.bottom - 6 < e.clientY) {
                    setshowDel(isShow)
                }
            }
        }
    }


    //删除
    const delSelected = (e: React.MouseEvent) => {
        e.preventDefault();
        Modal.confirm({
            content: "是否删除",
            onOk: () => {
                if (imgurl) {
                    window.URL.revokeObjectURL(imgurl);
                }
                const file = fileItem.fileitem;

                setImgUrl("");
                setshowDel(false);
                setFileItem({
                    type: "clearFile",
                    payload: null
                });
            }
        })

    }

    //删除已经上传过的附件

    const delHasUploaded = (id: string) => {
        return () => {
            Modal.confirm({
                title: "是否删除",
                onOk: () => {
                    props.deleteUploadFile(id).then((res: AxiosResponse<ResponseAll<{ deleteState: number }>>) => {
                        if (res.data) {
                            if (res.data.errCode === 0) {

                                deletedArr.push(id);
                                setDeleted([...deletedArr]);
                            } else {
                                console.log("删除失败", res.data);
                            }
                        }
                    })
                }
            })

        }
    }


    //预览当前文件
    const prevCurrentFile = (url: string) => {
        return () => {
            setCurPreImgUrl(ServerBaseUrl + url);
        }
    }

    //下载
    const downloadFile = (aFile: AccessoryFile) => {
        return () => {
            downloadFileByAccessoryUrl<BlobPart>({
                accessoryUrl: aFile.accessoryUrl
            }).then((res) => {
                // console.log("下载结果", res.data, typeof res.data);//ArrayBuffer|Blob
                const blob = new Blob([res.data], { type: "application/image" });//接口BlobPart更适合多情况
                // const blob:BlobPart = res.data;//接口直接返回Blob
                // const fileReader = new FileReader();
                // fileReader.readAsDataURL(blob as Blob);
                // fileReader.onload = (e: ProgressEvent<FileReader>) => {
                //     if (e.target) {
                //         setdowndatasting(e.target.result as string);
                //         setdownfilename(aFile.accessoryUrl.slice(aFile.accessoryUrl.lastIndexOf("\/")));
                //         downloadlink.current?.click();
                //         setTimeout(() => {
                //             setdowndatasting("")
                //             setdownfilename("")
                //         }, 400);
                //     }
                // }

                const tempUrl = window.URL.createObjectURL(blob);

                setdowndatasting(tempUrl);

                setdownfilename(aFile.accessoryUrl.slice(aFile.accessoryUrl.lastIndexOf("\/")));
                downloadlink.current?.click();
                setTimeout(() => {

                    setdowndatasting("")
                    if (downdatasting) {

                        window.URL.revokeObjectURL(downdatasting);
                    }
                    setdownfilename("")
                }, 3000);
            })

        }
    }


    const clearPreImgUrl = () => {
        setCurPreImgUrl("")
    }
    const onDropFiles = (e: React.DragEvent<HTMLLIElement>) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.dataTransfer.files[0]);
        const file = e.dataTransfer.files?.[0];
        setFileItem({
            type: "newFileSelect",
            payload: file as File
        });
        selectNewFilePre(file);
    }
    return (
        <div className='img-prev-down-wrapper'>
            {/* 已经上传的附件 */}
            {
                accessoryFileLists.map((hasuploadFile) => {
                    return <li className='config-item' key={hasuploadFile.accessoryId}>

                        <a href="#" onClick={(e) => e.preventDefault()} className='link-img'>
                            <label htmlFor={typeConfig.configTypeId + "inputfile"}>
                                <p className='config-type-name'>{typeConfig.configTypeName}</p>
                                <Icon type="minus-square" className='hasupload-delete' onClick={delHasUploaded(hasuploadFile._id)} />
                                {typeConfig.canPrev ? <span className="prev-accessory" onClick={prevCurrentFile(hasuploadFile.accessoryUrl)}>预览</span> : null}
                                {typeConfig.canDownload ? <span className="download-accessory" onClick={downloadFile(hasuploadFile)}>下载</span> : null}
                                <img src={ServerBaseUrl + hasuploadFile.accessoryUrl} alt="图片预览" className="img-prev-item" />
                            </label>
                        </a>

                    </li>
                })
            }
            {/* 上传 */}
            <li className='config-item' onMouseLeave={showDelHandle(false)} onDrop={onDropFiles}
                onDragEnter={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()}>

                <a href="#" onClick={(e) => e.stopPropagation()} className='link-img'>
                    <label htmlFor={typeConfig.configTypeId + "inputfile"}>
                        <p className='config-type-name'>{typeConfig.configTypeName}</p>
                        <Icon type="minus-square" className='del-icon'
                            onClick={delSelected}
                            style={{ top: showDel ? "49px" : "0px" }} />
                        <input type="file" id={typeConfig.configTypeId + "inputfile"} style={{ display: "none" }} onChange={selectNewFile} />
                        <Button size="small" onClick={() => {
                            uploadFileLoading(typeConfig.configTypeId)
                        }}>上传</Button>
                        {/* {typeConfig.canPrev && imgurl ? <span className="prev-accessory">预览</span> : null}
                        {typeConfig.canDownload && imgurl ? <span className="download-accessory">下载</span> : null} */}
                        {imgurl && <img src={imgurl} alt="图片预览" className="img-prev-item"
                            onMouseEnter={showDelHandle(true)}
                        />}
                    </label>
                </a>

            </li>
            {/* 上传进度 */}
            {isUploading && <JJccModal><LoadingProgress loadingState={uploadState} setCurrentUploading={setCurrentUploading}>附件上传中</LoadingProgress></JJccModal>}
            {/* 图片预览 */}
            {curPreImgUrl && <ImgPrev20220205 imgUrl={curPreImgUrl} cancel={clearPreImgUrl}></ImgPrev20220205>}
            {downdatasting && <a href={downdatasting} download={downfilename} ref={downloadlink} style={{ display: "none" }}>下载结果</a>}
        </div>
    )
}
