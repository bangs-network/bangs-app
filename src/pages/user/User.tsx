import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonItem,
    IonLabel,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/head.png";
import bnbIcon from "../../img/bnb.png";
import editIcon from "../../img/edit.png";
import * as React from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import axios from "axios";
import BgIcon from "../../img/header-bg.png";
import UrlIcon from "../../img/url_white.png";
import './user.scss';
import {addCircleOutline} from "ionicons/icons";
import {emitBox} from "../../components/emitWeb3/Connectors";
import {
    ColumnCenterWrapper,
    ColumnItemCenterWrapper,
    RowCenterWrapper,
    RowItemCenterWrapper
} from "../../theme/commonStyle";
import {useState} from "react";
import {useEffect} from "react";

const User: React.FC = () => {

    const [account, setAccount] = useState<string>('RGVQ94kkwsdg22VkeDCnebYzLZRjBuDBPx2SvjphrHveH5z3VRGBRN3dsY24AZyiKVbB1MyZ8joJssdagdHv84bSY9yqqi33JCwT7Tm726s5G7rW9RNs5588dU5hDDNPR');

    useEffect(() => {
        emitBox.onActiveAccountChanged((accounts: any) => {
            console.info(accounts)
        })
    }, []);


    const uploadImage = async () => {
        console.info("uploadImage:")

        try {
            const image: any = await Camera.getPhoto({
                quality: 100,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos
            });

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            console.info(image);
            const file = await fetch(image.webPath).then(r => r.blob()).then(blobFile => new File([blobFile], 'file', {type: blobFile.type}));


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

    const base64toFile = (dataurl: any, filename: any) => {
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

    const showAccountWidget = () => {
        emitBox.showWidget().catch(e => {
            console.error(e)
        });

    };


    return (
        <IonPage id='position-top'>

            <IonContent>
                <IonHeader className="about-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tabs/home"/>
                        </IonButtons>
                        <IonTitle>Wallet</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={showAccountWidget}>
                                <img style={{width: 32, height: 32}} src={UrlIcon}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <div className="about-header">
                    {/* Instead of loading an image each time the select changes, use opacity to transition them */}
                    <img src={BgIcon} className="about-image"/>
                </div>
                <div className="about-info">
                    <div style={{marginTop: -60, background: 'none'}}>
                        <div className="ion-text-center" style={{

                            borderRadius: 12
                        }}>
                            <RowCenterWrapper>
                                <div style={{position: 'relative'}} className='wh-86 cursor'>
                                    <img onClick={uploadImage} className='icon-circle wh-86 cursor' src={headerIcon}/>
                                    <img style={{width: 24, height: 24, position: 'absolute', right: 0, bottom: 0}}
                                         src={editIcon}/>
                                </div>
                            </RowCenterWrapper>
                            <div style={{fontSize: 18, fontWeight: 'bold', margin: 12}}>HERMAN.PAN</div>

                        </div>

                        <div style={{background: '#fff', padding: 12, margin: 24, borderRadius: 12}}>
                            <div style={{fontWeight: 'bold', fontSize: 16}}>Receive</div>
                            <div style={{color: '#868990',marginTop:12,marginBottom:15}} >{account}</div>
                        </div>
                        <div style={{
                            background: '#0620F9',
                            color:'#fff',
                            zIndex:999,
                            width:85,
                            margin:'-40px auto 0',
                            height:29,
                            fontWeight:'bold',
                            textAlign:'center',
                            lineHeight:'29px',
                            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)',
                            borderRadius: 71
                        }}>Copy</div>

                        <div style={{margin:12}}>
                        <div style={{ marginTop:40,fontSize: 18, fontWeight: 'bold'}}>Coins</div>

                        <IonGrid
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                color: '#fff',
                                padding: 0
                            }}>
                            <RowItemCenterWrapper style={{padding: 10}}>
                                <RowItemCenterWrapper style={{width:42}} className="ion-align-self-center">
                                    <img style={{width: 42, height: 42}} src={bnbIcon}/>
                                </RowItemCenterWrapper>
                                <ColumnItemCenterWrapper className="ion-align-self-center">
                                    <div style={{color: '#000', fontWeight: 'bold'}}>Bangs</div>
                                    <div style={{color: '#868990', fontSize: 12, marginTop: 5}}>Bangs</div>

                                </ColumnItemCenterWrapper>
                                <ColumnItemCenterWrapper className="ion-align-self-center" style={{color: '#000'}}>
                                    <div style={{textAlign: 'right', color: '#000', fontWeight: 'bold'}}>17000.89</div>
                                    <div style={{
                                        textAlign: 'right',
                                        color: '#868990',
                                        fontSize: 12,
                                        marginTop: 5
                                    }}>$299.928
                                    </div>
                                </ColumnItemCenterWrapper>
                            </RowItemCenterWrapper>
                            <div style={{borderTop: '1px solid #f4f4f4', width: '100%'}}/>
                            <IonRow style={{height: 35}}>
                                <IonCol className="ion-align-self-center">
                                    <div style={{textAlign: 'center', fontWeight: 'bold', color: '#0620F9'}}>Log</div>
                                </IonCol>
                                <div style={{borderRight: '1px solid #FFFFFF', height: '100%'}}/>
                                <IonCol className="ion-align-self-center">
                                    <div style={{textAlign: 'center', fontWeight: 'bold', color: '#0620F9'}}>Transfer
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        </div>
                    </div>

                </div>

            </IonContent>
        </IonPage>
    );
};

export default User;