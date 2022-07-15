
import * as React from "react";
import {getPoint} from "../../util/common";
import {getSimilarColor} from "../../util/getMainColor";

interface Info {
    item: any
}

const HomePointTypeUi = ({item}: Info) => {


    return <div style={{ marginTop:5,marginBottom: 9,  padding: '0 15px'}}><span style={{
        color: '#8A6C5D',
        fontSize:9,
        background: '#F1F3F5',
        padding: '4px 12px',
        borderRadius: 76
    }}>{getPoint(item.timelineType)}</span></div>


};


export default HomePointTypeUi;