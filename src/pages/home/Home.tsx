import {
    IonAvatar,
    IonButton,
    IonButtons, IonCard, IonCardHeader,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList,
    IonMenuButton,
    IonPage, IonPopover, IonRefresher, IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar, RefresherEventDetail, useIonToast, useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import {addCircle, addCircleOutline, chevronDownCircleOutline} from "ionicons/icons";
import * as React from "react";
import headImage from "../../img/head.png";
import Icon2 from "../../img/2.png";
import Icon3 from "../../img/3.png";
import Icon4 from "../../img/4.png";
import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {connect} from "../../data/connect";
import {RouteComponentProps, withRouter} from "react-router";
import {useEffect} from "react";
import {emitBox} from "../../components/emitWeb3/Connectors";
import axios from "axios";
import {HomeVerseApi} from "../../service/Api";
import parseUrl from "../../util/common";
import {ColumnCenterWrapper, RowContentCenterWrapper, RowItemCenterWrapper, RowWrapper} from '../../theme/commonStyle';
import { CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

interface StateProps {
    darkMode: boolean;
    isAuthenticated: boolean;
    menuEnabled: boolean;
}

interface MenuProps extends RouteComponentProps {
}

let start = 1;

const Home: React.FC<MenuProps> = ({history}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const pageRef = useRef<HTMLElement>(null);
    const [list, setList] = useState<any>([]);
    const [present, dismiss] = useIonToast();
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


    const presentPopover = (e: React.MouseEvent) => {
        if (!localStorage.getItem("SessionID")) {
            present('Please Login', 3000);
            return
        }
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    useIonViewWillEnter(() => {
        start = 1;
        loadData();
    });

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        start = 1;
        loadData();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 3000);
    };


    const loadData = (ev?: any) => {
        const data = {
            Start: start,
            Offset: 10
        };
        let arrList: any = []
        if (start != 1) {
            arrList = list
        }

        HomeVerseApi(data).then((res: any) => {
            console.info("res.MVserse")
            let newData = res.MVerse;
            console.info(newData)
            if (ev && ev.target) {
                ev.target.complete();
            }
            if (newData && newData.length > 0) {
                let newList = [...arrList, ...newData];
                console.info("newList")
                console.info(newList)
                setList(newList);
                start = start + 1
            } else {
                if (start == 1){
                    setList([]);
                }
                setInfiniteDisabled(true)
            }

        })

    };


    return (
        <IonPage ref={pageRef} id='home-page'>
            <IonHeader  className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton>
                            <img style={{width: 30, height: 30, borderRadius: 30}} src={headImage}/>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle style={{color:'#0620F9',fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>B<span style={{fontStyle:'italic'}}>A</span>NGS.</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={presentPopover}>
                            <IonIcon color={'secondary'}  size={'large'} slot="icon-only" icon={addCircle}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>


                <IonRefresher slot="fixed" style={{background:'#fff',color:'#000'}} onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing...">
                    </IonRefresherContent>
                </IonRefresher>

                <RowContentCenterWrapper style={{background:'#f0f0f0'}}>
                <IonList lines="none" style={{background:'#f0f0f0',padding:'0 10px',width:'100%'}}>


                    {list.map((item: any, index: number) => {

                        return <IonCard style={{background:'#000',borderRadius:12}} key={index} className='cursor' onClick={() => {
                            history.push(`/verseDetail/${item.verseId}`);
                        }}>
                            <div key={index} style={{
                                background: "#F5F6F7",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                color: item.MainColor,
                                backgroundSize: 'cover'
                            }}>
                                <div>
                                    <img src={parseUrl(item.verseBanner)}
                                         style={{width: '100%', height: 100, objectFit: 'cover'}}/>


                                    <IonCardHeader>
                                        <div style={{
                                            fontSize: 20,
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}>{item.verseName}</div>
                                    </IonCardHeader>

                                    <div>

                                    {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                        return <div key={index} className='cursor'
                                                        style={{marginBottom:0, color: '#333',background:'#fff'}}>

                                            {
                                                item.timelineType == 2 ? <div style={{padding: '15px 15px'}}

                                                    dangerouslySetInnerHTML={{__html: item.expression}} /> : item.timelineType == 4 ? <RowItemCenterWrapper style={{padding: '5px 15px'}}>
                                                    {item.dices.map((item: any, index: number) => {
                                                        return <ColumnCenterWrapper key={index}  style={{margin: '0px 30px'}}>

                                                            <div style={{fontSize:13,fontWeight:'bold',marginBottom:14}}>
                                                                {item.DiceValue}
                                                            </div>


                                                            <div style={{width: 80, height: 80}}>


                                                                <CircularProgressbarWithChildren  value={60} styles={buildStyles({
                                                                    pathColor: item.DiceValue < 50?"#E13542":item.DiceValue==50?'#2889E3':'#5CC55E',
                                                                    trailColor: "#eee"
                                                                })}>


                                                                    <img style={{width: 55, height: 55, borderRadius: 40}}
                                                                         src={parseUrl(item.Role.avator)}/>
                                                                </CircularProgressbarWithChildren>
                                                            </div>

                                                            <div style={{fontSize:13,fontWeight:'bold',marginTop:5,overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'}}>
                                                                {item.Role.RoleName}
                                                            </div>


                                                        </ColumnCenterWrapper>
                                                    })
                                                    }
                                                </RowItemCenterWrapper> : item.timelineType == 3 ? <>
                                                    <IonGrid style={{padding: '5px 15px', margin: '10px 0 0'}}>
                                                        <IonRow>
                                                            {item.talkList && item.talkList.map((item4: any, index3: number) => {
                                                                return <RowWrapper key={index3} style={{width: '100%',marginTop:15,}}>
                                                            <img
                                                                className='icon-circle' style={{width:60,height:60,marginRight:15}}
                                                                src={parseUrl(item4.role.avator)}/>

                                                                <div style={{flex:1}}>

                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: 16
                                                                    }}>{item4.role.roleName}</div>
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
                                                                    <div style={{
                                                                        borderTop: '0.5px solid #D6D6D6',
                                                                        marginTop: '20px'
                                                                    }}/>
                                                                </div>
                                                                </RowWrapper>
                                                            })}

                                                        </IonRow>
                                                    </IonGrid>
                                                </> : <></>
                                            }

                                        </div>


                                    })}

                                    </div>

                                </div>
                            </div>

                        </IonCard>


                    })}

                </IonList>
                </RowContentCenterWrapper>

                <IonInfiniteScroll
                    onIonInfinite={loadData}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText="Loading more data..."
                    />
                </IonInfiniteScroll>

            </IonContent>

            <IonPopover
                isOpen={showPopover}
                event={popoverEvent}
                onDidDismiss={() => setShowPopover(false)}
            >
                <AddPopover dismiss={() => setShowPopover(false)} history={history} type={1}/>
            </IonPopover>
        </IonPage>
    );
};

export default Home;
