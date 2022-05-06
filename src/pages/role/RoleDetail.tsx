import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel, IonList,
    IonPage, IonRow, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";

const RoleDetail: React.FC = () => {

    const [note, setNote] = useState<string>(' The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can onl' +
        '                                    be' +
        '                                    created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a' +
        '                                    Mutant Ape in the public sale.');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>CP001</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>


                <IonItem>
                    <IonThumbnail slot="start">
                        <img src={headerIcon}/>
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Cp001</h2>
                    </IonLabel>
                    <IonButton fill="outline" slot="end">Edit</IonButton>
                </IonItem>
                <IonItem>
                    <div>
                        <h2>Role introduce:</h2>
                        <p>{note}</p>
                    </div>
                </IonItem>
                <IonItem>
                        <h2>Role attributes:</h2>
                </IonItem>
                <IonItem>
                    <p className='ion-padding-end'>SAN:</p>
                    <p>5</p>
                    <IonButton fill="outline" slot="end">Edit</IonButton>
                </IonItem>
                <IonItem>
                    <p className='ion-padding-end'>STR:</p>
                    <p>5</p>
                    <IonButton fill="outline" slot="end">Edit</IonButton>
                </IonItem>
                <IonItem>
                    <p className='ion-padding-end'>DEF:</p>
                    <p>5</p>
                    <IonButton fill="outline" slot="end">Edit</IonButton>
                </IonItem>

            </IonContent>

        </IonPage>
    );
};

export default RoleDetail;