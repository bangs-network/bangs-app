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
import axios from "axios";
import {RouteComponentProps} from "react-router";
import parseUrl from "../../util/common";
import {useEffect} from "react";

interface MenuProps extends RouteComponentProps {}

const RoleDetail: React.FC<MenuProps> = ({history,match}) => {

    const [data,setData] = useState<any>({roleAvator: "",
        roleDescription: "",
        roleId:  0,
        roleName: ""});

    useEffect(() => {
        getData()
    },[]);

    const getData = () => {
        let params:any = match.params
        console.info(params.id);
        const data = {
            ID:Number(params.id)
        };
        axios.get('https://api.bangs.network/role/detail', {
            params:data
        }).then(function (response: any) {
            if (response?.data?.body) {
                setData(response?.data?.body)
            }
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
                        <IonBackButton  color='secondary'/>
                    </IonButtons>
                    <IonTitle>{data.roleName}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >


                <IonItem lines='none'>
                    <IonThumbnail slot="start">
                        <img src={parseUrl(data.roleAvator)}/>
                    </IonThumbnail>
                    <IonLabel>
                        <h2>{data.roleName}</h2>
                    </IonLabel>
                    <IonButton fill="outline" slot="end">Edit</IonButton>
                </IonItem>
                <IonItem  lines='none'>
                    <div>
                        <h2>Role introduce:</h2>
                        <p>{data.roleDescription}</p>
                    </div>
                </IonItem>

            </IonContent>

        </IonPage>
    );
};

export default RoleDetail;