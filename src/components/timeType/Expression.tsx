import parseUrl from "../../util/common";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import PointTypeUi from "../widget/PointTypeUi";

interface Info {
    item1: any
}

const Expression = ({item1}: Info) => {


    return <div style={{paddingTop: 18, paddingBottom: 18}}>

        <div style={{margin: '0 12px 16px 12px'}}>
            <PointTypeUi item={item1}/>
        </div>


        {item1.expressionTitle && <div className='font-bold' style={{
            fontSize: 18,
            padding: '0 12px 12px 12px',
            fontWeight: 'bold'
        }}>{item1.expressionTitle}</div>}{item1.mainPic &&
    <div style={{padding: '0px 12px 12px 12px'}}><img
        src={parseUrl(item1.mainPic)} style={{
        border: 0,
        borderRadius: 12,
        width: '100%',
        height: 200,
        objectFit: 'cover'
    }}/></div>}
        <div style={{padding: '0px 12px 12px 12px', lineHeight: '21px'}}
             dangerouslySetInnerHTML={{__html: item1.expression}}>
        </div>
    </div>

};

export default Expression;