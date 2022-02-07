import React, { useEffect, useReducer, useState } from "react";
interface SubObjProps {
    subObj: { [props: string]: unknown }
}
const getPropsValue = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key];
}
function copyDeep(tar: unknown): unknown {
    if (Array.isArray(tar)) {

        return tar.map((taritem: unknown) => {
            return copyDeep(taritem);
        })
    } else if (Object.prototype.toString.call(tar) === '[object Object]') {

        const obj: { [props: string]: unknown } = {};
        for (const key in tar as object) {
            obj[key] = copyDeep(getPropsValue<object, never>(tar as object, key as never));
        }
        return obj;
    } else {
        return tar;
    }
}


const AddObjProps: React.FC<SubObjProps> = props => {
    const [testobj, setTestObj] = useReducer((prevState: { [props: string]: unknown }, action: { type: string, data: { key: string, value: unknown } }) => {
        const { type, data } = action;
        switch (type) {
            case "addProps": {
                prevState[data.key] = data.value;
                return copyDeep(prevState) as { [props: string]: unknown };
                // return prevState;
            }
            case "removeProps": {
                return prevState;
            }
            case "renderUI": {
                return copyDeep(prevState) as { [props: string]: unknown };
            }
            default: {
                return prevState;
            }
        }
    }, props.subObj);



    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description


    useEffect(() => {

        setTimeout(() => {

            console.log("setTimeoutsetTimeoutsetTimeoutsetTimeout00000000000000");
            if (!testobj.hasOwnProperty("e")) {

                const propsArr = Object.keys(testobj).sort((a: string, b: string) => {
                    return a < b ? -1 : 1;
                });
                const nextCharCode = propsArr[propsArr.length - 1].charCodeAt(0) + 1;

                setTestObj({ type: "addProps", data: { key: String.fromCharCode(nextCharCode), value: nextCharCode } });
                console.log("setTimeoutsetTimeoutsetTimeoutsetTimeoutt111111111", Object.keys(props.subObj));
            }
        }, 5000)

    }, [Object.keys(testobj)])

    console.log("render****", testobj, testobj === props.subObj);
    return <div className="subTestObj" style={{ border: "1px solid #f00" }}>
        {/* <button onClick={addPropsHandle}>addPropsHandle</button> */}
        <ul className="lists">
            {
                Object.keys(testobj).map((keysitem, idx) => {
                    return <p className="letterItem" key={idx}>
                        {keysitem.repeat(10)}:{testobj[keysitem]}
                    </p>
                })
            }
        </ul>
    </div>;
}


export default AddObjProps;