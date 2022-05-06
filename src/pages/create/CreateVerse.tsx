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
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import UploadImage from "../../components/widget/UploadImage";
import {RouteComponentProps} from "react-router";

interface MenuProps extends RouteComponentProps {}

const CreateVerse: React.FC<MenuProps> = ({history}) => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [imgUrl,setImgUrl] = useState<string>('');

    const createVerse = () => {
        const data = {
            VerseName:title,
            VerseDesc:detail,
            VerseBanner:imgUrl
        };
        axios.post('https://api.bangs.network/verse/create', data).then(function (response: any) {
            console.info(response)
            history.push(`/verseDetail/${response.data.body.id}`);
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
                    <IonTitle>Create Verse</IonTitle>
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
                           <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl}/>
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