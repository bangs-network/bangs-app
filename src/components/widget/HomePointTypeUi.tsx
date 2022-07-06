
import * as React from "react";
import {getPoint} from "../../util/common";
import {getSimilarColor} from "../../util/getMainColor";

interface Info {
    item: any
}

const HomePointTypeUi = ({item}: Info) => {


    return <div style={{ marginTop:24,marginBottom: 7,  padding: '0 17px',}}><span style={{
        color: item && item.theme ?(getSimilarColor(item.theme.BackgroundColor).isDarkColor?'#fff':'#F1F3F5') : '#F1F3F5',
        fontSize:9,
        background: item && item.theme ?getSimilarColor(item.theme.BackgroundColor).badge.background :'rgba(255, 255, 255, 0.5)',
        padding: '4px 15px',
        borderRadius: 76
    }}>{getPoint(item.timelineType)}</span></div>


};


export default HomePointTypeUi;