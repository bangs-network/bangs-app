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

const CreateTalks: React.FC = () => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle className='header-title'>Create Talks</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList  lines="none">
                    <IonRadioGroup>

                        <IonItem  className='secondary-color'>
                            <div>DAO</div>
                        </IonItem>

                        <IonItem>
                            <IonRadio value="1" />
                            <IonLabel className='ion-padding-start'>Free</IonLabel>
                        </IonItem>

                        <IonItem>

                            <IonRadio value="2" />
                            <IonLabel className='ion-padding-start'>Roles DAO<br/></IonLabel>

                        </IonItem>


                        <IonItem>

                            <IonAvatar slot="start">
                                <img  src={headerIcon}/>
                            </IonAvatar>
                            <IonLabel >
                               CP002
                            </IonLabel>
                            <IonButton color="primary">Roles</IonButton>

                        </IonItem>


                        <IonItem>

                            <IonRadio value="3" />
                            <IonLabel className='ion-padding-start'>Verse DAO</IonLabel>
                        </IonItem>

                        <IonItem>

                            <IonAvatar slot="start">
                                <img  src={headerIcon}/>
                            </IonAvatar>
                            <IonLabel >
                                VIP Users
                            </IonLabel>
                            <IonButton color="secondary">Verse</IonButton>

                        </IonItem>

                    </IonRadioGroup>

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

                    <IonItem className='secondary-color'>
                        Staking: 1000 Bang
                    </IonItem>

                </IonList>

            </IonContent>

            <IonFooter className='ion-padding' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
               Create Talks
            </IonFooter>

        </IonPage>
    );
};

export default CreateTalks;