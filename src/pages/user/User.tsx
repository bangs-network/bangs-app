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
import headerIcon from "../../img/0.png";
import * as React from "react";

const User: React.FC = () => {

    const login = () => {

    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle>User</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <div className="ion-padding-top ion-text-center">

                    <img className='icon-circle p-120' src={headerIcon}/>
                    <IonButton color="primary" onClick={login}>Login</IonButton>
                    <h2>Gordon</h2>
                    <p>0xDsI883K...HO8R</p>
                </div>
                <IonGrid  style={{background:'#666',color:'#fff'}}>
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
                <IonGrid  style={{background:'#666',color:'#fff'}}>
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