import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonIcon, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";
import {addCircleOutline, removeCircleOutline} from "ionicons/icons";
import {RouteComponentProps} from "react-router";

interface MenuProps extends RouteComponentProps {}

const CreateDice: React.FC<MenuProps> = ({history}) => {

    const [number, setNumber] = useState<number>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>Create Dice</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding-top'>
                <IonItem lines={'none'}>
                    <IonThumbnail slot="start">
                        <img src={headerIcon}/>
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Cp001</h2>
                    </IonLabel>
                    <IonInput style={{border:'1px solid #fff',marginLeft:20}} type="number" inputmode='numeric' value={number} placeholder="Enter Number" onIonChange={e => setNumber(parseInt(e.detail.value!, 10))} />
                    <IonIcon size={'large'} style={{cursor:'pointer'}} slot="end" icon={removeCircleOutline}/>
                </IonItem>
                <IonItem>
                    <IonIcon onClick={() => {
                        history.push('/searchNft');
                    }} size={'large'} style={{cursor:'pointer'}} slot="start" icon={addCircleOutline}/>
                </IonItem>
            </IonContent>

            <IonFooter className='ion-padding' style={{background: '#3171e0', textAlign: 'center', fontWeight: 'bold'}}>
                Create Dice
            </IonFooter>

        </IonPage>
    );
};

export default CreateDice;