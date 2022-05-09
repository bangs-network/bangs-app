import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonIcon,
    IonItem,
    IonLabel, IonList,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import {addCircleOutline} from "ionicons/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import parseUrl from "../../util/common";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {LoadState} from "../state/slice/loadStateSlice";

interface MenuProps extends RouteComponentProps {}

const Roles: React.FC<MenuProps> = ({history,match}) => {
    
    const [list,setList] = useState<any>([]);
    const loadState = useAppSelector(state => state.loadStateSlice);

    useEffect(() => {
        getData()
    },[]);

    useEffect(() => {
        console.info(loadState)
        if (loadState && loadState.tag  == 'Roles'  && loadState.state ==  1) {
            getData()
        }
    },[loadState.state]);

    const getData = () => {
        let params:any = match.params
        console.info(params.id);
        const data = {
            VerseID:Number(params.id)
        };
        axios.get('https://api.bangs.network/role/search', {
            params:data
        }).then(function (response: any) {
            if (response?.data?.body?.roleList) {
                setList(response?.data?.body?.roleList)
            }
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };



    const toRoleDetail = (roleId:number) => {
        history.push(`/roleDetail/${roleId}`);
    };

    const skipEditRole = (e: any,roleId:number) => {
        e.stopPropagation();
        history.push(`/editRole/${roleId}`);
    };

    const skipCreteRole = () => {
        let params:any = match.params
        history.push(`/editRole/${params.id}`);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>Roles</IonTitle>
                    <IonButtons slot="end">
                    <IonButton  onClick={skipCreteRole}>
                        <IonIcon slot="icon-only" icon={addCircleOutline}/>
                    </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList lines="none">


                    {list.map((item: any, index: number) => {

                        return  <IonItem key={index} onClick={()=>toRoleDetail(item.roleId)}>

                            <IonAvatar slot="start">
                                <img src={parseUrl(item.roleAvator)}/>
                            </IonAvatar>
                            <IonLabel>
                                {item.roleName}
                            </IonLabel>
                            {/*<IonButton onClick={(e:any)=>skipEditRole(e,item.roleId)} fill="outline" slot="end">Edit</IonButton>*/}

                        </IonItem>


                    })}

                </IonList>



            </IonContent>
        </IonPage>
    );
};

export default Roles;