import {
    IonCard,
    IonCardHeader, IonCol,
    IonContent, IonGrid,
    IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItemDivider,
    IonItemGroup, IonList,
    IonPage, IonRefresher, IonRefresherContent, IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar, RefresherEventDetail, useIonToast, useIonViewWillEnter
} from '@ionic/react';
import './Search.css';
import {useState} from "react";
import Icon1 from "../../img/1.png";
import Icon2 from "../../img/2.png";
import Icon3 from "../../img/3.png";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import parseUrl from "../../util/common";
import {HomeVerseApi} from "../../service/Api";
import {chevronDownCircleOutline} from "ionicons/icons";


interface MenuProps extends RouteComponentProps {}

let start = 1;

const Search: React.FC<MenuProps> = ({history}) => {

    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState<any>([]);
    const [present, dismiss] = useIonToast();
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


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
                setInfiniteDisabled(true)
            }

        })

    };

    return (
        <IonPage>
            <IonHeader  className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Search</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                <IonItemDivider sticky>
                    <IonSearchbar  showCancelButton="never" placeholder="Search"
                                   onIonChange={e => setSearchText(e.detail.value!)}/>
                </IonItemDivider>


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
                                         style={{width: '100%', height: 240, objectFit: 'cover'}}/>


                                    <IonCardHeader>
                                        <div style={{
                                            fontSize: 32,
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}>{item.verseName}</div>
                                        <p style={{color: '#fff'}}>
                                            {item.verseDesc}
                                        </p>
                                    </IonCardHeader>

                                    <div style={{paddingBottom:15}}>

                                        {item.TimelineList && item.TimelineList.map((item: any, index: number) => {

                                            return <IonCard key={index} className='cursor'
                                                            style={{marginBottom:0,background: 'rgba(0, 0, 0, 0.4)', color: '#fff'}}>

                                                {
                                                    item.timelineType == 2 ? <p style={{padding: '5px 15px'}}>
                                                        {item.expression}
                                                    </p> : item.timelineType == 4 ? <div style={{padding: '5px 15px'}}>
                                                        {item.Dices.map((item: any, index: number) => {
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
                                                        <IonGrid style={{padding: '5px 15px'}}>
                                                            <IonRow style={{padding: 0, margin: 0}}>
                                                                <div>
                                                                    Say anything:
                                                                </div>
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

        </IonPage>
    );
};

export default Search;
