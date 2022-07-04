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
import BangsIcon from "../../img/bangs.png";
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
import parseUrl, {getPoint} from "../../util/common";
import {
    ColumnCenterWrapper,
    RowCenterWrapper,
    RowContentCenterWrapper,
    RowItemCenterWrapper,
    RowWrapper
} from '../../theme/commonStyle';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import PointTypeUi from "../../components/widget/PointTypeUi";
import HomePointTypeUi from "../../components/widget/HomePointTypeUi";

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

    useEffect(() => {
        start = 1;
        loadData();
    }, []);

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
                if (start == 1) {
                    setList([]);
                }
                setInfiniteDisabled(true)
            }

        })

    };


    return (
        <IonPage ref={pageRef} id='home-page'>
            <IonHeader className="ion-no-border">
                <RowWrapper>
                    <div style={{minWidth:40}}>
                    <IonButtons slot="start">
                        <IonMenuButton>
                            <img style={{width: 28, height: 28, borderRadius: 30}} src={headImage}/>
                        </IonMenuButton>
                    </IonButtons>
                    </div>
                    <RowCenterWrapper style={{flex:1}}>
                        <img style={{height:19}} src={BangsIcon}/>
                    </RowCenterWrapper>
                    <IonButtons slot="end">
                        <IonButton onClick={presentPopover}>
                            <div style={{width: 28, height: 28, borderRadius: 30}}><IonIcon color={'secondary'}
                                                                                            size={'large'}
                                                                                            slot="icon-only"
                                                                                            icon={addCircle}/></div>
                        </IonButton>
                    </IonButtons>
                </RowWrapper>
            </IonHeader>
            <IonContent>

                <div style={{background: '#f5f5f5', height: '100%'}}>
                    <IonRefresher slot="fixed" style={{background: '#fff', color: '#000'}} onIonRefresh={doRefresh}>
                        <IonRefresherContent
                            pullingIcon={chevronDownCircleOutline}
                            pullingText="Pull to refresh"
                            refreshingSpinner="circles"
                            refreshingText="Refreshing...">
                        </IonRefresherContent>
                    </IonRefresher>

                    <RowContentCenterWrapper style={{background: '#f5f5f5'}}>
                        <IonList lines="none" style={{background: '#f5f5f5', padding: '0 10px', width: '100%'}}>


                            {list.map((item: any, index: number) => {

                                return <div style={{borderRadius: '12px', marginTop: 12}} key={index} className='cursor'
                                            onClick={() => {
                                                history.push(`/verseDetail/${item.verseId}`);
                                            }}>
                                    <div key={index} style={{
                                        borderRadius: '12px',
                                        border: 'none',
                                    }}>
                                        <div>
                                            <img src={parseUrl(item.verseBanner)}
                                                 style={{
                                                     width: '100%',
                                                     background: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ? item.TimelineList[0].theme.BackgroundColor : '#000',
                                                     height: 61,
                                                     objectFit: 'cover',
                                                     borderTopLeftRadius: 12,
                                                     borderTopRightRadius: 12
                                                 }}/>

                                            <div style={{
                                                padding: '0 17px',
                                                borderBottomLeftRadius: 12,
                                                borderBottomRightRadius: 12,
                                                marginTop:-3,
                                                color: '#fff',
                                                background: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ? item.TimelineList[0].theme.BackgroundColor : '#fff'
                                            }}>

                                                <div style={{
                                                    fontSize: 32,
                                                    padding: '26px 0 0',
                                                    fontWeight: 'bold'
                                                }}>{item.verseName}</div>


                                                <div>


                                                    {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                                        return <>

                                                            <HomePointTypeUi item={item}/>

                                                            <div key={index} className='cursor'
                                                                 style={{marginBottom: 0}}>

                                                                {
                                                                    item.timelineType == 2 ?
                                                                        <div className='text-ellipsis' style={{padding: '15px 0'}}
                                                                             dangerouslySetInnerHTML={{__html: item.expression}}/> : item.timelineType == 4 ?
                                                                        <RowItemCenterWrapper
                                                                            style={{padding: '5px 15px'}}>
                                                                            {item.dices.map((item: any, index: number) => {
                                                                                return <ColumnCenterWrapper key={index}
                                                                                                            style={{margin: '0px 30px'}}>

                                                                                    <div style={{
                                                                                        fontSize: 13,
                                                                                        fontWeight: 'bold',
                                                                                        marginBottom: 14
                                                                                    }}>
                                                                                        {item.DiceValue}
                                                                                    </div>


                                                                                    <div
                                                                                        style={{width: 80, height: 80}}>


                                                                                        <CircularProgressbarWithChildren
                                                                                            value={60}
                                                                                            styles={buildStyles({
                                                                                                pathColor: item.DiceValue < 50 ? "#E13542" : item.DiceValue == 50 ? '#2889E3' : '#5CC55E',
                                                                                                trailColor: "#eee"
                                                                                            })}>


                                                                                            <img style={{
                                                                                                width: 55,
                                                                                                height: 55,
                                                                                                borderRadius: 40
                                                                                            }}
                                                                                                 src={parseUrl(item.Role.avator)}/>
                                                                                        </CircularProgressbarWithChildren>
                                                                                    </div>

                                                                                    <div style={{
                                                                                        fontSize: 13,
                                                                                        fontWeight: 'bold',
                                                                                        marginTop: 5,
                                                                                        overflow: 'hidden',
                                                                                        textOverflow: 'ellipsis',
                                                                                        whiteSpace: 'nowrap'
                                                                                    }}>
                                                                                        {item.Role.RoleName}
                                                                                    </div>


                                                                                </ColumnCenterWrapper>
                                                                            })
                                                                            }
                                                                        </RowItemCenterWrapper> : item.timelineType == 3 ? <>
                                                                            <IonGrid style={{
                                                                                padding: '5px 0',
                                                                                margin: '10px 0 0'
                                                                            }}>
                                                                                <IonRow>
                                                                                    {item.talkList && item.talkList.map((item4: any, index4: number) => {
                                                                                        return index4 >=item.talkList.length-3? <RowWrapper key={index4}
                                                                                                           style={{
                                                                                                               width: '100%',
                                                                                                               marginTop: 15,
                                                                                                           }}>
                                                                                            <img
                                                                                                className='icon-circle'
                                                                                                style={{
                                                                                                    width: 28,
                                                                                                    height: 28,
                                                                                                    marginRight: 8
                                                                                                }}
                                                                                                src={parseUrl(item4.role.avator)}/>

                                                                                            <div style={{flex: 1}}>

                                                                                                <div style={{
                                                                                                    fontWeight: 'bold',
                                                                                                    fontSize: 13
                                                                                                }}>{item4.role.roleName}</div>
                                                                                                {item4.replyContent &&
                                                                                                <div style={{
                                                                                                    marginTop: 10,
                                                                                                    background: '#F1F3F5',
                                                                                                    borderRadius: 12,
                                                                                                    fontSize: 12,
                                                                                                    lineHeight:'13px',
                                                                                                    padding: '10px'
                                                                                                }}
                                                                                                     dangerouslySetInnerHTML={{__html: item4.replyContent}}/>}
                                                                                                <div style={{
                                                                                                    marginTop: 5,
                                                                                                    fontSize: 12,
                                                                                                    lineHeight:'15px',
                                                                                                    marginBottom: '12px'
                                                                                                }}
                                                                                                     dangerouslySetInnerHTML={{__html: item4.talkContent}}/>
                                                                                                {(index4 != item.talkList.length - 1) &&
                                                                                                <div style={{
                                                                                                    borderTop: '0.5px solid #D6D6D6',

                                                                                                }}/>}
                                                                                            </div>
                                                                                        </RowWrapper>:<></>
                                                                                    })}

                                                                                </IonRow>
                                                                            </IonGrid>
                                                                        </> : <></>
                                                                }

                                                            </div>
                                                        </>


                                                    })}

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>


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
                </div>
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
