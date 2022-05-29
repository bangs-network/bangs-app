import {
    IonAvatar,
    IonBackButton, IonButton,
    IonButtons,
    IonCard,
    IonCardHeader, IonCol,
    IonContent, IonGrid,
    IonHeader, IonItem,
    IonItemGroup, IonLabel, IonList,
    IonPage, IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Search.css';
import {useEffect, useState} from "react";
import Icon1 from "../../img/1.png";
import Icon2 from "../../img/2.png";
import Icon3 from "../../img/3.png";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import parseUrl from "../../util/common";
import {list} from "ionicons/icons";
import axios from "axios";
import {useAppDispatch} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {Role, saveRoleState} from "../state/slice/roleSlice";


interface MenuProps extends RouteComponentProps {}

const SearchRole: React.FC<MenuProps> = ({history,match}) => {

    const [searchText, setSearchText] = useState('');
    const [list,setList] = useState<any>([]);
    const [selectList,setSelectList] = useState<any>([]);
    const dispatch = useAppDispatch();
    const [select,setSelect] = useState<any>(0);

    useEffect(() => {
        let location:any = history.location
        console.info(location)
        if (location.state && location.state.select) {
            setSelect(location.state.select)
        }
        let selectList = []
        if (location.state && location.state.selectList) {
            selectList = location.state.selectList
        }
        console.info(selectList)
        getData(selectList)
    },[searchText]);


    const getData = (selectList:any) => {
        let params:any = match.params
        const data = {
            VerseID:Number(params.id),
            VerseName:'',
            RoleName:searchText
        };
        axios.get('https://api.bangs.network/role/search', {
            params:data
        }).then(function (response: any) {

            if (response?.data?.body?.roleList) {
                let roleList = response?.data?.body?.roleList;
                let list = [];
                for (let i = 0; i < roleList.length; i++) {
                    if (!selectList.includes(roleList[i].roleId)){
                        list.push(roleList[i])
                    }
                }
                setList(list)
            }
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const selectRole = (item:Role) => {
        item.amount = ''
        dispatch(saveRoleState(item))
        history.goBack()

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  color='secondary'/>
                    </IonButtons>
                    <IonTitle >Search  Nft</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Search</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonSearchbar showCancelButton="never" placeholder="Search"
                              onIonChange={e => setSearchText(e.detail.value!)}/>
                <IonList lines="none">


                    {list.map((item: any, index: number) => {

                        return  <IonItem key={index}>

                            <IonAvatar slot="start">
                                <img src={parseUrl(item.roleAvator)}/>
                            </IonAvatar>
                            <IonLabel>
                                {item.roleName}
                            </IonLabel>
                            <IonButton onClick={()=>selectRole(item)} fill="outline" slot="end">Select</IonButton>

                        </IonItem>


                    })}

                </IonList>


            </IonContent>
        </IonPage>
    );
};

export default SearchRole;
