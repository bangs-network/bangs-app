import parseUrl from "../../util/common";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import PointTypeUi from "../widget/PointTypeUi";
import {RowItemCenterWrapper} from "../../theme/commonStyle";
import DiceUi from "../widget/DiceUi";

interface Info {
    item1: any
}

const Dice = ({item1}: Info) => {


    return <div style={{paddingTop: 15}}>
        <div style={{margin: '0 12px 0 12px'}}>
            <PointTypeUi item={item1}/>
        </div>
        <RowItemCenterWrapper style={{
            padding: '5px 15px',
            overflowX: 'scroll',
            overflowY: 'hidden'
        }}>
            {item1.dices.map((item2: any, index2: number) => {
                return <DiceUi key={index2} item2={item2}/>
            })
            }
        </RowItemCenterWrapper></div>

};

export default Dice;