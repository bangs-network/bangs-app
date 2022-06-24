import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonMenuButton,
    IonTabButton,
    IonPage,
    IonPopover,
    IonRow,
    IonTabBar,
    IonTabs,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    IonSegmentButton,
    IonSegment,
    IonTextarea,
    IonSelectOption,
    IonSelect,
    IonFab,
    IonFabButton, useIonToast, IonLoading, IonRefresher, IonRefresherContent, RefresherEventDetail, IonInput
} from '@ionic/react';
import {
    addCircle,
    addCircleOutline,
    arrowForwardCircle,
    calendar,
    chevronDownCircleOutline,
    send
} from "ionicons/icons";
import * as React from "react";
import moreIcon from "../../img/more.png";
import addIcon from "../../img/add_circle.png";
import addGrayIcon from "../../img/add_circle_gray.png";
import rightRedIcon from "../../img/right_red.png";
import rightBlueIcon from "../../img/right_blue.png";
import DiceIcon from "../../img/dice.png";
import ReviewIcon from "../../img/review_black.png";
import UnlockIcon from "../../img/unlock.png";
import LockIcon from "../../img/lock_blue.png";
import RoleBgIcon from "../../img/role_bg.png";
import RoleNewIcon from "../../img/new_role.png";
import PointIcon from "../../img/point.png";
import BackIcon from "../../img/back.png";

import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {RouteComponentProps} from "react-router";
import './detail.scss';
import {useEffect} from "react";
import axios from "axios";
import parseUrl, {convertPercent, getPoint} from "../../util/common";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {saveRoleState} from "../state/slice/roleSlice";
import {
    RoleCreateApi, RoleSearchApi, RoleVerifyApi,
    TalkBongApi,
    TalkCreateApi,
    TimelineThemeApi,
    VerseDetailApi,
    VersePointApi
} from "../../service/Api";
import UploadImage from "../../components/widget/UploadImage";
import {
    ColumnCenterWrapper,
    ColumnItemCenterWrapper, ColumnWrapper,
    FixUi,
    RowContentCenterWrapper,
    RowItemCenterWrapper, RowRightWrapper, RowWrapper
} from "../../theme/commonStyle";

import DiceUi from "../../components/widget/DiceUi";
import {Sticky, StickyContainer} from "react-sticky";
import PointTypeUi from "../../components/widget/PointTypeUi";


interface MenuProps extends RouteComponentProps {
}

let start = 1;

