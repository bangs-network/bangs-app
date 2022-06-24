import {RowItemCenterWrapper} from "../../theme/commonStyle";
import * as React from "react";
import DiceIcon from "../../img/dice_type.png";
import TalkIcon from "../../img/talk.png";
import ExpressionTypeIcon from "../../img/expression_type.png";

interface Info {
    item: any
}

const PointTypeUi = ({item}: Info) => {



    return <RowItemCenterWrapper>
        {
            item.timelineType == 2?<img style={{width:26,height:26}} src={ExpressionTypeIcon} />:
            item.timelineType == 3?<img style={{width:26,height:26}} src={TalkIcon} />:
            item.timelineType == 4?<img style={{width:26,height:26}} src={DiceIcon} />: <></>
        }
        {
            item.timelineType == 2?<div style={{fontSize:16,fontWeight:'bold',marginLeft:15,color:'#000'}}>Expression</div>:
                item.timelineType == 3?<div style={{fontSize:16,fontWeight:'bold',marginLeft:15,color:'#000'}}>Talks</div>:
                    item.timelineType == 4?<div style={{fontSize:16,fontWeight:'bold',marginLeft:15,color:'#000'}}>Dice</div>: <></>
        }
    </RowItemCenterWrapper>

};


export default PointTypeUi;