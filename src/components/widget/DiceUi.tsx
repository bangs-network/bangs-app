import parseUrl, {convertPercent} from "../../util/common";
import * as React from "react";
import {ColumnCenterWrapper, RowContentCenterWrapper} from "../../theme/commonStyle";
import DiceIcon from "../../img/dice.png";
import {useState} from "react";
import {saveRoleState} from "../../pages/state/slice/roleSlice";
import {useEffect} from "react";
import {number} from "prop-types";
import { CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

interface Info {
    item2: any
}

const DiceUi = ({item2}: Info) => {

    const [percent, setPercent] = useState<number>(0);


    useEffect(() => {
        setPercent(Number(convertPercent(item2.DiceValue,item2.DiceOriginValue)))
    }, [item2]);

    return  <ColumnCenterWrapper style={{margin: '0px 30px'}}>

        <RowContentCenterWrapper style={{fontSize:15,fontWeight:'bold',marginBottom:8}}>
            <div>{item2.DiceValue}<span style={{fontSize:13,fontWeight:'normal',color:'#C4C4C4'}}>/{item2.DiceOriginValue}</span></div>
            <img style={{width:12,height:13,marginLeft:5,marginTop:3}} src={DiceIcon}/>
        </RowContentCenterWrapper>

        <div style={{fontSize:10, marginBottom:8,textAlign:'center',lineHeight:'20px',borderRadius:20,width:80,height:20,color:'#fff',background: percent < 50?"#E13542":percent==50?'#2889E3':'#5CC55E'}}>
            {percent < 50?'big failure':percent == 50?'success':'big success'}

        </div>


        <div style={{width: 80, height: 80}}>


            <CircularProgressbarWithChildren  value={percent} styles={buildStyles({
                pathColor: percent < 50?"#E13542":percent==50?'#2889E3':'#5CC55E',
                trailColor: "#eee"
            })}>


                <img style={{width: 55, height: 55, borderRadius: 40}}
                     src={parseUrl(item2.Role.avator)}/>
            </CircularProgressbarWithChildren>
        </div>

        <div style={{fontSize:13,fontWeight:'bold',marginTop:5,overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'}}>
            {item2.Role.RoleName}
        </div>


    </ColumnCenterWrapper>

};

export default DiceUi;