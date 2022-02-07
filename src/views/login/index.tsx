
import React, { FC, useState, useReducer, useEffect } from 'react';
import { Form, Input, Icon, Tabs, Button, Modal } from "antd";

import { FormComponentProps } from 'antd/es/form';

import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import { loginRequest, RegParms, registRequest, ResponseLoginProps } from "../../network/loginReg/loginReg";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESSLOGIN } from "../../jjccredux/actionType";
import { MyStoreState } from "../../jjccredux/interface";
import { setLoginSuccessAction } from "../../jjccredux/actions/loginAction";
import { AppContext } from "../../App";
import querystring from "querystring";
import "./login.less";
const { TabPane } = Tabs;

interface LoginRegProps extends FormComponentProps {

}
type statusMsg = "success" | "error" | "warning" | "" | undefined;
type LoginStatusType = {
    userNameStatus: statusMsg
    userPswStatus: statusMsg
}


//登录注册组件
const LoginCpn: FC<LoginRegProps & RouteComponentProps> = (props: LoginRegProps & RouteComponentProps) => {

    const { form: { getFieldDecorator, getFieldValue, validateFieldsAndScroll } } = props;
    const dispatchFn = useDispatch();
    const historyGo = useHistory();
    const location = useLocation();
    const userInfoState = useSelector((state: MyStoreState) => state.user);
    const [regErrMsg, setRegError] = useState("");

    //切换登录和注册
    const [curTabKey, setTabKey] = useState("1");

    //切换tab
    const onTabClickHandle = (key: string) => {
        setTabKey(key);
    }


    //错误提示
    useEffect(() => {
        if (regErrMsg) {
            setTimeout(() => {

                setRegError("")
            }, 6000)
        }

    }, [regErrMsg])

    //登录校验reducer
    const [loginStatus, dispatchLoginStatus] = useReducer((prevState: object, action: { type: string, value: string }) => {
        let { type, value } = action;
        switch (type) {
            case "validNameField": {
                if (value.length === 0) {
                    return {
                        ...prevState,
                        userNameStatus: "error"
                    }
                } else if (/\s/.test(value)) {
                    return {
                        ...prevState,
                        userNameStatus: "error"
                    }
                } else {
                    return {
                        ...prevState,
                        userNameStatus: "success"
                    }
                }

            }
            case "validPswField": {
                if (value.length === 0) {
                    return {
                        ...prevState,
                        userPswStatus: "error"
                    }
                } else if (/[^\w|\s]/.test(value)) {
                    return {
                        ...prevState,
                        userPswStatus: "error"
                    }
                }
                return {
                    ...prevState,
                    userPswStatus: "success"
                }
            }
            default: {
                return prevState;
            }
        }
    }, {
        userNameStatus: "",
        userPswStatus: ""
    });

    //登录提交
    const submitLoginInfo = () => {

        validateFieldsAndScroll(['username', 'password'], (errors, values) => {
            if (errors) {
                return;
            }
            loginRequest({ username: values.username, userpassword: values.password })
                .then((res: AxiosResponse<Partial<ResponseLoginProps>>) => {
                    if (res.data.errCode === 0) {
                        dispatchFn(setLoginSuccessAction(res.data));
                    } else {
                        Modal.error({
                            title: "",
                            content: "登录失败:" + res.data.errMsg
                        })
                    }

                }).catch((err) => {

                    console.log("登录失败", err.message);
                })
        });


    }


    //发起注册请求
    const sendRegist = (regReqParam: RegParms) => {
        registRequest(regReqParam).then((res: AxiosResponse<Partial<ResponseLoginProps>>) => {
            const resData: Partial<ResponseLoginProps> = res.data;
            console.log("注册结果", resData);
            if (resData.errCode === 1) {
                Modal.error({
                    content: resData.errMsg
                })
                return;
            }

            Modal.success({
                content: "注册成功",
                onOk: () => {
                    //注册成功
                    dispatchFn({
                        type: SUCCESSLOGIN,
                        data: {
                            ...resData

                        }
                    })
                    // historyGo.push("/talk");
                }
            })

        })
    }
    //注册提交
    const submitRegInfo = () => {
        validateFieldsAndScroll(['regusername', 'regpassword', "regrepassword", "phoneNum"], (errors, values) => {


            if (errors) {
                const [{ errors: [{ message = "未知错误" }] }] = Object.values(errors);
                console.log("注册信息填写有误", errors);
                setRegError(message);
                return;
            }
            //发起注册请求
            sendRegist({
                username: values.regusername,
                userpassword: values.regpassword,
                phoneNum: values.phoneNum
            });
        });

    }
    //提交按钮
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (curTabKey === "1") {
            submitLoginInfo();
        } else if (curTabKey === "2") {
            submitRegInfo();
        }
    }


    useEffect(() => {
        if (userInfoState && userInfoState.jjccToken) {
            setTimeout(() => {

                // props.history.push("/home");

                let searchstr = location.search.slice(1);

                let qsRes = querystring.parse(searchstr, "&", "=");
                console.log("querystringquerystring", qsRes);
                if (location && qsRes.redirectUrl) {
                    console.log("useloation", qsRes.redirectUrl);
                    historyGo.push("/" + qsRes.redirectUrl);
                } else {

                    historyGo.push("/home");
                }

            }, 3000)
        }
    }, [userInfoState, historyGo, location])

    if (userInfoState && userInfoState.jjccToken) {
        return <h2 style={{ color: "#008c8c", margin: '0 auto', width: '20%' }}>登录中..........</h2>
    }
    return (
        <div className='login-reg-index'>

            <Form className="loginreg-page" onSubmit={submitForm} >
                <Tabs activeKey={curTabKey} onTabClick={onTabClickHandle}>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="apple" />
                                登录
                            </span>
                        }
                        key="1"
                    >
                        <div className="login-area">
                            <Form.Item hasFeedback validateStatus={(loginStatus as LoginStatusType).userNameStatus}>
                                {getFieldDecorator('username', {
                                    validateTrigger: "onChange",
                                    rules: [
                                        { required: true },
                                        {
                                            validator: (rules, value, callback) => {
                                                dispatchLoginStatus({ type: "validNameField", value: value })
                                                callback();
                                            }
                                        }
                                    ],
                                    initialValue: "jjcc",
                                    validateFirst: false  //true不匹配不再继续校验后面的其他规则

                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item hasFeedback validateStatus={(loginStatus as LoginStatusType).userPswStatus}>
                                {getFieldDecorator('password', {
                                    initialValue: "",
                                    rules: [{ required: true }, {
                                        validator: (rules, value, callback) => {
                                            dispatchLoginStatus({ type: "validPswField", value: value })
                                            callback();
                                        }
                                    }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )}
                            </Form.Item>


                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button block type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </div>


                    </TabPane>
                    <TabPane
                        tab={
                            <AppContext.Consumer>
                                {value => (<div className="reg-tab-item">
                                    <div className={regErrMsg ? "error-top-text animateSlideDown" : "error-top-text"}>{regErrMsg}</div>
                                    <span style={{ color: value.appTheme }}>
                                        <Icon type="user" />
                                        注册
                                    </span>
                                </div>)}
                            </AppContext.Consumer>
                        }
                        key="2"
                    >
                        <div className="regist-area">

                            <Form.Item>
                                {getFieldDecorator('regusername', {
                                    initialValue: "",
                                    rules: [
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value.trim().length === 0) {
                                                    callback(new Error("用户名不能为空"));
                                                    return;
                                                }
                                                if (/\s/.test(value)) {
                                                    callback(new Error("用户名不能包含特殊字符"));
                                                    return;
                                                }
                                                callback();

                                            }
                                        }
                                    ]

                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('regpassword', {
                                    rules: [{ required: true, message: '请输入密码' }, {
                                        min: 6,
                                        message: "密码至少6位"
                                    }, {
                                        validator: (rule, value, callback) => {
                                            let confirmPsw = getFieldValue("regrepassword");
                                            if (value && confirmPsw && confirmPsw !== value) {
                                                callback(new Error("确认密码和密码不一致"));
                                                return;
                                            }
                                            callback();
                                        }
                                    }],
                                    validateTrigger: ["onBlur"],
                                    validateFirst: true,
                                    initialValue: ""
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                        maxLength={18}
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('regrepassword', {
                                    rules: [{ required: true, message: '请输入确认密码' }, {
                                        validator: (rule, value, callback) => {

                                            if (getFieldValue("regpassword") && getFieldValue("regpassword") !== value) {
                                                callback(new Error("确认密码和密码不一致"))
                                            }
                                            callback();//callback需要被调用！！否则validateFields不能正常调用
                                        }
                                    }],
                                    validateTrigger: "onBlur",
                                    initialValue: "",
                                    validateFirst: true
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="确认密码"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phoneNum', {
                                    rules: [{ required: true, message: '请输入手机号' }, {
                                        validator: (rule, value, callback) => {
                                            const phoneReg = /^1[\d]{10}$/;
                                            if (!phoneReg.test(value)) {
                                                callback(new Error("手机号格式错误"))
                                            }
                                            callback();//callback需要被调用！！否则validateFields不能正常调用
                                        }
                                    }],
                                    validateTrigger: "onBlur",
                                    initialValue: "",
                                    validateFirst: true
                                })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}

                                        placeholder="请输入常用手机号"
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button block type="primary" htmlType="submit" >
                                    注册
                                </Button>
                            </Form.Item>
                        </div>
                    </TabPane>
                </Tabs>

            </Form>
        </div>

    )
}


const WrappedNormalLoginForm = Form.create({ name: 'jjcc-login' })(LoginCpn);

export default WrappedNormalLoginForm;
