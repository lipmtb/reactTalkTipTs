
import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./loadingCircle.less";

interface LoadingCircleProps {
    count?: number;
    speed?: number;
}
// 默认
const CIRCLE_COUNT = 5;
const SPEED_TIME = 1000;


const LoadingCircle: React.FC<LoadingCircleProps> = props => {
    const { count = CIRCLE_COUNT, speed = SPEED_TIME } = props;
    const [circleLists, setCircleLists] = useState<number[]>([]);
    // const [controlRun, setControlRun] = useState(true);//闭包问题
    const loadingRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const frameInitRef = useRef(0);
    const controlRun = useRef(true);

    const initRender = () => {
        if (loadingRef && loadingRef.current) {
            const loadingWrapper = loadingRef.current;
            const circleDomLists = loadingWrapper.querySelectorAll(".circle-run-item");
            const len = circleDomLists.length;
            const perDeg = 360 / len;
            if (circleDomLists && circleDomLists.length) {
                circleDomLists.forEach((item: Element, idx: number) => {
                    const itemSpan = item as HTMLSpanElement;

                    itemSpan && (itemSpan.style.transform = `rotate(${idx * perDeg}deg) translateY(-100%)`);
                    itemSpan && (itemSpan.style.backgroundColor = `rgba(20,196,191,${idx / len > 0 ? idx / len : 0.1})`);

                })
            }
        }
    }

    const frames = useCallback((timeStamp: number) => {
        const initRun = frameInitRef.current || 0;
        const loadingWrapper = loadingRef.current;
        const circleDomLists = loadingWrapper?.querySelectorAll(".circle-run-item");

        if (!initRun) {
            frameInitRef.current = timeStamp;
            return false;
        }
        if (timeStamp - initRun > 1000) {
            frameInitRef.current = timeStamp;
            if (circleDomLists?.length) {
                circleDomLists.forEach(element => {
                    const spanElement: HTMLSpanElement = element as HTMLSpanElement;
                    const transformText = spanElement.style.transform;
                    const regDeg = /\((\d+)\w+\)/;

                    const newText = transformText.replace(regDeg, ($: string, $1: string) => {
                        const nextDef = parseFloat($1 as string) + 10;
                        return $.replace($1, nextDef + "");
                    });

                    spanElement.style.transform = newText;

                });

            }
            return true;
        } else {
            return false;
        }
    }, [frameInitRef, loadingRef])

    const stopRun = () => {
        console.log("stopxxxxxxxxx")
        controlRun.current = false;
    }

    const startRun = useCallback(() => {
        controlRun.current = true;
        const tempFrame = (stamp: number) => {
            frames(stamp);
            if (controlRun.current) {

                requestAnimationFrame(tempFrame);
            } else {
                console.log("stopx999989999")
            }
        }
        requestAnimationFrame(tempFrame)
    }, [frameInitRef, controlRun])

    useEffect(() => {
        if (count && count > 0) {
            setCircleLists(Array.from({ length: count || 1 }, (item, idx) => idx))
        }
    }, [count]);

    useEffect(() => {
        if (circleLists && circleLists.length) {
            initRender();
        }
    }, [circleLists])
    return (
        <div className="loading-circle-wrapper" ref={loadingRef}>
            <div className='stage-show'>
                {
                    circleLists.map(circleItem => {
                        return <span key={circleItem} className='circle-run-item'></span>
                    })
                }
            </div>
            <div className='oper-btn'>
                <button onClick={startRun}>预览</button>
                <button onClick={stopRun}>暂停</button>
            </div>
        </div>
    )
}

export default LoadingCircle;
