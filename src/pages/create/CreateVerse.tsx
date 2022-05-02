import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";
import {ethWeb3} from "../../components/emitWeb3/Connectors";
import axios from "axios";

const CreateVerse: React.FC = () => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();

    const createVerse = () => {
        const data = {
            VerseName:title,
            VerseDesc:detail,
            VerseBanner:'images/preview/1a/71398a29-3946-41b6-8edf-6ff6e95c7b88.png'
        };
        axios.get('https://api.bangs.network/verse/create', {params:data}).then(function (response: any) {
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle>Create Expressions</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList  lines="none">

                    <IonItem className='secondary-color'>
                        <div>Verse Name</div>
                    </IonItem>
                    <IonItem color='medium'>
                        <IonInput value={title} placeholder="Input Verse Name" onIonChange={e => setTitle(e.detail.value!)} />
                    </IonItem>
                    <IonItem  className='secondary-color'>
                        <div >Verse Detail</div>
                    </IonItem>

                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={detail} placeholder="Input Verse Detail" onIonChange={e => setDetail(e.detail.value!)} />
                    </IonItem>

                    <IonItem  className='secondary-color'>
                        <div >Verse Banner</div>
                    </IonItem>

                    <IonItem >
                        <IonButtons slot="start">
                            Upload picture
                        </IonButtons>
                    </IonItem>

                </IonList>

            </IonContent>

            <IonFooter onClick={createVerse} className='ion-padding' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
                Create Verse
            </IonFooter>

        </IonPage>
    );
};

export default CreateVerse;