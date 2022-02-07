import { useImperativeHandle, ForwardedRef, ForwardRefExoticComponent, forwardRef, PropsWithoutRef, RefAttributes } from "react";
import { useSelector } from "react-redux";
import { MyStoreState } from "../../../jjccredux/interface";
import { Select, Button } from "antd";
import { HomeContext } from "../../../views/home/index";

const { Option } = Select;
export interface CommonUserPopProps {
    title: string;
    cancelCb: () => void;
    onChangeModalVal?: (val: string) => void,
    submitAllData?: () => void;
}

export interface AttrRefBtn {
    submitAllData: () => void;
}
const CommonUserPopUp: ForwardRefExoticComponent<PropsWithoutRef<CommonUserPopProps> & RefAttributes<AttrRefBtn>> = forwardRef<AttrRefBtn, CommonUserPopProps>((props: CommonUserPopProps, ref: ForwardedRef<AttrRefBtn>) => {
    const userLoginInfo = useSelector((state: MyStoreState) => (state.user));

    const closeModal = () => {
        props.cancelCb.call(null);
    }
    const confirmSubmitAndTranData = () => {
        console.log("confirm submit*****");
    }

    useImperativeHandle(ref, () => {
        return {
            submitAllData: confirmSubmitAndTranData
        }
    })

    const onChangeLocal = () => {
        console.log("notchange--------");
    }
    return (
        <div className="common-user-popupwrapper">
            <HomeContext.Consumer>
                {
                    (value) => <Select defaultValue="" style={{ width: 120 }} onChange={
                        value.cbFn && typeof (value.cbFn) === 'function' ? value.cbFn : onChangeLocal
                    }>
                        <Option value={userLoginInfo.userName}>{userLoginInfo.userName}</Option>
                        <Option value={userLoginInfo.userId}>{userLoginInfo.userId}</Option>
                    </Select>
                }
            </HomeContext.Consumer>
            <Button onClick={confirmSubmitAndTranData}>确定</Button>
            <Button onClick={closeModal}>取消</Button>


        </div>
    )
})

export default CommonUserPopUp;







