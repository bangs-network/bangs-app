import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/2.png";
import * as React from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import axios from "axios";

const User: React.FC = () => {


    const uploadImage = async () => {
        console.info("uploadImage:")

        try {
            const image:any = await Camera.getPhoto({
                quality: 100,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos
            });

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            console.info(image);
           //let file =  base64toFile(image.base64String,'head');
            const file = new File([image.webPath], 'pic.png', {type: image.format});
            console.info(file);
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://api.bangs.network/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response: any) {
                console.info(response)
            }).catch(function (error: any) {
                console.info(error)
            })

        } catch (e) {
            console.info(e)
        }

    };

    const base64toFile = (base:any, filename:any) => {
        const arr = base.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        var n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        //转换成file对象
        return new File([u8arr], filename, { type: mime });
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>User</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <div className="ion-padding-top ion-text-center">

                    <img onClick={uploadImage} className='icon-circle p-120 cursor' src={headerIcon}/>
                    <h2>Gordon</h2>
                    <p>0xDsI883K...HO8R</p>
                </div>
                <IonGrid style={{background: '#666', color: '#fff'}}>
                    <IonRow>
                        <IonCol className="ion-align-self-center">Bangs</IonCol>
                        <IonCol className="ion-align-self-center">1000</IonCol>
                        <IonCol><IonButton color="primary">Transfer</IonButton></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-align-self-center">BNB</IonCol>
                        <IonCol className="ion-align-self-center">10</IonCol>
                        <IonCol><IonButton color="primary">Transfer</IonButton></IonCol>
                    </IonRow>
                </IonGrid>

                <div className='ion-padding-top  ion-padding-bottom'>#Verse</div>
                <IonGrid style={{background: '#666', color: '#fff'}}>
                    <IonRow>
                        <IonCol className="ion-padding-top ion-text-center">
                            <img className='p-120' src={headerIcon}/>
                            <h2>2</h2>
                        </IonCol>
                        <IonCol className="ion-padding-top ion-text-center">
                            <img className='p-120' src={headerIcon}/>
                            <h2>4</h2>
                        </IonCol>
                        <IonCol className="ion-padding-top ion-text-center">
                            <img className='p-120' src={headerIcon}/>
                            <h2>8</h2>
                        </IonCol>
                    </IonRow>

                </IonGrid>


            </IonContent>
        </IonPage>
    );
};

export default User;