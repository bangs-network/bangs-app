import parseUrl, {convertPercent} from "../../util/common";
import * as React from "react";
import {
    ColumnCenterWrapper, ColumnRightBottomWrapper, ColumnWrapper,
    FixUi,
    RowContentCenterWrapper,
    RowItemCenterWrapper,
    RowWrapper
} from "../../theme/commonStyle";
import ExpressionLeftIcon from "../../img/expression_left.png";
import ExpressionBottomIcon from "../../img/expression_bottom.png";
import NewRoleLeftIcon from "../../img/new_role_left_logo.png";
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
import {RoleVerifyApi} from "../../service/Api";
import rightBlueIcon from "../../img/right_black.png";
import RoleRightBgIcon from "../../img/role_right_bg.png";
import RoleLeftBgIcon from "../../img/role_left_bg.png";
import RoleBgIcon from "../../img/role_bg.png";

interface Info {
    item: any,
    history: any,
    color: any,
    isKeeper: any
}

const NewRole = ({color,item,history,isKeeper}: Info) => {

    const [showLoading, setShowLoading] = useState(false);

    const toRoleDetail = (roleId: number) => {
        history.push(`/roleDetail/${roleId}`);
    };


    const verify = (roleId: number) => {


        const data = {
            RoleID: roleId,
        };
        setShowLoading(true);
        RoleVerifyApi(data).then(function (response: any) {
            // start = 1;
            // getData();
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });


    };

    return <div style={{
        border: '2px solid #0620F9',
        borderColor:color,
        position:'relative',
        borderRadius: 12
    }}>
        <img style={{
            position: 'absolute',
            height: '100%',
            right: 0,
            top: 0,
        }} src={RoleRightBgIcon}/>
        <img style={{
            position: 'absolute',
            height: '60%',
            left: 0,
            bottom: 0,
            zIndex: 0
        }} src={RoleLeftBgIcon}/>
        <div style={{
            width: 76,
            height:22,
            background: color,
            borderRadius: '10px 0px'
        }}>
            <img style={{width: 50,marginLeft:10,marginTop:4}} src={NewRoleLeftIcon}/>
        </div>
        <ColumnWrapper style={{
            width: '100%',
            height: '100%',
            padding: '10px 15px 0 15px'

        }}>

            <RowItemCenterWrapper
            >
                <img
                    onClick={() => toRoleDetail(item.role.roleID)}
                    className='icon-circle'
                    style={{
                        width: 54,
                        height: 54,
                        marginRight: 15
                    }}
                    src={parseUrl(item.role.avator)}/>
                <div style={{flex: 1}}>
                    <div style={{
                        color:'#868990',
                        fontSize: 12
                    }}>Local
                    </div>
                    <div style={{
                        marginTop: 5,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>{item.role.roleName}</div>
                </div>
                {item.role.fixed != 1 && isKeeper == 1 &&
                <div
                    onClick={() => verify(item.role.roleID)}
                    style={{
                        width: 90,
                        height: 28,
                        color: '#fff',
                        lineHeight: '28px',
                        textAlign: 'center',
                        background: color,
                        borderRadius: 20
                    }}>Verify
                </div>}
            </RowItemCenterWrapper>
            <RowItemCenterWrapper
                onClick={() => toRoleDetail(item.role.roleID)}
                style={{
                    borderTop: '1px solid #0620F9',
                    borderColor: color,
                    height: 35,
                    marginTop:14,
                }}>
                <div style={{
                    fontWeight: 'bold',
                    zIndex:999,
                    color: color
                }}>Description
                </div>
                <FixUi/>
                <img style={{
                    height: 16,
                }}
                     src={rightBlueIcon}/>
            </RowItemCenterWrapper>
        </ColumnWrapper>
    </div>

};

export default NewRole;