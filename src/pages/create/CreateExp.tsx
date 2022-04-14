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

const CreateExp: React.FC = () => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [expression, setExpression] = useState<string>();

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

                    <IonItem   className='secondary-color'>
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
                        <div >Expression</div>
                    </IonItem>
                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={expression} placeholder="Input Expression" onIonChange={e => setExpression(e.detail.value!)} />
                    </IonItem>

                    <IonItem  className='secondary-color'>
                        Staking: 1000 Bang
                    </IonItem>

                </IonList>

            </IonContent>

            <IonFooter className='ion-padding' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
                Create Expressions
            </IonFooter>

        </IonPage>
    );
};

export default CreateExp;