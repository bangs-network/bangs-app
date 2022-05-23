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
    IonFabButton, useIonToast, IonLoading
} from '@ionic/react';
import {addCircle, addCircleOutline, arrowForwardCircle, calendar, send} from "ionicons/icons";
import * as React from "react";
import moreIcon from "../../img/more.png";

import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {RouteComponentProps} from "react-router";
import './detail.css';
import {useEffect} from "react";
import axios from "axios";
import parseUrl from "../../util/common";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {saveRoleState} from "../state/slice/roleSlice";
import {TalkCreateApi, VersePointApi} from "../../service/Api";

interface MenuProps extends RouteComponentProps {
}

const VerseDetail: React.FC<MenuProps> = ({history, match}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [isKeeper, setIsKeeper] = useState(0);
    const [showSend, setShowSend] = useState(false);
    const [body, setBody] = useState<any>();
    const [list, setList] = useState<any>();
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const [verseId, setVerseId] = useState<number>();
    const pageRef = useRef<HTMLElement>(null);
    const loadState = useAppSelector(state => state.loadStateSlice);
    const dispatch = useAppDispatch();
    const [roleList, setRoleList] = useState<any>([]);
    const [talkContent, setTalkContent] = useState<any>('');
    const [role, setRole] = useState<any>();
    const [present, dismiss] = useIonToast();
    const [opacityBackColor, setOpacityBackColor] = useState<string>('rgba(0,0,0,0.4)');
    const roleData: any = useAppSelector(state => state.roleSlice);
    const [showLoading, setShowLoading] = useState(false);

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
        if (!localStorage.getItem("SessionID")) {
            present('Please Login', 3000);
            return
        }
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    useIonViewWillEnter(() => {
        dispatch(saveLoadState({tag: 'VerseDetail', state: 0}));
        getData();
        getRoles();
    });


    useEffect(() => {
        console.info(loadState)
        if (loadState && loadState.tag == 'VerseDetail' && loadState.state == 1) {
            getData()
        }
    }, [loadState.tag]);


    const getData = () => {
        let params: any = match.params
        console.info(params.id);
        setVerseId(params.id);
        const data = {
            ID: params.id,
            Start:1,
            Offset:10
        };
        axios.get('https://api.bangs.network/verse/detail', {
            params: data
        }).then(function (response: any) {
            if (response?.data?.body) {

                let list: any = [];


                setIsKeeper(response?.data?.body.IsKeeper);

                let timelineList = response?.data?.body.Timelines;
                if (timelineList && timelineList.length > 0) {

                    if (timelineList[0].timelineType != 1){
                        getTheme(timelineList[0].theme.ThemeID,response?.data?.body);
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

                    setList(newList)
                    setBody(response?.data?.body)
                }

            }
            console.info("list=",list)
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const getTheme = (themeID:number, body:any) => {
        const data = {
            ID: Number(themeID)
        };
        let list: any = [];
        let timelineList = body.Timelines;

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
                    mainColor: timelineList[0].mainColor,
                    mainPic: timelineList[0].mainPic,
                    music: timelineList[0].music,
                    talkID: 0,
                    talkList: [],
                    theme: {ThemeID: themeID},
                    timelineType: 1,
                    verseId: timelineList[0].verseId,
                };
                list.push(themeItem)
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

                setList(newList)
                setBody(response?.data?.body)
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
        setShowSend(!showSend);
    };

    const sendMsg = () => {
        const roleId = role.roleId
        const talkId = body.timelines[body.timelines.length - 1].talkID;
        const data = {
            RoleId: roleId,
            TalkId: talkId,
            TalkContent: talkContent
        };
        setShowLoading(true);
        TalkCreateApi(data).then(function (response: any) {
            setShowSend(false);
            setTalkContent("");
            getData();
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });
    };

    const hexToRgba = (bgColor: string) => {
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
                        <IonButton onClick={()=>presentPopover}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>}
                </IonToolbar>


            </IonHeader>
            <IonContent style={{position: 'relative'}}>

                <IonList lines="none" style={{padding: 0, border: 0, margin: 0}}>


                    {list && list.length > 0 && list.map((item: any, index: number) => {

                        return <div key={index} style={{
                            background: "url(" + parseUrl(item.mainPic) + ")",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            color: item.mainColor,

                            backgroundSize: 'cover'
                        }}>
                            <div className='blur' style={{ paddingBottom: 15}}>

                                <IonItemDivider sticky style={{padding: 0, border: 0, margin: 0}}>
                                    <img src={parseUrl(item.mainPic)} style={{
                                        padding: 0,
                                        border: 0,

                                        margin: 0,
                                        width: '100vw',
                                        height: 240,
                                        objectFit: 'cover'
                                    }}/>
                                </IonItemDivider>

                                {item && item.points && item.points.length > 0 && item.points.map((item1: any, index: number) => {

                                    return <IonCard key={index} className='cursor'
                                                    style={{
                                                        background: hexToRgba(item.backgroundColor),
                                                        color: item.mainColor,
                                                        marginBottom: 0
                                                    }}>

                                        {
                                            item1.timelineType == 2 ? <p style={{padding: '5px 15px'}}>
                                                {item1.expression}
                                            </p> : item1.timelineType == 4 ? <div style={{padding: '5px 15px'}}>
                                                {item1.Dices.map((item2: any, index: number) => {
                                                    return <div key={index} className='row' style={{margin: '10px 0'}}>


                                                        <img style={{width: 40, height: 40, borderRadius: 40}}
                                                             src={parseUrl(item2.Role.Avator)}/>

                                                        <div style={{marginLeft: 20}}>
                                                            {item2.Role.RoleName}
                                                        </div>
                                                        <div style={{flex: 1}}/>
                                                        <div>
                                                            {item2.DiceValue}
                                                        </div>

                                                    </div>
                                                })
                                                }
                                            </div> : item1.timelineType == 3 ? <>
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
                                                    <IonRow style={{marginTop: 20}}>
                                                        {item1.talkList && item1.talkList.map((item4: any, index: number) => {
                                                            return <IonRow key={index}> <IonCol size="2" style={{
                                                                padding: 0,
                                                                paddingRight: 10
                                                            }}>
                                                                <IonAvatar><img className='icon-circle full-width'
                                                                                src={parseUrl(item4.Role.Avator)}/></IonAvatar>

                                                            </IonCol>
                                                                <IonCol size="10">

                                                                    <div style={{
                                                                        fontWeight: 700,
                                                                        fontSize: 16
                                                                    }}>{item4.Role.RoleName}</div>
                                                                    <div style={{
                                                                        marginTop: 5,
                                                                        color: '#999'
                                                                    }}>By {localStorage.getItem("name")}</div>
                                                                    <div
                                                                        style={{marginTop: 10}}>{item4.TalkContent}</div>
                                                                </IonCol></IonRow>
                                                        })}
                                                    </IonRow>
                                                </IonGrid>
                                            </> : <></>
                                        }

                                    </IonCard>
                                })}
                            </div>

                            {index == list.length - 1 && body && body.Timelines && body.Timelines.length > 0 && body.Timelines[body.Timelines.length - 1].TimelineType == 3 && <div className='ion-padding-top ion-padding-bottom'>
                                <button className='full-width common-button'>Bong</button>
                            </div>}
                        </div>

                    })}


                </IonList>

                {body && body.Timelines && body.Timelines.length > 0 && body.Timelines[body.Timelines.length - 1].TimelineType == 3 &&
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={showSendMsg}>
                        <IonIcon icon={send}/>
                    </IonFabButton>
                </IonFab>}
            </IonContent>

            {showSend && body && body.Timelines && body.Timelines.length > 0 && body.Timelines[body.Timelines.length - 1].TimelineType == 3 &&
            <IonFooter className='ion-padding-start ion-padding-end cursor'
                       style={{background: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
                <IonSegment style={{padding: 0, margin: 0}}
                            onIonChange={e => console.log('Segment selected', e.detail.value)}>
                    <IonSegmentButton value="roles">
                        <IonLabel style={{textTransform: 'none'}}>In Role</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="addRole" onClick={() => {
                        history.push('/editRole/0');
                    }}>
                        <IonLabel style={{textTransform: 'none'}}>Make Role</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <IonItem lines="none" onClick={() => {
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
                    <IonLabel slot='end' style={{color: '#ddd'}}>Select Role</IonLabel>
                </IonItem>
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