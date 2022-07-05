import parseUrl from "../../util/common";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import PointTypeUi from "../widget/PointTypeUi";
import {
    ColumnCenterWrapper,
    ColumnItemCenterWrapper,
    FixUi,
    RowItemCenterWrapper,
    RowRightWrapper,
    RowWrapper
} from "../../theme/commonStyle";
import DiceUi from "../widget/DiceUi";
import {IonGrid} from "@ionic/react";
import {ReactSVG} from "react-svg";
import NewRole from "./NewRole";
import addGrayIcon from "../../img/add_circle_gray.png";
import rightIcon from "../../img/right_black.svg";
import RoleNewIcon from "../../img/new_role.png";
import ReviewIcon from "../../img/review_black.png";

interface Info {
    item1: any,
    index1: any,
    roleList: any,
    verseId: number,
    history: any,
    timeList: any
}

const Talk = ({item1,index1,roleList,verseId,history,timeList}: Info) => {


    const toRoleDetail = (roleId: number) => {
        history.push(`/roleDetail/${roleId}`);
    };

    const toRole = () => {
        history.push(`/roles/${verseId}`)
    };


    const toVerse = () => {
        history.push(`/roles/${verseId}`)
    };




    return <div style={{paddingTop: 15,paddingBottom:15}}>
        <div style={{margin: '0 12px 15px 12px'}}>
            <PointTypeUi item={item1}/>
        </div>
        <IonGrid style={{margin: '12px 0 0 0', padding: 0}}>
            <RowItemCenterWrapper onClick={toRole} style={{
                padding: '4px 8px',
                background: '#F5F7F9',
                margin: '0px 35px 30px 35px',
                borderRadius: 40
            }}>
                {roleList && roleList.map((item3: any, index: number) => {
                    return index < 8 &&
                        <RowItemCenterWrapper key={index} style={{
                            padding: 0,
                            marginLeft: index != 0 ? -8 : 0
                        }}>
                            <img style={{
                                width: 32,
                                height: 32,
                                border: '2px solid #F1F3F5',
                                borderRadius: '50px',
                            }}
                                 src={parseUrl(item3.roleAvator)}/>

                        </RowItemCenterWrapper>
                })}
                {roleList && roleList.length > 0 && <div style={{
                    marginLeft: 10,
                    marginRight: 10,
                    height: 28,
                    width: 1,
                    background: '#B6BDC9'
                }}/>}
                <img style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50px',
                }}
                     src={addGrayIcon}/>
                <FixUi/>
                <ReactSVG
                    className="wrapper"
                    beforeInjection={(svg) => {
                        svg.classList.add('svg-class-name')
                        svg.setAttribute('style', 'fill: red')
                    }}
                    style={{
                        height: 16
                    }}
                    src={rightIcon}/>
            </RowItemCenterWrapper>
            <div>
                <div style={{margin: 12}}>
                    {item1.talkList && item1.talkList.length > 0 ? item1.talkList.map((item4: any, index3: number) => {
                            return <><RowWrapper key={index3}
                                                 style={{
                                                     width: '100%',
                                                     marginTop: 15,

                                                 }}>
                                {

                                    item4.newRole ?
                                        <ColumnItemCenterWrapper style={{
                                            width: 44,
                                            marginRight: 15
                                        }}>
                                            <img style={{
                                                width: 20,
                                                height: 20
                                            }}
                                                 src={RoleNewIcon}/>
                                            <div style={{
                                                height: '100%',
                                                width: 1,
                                                background: '#B6BDC9'
                                            }}/>
                                        </ColumnItemCenterWrapper> : <img
                                            className='icon-circle'
                                            style={{
                                                width: 44,
                                                height: 44,
                                                marginRight: 15
                                            }}
                                            src={parseUrl(item4.role.avator)}/>
                                }

                                <div style={{
                                    flex: 1,
                                    paddingBottom: item4.newRole ? 15 : 0
                                }}>

                                    <div
                                        onClick={() => toRoleDetail(item4.role.roleID)}
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 16
                                        }}>{item4.role.roleName}</div>
                                    {/*<div style={{*/}
                                    {/*marginTop: 5,*/}
                                    {/*color: '#999'*/}
                                    {/*}}>By {localStorage.getItem("name")}</div>*/}
                                    {item4.replyContent && <div style={{
                                        marginTop: 10,
                                        background: '#F1F3F5',
                                        borderRadius: 12,
                                        padding: '10px',
                                        color: '#000'
                                    }}
                                                                dangerouslySetInnerHTML={{__html: item4.replyContent}}/>}
                                    <div style={{marginTop: 5}}
                                         dangerouslySetInnerHTML={{__html: item4.talkContent}}/>
                                    {index1 == timeList.length - 1 && item1.fixed != 1 &&
                                    <RowRightWrapper
                                        onClick={() => toRoleDetail(item4.role.roleID)}
                                        style={{
                                            marginTop: 15
                                        }}><img style={{height: 18}}
                                                src={ReviewIcon}/>
                                    </RowRightWrapper>}
                                    {index3 != item1.talkList.length - 1 && !item4.newRole &&
                                    <div style={{
                                        borderTop: '1px solid #B6BDC9',
                                        marginTop: '10px'
                                    }}/>}
                                </div>
                            </RowWrapper>
                                {
                                    item4.newRole && <NewRole isKeeper={0} color={item1.theme.BackgroundColor} item={item4}
                                                              history={history} verseId={verseId}/>
                                }</>
                        }
                    ):<ColumnCenterWrapper>
                        <div style={{color:'#B6BDC9',fontSize:18,fontWeight:'bold'}}>No Comment</div>
                        <div style={{color:'#B6BDC9',fontSize:13,marginBottom:20,marginTop:5}}>Write a comment</div>
                    </ColumnCenterWrapper>}

                </div>
                {index1 == timeList.length - 1 && item1.fixed != 1 &&
                <div
                    style={{
                        width: '100%',
                        borderTop: '1px solid #B6BDC9',
                        padding: '12px 12px 12px 12px'
                    }}>
                    <div onClick={toVerse} style={{
                        width: '100%',
                        height: 40,
                        lineHeight: '40px',
                        paddingLeft: 15,
                        borderRadius: 30,
                        color: '#bcbcbc',
                        border: '1px solid #fff',
                        background: '#F5F7F9'
                    }}>Add a Comment
                    </div>
                </div>}
            </div>
        </IonGrid>
    </div>

};

export default Talk;