import {RowItemCenterWrapper} from "../../theme/commonStyle";
import * as React from "react";
import DiceIcon from "../../img/dice_white.png";
import TalkIcon from "../../img/talk_white.png";
import ExpressionTypeIcon from "../../img/expression_white.png";

interface Info {
    item: any
}

const PointTypeUi = ({item}: Info) => {



    return <RowItemCenterWrapper>
        {
            item.timelineType == 2?<img style={{borderRadius:20,width:20,height:20,padding:3,background:item.theme.BackgroundColor}} src={ExpressionTypeIcon} />:
            item.timelineType == 3?<img style={{borderRadius:20,width:20,height:20,padding:3,background:item.theme.BackgroundColor}} src={TalkIcon} />:
            item.timelineType == 4?<img style={{borderRadius:20,width:20,height:20,padding:3,background:item.theme.BackgroundColor}} src={DiceIcon} />: <></>
        }
        {
            item.timelineType == 2?<div className='font-bold' style={{fontSize:13,fontWeight:'bold',marginLeft:11}}>Expression</div>:
                item.timelineType == 3?<div className='font-bold' style={{fontSize:13,fontWeight:'bold',marginLeft:11}}>Talks</div>:
                    item.timelineType == 4?<div className='font-bold' style={{fontSize:13,fontWeight:'bold',marginLeft:11}}>Dice</div>: <></>
        }
    </RowItemCenterWrapper>

};


export default PointTypeUi;