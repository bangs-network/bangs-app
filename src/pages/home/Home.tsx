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
import headImageIcon from "../../img/head.png";
import BangsIcon from "../../img/bangs.png";
import MoreBottomIcon from "../../img/more_bottom.png";
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

const Home: React.FC<MenuProps> = ({history}) => {

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
                    <div style={{minWidth: 40}}>
                        <IonButtons slot="start">
                            <IonMenuButton>
                                <img style={{width: 28, height: 28, borderRadius: 30}}
                                     src={headImg ? parseUrl(headImg) : headImageIcon}/>
                            </IonMenuButton>
                        </IonButtons>
                    </div>
                    <RowCenterWrapper style={{flex: 1}}>
                        <img style={{height: 19}} src={BangsIcon}/>
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
                        <IonList lines="none" style={{background: '#f5f5f5', padding: 0, width: '100%'}}>

                            {list.map((item: any, index: number) => {

                                return <div style={{ marginTop: 12,paddingBottom:5,background:'#fff'}} key={index} className='cursor'
                                            onClick={() => {
                                                history.push(`/verseDetail/${item.verseId}`);
                                            }}>
                                    <div key={index} style={{
                                        borderRadius: '12px',
                                        border: 'none',
                                    }}>
                                        <div>
                                            <RowItemCenterWrapper style={{padding:'9px 17px'}}>
                                                <img
                                                    src={parseUrl(item && item.TimelineList && item.TimelineList[0] && item.TimelineList[0].theme ? item.TimelineList[0].theme.MainPic : item.verseBanner)}
                                                    style={{
                                                        width: 45,
                                                        background: '#000',
                                                        height: 45,
                                                        objectFit: 'cover',
                                                        borderRadius: 12
                                                    }}/>

                                                <div className='font-bold' style={{
                                                    fontSize: 16,
                                                    marginLeft:15,
                                                    color:'#8A6C5D',
                                                    fontWeight: 'bold'
                                                }}>{item.verseName}</div>
                                            </RowItemCenterWrapper>

                                            <div style={{
                                                color: '#000',
                                                background: 'none'
                                            }}>


                                                <div>


                                                    {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                                        return <>

                                                            <HomePointTypeUi item={item}/>

                                                            <div key={index} className='cursor'
                                                                 style={{marginBottom: 0}}>

                                                                {
                                                                    item.timelineType == 2 ?
                                                                        <div style={{padding: '0 17px 17px'}}>
                                                                            <div className='font-bold two-line' style={{
                                                                                fontSize: 17,
                                                                                lineHeight:'23px',
                                                                                fontWeight: 'bold'
                                                                            }}>{item.expressionTitle}</div>
                                                                            {item.mainPic &&
                                                                            <div><img
                                                                                src={parseUrl(item.mainPic)} style={{
                                                                                border: 0,
                                                                                borderRadius: 12,
                                                                                marginTop:10,
                                                                                width: '100%',
                                                                                height: 200,
                                                                                objectFit: 'cover'
                                                                            }}/></div>}
                                                                            <div className='text-ellipsis' style={{
                                                                                fontSize: 13,
                                                                                margin: '4px 0'
                                                                            }}
                                                                                 dangerouslySetInnerHTML={{__html: item.expression}}/>
                                                                            <div style={{color:'#868990',fontSize:13}}>View more</div>
                                                                        </div> : item.timelineType == 4 ? <div
                                                                            style={{marginTop: 12, padding: '0 17px 17px'}}>
                                                                            <RowItemCenterWrapper
                                                                                style={{
                                                                                    padding: '10px',
                                                                                    background: '#fff',
                                                                                    borderRadius: 12
                                                                                }}>
                                                                                <RowItemCenterWrapper style={{
                                                                                    overflowX: 'scroll',
                                                                                    overflowY: 'hidden'
                                                                                }}>
                                                                                    {item.dices.map((item2: any, index2: number) => {
                                                                                        return <HomeDiceUi key={index2}
                                                                                                           item2={item2}/>
                                                                                    })
                                                                                    }
                                                                                </RowItemCenterWrapper>
                                                                            </RowItemCenterWrapper>
                                                                        </div> : item.timelineType == 3 ? <div style={{
                                                                            background: 'rgba(255,255,255,0.1)',
                                                                            padding: '0 17px'
                                                                        }}>
                                                                            <IonGrid style={{
                                                                                padding: '7px 0',
                                                                                margin: '12px 0 0'
                                                                            }}>
                                                                                <IonRow>
                                                                                    {item.talkList  && item.talkList.length > 0 ? item.talkList.map((item4: any, index4: number) => {
                                                                                        return index4 >= item.talkList.length - 3 ?
                                                                                            <RowWrapper key={index4}
                                                                                                        style={{
                                                                                                            width: '100%',
                                                                                                            marginTop: 11,
                                                                                                        }}>
                                                                                                <img
                                                                                                    className='icon-circle'
                                                                                                    style={{
                                                                                                        width: 42,
                                                                                                        height: 42,
                                                                                                        marginRight: 15
                                                                                                    }}
                                                                                                    src={parseUrl(item4.role.avator)}/>

                                                                                                <div style={{flex: 1,border:'1px solid #F5F7F9',padding:'7px 10px',borderRadius:12}}>

                                                                                                    <div
                                                                                                        className='font-bold'
                                                                                                        style={{
                                                                                                            fontWeight: 'bold',
                                                                                                            fontSize: 16
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
                                                                                                    <div
                                                                                                        className='text-ellipsis-two'
                                                                                                        style={{
                                                                                                            marginTop: 8,
                                                                                                            fontSize: 12,
                                                                                                            marginBottom: '12px'
                                                                                                        }}
                                                                                                        dangerouslySetInnerHTML={{__html: item4.talkContent}}/>

                                                                                                </div>
                                                                                            </RowWrapper> : <></>
                                                                                    }): <ColumnCenterWrapper style={{width:'100%',border:'1px solid #F5F7F9',padding:'20px 10px',borderRadius:12}}>
                                                                                        <div style={{
                                                                                        color: '#B6BDC9',
                                                                                        fontSize: 18,
                                                                                        fontWeight: 'bold'
                                                                                    }}>No Comment
                                                                                        </div>
                                                                                        <div style={{
                                                                                        color: '#B6BDC9',
                                                                                        fontSize: 13,
                                                                                        marginTop: 5
                                                                                    }}>Write a comment
                                                                                        </div>
                                                                                        </ColumnCenterWrapper>}

                                                                                    {item.talkList  && item.talkList.length > 0 && <ColumnCenterWrapper style={{marginTop:12,width:'100%'}}>
                                                                                        <img style={{width:38}} src={MoreBottomIcon} /></ColumnCenterWrapper>}
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

export default Home;
