import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel, IonList,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";

const Roles: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>Roles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>

                <IonList lines="none">
                    <IonItem>

                        <IonAvatar slot="start">
                            <img src={headerIcon}/>
                        </IonAvatar>
                        <IonLabel>
                            CP001
                        </IonLabel>
                        <IonButton color="primary">Quantum</IonButton>

                    </IonItem>
                    <IonItem>

                        <IonAvatar slot="start">
                            <img src={headerIcon}/>
                        </IonAvatar>
                        <IonLabel>
                            CP001
                        </IonLabel>
                        <IonButton color="primary">Quantum</IonButton>

                    </IonItem>
                </IonList>



            </IonContent>
            <IonFooter>
                <IonItem>
                <div>You can collapse roles from</div>
                </IonItem>
                <IonItem>
                    <IonButton color="primary">Main World</IonButton>
                    <IonButton color="primary">NFT</IonButton>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};

export default Roles;