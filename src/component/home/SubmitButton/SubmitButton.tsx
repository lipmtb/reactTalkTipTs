import { ForwardedRef, forwardRef, useImperativeHandle, useState, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import { Button } from "antd";
import "./submitbtn.less";
interface SubProps {
    onConfirm: () => void;
}
export interface ForObject {
    changeSubtn: () => void;
}

const SubmitButton: ForwardRefExoticComponent<PropsWithoutRef<SubProps> & RefAttributes<ForObject>> = forwardRef((props: SubProps, ref: ForwardedRef<ForObject>) => {
    const [isSub, setIssub] = useState<boolean>(false);
    const onBottomSubmit = () => {
        props.onConfirm();
    }

    useImperativeHandle(
        ref,
        () => {
            // console.log("useImperativeHandleuseImperativeHandleuseImperativeHandle");
            return {
                changeSubtn: () => {
                    // console.log("changesetissub666")
                    setIssub(!isSub);
                }
            }
        },
        [isSub]
    )
    return <div id="bottom-btn">
        <Button onClick={onBottomSubmit}>{isSub ? '审核' : '提交'}</Button>
    </div>
})


export { SubmitButton }