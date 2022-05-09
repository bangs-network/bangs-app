import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea,
    IonTitle,
    IonToolbar, useIonToast
} from '@ionic/react';
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import UploadImage from "../../components/widget/UploadImage";
import {RouteComponentProps} from "react-router";
import {CreateVerseApi} from "../../service/Api";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {useAppDispatch} from "../state/app/hooks";

interface MenuProps extends RouteComponentProps {}

const CreateVerse: React.FC<MenuProps> = ({history}) => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [imgUrl,setImgUrl] = useState<string>('');
    const [showLoading, setShowLoading] = useState(false);
    const [present, dismiss] = useIonToast();


    const createVerse = () => {

        if (!title) {
            present('Please Input Verse Name', 3000);
            return
        }

        if (!detail) {
            present('Please Input Verse Introduce', 3000);
            return
        }

        if (!imgUrl) {
            present('Please select Img  Url', 3000);
            return
        }

        const data = {
            VerseName:title,
            VerseDesc:detail,
            VerseBanner:imgUrl
        };
        setShowLoading(true)
        CreateVerseApi(data).then((res:any) => {
           console.info(res)
            setShowLoading(false)
            history.replace(`/verseDetail/${res.id}`);
        })

     };

    return (
        <IonPage>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
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

            <IonFooter onClick={createVerse} className='ion-padding cursor' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
                Create Verse
            </IonFooter>

        </IonPage>
    );
};

export default CreateVerse;