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
import DiceIcon from "../../img/dice.png";

import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {RouteComponentProps} from "react-router";
import './detail.css';
import {useEffect} from "react";
import axios from "axios";
import parseUrl, {convertPercent, getPoint} from "../../util/common";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {saveRoleState} from "../state/slice/roleSlice";
import {
    RoleCreateApi, RoleSearchApi,
    TalkBongApi,
    TalkCreateApi,
    TimelineThemeApi,
    VerseDetailApi,
    VersePointApi
} from "../../service/Api";
import UploadImage from "../../components/widget/UploadImage";
import {
    ColumnCenterWrapper,
    ColumnItemCenterWrapper,
    FixUi,
    RowContentCenterWrapper,
    RowItemCenterWrapper, RowWrapper
} from "../../theme/commonStyle";

import DiceUi from "../../components/widget/DiceUi";
import {Sticky, StickyContainer} from "react-sticky";


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
        console.info("presentPopover2===")
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
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

    const showSendMsg = (e: any) => {
        e.stopPropagation();
        setReplyId(0);
        setShowSend(!showSend);
    };

    const reply = (e: any, talkId: any, talkContent: any) => {
        e.stopPropagation();
        setRoleStatus("1");
        setShowSend(!showSend);
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

            const data = {
                VerseID: verseId,
                RoleName: roleName,
                Note: note,
                RoleAvator: roleImage,
            };

            setShowLoading(true);

            RoleCreateApi(data).then(function (response: any) {
                setShowLoading(false)
                send(response.roleId);
            }).catch(function (error: any) {
                console.info(error);
                setShowLoading(false)
            });

        } else {
            if (!role || !role.roleId) {
                present('Please Select role', 3000);
                return
            }

            const roleId = role.roleId;
            send(roleId)
        }


    };

    const send = (roleId: number) => {


        const talkId = body.Timelines[body.Timelines.length - 1].talkID;


        if (!talkContent || talkContent.length < 1) {
            present('Please fill content', 3000);
            return
        }
        const data = {
            RoleId: roleId,
            TalkId: talkId,
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
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle style={{
                        fontSize: 24,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>{body ? body.verseName : 'Bangs'}</IonTitle>
                    {isKeeper == 1 && <IonButtons slot="end">
                        <IonButton onClick={presentPopover}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>}
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

                <IonList lines="none" style={{padding: 0, border: 0, margin: 0, background: '#f8616c'}}>


                    {timeList && timeList.length > 0 && timeList.map((item1: any, index1: number) => {

                        return <>
                            <div key={index1} className='cursor'
                                 style={{
                                     marginLeft: 8,
                                     marginRight: 8,
                                     background: '#fff',
                                     color: '#000',
                                     marginBottom: 12,
                                     borderRadius: 8
                                 }}
                            >


                                {
                                    item1.timelineType == 1 ? item1.mainPic ?
                                        <IonItemDivider sticky style={{
                                            background: '#f8616c',
                                            padding: 0,
                                            border: 0,
                                            margin: 0
                                        }}>
                                            <img src={parseUrl(item1.mainPic)} style={{
                                                borderRadius: 12,
                                                width: '100vw',
                                                background: '#f8616c',
                                                height: 220,
                                                objectFit: 'cover'
                                            }}/>
                                        </IonItemDivider> : <></> :
                                        item1.timelineType == 2 ? <div style={{paddingTop: 12, paddingBottom: 12}}>

                                            <div style={{margin: '0 12px 12px 12px'}}>
                                                <button style={{
                                                    color: '#F8616C',
                                                    background: '#F1F3F5',
                                                    padding: '4px 10px',
                                                    borderRadius: 70
                                                }}>{getPoint(item1.timelineType)}</button>
                                            </div>

                                            {item1.visible ? <>{item1.mainPic &&
                                            <div style={{padding: '0px 12px 12px 12px'}}><img
                                                src={parseUrl(item1.mainPic)} style={{
                                                border: 0,
                                                borderRadius: 12,
                                                width: '100%',
                                                height: 200,
                                                objectFit: 'cover'
                                            }}/></div>}
                                                               {item1.expressionTitle && <div style={{
                                                                   fontSize: 16,
                                                                   padding: '0 12px 12px 12px',
                                                                   fontWeight: 'bold'
                                                               }}>{item1.expressionTitle}</div>}
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
                                            <div style={{paddingTop: 12}}>
                                                <div style={{margin: '0 12px 0 12px'}}>
                                                    <button style={{
                                                        color: '#F8616C',
                                                        background: '#F1F3F5',
                                                        padding: '4px 10px',
                                                        borderRadius: 70
                                                    }}>{getPoint(item1.timelineType)}</button>
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
                                                <div style={{paddingTop: 12}}>
                                                    <div style={{margin: '0 12px 12px 12px'}}>
                                                        <button style={{
                                                            color: '#F8616C',
                                                            background: '#F1F3F5',
                                                            padding: '4px 10px',
                                                            borderRadius: 70
                                                        }}>{getPoint(item1.timelineType)}</button>
                                                    </div>
                                                    <IonGrid style={{margin: '12px 0 0'}}>
                                                        <RowItemCenterWrapper onClick={toRole} style={{
                                                            padding: '4px 8px',
                                                            background: '#EDEFF1',
                                                            margin: '0px 35px',
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
                                                            <div style={{
                                                                marginLeft: 10,
                                                                marginRight: 10,
                                                                height: 28,
                                                                width: 1,
                                                                background: '#B6BDC9'
                                                            }}/>
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
                                                                 src={rightRedIcon}/>
                                                        </RowItemCenterWrapper>
                                                        <div style={{margin:12}}>
                                                            {item1.talkList && item1.talkList.map((item4: any, index3: number) => {
                                                                return <RowWrapper key={index3}
                                                                                   style={{
                                                                                       width: '100%',
                                                                                       marginTop: 15,
                                                                                   }}>
                                                                    <img
                                                                        className='icon-circle'
                                                                        style={{width: 44, height: 44, marginRight: 15}}
                                                                        src={parseUrl(item4.role.avator)}/>

                                                                    <div style={{flex: 1}}>

                                                                        <div style={{
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
                                                                        {index1 == timeList.length - 1 &&
                                                                        <div style={{
                                                                            marginTop: 15,
                                                                            fontSize: 12
                                                                        }}><span style={{
                                                                            color: '#F8616C',
                                                                            background: '#E9EDF2',
                                                                            padding: '4px 10px',
                                                                            borderRadius: 70
                                                                        }}
                                                                                 onClick={(e) => reply(e, item4.talkID, item4.talkContent)}>Reply</span>
                                                                            {isKeeper && <span style={{
                                                                                marginLeft: 10,
                                                                                color: !bongList.includes(item4.talkID) ? '#333' : '#fff',
                                                                                background: !bongList.includes(item4.talkID) ? '#E9EDF2' : '#F8616C',
                                                                                borderRadius: 70,
                                                                                padding: '4px 10px'
                                                                            }} onClick={(e) => {
                                                                                bongItem(e, item4.talkID);
                                                                            }
                                                                            }>Bong</span>}
                                                                        </div>}
                                                                        <div style={{
                                                                            borderTop: '0.5px solid #D6D6D6',
                                                                            marginTop: '20px'
                                                                        }}/>
                                                                    </div>
                                                                </RowWrapper>
                                                            })}
                                                            {index1 == timeList.length - 1 &&
                                                            <div
                                                                style={{
                                                                    width: '100%',
                                                                    marginBottom: 20,
                                                                    marginTop: 20
                                                                }}>
                                                                <div onClick={(e) => showSendMsg(e)} style={{
                                                                    width: '100%',
                                                                    height: 40,
                                                                    lineHeight: '40px',
                                                                    paddingLeft: 15,
                                                                    borderRadius: 30,
                                                                    color: '#bcbcbc',
                                                                    border: '1px solid #fff',
                                                                    background: '#F1F3F5'
                                                                }}>Add a Comment
                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </IonGrid>
                                                </div> : <></>
                                }

                            </div>
                            {index1 === timeList.length - 1 && timeList[timeList.length - 1].timelineType == 3 &&
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
                        <div>{role ? (<div><span style={{color:'#B6BDC9'}}>Play as </span>{role.roleName}</div>):'Create new role'}</div>
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