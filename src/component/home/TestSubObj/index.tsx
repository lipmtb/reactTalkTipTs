import React, { useEffect, useState } from "react";
interface SubObjProps {
    subObj: { [props: string]: unknown }
}

const TestSubObj: React.FC<SubObjProps> = props => {
    const [testobj, setTestObj] = useState<{ [props: string]: unknown } | null>(null);
    const [count, setCount] = useState(0);
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

    const getPropsValue = <T, K extends keyof T>(obj: T, key: K) => {
        return obj[key];
    }

    useEffect(() => {
        console.log("useEffectuseEffectuseEffect ", Object.keys(props.subObj).length);
        if (!testobj) {
            console.log("init props.subObj");
            setCount(count + 1);
            setTestObj(copyDeep(props.subObj) as { [props: string]: unknown });
            return;
        }
        if (Object.keys(props.subObj).length > 0) {
            if (props.subObj.hasOwnProperty("a")) {
                console.log("useEffect delete a");
                delete props.subObj.a;

            } else if (props.subObj.hasOwnProperty("b")) {
                console.log("useEffect delete b");
                delete props.subObj.b;
            } else {
                delete props.subObj.c;
                console.log("useEffect delete c");
            }
            setTimeout(() => {
                console.log("setTimeout****", copyDeep(props.subObj))
                setCount(count + 1);
                setTestObj(copyDeep(props.subObj) as { [props: string]: unknown });
            }, 2000)
        }
    }, [Object.keys(testobj || {}).length])

    console.log("render****", testobj?.a, testobj?.b, testobj?.c, testobj === props.subObj, count)
    return <div className="subTestObj" style={{ border: "1px solid #f00" }}>
        <ul className="lists">
            <h3>counting:{count}</h3>
            <p>aaaaaaaa:{testobj?.a}</p>
            <p>bbbbbbbb:{testobj?.b}</p>
            <p>cccccccc:{testobj?.c}</p>
        </ul>
    </div>;
}


export default TestSubObj;