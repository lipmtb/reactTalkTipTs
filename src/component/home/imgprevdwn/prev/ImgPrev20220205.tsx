import React, { CSSProperties, useState, useEffect, useRef } from "react";
import { useReducer } from "react";
import "./ImgPrevStyle.less";

interface PreProps {
    imgUrl: string;
}
interface AnimateCache {
    style: CSSProperties | { [props: string]: string },
    animateVar: {
        clockwiseCount: number;
        largerCount: number;

    }
}
//图片预览组件
const ImgPrev20220205: React.FC<PreProps> = props => {
    const { imgUrl } = props;
    const [computedStyle, dispatchComputedStyle] = useReducer((prevStyle: AnimateCache, action: { type: string, payload: number | { x: number, y: number } }) => {
        const { type, payload } = action;
        switch (type) {
            //顺时针
            case "Clockwise": {
                const { animateVar, style } = prevStyle;

                const degCount = animateVar.clockwiseCount + (payload as number);
                const scaleCount = animateVar.largerCount;
                return {
                    style: {
                        ...style,
                        transform: `rotate(${degCount}deg) scale(${scaleCount})`
                    },
                    animateVar: {
                        ...animateVar,
                        clockwiseCount: degCount
                    }
                }
            }
            //逆时针
            case "AntiClockwise": {
                const { animateVar, style } = prevStyle;

                const degCount = animateVar.clockwiseCount - (payload as number);
                const scaleCount = animateVar.largerCount;
                return {
                    style: {
                        ...style,
                        transform: `rotate(${degCount}deg) scale(${scaleCount})`
                    },
                    animateVar: {
                        ...animateVar,
                        clockwiseCount: degCount,
                    }
                }
            }
            case "Larger": {
                const { animateVar, style } = prevStyle;
                const degCount = animateVar.clockwiseCount;
                const scaleCount = animateVar.largerCount * 1.12;
                return {
                    style: {
                        ...style,
                        transform: `rotate(${degCount}deg) scale(${scaleCount})`
                    },
                    animateVar: {
                        ...animateVar,
                        largerCount: scaleCount
                    }
                }
            }
            case "Smaller": {
                const { animateVar, style } = prevStyle;
                const degCount = animateVar.clockwiseCount;
                const scaleCount = animateVar.largerCount * 0.945;
                return {
                    style: {
                        ...style,
                        transform: `rotate(${degCount}deg) scale(${scaleCount})`
                    },
                    animateVar: {
                        ...animateVar,
                        largerCount: scaleCount
                    }
                }
            }
            case "move": {
                const { animateVar, style } = prevStyle;
                const { x = 0, y = 0 } = payload as { x: number, y: number };

                return {
                    style: {
                        ...style,
                        left: x + "px",
                        top: y + "px"
                    },
                    animateVar: {
                        ...animateVar
                    }
                }
            }
            default: {
                return prevStyle;
            }
        }
    }, {
        style: {
            transform: `rotate(0deg)`,
            left: 0,
            top: 0
        },
        animateVar: {
            clockwiseCount: 0,
            largerCount: 1
        }
    });
    const [hasMouseDowned, setHasDowned] = useState<boolean>(false);
    const contentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const imgRef: React.MutableRefObject<HTMLImageElement | null> = useRef(null);

    //父容器位置
    const [imgContentDect, saveimgContentDect] = useState<DOMRect>();

    //相对位置
    const [relativePos, setRelativePos] = useState<{ x: number, y: number } | null>(null);
    const transImg = (e: React.MouseEvent<HTMLDivElement>) => {
        const operType = (e.target as HTMLDivElement).dataset.tranType;
        dispatchComputedStyle({
            type: operType || "Smaller",
            payload: 90
        })
    }

    //初始化获取容器位置
    useEffect(() => {
        const contentDiv = contentRef.current;
        const dectDiv: DOMRect = contentDiv?.getBoundingClientRect() as DOMRect;
        saveimgContentDect(dectDiv);
    }, [])

    const onMousedownImg = (e: React.MouseEvent) => {
        e.preventDefault();
        setHasDowned(true);
        const imgRefCurrent = imgRef.current;
        const dectDiv: DOMRect = imgRefCurrent?.getBoundingClientRect() as DOMRect;
        console.log("e.clientX - dectDiv.left", e.clientX - dectDiv.left, e.clientY - dectDiv.top);
        // const { animateVar: { largerCount } } = computedStyle;
        setRelativePos({
            x: e.clientX - dectDiv.left,
            y: e.clientY - dectDiv.top
        })

    }
    const onMoveImg = (e: React.MouseEvent) => {
        if (hasMouseDowned) {

            const relativeX = relativePos?.x || 0;
            const relativeY = relativePos?.y || 0;
            const { animateVar: { largerCount } } = computedStyle
            dispatchComputedStyle({
                type: "move",
                payload: {
                    x: e.clientX - relativeX * (1 / largerCount) - (imgContentDect as DOMRect).left,
                    y: e.clientY - relativeY * (1 / largerCount) - (imgContentDect as DOMRect).top * (1 / largerCount)
                }
            })
        }
    }
    const mouseupHandle = () => {

        setHasDowned(false);
    }
    const mouseleavehandle = () => {
        setHasDowned(false);
    }
    return <div className="prev-wrapper" >
        <div className="main-content" ref={contentRef} onMouseLeave={mouseleavehandle}>
            <div className="main-img">
                <img src={imgUrl} alt="预览图片" ref={imgRef} className="img-item-trans" style={computedStyle.style} onMouseMove={onMoveImg} onMouseDown={onMousedownImg} onMouseUp={mouseupHandle} />
            </div>

            <div className="bottom-oper" onClick={transImg}>
                <button data-tran-type="Clockwise">顺时针旋转</button>
                <button data-tran-type="AntiClockwise">逆时针旋转</button>
                <button data-tran-type="Larger">放大</button>
                <button data-tran-type="Smaller">缩小</button>
            </div>
        </div>
    </div>;
}

export { ImgPrev20220205 };