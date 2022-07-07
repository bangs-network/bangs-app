import parseUrl, {convertPercent} from "../../util/common";
import * as React from "react";
import {
    ColumnCenterWrapper, ColumnRightBottomWrapper,
    FixUi,
    RowContentCenterWrapper,
    RowItemCenterWrapper,
    RowWrapper
} from "../../theme/commonStyle";
import ExpressionLeftIcon from "../../img/expression_left.png";
import ExpressionBottomIcon from "../../img/expression_bottom.png";
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
    item2: any,
    color: any,
}

const ExpressionLock = ({item2,color}: Info) => {



    return <div style={{
        background: 'linear-gradient(93.55deg, #F2F4F6 -4.78%, #EAEAF6 53.02%, #D2E4FC 88.39%)',
        border: '2px solid #0620F9',
        borderColor:color,
        borderRadius: 12
    }}>
        <div style={{
            width: 76,
            height:22,
            background: color,
            borderRadius: '10px 0px'
        }}>
            <img style={{width: 50,marginLeft:10,marginTop:4}} src={ExpressionLeftIcon}/>
        </div>
        <div style={{
            color: color,
            marginTop:20,
            fontSize: 18,
            fontWeight:'bold',
            marginLeft: 22
        }}>Card has been locked.
        </div>
        <RowWrapper style={{ marginLeft: 22}}>
            <div>
                <div style={{
                    color: '#868990',
                    fontSize: 13,
                    marginTop:5,
                    marginBottom:8,
                }}>Who can view?</div>
                <RowItemCenterWrapper  style={{
                    padding: 0
                }}>
                {item2.visibleRoles && item2.visibleRoles.map((item3: any, index: number) => {
                    return <img key={index} style={{
                                width: 54,
                                height: 54,
                        marginRight:17,
                                borderRadius: '50px',
                            }}
                                 src={parseUrl(item3.avator)}/>


                })}
                </RowItemCenterWrapper>
            </div>
            <FixUi/>
            <ColumnRightBottomWrapper>
                <img style={{width:86,borderBottomRightRadius:12}} src={ExpressionBottomIcon}/>
            </ColumnRightBottomWrapper>
        </RowWrapper>


    </div>

};

export default ExpressionLock;