const VerseDetail: React.FC<MenuProps> = ({history, match}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [isKeeper, setIsKeeper] = useState(0);
    const [replyId, setReplyId] = useState(0);
    const [replyContent, setReplyContent] = useState('');
    const [showSend, setShowSend] = useState(false);
    const [roleStatus, setRoleStatus] = useState<any>("1");
    const [roleName, setRoleName] = useState<any>("");
    const [roleImage, setRoleImage] = useState<any>("");
    const [note, setNote] = useState<any>("");
    const [body, setBody] = useState<any>();
    const [list, setList] = useState<any>();
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const [verseId, setVerseId] = useState<number>();
    const pageRef = useRef<HTMLElement>(null);
    const loadState = useAppSelector(state => state.loadStateSlice);
    const dispatch = useAppDispatch();
    const [roleList, setRoleList] = useState<any>([]);
    const [timeList, setTimeList] = useState<any>([]);
    const [bongList, setBongList] = useState<any>([]);
    const [talkContent, setTalkContent] = useState<any>('');
    const [role, setRole] = useState<any>();
    const [present, dismiss] = useIonToast();
    const [opacityBackColor, setOpacityBackColor] = useState<string>('rgba(0,0,0,1)');
    const roleData: any = useAppSelector(state => state.roleSlice);
    const [showLoading, setShowLoading] = useState(false);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const contentRef = useRef<any>(null);


    const presentPopover = (e: React.MouseEvent) => {
        console.info("presentPopover===")
        if (!localStorage.getItem("SessionID")) {
            present('Please Login', 3000);
            return
        }
        if (timeList[timeList.length - 1].timelineType == 3) {
            if (timeList[timeList.length - 1].fixed == 0) {
                present('There is a talk need to be fix', 3000);
                return
            }
        }
        console.info("presentPopover2===")
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    const back = (e: React.MouseEvent) => {
        history.goBack()
    };

    useIonViewWillEnter(() => {
        dispatch(saveLoadState({tag: 'VerseDetail', state: 0}));
        start = 1;
        getData();
        getRoles();
    });


    useEffect(() => {
        console.info(loadState)
        if (loadState && loadState.tag == 'VerseDetail' && loadState.state == 1) {
            start = 1;
            getData();
            getRoles();
        }
    }, [loadState.tag]);


    const scrollToBottom = () => {
        const timer = setTimeout(() => contentRef.current?.scrollToBottom(), 1000);
        return () => clearTimeout(timer);
    };

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        if (start == 1) {
            start = 2
        }
        getData();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 3000);
    };

    const getData = () => {
        let params: any = match.params
        console.info(params.id);
        setVerseId(params.id);
        const data = {
            ID: Number(params.id),
            Start: start,
            Offset: 10
        };
        VerseDetailApi(data).then(function (body: any) {
            if (body) {

                if (start == 1) {
                    setTimeList([]);
                    setBody(body)

                }


                setIsKeeper(body.IsKeeper);

                let sTimeList = body.Timelines;
                console.info("sTimeList===", sTimeList)

                if (sTimeList && sTimeList.length > 0) {

                    let timelineList = [];
                    if (start == 1) {
                        timelineList = sTimeList
                        setTimeList(sTimeList);
                    } else {
                        timelineList = [...sTimeList, ...timeList];
                        setTimeList(timelineList);
                    }

                    console.info("timelineList11===", timelineList)
                    start = start + 1;
                } else {
                    setInfiniteDisabled(true)
                }

                if (start <= 2) {
                    scrollToBottom()
                }

            }
        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });

    };

    const getTheme = (themeID: number, timelineList: any) => {
        const data = {
            ID: Number(themeID)
        };
        let list: any = [];
        console.info("list1234=", timelineList)

        TimelineThemeApi(data).then(function (response: any) {
            if (response?.data?.body) {
                let themeBody = response?.data?.body
                let themeItem = {
                    backgroundColor: themeBody.backgroundColor,
                    dices: [],
                    expression: "",
                    likeCount: 0,
                    mainColor: themeBody.mainColor,
                    mainPic: themeBody.mainPic,
                    music: themeBody.music,
                    talkID: 0,
                    talkList: [],
                    theme: {ThemeID: themeID},
                    timelineType: 1,
                    verseId: timelineList[0].verseId,
                };
                list.push(themeItem)
                for (let i = 0; i < timelineList.length; i++) {
                    let item = timelineList[i];
                    if (item.timelineType == 1) {
                        list.push(item)
                    } else {
                        let points: any = list[list.length - 1].points;
                        console.info("list.length=", list.length - 1);
                        if (!points) {
                            console.info("points=", points);
                            list[list.length - 1].points = []
                        }
                        if (!list[list.length - 1].points.includes(item)) {
                            list[list.length - 1].points.push(item)
                        }

                    }

                }
                let newList = [...list];

                setList(newList)
                if (start <= 2) {
                    scrollToBottom()
                }
            }
        })

    };

    const getRoles = () => {
        let params: any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id)
        };
        RoleSearchApi(data).then(function (response: any) {
            if (response?.roleList) {
                setRoleList(response.roleList)
                //setRole(response?.data?.body?.roleList[0])
            }
        })
    };

    const toRoleDetail = (roleId: number) => {
        history.push(`/roleDetail/${roleId}`);
    };

    const showSendMsg = (e: any) => {
        e.stopPropagation();
        setReplyId(0);
        setShowSend(!showSend);
    };

    const reply = (e: any, talkId: any, talkContent: any) => {
        e.stopPropagation();
        setRoleStatus("1");
        setShowSend(!showSend);
        if (!role){
            const role = roleList[0];
            setRole(role);
        }

        setReplyId(talkId);
        setReplyContent(talkContent)
    };

    const bongItem = (e: any, talkId: any) => {
        e.stopPropagation();
        for (let i = 0; i < bongList.length; i++) {
            if (bongList[i] == talkId) {
                bongList.splice(i, 1);
                setBongList([...bongList]);
                return
            }
        }

        bongList.push(talkId);
        setBongList([...bongList])

    };

    const bong = (e: any) => {
        e.stopPropagation();
        if (!bongList || bongList.length < 1) {
            present('Please Select bong Item', 3000);
            return
        }

        const data = {
            TalkIDs: bongList,
        };
        setShowLoading(true);
        TalkBongApi(data).then(function (response: any) {
            start = 1;
            getData();
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });

    };


    const sendMsg = () => {

        let roleId = 0;
        if (!role) {
            if (!roleImage) {
                present('Please upload role image', 3000);
                return
            }
            if (!roleName) {
                present('Please fill role Name', 3000);
                return
            }

            if (!note) {
                present('Please fill role detail', 3000);
                return
            }

        } else {
            if (!role || !role.roleId) {
                present('Please Select role', 3000);
                return
            }

            roleId = role.roleId;
        }

        const talkId = body.Timelines[body.Timelines.length - 1].talkID;


        if (!talkContent || talkContent.length < 1) {
            present('Please fill content', 3000);
            return
        }
        const data = {
            RoleId: roleId,
            TalkId: talkId,
            RoleName: roleName,
            Note: note,
            RoleAvator: roleImage,
            ReplyTalkID: replyId,
            TalkContent: talkContent.replace(/(\r\n)|(\n)/g, '<br/>')
        };
        setShowLoading(true);
        TalkCreateApi(data).then(function (response: any) {
            setShowSend(false);
            setTalkContent("");
            setRoleName("");
            setRoleImage("");
            setNote("");
            start = 1;
            getData();
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error);
            present(error ? error : 'NetWork error', 3000);
            setShowLoading(false)
        });


    };

    const verify = (roleId: number) => {


        const data = {
            RoleID: roleId,
        };
        setShowLoading(true);
        RoleVerifyApi(data).then(function (response: any) {
            start = 1;
            getData();
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });


    };

    const toRole = () => {
        history.push(`/roles/${verseId}`)
    }


    const hexToRgba = (bgColor: string) => {
        return bgColor;

        if (!bgColor) {
            return
        }

        let color = bgColor.slice(1);

        let rgba = [

            parseInt('0x' + color.slice(0, 2)),

            parseInt('0x' + color.slice(2, 4)),

            parseInt('0x' + color.slice(4, 6)),

            0.4

        ];


        return 'rgba(' + rgba.toString() + ')';

    };


    return (
        <IonPage id='about-page'>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start" onClick={back}>
                        <img className='cursor' style={{width: 32, height: 32,marginLeft:20}} src={BackIcon}/>
                    </IonButtons>
                    <IonTitle style={{
                        fontSize: 24,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>{body ? body.verseName : 'Bangs'}</IonTitle>
                    {isKeeper == 1 &&
                        <IonButtons  slot="end" onClick={presentPopover}>
                            <img className='cursor' style={{width: 32, height: 32,marginRight:20}} src={PointIcon}/>
                        </IonButtons>
                    }
                </IonToolbar>


            </IonHeader>
            <IonContent style={{position: 'relative'}} ref={contentRef} onClick={(e) => {
                e.stopPropagation();
                setShowSend(false)
            }}>


                <IonRefresher slot="fixed" style={{background: '#fff', color: '#000'}} onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing...">
                    </IonRefresherContent>
                </IonRefresher>

                <IonList lines="none" style={{padding: 0, border: 0, margin: 0, background: '#f5f5f5'}}>


                    {timeList && timeList.length > 0 && timeList.map((item1: any, index1: number) => {

                        return <>
                            <div key={index1} className='cursor'
                                 style={{
                                     marginLeft: item1.timelineType == 1 ?0:8,
                                     marginRight: item1.timelineType == 1 ?0:8,
                                     border: item1.timelineType == 1 ?'none':'1px solid #E3E3E3',
                                     background: '#fff',
                                     color: '#000',
                                     marginBottom: 12,
                                     borderRadius: 12
                                 }}
                            >


                                {
                                    item1.timelineType == 1 ? item1.mainPic ?
                                        <IonItemDivider sticky style={{
                                            padding: 0,
                                            border: 0,
                                            margin: 0
                                        }}>
                                            <img src={parseUrl(item1.mainPic)} style={{
                                                width: '100vw',
                                                height: 220,
                                                objectFit: 'cover'
                                            }}/>
                                        </IonItemDivider> : <></> :
                                        item1.timelineType == 2 ? <div style={{paddingTop: 15, paddingBottom: 12}}>

                                            <div style={{margin: '0 12px 15px 12px'}}>
                                                <PointTypeUi item={item1}/>
                                            </div>


                                            {item1.expressionTitle && <div style={{
                                                fontSize: 16,
                                                padding: '0 12px 12px 12px',
                                                fontWeight: 'bold'
                                            }}>{item1.expressionTitle}</div>}
                                            {item1.visible ? <>{item1.mainPic &&
                                            <div style={{padding: '0px 12px 12px 12px'}}><img
                                                src={parseUrl(item1.mainPic)} style={{
                                                border: 0,
                                                borderRadius: 12,
                                                width: '100%',
                                                height: 200,
                                                objectFit: 'cover'
                                            }}/></div>}
                                                <div style={{padding: '0px 12px 12px 12px'}}
                                                     dangerouslySetInnerHTML={{__html: item1.expression}}>
                                                </div>
                                            </> : <div style={{
                                                width: '100%',
                                                height: 220,
                                                lineHeight: '220px',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                background: 'red',
                                                textAlign: 'center'
                                            }}>Only some roles can see this expression</div>}
                                        </div> : item1.timelineType == 4 ?
                                            <div style={{paddingTop: 15}}>
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
                                                </RowItemCenterWrapper></div> : item1.timelineType == 3 ?
                                                <div style={{paddingTop: 15}}>
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
                                                                            width: 30,
                                                                            height: 30,
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
                                                            <img style={{
                                                                height: 16,
                                                            }}
                                                                 src={rightBlueIcon}/>
                                                        </RowItemCenterWrapper>
                                                        <div>
                                                            <div style={{margin: 12}}>
                                                                {item1.talkList && item1.talkList.map((item4: any, index3: number) => {
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
                                                                                    <img style={{width: 20, height: 20}}
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

                                                                            <div onClick={()=>toRoleDetail(item4.role.roleID)} style={{
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
                                                                            <RowRightWrapper onClick={()=>toRoleDetail(item4.role.roleID)} style={{
                                                                                marginTop: 15
                                                                            }}><img style={{height: 18}}
                                                                                    onClick={(e) => reply(e, item4.talkID, item4.talkContent)}
                                                                                    src={ReviewIcon}/>
                                                                                {isKeeper && <img
                                                                                    style={{marginLeft: 20, height: 18}}
                                                                                    src={!bongList.includes(item4.talkID) ? UnlockIcon : LockIcon}
                                                                                    onClick={(e) => {
                                                                                        bongItem(e, item4.talkID);
                                                                                    }
                                                                                    }/>}
                                                                            </RowRightWrapper>}
                                                                            {index3 != item1.talkList.length - 1 && !item4.newRole &&
                                                                            <div style={{
                                                                                borderTop: '1px solid #B6BDC9',
                                                                                marginTop: '10px'
                                                                            }}/>}
                                                                        </div>
                                                                    </RowWrapper>
                                                                        {
                                                                            item4.newRole &&
                                                                            <div key={index3} className='new-role'>
                                                                                <img style={{
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    position: 'relative'
                                                                                }} src={RoleBgIcon}/>
                                                                                <ColumnWrapper style={{
                                                                                    position: 'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    bottom: 0,
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    padding: '12% 15px 0 15px'

                                                                                }}>
                                                                                    <RowItemCenterWrapper
                                                                                    >
                                                                                        <img
                                                                                            onClick={()=>toRoleDetail(item4.role.roleID)}
                                                                                            className='icon-circle'
                                                                                            style={{
                                                                                                width: 54,
                                                                                                height: 54,
                                                                                                marginRight: 15
                                                                                            }}
                                                                                            src={parseUrl(item4.role.avator)}/>
                                                                                        <div style={{flex: 1}}>
                                                                                            <div style={{
                                                                                                fontSize: 12
                                                                                            }}>Global
                                                                                            </div>
                                                                                            <div style={{
                                                                                                marginTop: 5,
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: 16
                                                                                            }}>{item4.role.roleName}</div>
                                                                                        </div>
                                                                                        {item4.role.fixed != 1 && <div onClick={()=>verify(item4.role.roleID)} style={{
                                                                                            width: 90,
                                                                                            height: 28,
                                                                                            color: '#fff',
                                                                                            lineHeight: '28px',
                                                                                            textAlign: 'center',
                                                                                            background: '#0620F9',
                                                                                            borderRadius: 20
                                                                                        }}>Verify
                                                                                        </div>}
                                                                                    </RowItemCenterWrapper>
                                                                                    <FixUi style={{minHeight: 22}}/>
                                                                                    <RowItemCenterWrapper onClick={()=>toRoleDetail(item4.role.roleID)} style={{
                                                                                        borderTop: '1px solid #0620F9',
                                                                                        padding: '10px 0 20px 0'
                                                                                    }}>
                                                                                        <div style={{
                                                                                            fontWeight: 'bold',
                                                                                            color: '#0620F9'
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
                                                                        }</>
                                                                })}

                                                            </div>
                                                            {index1 == timeList.length - 1 && item1.fixed != 1 &&
                                                            <div
                                                                style={{
                                                                    width: '100%',
                                                                    borderTop: '1px solid #B6BDC9',
                                                                    padding: '12px 12px 12px 12px'
                                                                }}>
                                                                <div onClick={(e) => showSendMsg(e)} style={{
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
                                                </div> : <></>
                                }

                            </div>
                            {index1 === timeList.length - 1 && timeList[timeList.length - 1].timelineType == 3 && item1.fixed != 1 &&
                            <div className='cursor'>
                                <ColumnCenterWrapper style={{
                                    background: '#fff',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    margin: '0 12px 12px 12px',
                                    height: 54,
                                    textAlign: 'center',
                                    borderRadius: 40
                                }} onClick={(e) => bong(e)}>
                                    <div>BONG</div>
                                    <div style={{fontSize: 12, fontWeight: 'normal', color: '#B6BDC9'}}>Long Press</div>
                                </ColumnCenterWrapper>
                            </div>
                            }</>
                    })}


                </IonList>

            </IonContent>

            {
                showSend && body && body.Timelines && body.Timelines.length > 0 && body.Timelines[body.Timelines.length - 1].timelineType == 3 &&
                <IonFooter className='cursor'
                           style={{background: '#fff', textAlign: 'center', fontWeight: 'bold'}}>

                    <RowItemCenterWrapper style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        height: 32,
                        fontSize: 12,
                        borderBottom: '1px solid #C4C4C4',
                        color: '#000'
                    }}>
                        <div>{role ? (<div><span style={{color: '#B6BDC9'}}>Play as </span>{role.roleName}
                        </div>) : 'Create new role'}</div>
                    </RowItemCenterWrapper>

                    <RowItemCenterWrapper style={{padding: 0, margin: 16}}>
                        {roleList && roleList.map((item3: any, index: number) => {
                            return <RowItemCenterWrapper key={index} onClick={() => {
                                setRole(item3)
                            }}>
                                <img style={{
                                    width: role && role.roleId == item3.roleId ? 40 : 32,
                                    height: role && role.roleId == item3.roleId ? 40 : 32,
                                    borderRadius: 32,
                                    marginRight: 16,
                                    border: role && role.roleId == item3.roleId ? '2px solid #F8616C' : 'none'
                                }}
                                     src={parseUrl(item3.roleAvator)}/></RowItemCenterWrapper>
                        })}
                        <RowItemCenterWrapper>
                            <img onClick={() => {
                                setRole(null)
                            }} style={{
                                width: !role ? 40 : 32,
                                height: !role ? 40 : 32, borderRadius: 32, marginRight: 16
                            }} src={addIcon}/>
                        </RowItemCenterWrapper>
                    </RowItemCenterWrapper>

                    <div style={{borderBottom: '1px solid #C4C4C4'}}/>

                    {
                        !role && <><IonItem lines='none' style={{margin: '10px 0'}}>
                            <RowItemCenterWrapper style={{width: '100%'}}>
                                <UploadImage imgUrl={roleImage} setImgUrl={setRoleImage} width={50}/>
                                <div style={{marginLeft: 15, width: '100%'}}>
                                    <IonTextarea className='input' rows={1} value={roleName}
                                                 placeholder="Input Role Name" style={{borderRadius: 6, paddingLeft: 8}}
                                                 onIonChange={e => setRoleName(e.detail.value!)}/>
                                    <IonTextarea className='input' rows={2} style={{borderRadius: 6, paddingLeft: 8}}
                                                 value={note} placeholder="Input Role Detail"
                                                 onIonChange={e => setNote(e.detail.value!)}/>
                                </div>
                            </RowItemCenterWrapper>

                        </IonItem>
                            <div style={{borderBottom: '1px solid #C4C4C4'}}/>
                        </>
                    }


                    <IonItem lines='none' style={{margin: '10px 0'}}>
                        <div style={{width: '100%'}}>
                            {replyId > 0 && <div style={{
                                background: '#F1F3F5',
                                borderRadius: 100,
                                padding: '10px 20px',
                                fontSize: 14,
                                width: '100%',
                                color: '#000'
                            }}><span style={{color: '#C4C4C4'}}>Reply To: </span> {replyContent}</div>}
                            <IonTextarea rows={1} className='input' value={talkContent} placeholder="Say anything"
                                         onIonChange={e => setTalkContent(e.detail.value)}/>
                        </div>
                    </IonItem>
                    <button className='full-width common-button' onClick={sendMsg}>Send</button>
                </IonFooter>
            }

            <IonPopover
                isOpen={showPopover}
                event={popoverEvent}
                onDidDismiss={() => setShowPopover(false)}
            >
                <AddPopover dismiss={() => setShowPopover(false)} history={history} id={verseId} type={2}/>
            </IonPopover>
        </IonPage>
    );
};

export default VerseDetail;