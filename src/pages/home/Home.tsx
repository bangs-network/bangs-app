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
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton>
                            <img style={{width: 30, height: 30, borderRadius: 30}} src={headImage}/>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle style={{fontSize: 24, fontWeight: 700, textAlign: 'center'}}>BANGS.</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={presentPopover}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
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

                <IonList lines="none">


                    {list.map((item: any, index: number) => {

                        return <IonCard style={{background:'#000'}} key={index} className='cursor' onClick={() => {
                            history.push(`/verseDetail/${item.verseId}`);
                        }}>
                            <div key={index} style={{
                                background: "url(" + parseUrl(item.verseBanner) + ")",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                color: item.MainColor,
                                backgroundSize: 'cover'
                            }}>
                                <div className='blur'>
                                    <img src={parseUrl(item.verseBanner)}
                                         style={{width: '100%', height: 220, objectFit: 'cover'}}/>


                                    <IonCardHeader>
                                        <div style={{
                                            fontSize: 32,
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}>{item.verseName}</div>
                                    </IonCardHeader>

                                    <div style={{paddingBottom:15}}>

                                    {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                        return <IonCard key={index} className='cursor'
                                                        style={{marginBottom:0,background: 'rgba(0, 0, 0, 0.4)', color: '#fff'}}>

                                            {
                                                item.timelineType == 2 ? <div style={{padding: '15px 15px'}}

                                                    dangerouslySetInnerHTML={{__html: item.expression}} /> : item.timelineType == 4 ? <div style={{padding: '5px 15px'}}>
                                                    {item.dices.map((item: any, index: number) => {
                                                        return <div key={index} className='row'
                                                                    style={{margin: '10px 0'}}>


                                                            <img style={{width: 40, height: 40, borderRadius: 40}}
                                                                 src={parseUrl(item.Role.Avator)}/>

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
                                                </div> : item.timelineType == 3 ? <>
                                                    <IonGrid style={{padding: '5px 15px', margin: '10px 0 0'}}>
                                                        <IonRow>
                                                            {item.talkList && item.talkList.map((item4: any, index3: number) => {
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
                                                                                fontWeight: 700,
                                                                                fontSize: 16
                                                                            }}>{item4.Role.RoleName}</div>
                                                                            {item4.ReplyContent && <div style={{
                                                                                marginTop: 10,
                                                                                background: '#F1F3F5',
                                                                                borderRadius: 5,
                                                                                padding: '10px',
                                                                                color: '#000'
                                                                            }}
                                                                                                        dangerouslySetInnerHTML={{__html: item4.ReplyContent}}/>}
                                                                            <div style={{marginTop: 10}}
                                                                                 dangerouslySetInnerHTML={{__html: item4.TalkContent}}/>
                                                                        <div style={{
                                                                            borderTop: '0.5px solid #D6D6D6',
                                                                            marginTop: '20px'
                                                                        }}/>
                                                                    </IonCol>
                                                                </IonRow>
                                                            })}

                                                        </IonRow>
                                                    </IonGrid>
                                                </> : <></>
                                            }

                                        </IonCard>


                                    })}

                                    </div>

                                </div>
                            </div>

                        </IonCard>


                    })}

                </IonList>

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
