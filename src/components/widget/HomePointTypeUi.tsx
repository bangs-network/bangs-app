
import * as React from "react";
import {getPoint} from "../../util/common";
import {getSimilarColor} from "../../util/getMainColor";

interface Info {
    item: any
}

const HomePointTypeUi = ({item}: Info) => {


    return <div style={{ marginTop:24,marginBottom: 7}}><span style={{
        color: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ?getSimilarColor(item.TimelineList[0].theme.BackgroundColor).badge.color :item.theme.BackgroundColor,
        fontSize:9,
        background: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ?getSimilarColor(item.TimelineList[0].theme.BackgroundColor).badge.background :'rgba(255, 255, 255, 0.5)',
        padding: '4px 15px',
        borderRadius: 76
    }}>{getPoint(item.timelineType)}</span></div>


};


export default HomePointTypeUi;