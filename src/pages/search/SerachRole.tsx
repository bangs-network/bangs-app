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
import {FixUi, RowItemCenterWrapper} from "../../theme/commonStyle";


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
            <IonHeader  className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  color='secondary'/>
                    </IonButtons>
                    <IonTitle>Roles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/*<IonSearchbar showCancelButton="never" placeholder="Search"*/}
                              {/*onIonChange={e => setSearchText(e.detail.value!)}/>*/}
                <IonList lines="none">


                    <div style={{background:'#f4f4f4',height:'100%',paddingTop:12}}>


                        {list.map((item: any, index: number) => {

                            return <RowItemCenterWrapper onClick={()=>selectRole(item)}  className={'cursor'} style={{height:81,margin:'0 12px 12px 12px',borderRadius:12,background:'#fff',padding:'0 15px'}} key={index} >


                                <img style={{width:54,height:54,borderRadius:54}} src={parseUrl(item.roleAvator)}/>

                                <div style={{marginLeft:16}}>

                                    <div style={{fontSize:16,fontWeight:'bold'}}> {item.roleName}</div>
                                    <div style={{marginTop:8,fontSize:12,color: '#B6BDC9'}}>By @dolosseXD</div>
                                </div>

                                <FixUi />

                                <div style={{borderRadius:32,width:72,height:30,lineHeight:'30px',color:'#fff',background:'#FF897D',textAlign:'center'}}>Select</div>


                                {/*<IonButton onClick={(e:any)=>skipEditRole(e,item.roleId)} fill="outline" slot="end">Edit</IonButton>*/}

                            </RowItemCenterWrapper>


                        })}

                    </div>

                </IonList>


            </IonContent>
        </IonPage>
    );
};

export default SearchRole;
