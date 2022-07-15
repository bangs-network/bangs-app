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
import '../home/Home.css';
import {addCircle, addCircleOutline, chevronDownCircleOutline} from "ionicons/icons";
import * as React from "react";
import headImageIcon from "../../img/head.png";
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
import {getSimilarColor} from "../../util/getMainColor";
import {saveDataState} from "../state/slice/dataSlice";
import Dice from "../../components/timeType/Dice";
import DiceUi from "../../components/widget/DiceUi";
import HomeDiceUi from "../../components/widget/HomeDiceUi";

interface StateProps {
    darkMode: boolean;
    isAuthenticated: boolean;
    menuEnabled: boolean;
}

interface MenuProps extends RouteComponentProps {
}

let start = 1;

const Home1: React.FC<MenuProps> = ({history}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const pageRef = useRef<HTMLElement>(null);
    const [list, setList] = useState<any>([]);
    const [present, dismiss] = useIonToast();
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const [headImg, setHeadImg] = useState('');


    const presentPopover = (e: React.MouseEvent) => {
        if (!localStorage.getItem("SessionID")) {
            present('Please Login', 3000);
            return
        }
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    useEffect(() => {
        let headImg = localStorage.getItem("avatar");

        if (headImg) {
            setHeadImg(headImg)
        }
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
                            <img style={{width: 28, height: 28, borderRadius: 30}} src={headImg?parseUrl(headImg):headImageIcon}/>
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
                                            <img src={parseUrl(item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ?   item.TimelineList[0].theme.MainPic :item.verseBanner)}
                                                 style={{
                                                     width: '100%',
                                                     background: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ? item.TimelineList[0].theme.BackgroundColor : '#000',
                                                     height: 61,
                                                     objectFit: 'cover',
                                                     borderTopLeftRadius: 12,
                                                     borderTopRightRadius: 12
                                                 }}/>

                                            <div style={{
                                                borderBottomLeftRadius: 12,
                                                borderBottomRightRadius: 12,
                                                marginTop:-3,
                                                color: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ?getSimilarColor(item.TimelineList[0].theme.BackgroundColor).text.color :'#fff',
                                                background: item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ? item.TimelineList[0].theme.BackgroundColor : '#000'
                                            }}>

                                                <div  className='font-bold' style={{
                                                    fontSize: 32,
                                                    padding: '24px 17px 0 17px',
                                                    fontWeight: 'bold'
                                                }}>{item.verseName}</div>


                                                <div>


                                                    {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                                        return <>

                                                            <HomePointTypeUi item={item}/>

                                                            <div key={index} className='cursor'
                                                                 style={{marginBottom: 0}}>

                                                                {
                                                                    item.timelineType == 2 ?<div style={{padding: '0 17px 17px'}}>
                                                                        <div className='font-bold' style={{fontSize:17,padding:'6px 0',fontWeight:'bold'}}>{item.expressionTitle}</div>
                                                                        <div className='text-ellipsis' style={{fontSize:13,padding: '4px 0 15px'}}
                                                                             dangerouslySetInnerHTML={{__html: item.expression}}/></div> : item.timelineType == 4 ?<div style={{marginTop:12,padding:'0 17px 17px'}}>
                                                                        <RowItemCenterWrapper
                                                                            style={{padding: '10px',background:'#fff',borderRadius:12}}>
                                                                            <RowItemCenterWrapper style={{
                                                                                overflowX: 'scroll',
                                                                                overflowY: 'hidden'
                                                                            }}>
                                                                                {item.dices.map((item2: any, index2: number) => {
                                                                                    return <HomeDiceUi key={index2} item2={item2}/>
                                                                                })
                                                                                }
                                                                            </RowItemCenterWrapper>
                                                                        </RowItemCenterWrapper></div> : item.timelineType == 3 ? <div style={{background:'rgba(255,255,255,0.1)',  padding: '0 17px'}}>
                                                                            <IonGrid style={{
                                                                                padding: '7px 0',
                                                                                margin: '12px 0 0'
                                                                            }}>
                                                                                <IonRow>
                                                                                    {item.talkList && item.talkList.map((item4: any, index4: number) => {
                                                                                        return index4 >=item.talkList.length-3? <RowWrapper key={index4}
                                                                                                           style={{
                                                                                                               width: '100%',
                                                                                                               marginTop: 11,
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

                                                                                                <div className='font-bold' style={{
                                                                                                    fontWeight: 'bold',
                                                                                                    fontSize: 13
                                                                                                }}>{item4.role.roleName}</div>
                                                                                                {/*{item4.replyContent &&*/}
                                                                                                {/*<div style={{*/}
                                                                                                    {/*marginTop: 10,*/}
                                                                                                    {/*background: '#F1F3F5',*/}
                                                                                                    {/*borderRadius: 12,*/}
                                                                                                    {/*fontSize: 12,*/}
                                                                                                    {/*lineHeight:'13px',*/}
                                                                                                    {/*padding: '10px'*/}
                                                                                                {/*}}*/}
                                                                                                     {/*dangerouslySetInnerHTML={{__html: item4.replyContent}}/>}*/}
                                                                                                <div className='text-ellipsis-two' style={{
                                                                                                    marginTop: 8,
                                                                                                    fontSize: 12,
                                                                                                    marginBottom: '12px'
                                                                                                }}
                                                                                                     dangerouslySetInnerHTML={{__html: item4.talkContent}}/>
                                                                                                <div style={{
                                                                                                    borderTop: '0.5px solid #D6D6D6',

                                                                                                }}/>
                                                                                                {(index4 == item.talkList.length - 1) && <div style={{fontSize:18,letterSpacing:5,textAlign:'center',paddingBottom:5}} className='ColumnCenterWrapper'>...
                                                                                                </div>}
                                                                                            </div>
                                                                                        </RowWrapper>:<></>
                                                                                    })}

                                                                                </IonRow>
                                                                            </IonGrid>
                                                                        </div> : <></>
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

export default Home1;
