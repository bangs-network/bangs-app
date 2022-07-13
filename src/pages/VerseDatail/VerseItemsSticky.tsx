import * as React from "react";

// import {useEffect, useRef, createContext, forwardRef} from 'react';
//
// // Components
// import {VariableSizeList as List} from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
// import {Parallax,ParallaxBanner} from 'react-scroll-parallax';
// import parseUrl from "../../util/common";
import useVirtual from "react-cool-virtual";
import {Parallax, ParallaxProvider} from "react-scroll-parallax";
import {useEffect} from "react";

interface Props {
    dataArr: Array<any>;
    renderItem: (item: any, index: number, ref?: any) => any;

    sticky: {
        indexes: Array<number>;
        height: number;
        render: (index: number) => any;
    }
    scrollToBottom: boolean;
    onScrolledToBottom: ()=>void;
}

interface Box{
    head: Data
    body: Array<Data>
}

interface Data {
    index: number
    data: any
}

export const VerseItemsSticky: React.FC<Props> = ({dataArr,scrollToBottom,onScrolledToBottom, renderItem, sticky}) => {

    const [time,setTime] = React.useState(Date.now())
    const [visible,setVisible] = React.useState(0);
    const [offset,setOffset] = React.useState(0);
    const boxes:Array<Box> = [];
    for(let index of sticky.indexes){
        const item = dataArr[index];
        const themeId = item.theme.ThemeID
        const body:Array<Data> = []
        for(let i=0;i<dataArr.length;i++){
            const v = dataArr[i];
            if(v.theme.ThemeID == themeId && v["timelineType"] != 1){
                body.push({index:i,data:v})
            }
        }
        boxes.push({head: {index:index,data:item},body:body})
    }

    const {outerRef, innerRef, items,scrollToItem} = useVirtual({
        itemCount: boxes.length,
        resetScroll:true,
        // useIsScrolling:true,
        onScroll: event => {
            setTime(Date.now())
            setVisible(event.visibleStartIndex);
            setOffset(event.scrollOffset)
        }
        // The values must be provided in ascending order
        // stickyIndices: sticky.indexes,
    });

    if(boxes.length>0 && scrollToBottom ){
        scrollToItem(boxes.length-1)
        onScrolledToBottom()
    }

    return <>
        <ParallaxProvider>
        <div
            className="outer"
            style={{width: "100%", height: "100%", overflowY: "scroll",overflowX:"hidden"}}
            //@ts-ignore
            ref={outerRef}
        >
            {
                //@ts-ignore
                <div ref={innerRef}>
                    {items.map(({index, size,start, isSticky, measureRef}) => {
                        const box = boxes && boxes[index];
                        let bgColor;
                        try{
                            bgColor = box.head.data.theme.BackgroundColor;
                        }catch (e){
                            // console.log(e);
                        }

                        if(box && bgColor){
                            return <div ref={measureRef}  key={index} style={{position: "relative",background: bgColor}}>
                                <div className="sticky" style={{position: "sticky", top: "-140px"}}>
                                    <Parallax onProgressChange={v=>{
                                    }}
                                              //1,.06,1,-0.04
                                        scaleX={[1,3]} easing={[1,-0.02,1,-0.08]} startScroll={offset}
                                    >
                                        {renderItem(box.head.data,box.head.index)}
                                        {
                                            offset>0 &&
                                            <Parallax className="fixed-top" style={{background: bgColor}} onProgressChange={v=>{
                                            }}
                                                //1,.06,1,-0.04
                                                      opacity={[0,3]}
                                                      easing={[1,.06,1,-0.04]}
                                            >
                                            </Parallax>
                                        }

                                    </Parallax>
                                </div>
                                {
                                    box.body.map(v=>{
                                        return renderItem(v.data,v.index)
                                    })
                                }
                            </div>
                        }
                        return null;

                        // let style: any = {};
                        // // Use the `isSticky` property to style the sticky item, that's it ✨
                        // style = isSticky
                        //     ? {...style, position: "sticky", top: "-100px"}
                        //     : style;
                        // return (
                        //     <div
                        //         key={index}
                        //         className={`item ${isSticky ? "sticky" : ""}`}
                        //         style={style}
                        //         ref={measureRef}
                        //     >
                        //         {renderItem(dataArr[index], index)}
                        //     </div>
                        // );
                    })}
                </div>
            }
        </div>
        </ParallaxProvider>
    </>
}
