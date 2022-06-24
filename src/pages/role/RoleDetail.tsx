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
import {RowItemCenterWrapper} from "../../theme/commonStyle";

interface MenuProps extends RouteComponentProps {
}

const RoleDetail: React.FC<MenuProps> = ({history, match}) => {

    const [data, setData] = useState<any>({
        roleAvator: "",
        roleDescription: "",
        roleId: 0,
        roleName: ""
    });

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        let params: any = match.params
        console.info(params.id);
        const data = {
            ID: Number(params.id)
        };
        axios.get('https://api.bangs.network/role/detail', {
            params: data
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

        <IonPage id='position-top'>
            <IonContent>

                <IonHeader className="about-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tabs/home"/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <div className="role-header"/>

                <div className="role-info">
                    <RowItemCenterWrapper style={{margin: '0 32px'}}>
                        <img style={{borderRadius: 64, width: 64, height: 64, border: '2px solid #FFFFFF'}}
                             src={parseUrl(data.roleAvator)}/>
                        <div style={{fontSize: 16, fontWeight: 'bold', marginLeft: 15}}>{data.roleName}</div>
                    </RowItemCenterWrapper>


                    <div style={{background: '#FFFFFF',marginTop:12,borderRadius:12,margin:'20px 12px',padding:'15px 15px'}}>
                        <div><span style={{background: '#D1CB52',padding:'4px 10px',color:'#fff',textAlign:'center',borderRadius:20}}>Description</span></div>
                        <div style={{marginTop:12}}>{data.roleDescription}</div>
                    </div>

                </div>

            </IonContent>

        </IonPage>
    );
};

export default RoleDetail;