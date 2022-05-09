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
    IonFabButton, useIonToast
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

interface MenuProps extends RouteComponentProps {
}

const VerseDetail: React.FC<MenuProps> = ({history, match}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [showSend, setShowSend] = useState(false);
    const [body, setBody] = useState<any>();
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const [verseId, setVerseId] = useState<number>();
    const pageRef = useRef<HTMLElement>(null);
    const loadState = useAppSelector(state => state.loadStateSlice);
    const dispatch = useAppDispatch();
    const [roleList, setRoleList] = useState<any>([]);
    const [talkContent, setTalkContent] = useState<any>('');
    const [role, setRole] = useState<any>();
    const [present, dismiss] = useIonToast();

    const presentPopover = (e: React.MouseEvent) => {
        if (!localStorage.getItem("SessionID")){
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
        setVerseId(params.id)
        const data = {
            ID: params.id
        };
        axios.get('https://api.bangs.network/verse/detail', {
            params: data
        }).then(function (response: any) {
            if (response?.data?.body) {
                setBody(response?.data?.body.MVerse)
            }
            console.info(response)
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
                setRole(response?.data?.body?.roleList[0])
            }
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const showSendMsg = () => {
        setShowSend(!showSend);
    };


    return (
        <IonPage id='about-page'>
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
                    <IonButtons slot="end">
                        <IonButton onClick={presentPopover}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>


            </IonHeader>
            <IonContent style={{position: 'relative'}}>
                <IonItemDivider style={{padding: 0, border: 0, margin: 0}}>
                    <div>
                        <img src={parseUrl(body ? body.verseBanner : '')} style={{
                            padding: 0,
                            border: 0,
                            margin: 0,
                            width: '100vw',
                            height: 200,
                            objectFit: 'cover'
                        }}/>

                    </div>
                </IonItemDivider>

                <IonList lines="none">

                   <div style={{lineHeight: '20px',fontWeight:'bold',color:'#fff',padding:"10px 15px"}}>{body ? body.verseDesc : ''}</div>


                    {body && body.TimelineList && body.TimelineList.map((item: any, index: number) => {

                        return <IonCard key={index} className='cursor'
                                        style={{background: '#5d58e0', color: '#fff'}}>

                            {
                                item.TimelineType == 2 ? <p style={{padding:'5px 15px'}}>
                                    {item.Expression}
                                </p> : item.TimelineType == 4 ? <div  style={{padding:'5px 15px'}}>
                                    {item.Dices.map((item: any, index: number) => {
                                        return <div key={index} className='row' style={{margin: '10px 0'}}>


                                            <img style={{width: 40, height: 40,borderRadius:40}} src={parseUrl(item.Role.Avator)}/>

                                            <div style={{marginLeft: 20}}>
                                                {item.Role.RoleName}
                                            </div>
                                            <div style={{flex: 1}}/>
                                            <div>
                                                {item.DiceValue}
                                            </div>

                                        </div>
                                    })
                                    }
                                </div> : item.TimelineType == 3 ? <>
                                    <IonGrid style={{padding:'5px 15px',margin:'10px 0 0'}}>
                                        <IonRow  style={{padding:0,margin:0}}>
                                            {roleList && roleList.map((item: any, index: number) => {
                                                return index < 5 && <IonCol key={index}  style={{padding:0,margin:0}} size='2'><IonAvatar key={index}>
                                                    <img style={{width:50,height:50}} src={parseUrl(item.roleAvator)}/>
                                                </IonAvatar></IonCol>
                                            })}
                                            <IonCol  style={{padding:0,margin:0}} size='2'>
                                                <IonAvatar>
                                                <img  style={{width:50,height:50}} src={moreIcon}/>
                                            </IonAvatar>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </> : <></>
                            }

                        </IonCard>


                    })}

                    {body && body.TimelineList && body.TimelineList.length > 0 && <div className='ion-padding'>
                        <button className='full-width common-button'>Bong</button>
                    </div>}


                </IonList>

                {body && body.TimelineList  && body.TimelineList.length >0 &&  body.TimelineList[body.TimelineList.length-1].TimelineType == 3  && <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={showSendMsg}>
                        <IonIcon icon={send} />
                    </IonFabButton>
                </IonFab>}
            </IonContent>

            {showSend && body && body.TimelineList  && body.TimelineList.length >0 &&  body.TimelineList[body.TimelineList.length-1].TimelineType == 3  &&<IonFooter  className='ion-padding-start ion-padding-end cursor' style={{background:'#5d58e0',textAlign:'center',fontWeight:'bold'}}>
                <IonSegment style={{padding:0,margin:0}} onIonChange={e => console.log('Segment selected', e.detail.value)}>
                    <IonSegmentButton value="roles">
                        <IonLabel style={{textTransform: 'none'}}>In Role</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="addRole">
                        <IonLabel style={{textTransform: 'none'}}>Make Role</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <IonItem lines="none"  onClick={() => {
                    history.push(`/roles/${verseId}`)
                }}>
                    <IonLabel>Roles:</IonLabel>
                    <IonLabel slot='end' style={{color:'#ddd'}}>Select Role</IonLabel>
                </IonItem>
                <IonItem  color='medium' style={{margin:'10px 0'}}>
                    <IonTextarea rows={3} value={talkContent} placeholder="Say anything" onIonChange={e => setTalkContent(e.detail.value!)} />
                </IonItem>
                <button className='full-width common-button' style={{marginBottom:15}}>Send</button>
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