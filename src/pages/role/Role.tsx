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
import {RouteComponentProps} from "react-router";

interface MenuProps extends RouteComponentProps {}

const Roles: React.FC<MenuProps> = ({history}) => {


    const toRoleDetail = () => {
        history.push('/roleDetail');
    };

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
            <IonContent>

                <IonList lines="none">
                    <IonItem onClick={toRoleDetail}>

                        <IonAvatar slot="start">
                            <img src={headerIcon}/>
                        </IonAvatar>
                        <IonLabel>
                            CP001
                        </IonLabel>

                    </IonItem>
                    <IonItem>

                        <IonAvatar slot="start">
                            <img src={headerIcon}/>
                        </IonAvatar>
                        <IonLabel>
                            CP002
                        </IonLabel>

                    </IonItem>
                </IonList>



            </IonContent>
        </IonPage>
    );
};

export default Roles;