
import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import "./loadingCircle.less";

interface LoadingCircleProps {
    count?: number;
    speed?: number;
}

// 默认
const CIRCLE_COUNT = 3;
const SPEED_TIME = 1000;


enum Direction {
    toLeft = "TOLEFT",
    toRight = "TORIGTH"

}
type BoxStyleExtra = {
    style: React.CSSProperties;
    relativeX: number;
    relativeY: number;
    direction: Direction;
}


interface LoadingStyleProps {
    styleArr: BoxStyleExtra[]
}



const LIMIT_EDGE = 250;

const LoadingDotAlternate: React.FC<LoadingCircleProps> = props => {
    const { count = CIRCLE_COUNT, speed = SPEED_TIME } = props;
    const [circleLists] = useState(Array.from({ length: count }, (item, i) => i));
    const canRun = useRef(true);
    const [loadingCount, setLoadingCount] = useState(0);
    const [circleStyles, dispatchStyle] = useReducer((prev: LoadingStyleProps, action: { type: number, data: LoadingStyleProps }) => {
        const { type, data } = action;
        switch (type) {

            case 1: {
                return { ...data };
            }
            default: {

                return prev;
            }
        }
    }, {
        styleArr: [{
            style: { "transform": "translateX(-300%) translateY(-50%) scale(2)" },
            relativeX: -250,
            relativeY: 0,
            direction: Direction.toRight
        },
        {
            style: { "transform": "translateX(-50%) translateY(-50%) scale(1)" },
            relativeX: 0,
            relativeY: 0,
            direction: Direction.toRight
        }
            , {
            style: { "transform": "translateX(200%) translateY(-50%) scale(2)" },
            relativeX: 250,
            relativeY: 0,
            direction: Direction.toLeft
        }]
    });

    const runBox = () => {

        let temp = 0;
        const frame = (stamp: number) => {
            if (!temp) {
                temp = stamp;
            }
            if (stamp - temp > 2) {
                temp = stamp;
                setLoadingCount(count => count + 1)
            }
            if (canRun.current) {

                requestAnimationFrame(frame);
            }
        }
        requestAnimationFrame(frame)
    }
    const startRun = () => {
        canRun.current = true;
        runBox();
    }
    const stopRun = () => {
        canRun.current = false;
    }

    useEffect(() => {
        const cloneStyleObj = { ...circleStyles };
        const circleStylesArray = cloneStyleObj.styleArr;
        const newStyleArr = circleStylesArray.map(circleStyle => {

            if (circleStyle.relativeX <= -250) {

                circleStyle.direction = Direction.toRight;

            } else if (circleStyle.relativeX >= 250) {

                circleStyle.direction = Direction.toLeft;

            }
            circleStyle.direction === Direction.toRight ? circleStyle.relativeX += 6 : circleStyle.relativeX -= 6;
            const scaleNum = Math.abs(circleStyle.relativeX) / 250 + 1;
            circleStyle.style = { transform: `translateX(${-50 + circleStyle.relativeX}%) translateY(-50%) scale(${scaleNum})`,opacity:`${scaleNum/2}` };

            return circleStyle;

        })
        cloneStyleObj.styleArr = newStyleArr;
        dispatchStyle({ type: 1, data: cloneStyleObj });
    }, [loadingCount])


    return (
        <div className="loading-circle-wrapper loadingBlack">
            <div className='stage-show'>
                {
                    circleLists?.length && circleStyles?.styleArr ?
                        circleLists.map((circleItem, idx) => {
                            return <span key={idx} className='three-box-white-item' style={circleStyles?.styleArr[idx].style}></span>
                        }) : null
                }
            </div>
            <div className='oper-btn'>
                <button onClick={startRun}>预览</button>
                <button onClick={stopRun}>暂停</button>
            </div>
        </div>
    )
}

export default LoadingDotAlternate;
