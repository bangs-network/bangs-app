import {
    IonAvatar,
    IonButton,
    IonButtons, IonCard, IonCardHeader,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList,
    IonMenuButton,
    IonPage, IonPopover,
    IonRow,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import {addCircle, addCircleOutline} from "ionicons/icons";
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

const Home: React.FC<MenuProps> = ({history}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [start, setStart] = useState(0);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const pageRef = useRef<HTMLElement>(null);
    const [list, setList] = useState<any>([]);

    const presentPopover = (e: React.MouseEvent) => {
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    useIonViewWillEnter(() => {
        getData();
    });

    const getData = () => {
        const data = {
            Start: start,
            Offset: 10
        };

        HomeVerseApi(data).then((res: any) => {
            console.info("res.MVserse")
            console.info(res.MVerse)

            console.info("res.MVserse1")
            let list = res.MVerse;
            let newList = [...list];
            console.info("newList")
            console.info(newList)
            setList(newList)

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
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">BANGS</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList lines="none">


                    {list.map((item: any, index: number) => {

                        return <IonCard className='cursor' style={{background: '#22bc87'}} onClick={() => {
                            history.push(`/verseDetail/${item.verseId}`);
                        }}>
                            <img src={parseUrl(item.verseBanner)}
                                 style={{width: '100%', height: 240, objectFit: 'cover'}}/>


                            <IonCardHeader>
                                <div style={{fontSize: 32, color: '#fff', fontWeight: 'bold'}}>{item.verseName}</div>
                                <p style={{color: '#fff'}}>
                                    {item.verseDesc}
                                </p>
                            </IonCardHeader>

                            {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                return <IonCard key={index} className='cursor'
                                                style={{background: '#5d58e0', color: '#fff'}}>

                                    {
                                        item.TimelineType == 2 ? <p   style={{padding:'5px 15px'}}>
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
                                            <IonGrid style={{padding:'5px 15px'}}>
                                                <IonRow  style={{padding:0,margin:0}}>
                                                    <div>
                                                        Say anything:
                                                    </div>
                                                </IonRow>
                                            </IonGrid>
                                        </> : <></>
                                    }

                                </IonCard>


                            })}

                        </IonCard>


                    })}

                </IonList>

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
