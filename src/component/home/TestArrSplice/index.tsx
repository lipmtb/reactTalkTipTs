
import { useState, useEffect, useReducer } from "react";

const ArrSplice = (props: { arr: number[] }) => {
    function useMyState<T>(initState: T | (() => T)) {
        const initData = typeof initState === 'function' ? (initState as () => T)() : initState;
        const [allState, dispatchState] = useReducer((curState: T, action: T | ((prev: T) => T)) => {
            return typeof action === 'function' ? (action as () => T)() : action;
        }, initData);

        return [allState, (action: T | ((props: T) => T)) => {

            let newState = action;
            if (typeof action === 'function') {
                newState = (action as (props: T) => T)(allState);
            }
            if (allState !== newState) {
                console.log("*******************")
                dispatchState(newState);
            }
        }];
    }
    const [newArr, setNewArr] = useMyState<number[]>([]);


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
    const cutArr = (arr: any) => {
        arr.splice(0, 1);

        // (setNewArr as (((action: number[] | ((props: number[]) => number[])) => void)))(copyDeep(props.arr) as number[]);
        (setNewArr as (((action: number[] | ((props: number[]) => number[])) => void)))(arr);
    }

    useEffect(() => {
        console.log("useEffect", newArr.length, props.arr.length,newArr===props.arr);
        if (props.arr.length > 0) {

            setTimeout((args) => {
                console.log("setTimeout", args)
                cutArr(args[0]);
            }, 3000, [props.arr])
        }
    }, [props.arr.length])

    console.log("render99", newArr.length, props.arr.length);
    return <div className="arr-splice-wrapper">
        {
            (newArr as number[]).map((item: number) => {
                console.log("xxxxxx")
                return <p key={item}>{'item:' + item}</p>
            })
        }
        <h3>newArrLength:{newArr.length}:propsArrLength:{props.arr.length}</h3>
    </div>
}

export default ArrSplice;