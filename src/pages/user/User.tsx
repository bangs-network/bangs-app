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
import headerIcon from "../../img/head.png";
import bnbIcon from "../../img/bnb.png";
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
            const file = await fetch(image.webPath).then(r => r.blob()).then(blobFile => new File([blobFile], 'file', { type: blobFile.type }));


           //let file =  base64toFile(image.base64String,'file');
            //const file = new File([image.webPath], 'pic.png', {type: 'text/plain;charset=utf-8'});
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

    const base64toFile = (dataurl:any, filename:any) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const suffix = mime.split('/')[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime,
        })
    };


    return (
        <IonPage>
            <IonHeader  className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  color='secondary' defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>User</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <div className="ion-padding ion-text-center" style={{ background: 'rgba(240, 242, 244, 0.94)',
                    borderRadius: 12}}>
                    <img onClick={uploadImage} className='icon-circle wh-86 cursor' src={headerIcon}/>
                    <div style={{fontSize:18,fontWeight:'bold',margin:12}}>HERMAN.PAN</div>
                    <div style={{color:'#868990'}}>0x1091892659873237569812974821783768182</div>
                </div>

                <div style={{borderTop: '1px solid #DBDBDB',width:'100%',marginTop:20,marginBottom:20}} />

                <IonGrid style={{background: 'rgba(240, 242, 244, 0.94)',  borderRadius: 12,color: '#fff',padding:0}}>
                    <IonRow style={{padding:10}}>
                        <IonCol size="2" className="ion-align-self-center">
                            <img style={{width:42,height:42}} src={bnbIcon}/>
                        </IonCol>
                        <IonCol className="ion-align-self-center">
                            <div style={{color:'#000',fontWeight: 'bold'}}>Bangs</div>
                            <div style={{color:'#868990',fontSize:12,marginTop:5}}>Bangs</div>

                        </IonCol>
                        <IonCol className="ion-align-self-center"  style={{color:'#000'}} size="4">
                            <div style={{textAlign:'right',color:'#000',fontWeight: 'bold'}}>17000.89</div>
                            <div style={{textAlign:'right',color:'#868990',fontSize:12,marginTop:5}}>$299.928.12</div>
                        </IonCol>
                    </IonRow>
                    <div style={{borderTop: '1px solid #FFFFFF',width:'100%'}} />
                    <IonRow style={{height:35}}>
                        <IonCol className="ion-align-self-center">
                            <div style={{textAlign:'center',fontWeight: 'bold',color:'#0620F9'}}>Log</div>
                        </IonCol>
                        <div style={{borderRight: '1px solid #FFFFFF',height:'100%'}} />
                        <IonCol className="ion-align-self-center">
                            <div style={{textAlign:'center',fontWeight: 'bold',color:'#0620F9'}}>Transfer</div>
                        </IonCol>
                    </IonRow>
                </IonGrid>



            </IonContent>
        </IonPage>
    );
};

export default User;