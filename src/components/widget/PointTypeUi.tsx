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
            item.timelineType == 2?<img style={{width:20,height:20}} src={ExpressionTypeIcon} />:
            item.timelineType == 3?<img style={{width:20,height:20}} src={TalkIcon} />:
            item.timelineType == 4?<img style={{width:20,height:20}} src={DiceIcon} />: <></>
        }
        {
            item.timelineType == 2?<div style={{fontSize:13,fontWeight:'bold',marginLeft:11}}>Expression</div>:
                item.timelineType == 3?<div style={{fontSize:13,fontWeight:'bold',marginLeft:11}}>Talks</div>:
                    item.timelineType == 4?<div style={{fontSize:13,fontWeight:'bold',marginLeft:11}}>Dice</div>: <></>
        }
    </RowItemCenterWrapper>

};


export default PointTypeUi;