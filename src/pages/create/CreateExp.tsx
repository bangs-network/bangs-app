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
import axios from "axios";

const CreateExp: React.FC = () => {

    const [expression, setExpression] = useState<string>();

    //1=theme， 2=expression，3=talk，4=dice
    //  Dice:[{"RoleID":1,"MaxValue":100}]
    const createExp = () => {
        const data = {
            VerseID:17,
            TimelineType:2,
            MainPic:'',
            MainColor:'',
            BackgroundColor:'',
            Music:'',
            ExpressionContent:expression
        };
        axios.post('https://api.bangs.network/timeline/create', data).then(function (response: any) {
            console.info(response)
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
                    <IonTitle>Create Expressions</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList  lines="none">

                    <IonItem  className='secondary-color'>
                        <div >Expression</div>
                    </IonItem>
                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={expression} placeholder="Input Expression" onIonChange={e => setExpression(e.detail.value!)} />
                    </IonItem>


                </IonList>

            </IonContent>

            <IonFooter  onClick={createExp} className='ion-padding cursor' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
                Create Expressions
            </IonFooter>

        </IonPage>
    );
};

export default CreateExp;