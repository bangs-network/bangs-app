import {
    IonCard,
    IonCardHeader, IonCol,
    IonContent, IonGrid,
    IonHeader, IonItemDivider,
    IonItemGroup, IonList,
    IonPage, IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar, useIonViewWillEnter
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


interface MenuProps extends RouteComponentProps {}

const Search: React.FC<MenuProps> = ({history}) => {

    const [searchText, setSearchText] = useState('');
    const [start, setStart] = useState(0);
    const [list, setList] = useState<any>([]);

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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItemDivider sticky>
                <IonSearchbar  showCancelButton="never" placeholder="Search"
                              onIonChange={e => setSearchText(e.detail.value!)}/>
                </IonItemDivider>

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
        </IonPage>
    );
};

export default Search;
