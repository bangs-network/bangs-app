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
import addIcon from "../../img/add.png";

import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {RouteComponentProps} from "react-router";
import './detail.css';
import {useEffect} from "react";
import axios from "axios";
import parseUrl, {getPoint} from "../../util/common";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {saveRoleState} from "../state/slice/roleSlice";
import {RoleCreateApi, TalkBongApi, TalkCreateApi, VersePointApi} from "../../service/Api";
import UploadImage from "../../components/widget/UploadImage";
import {ColumnCenterWrapper, RowItemCenterWrapper} from "../../theme/commonStyle";
import { CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

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

    useEffect(() => {
        console.info("roleData===")
        console.info(roleData)
        if (roleData && roleData.roleId > 0) {
            let role = {
                roleId: roleData.roleId,
                roleAvator: roleData.roleAvator,
                roleName: roleData.roleName,
            };
            setRole(role);
            dispatch(saveRoleState({roleId: 0, roleAvator: '', roleName: '', amount: ''}))
        }
    }, [roleData.roleId]);

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
            getData()
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
            ID: params.id,
            Start: start,
            Offset: 10
        };
        axios.get('https://api.bangs.network/verse/detail', {
            params: data
        }).then(function (response: any) {
            if (response?.data?.body) {

                if (start == 1) {
                    setTimeList([]);
                    setBody(response?.data?.body)

                }

                let list: any = [];


                setIsKeeper(response?.data?.body.IsKeeper);

                let sTimeList = response?.data?.body.Timelines;

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
                    if (timelineList && timelineList.length > 0) {
                        if (timelineList[0].timelineType != 1) {
                            getTheme(timelineList[0].theme.ThemeID, timelineList);
                            return
                        }

                        let item;
                        for (let i = 0; i < timelineList.length; i++) {
                            item = timelineList[i];
                            if (item.timelineType == 1) {
                                list.push(item)
                            } else {
                                let points: any = list[list.length - 1].points
                                if (!points) {
                                    list[list.length - 1].points = []
                                }
                                list[list.length - 1].points.push(item)
                            }
                        }
                        let newList = [...list];

                        setList(newList);

                        console.info("list333=", newList)
                    }
                } else {
                    setInfiniteDisabled(true)
                }

                if (start <= 2) {
                    scrollToBottom()
                }

            }
            console.info("list=", list)
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const getTheme = (themeID: number, timelineList: any) => {
        const data = {
            ID: Number(themeID)
        };
        let list: any = [];
        console.info("list1234=", timelineList)
        axios.get('https://api.bangs.network/timeline/theme', {
            params: data
        }).then(function (response: any) {
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
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const getRoles = () => {
        let params: any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id)
        };
        axios.get('https://api.bangs.network/role/search', {
            params: data
        }).then(function (response: any) {
            if (response?.data?.body?.roleList) {
                setRoleList(response?.data?.body?.roleList)
                //setRole(response?.data?.body?.roleList[0])
            }
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const showSendMsg = () => {
        setReplyId(0);
        setShowSend(!showSend);
    };

    const reply = (talkId: any, talkContent: any) => {
        setRoleStatus("1");
        setShowSend(!showSend);
        setReplyId(talkId);
        setReplyContent(talkContent)
    };

    const bongItem = (talkId: any) => {

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

    const bong = () => {
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

        if (roleStatus == "2") {
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

    const send = (roleId:number) => {


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
            <IonContent style={{position: 'relative'}} ref={contentRef}>


                <IonRefresher slot="fixed" style={{background: '#fff', color: '#000'}} onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing...">
                    </IonRefresherContent>
                </IonRefresher>

                <IonList lines="none" style={{padding: 0, border: 0, margin: 0}}>


                    {list && list.length > 0 && list.map((item: any, index0: number) => {

                        return <div key={index0} style={{
                            background: item.mainPic ? "url(" + parseUrl(item.mainPic) + ")" : 'none',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            color: item.mainColor,
                            backgroundSize: 'cover'
                        }}>
                            <div className={item.mainPic ? 'blur' : ''} style={{paddingBottom: 15}}>

                                {item.mainPic && <IonItemDivider sticky style={{padding: 0, border: 0, margin: 0}}>
                                    <img src={parseUrl(item.mainPic)} style={{
                                        padding: 0,
                                        border: 0,

                                        margin: 0,
                                        width: '100vw',
                                        height: 220,
                                        objectFit: 'cover'
                                    }}/>
                                </IonItemDivider>}

                                {item && item.points && item.points.length > 0 && item.points.map((item1: any, index1: number) => {

                                    return <IonCard key={index1} className='cursor'
                                                    style={{
                                                        marginLeft: 15,
                                                        marginRight: 15,
                                                        padding:'25px 20px',
                                                        background: item.mainPic ? hexToRgba(item.backgroundColor) : item.backgroundColor,
                                                        color: item.mainColor,
                                                        borderRadius:12,
                                                        marginBottom: 0
                                                    }}
                                    >
                                        <div style={{marginBottom:15}}><span style={{color:'#F8616C',background: '#E9EDF2',padding:'4px 10px',borderRadius:70}}>{getPoint(item1.timelineType)}</span></div>

                                        {
                                            item1.timelineType == 2 ? <div>
                                                {item1.visible ? <>{item1.mainPic &&
                                                <img src={parseUrl(item1.mainPic)} style={{
                                                    padding: 0,
                                                    border: 0,
                                                    margin: 0,
                                                    width: '100vw',
                                                    height: 220,
                                                    objectFit: 'cover'
                                                }}/>}
                                                    <div
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
                                            </div> : item1.timelineType == 4 ? <RowItemCenterWrapper style={{padding: '5px 15px'}}>
                                                {item1.dices.map((item2: any, index2: number) => {
                                                    return <ColumnCenterWrapper key={index2}  style={{margin: '0px 30px'}}>

                                                        <div style={{fontSize:13,fontWeight:'bold',marginBottom:14}}>
                                                            {item2.DiceValue}
                                                        </div>


                                                        <div style={{width: 75, height: 75}}>


                                                        <CircularProgressbarWithChildren  value={item2.DiceValue} styles={buildStyles({
                                                            pathColor: item2.DiceValue < 50?"#E13542":item2.DiceValue==50?'#2889E3':'#5CC55E',
                                                            trailColor: "#eee"
                                                        })}>


                                                        <img style={{width: 55, height: 55, borderRadius: 40}}
                                                             src={parseUrl(item2.Role.Avator)}/>
                                                        </CircularProgressbarWithChildren>
                                                        </div>

                                                        <div style={{fontSize:13,fontWeight:'bold',marginTop:5,overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'}}>
                                                            {item2.Role.RoleName}
                                                        </div>


                                                    </ColumnCenterWrapper>
                                                })
                                                }
                                            </RowItemCenterWrapper> : item1.timelineType == 3 ? <>
                                                <IonGrid style={{padding: '5px 15px', margin: '10px 0 0'}}>
                                                    <IonRow style={{padding: 0, margin: 0}}>
                                                        {roleList && roleList.map((item3: any, index: number) => {
                                                            return index < 5 &&
                                                                <IonCol key={index} style={{padding: 0, margin: 0}}
                                                                        size='2'><IonAvatar key={index}>
                                                                    <img style={{width: 50, height: 50}}
                                                                         src={parseUrl(item3.roleAvator)}/>
                                                                </IonAvatar></IonCol>
                                                        })}
                                                        <IonCol style={{padding: 0, margin: 0}} size='2'>
                                                            <IonAvatar>
                                                                <img style={{width: 50, height: 50}} src={moreIcon}/>
                                                            </IonAvatar>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        {item1.talkList && item1.talkList.map((item4: any, index3: number) => {
                                                            return <IonRow key={index3} style={{width: '100%'}}> <IonCol
                                                                size="2" style={{
                                                                padding: 0,
                                                                paddingRight: 10
                                                            }}>
                                                                <IonAvatar><img className='icon-circle full-width'
                                                                                src={parseUrl(item4.Role.Avator)}/></IonAvatar>

                                                            </IonCol>
                                                                <IonCol size="10">

                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: 16
                                                                    }}>{item4.Role.RoleName}</div>
                                                                    {/*<div style={{*/}
                                                                    {/*marginTop: 5,*/}
                                                                    {/*color: '#999'*/}
                                                                    {/*}}>By {localStorage.getItem("name")}</div>*/}
                                                                    {item4.ReplyContent && <div style={{
                                                                        marginTop: 10,
                                                                        background: '#F1F3F5',
                                                                        borderRadius: 12,
                                                                        padding: '10px',
                                                                        color: '#000'
                                                                    }}
                                                                                                dangerouslySetInnerHTML={{__html: item4.ReplyContent}}/>}
                                                                    <div style={{marginTop: 10}}
                                                                         dangerouslySetInnerHTML={{__html: item4.TalkContent}}/>
                                                                    {index0 == list.length - 1 && index1 == item.points.length - 1 &&
                                                                    <div style={{
                                                                        marginTop: 15,
                                                                        fontSize: 12
                                                                    }}><span style={{
                                                                        color:'#F8616C',background: '#E9EDF2',padding:'4px 10px',borderRadius:70
                                                                    }}
                                                                             onClick={() => reply(item4.TalkID, item4.TalkContent)}>Reply</span>
                                                                        {isKeeper && <span style={{
                                                                            marginLeft: 10,
                                                                            color:!bongList.includes(item4.TalkID) ?'#333':'#fff',
                                                                            background: !bongList.includes(item4.TalkID) ? '#E9EDF2' : '#F8616C',
                                                                            borderRadius: 70,
                                                                            padding: '4px 10px'
                                                                        }} onClick={() => {
                                                                            bongItem(item4.TalkID);
                                                                        }
                                                                        }>Bong</span>}
                                                                    </div>}
                                                                    <div style={{
                                                                        borderTop: '0.5px solid #D6D6D6',
                                                                        marginTop: '20px'
                                                                    }}/>
                                                                </IonCol>
                                                            </IonRow>
                                                        })}
                                                        {index0 == list.length - 1 && index1 == item.points.length - 1 &&
                                                        <IonRow
                                                            style={{width: '100%', marginBottom: 20, marginTop: 20}}>
                                                            <div onClick={showSendMsg} style={{
                                                                width: '100%',
                                                                height:40,
                                                                lineHeight: '40px',
                                                                paddingLeft: 15,
                                                                borderRadius: 30,
                                                                color: '#bcbcbc',
                                                                border: '1px solid #fff',
                                                                background: '#F1F3F5'
                                                            }}>Add a Comment
                                                            </div>
                                                        </IonRow>}
                                                    </IonRow>
                                                </IonGrid>
                                            </> : <></>
                                        }

                                    </IonCard>
                                })}
                            </div>

                            {index0 == list.length - 1 && body && body.Timelines && body.Timelines.length > 0 && body.Timelines[body.Timelines.length - 1].timelineType == 3 &&
                            <div className='ion-padding'>
                                <div style={{background:item.backgroundColor,color:item.mainColor,fontWeight:'bold',fontSize:16,height:50,lineHeight:'50px',textAlign:'center',borderRadius:40}} onClick={bong} >BONG</div>
                            </div>}
                        </div>

                    })}


                </IonList>

            </IonContent>

            {showSend && body && body.Timelines && body.Timelines.length > 0 && body.Timelines[body.Timelines.length - 1].timelineType == 3 &&
            <IonFooter className='ion-padding-start ion-padding-end cursor'
                       style={{background: '#fff', textAlign: 'center', fontWeight: 'bold'}}>


                <IonSegment style={{padding: 0, margin: 0}}
                            onIonChange={e => {
                                setRole(undefined);
                                setRoleStatus(e.detail.value)
                            }}>
                    <IonSegmentButton value="1">
                        <IonLabel style={{textTransform: 'none'}}>In Role</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="2">
                        <IonLabel style={{textTransform: 'none'}}>Make Role</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                <IonItem lines="none" style={{marginTop: 10}} onClick={() => {
                    if (roleStatus == "2") {
                        return
                    }
                    history.push({
                        pathname: `/searchRole/${verseId}`, state: {
                            select: 1
                        }
                    })
                }}>
                    {
                        role && role.roleId > 0 && <><IonAvatar slot="start">
                            <img src={parseUrl(role.roleAvator)}/>
                        </IonAvatar>
                            <IonLabel>{role.roleName}</IonLabel></>
                    }
                    {
                        roleStatus == "2" && !role && <>
                            <UploadImage imgUrl={roleImage} setImgUrl={setRoleImage} width={50}/>
                            <IonInput style={{marginLeft: 15, border: '1px solid #0620F9'}} value={roleName}
                                      placeholder="Input Role Name" onIonChange={e => setRoleName(e.detail.value!)}/>
                        </>
                    }
                    {roleStatus == "1" && !role &&
                    <IonLabel slot='start' style={{color: '#0620F9'}}>Select Role</IonLabel>}
                </IonItem>

                {
                    roleStatus == "2" && !role && <IonItem color='medium' style={{margin: '10px 0'}}>
                        <IonTextarea rows={2} value={note} placeholder="Input Role Detail"
                                     onIonChange={e => setNote(e.detail.value!)}/></IonItem>
                }

                {replyId > 0 &&
                <IonItem color='medium' style={{background: 'green', margin: '10px 0', borderRadius: 5}}>
                    <div style={{color: '#fff'}}>Reply To: {replyContent}</div>
                </IonItem>}


                <IonItem color='medium' style={{margin: '10px 0'}}>
                    <IonTextarea rows={3} value={talkContent} placeholder="Say anything"
                                 onIonChange={e => setTalkContent(e.detail.value!)}/>
                </IonItem>
                <button className='full-width common-button' style={{marginBottom: 15}} onClick={sendMsg}>Send</button>
            </IonFooter>}

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