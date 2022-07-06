import parseUrl, {convertPercent} from "../../util/common";
import * as React from "react";
import {ColumnCenterWrapper, RowContentCenterWrapper, RowItemCenterWrapper} from "../../theme/commonStyle";
import DiceIcon from "../../img/dice.png";
import {useState} from "react";
import {saveRoleState} from "../../pages/state/slice/roleSlice";
import {useEffect} from "react";
import {number} from "prop-types";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

interface Info {
    item2: any
}

const HomeDiceUi = ({item2}: Info) => {

    const [percent, setPercent] = useState<number>(0);


    useEffect(() => {
        setPercent(Number(convertPercent(item2.DiceValue, item2.DiceOriginValue)))
    }, [item2]);

    return <ColumnCenterWrapper style={{
        borderRadius: 12,
        marginRight: '10px',
        minWidth: 104,
        background: percent < 50 ? 'linear-gradient(180deg, #FCE3E3 0%, #FFFFFF 94.27%)' : percent != 50 ? 'linear-gradient(180deg, #EFFCD4 0%, #FFFFFF 94.27%)' : 'linear-gradient(180deg, #ECF1FF 0%, #FFFFFF 94.27%)'
    }}>



        {/*<div style={{fontSize:10, marginBottom:8,textAlign:'center',lineHeight:'20px',borderRadius:20,width:80,height:20,color:'#fff',background: percent < 50?"#E13542":percent==50?'#2889E3':'#5CC55E'}}>*/}
        {/*{percent < 50?'big failure':percent == 50?'success':'big success'}*/}

        {/*</div>*/}


        <div style={{width: 80, height: 80,marginTop:12}}>


            <CircularProgressbarWithChildren value={percent} styles={buildStyles({
                pathColor: percent < 50 ? "#E13542" : percent == 50 ? '#2889E3' : '#5CC55E',
                trailColor: "#eee"
            })}>


                <img style={{width: 55, height: 55, borderRadius: 40}}
                     src={parseUrl(item2.Role.avator)}/>
            </CircularProgressbarWithChildren>
        </div>

        <div style={{
            fontSize: 16, marginTop: 5, overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }}>
            {item2.Role.roleName}
        </div>

        <RowItemCenterWrapper style={{fontWeight: 'bold', marginBottom: 2}}>
            <div className='font-bold'
                style={{fontSize: 32,color: percent < 50 ? "#E13542" : percent == 50 ? '#2889E3' : '#5CC55E'}}>{item2.DiceValue}</div>
            <div>
                <div style={{fontSize: 12, fontWeight: 'normal', color: '#868990'}}>/{item2.DiceOriginValue}</div>
                <img style={{width: 14, height: 15, marginLeft:5}} src={DiceIcon}/>
            </div>
        </RowItemCenterWrapper>


    </ColumnCenterWrapper>

};

export default HomeDiceUi;