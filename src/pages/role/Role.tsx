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
import {FixUi, RowCenterWrapper, RowItemCenterWrapper} from "../../theme/commonStyle";

interface MenuProps extends RouteComponentProps {
}

const Roles: React.FC<MenuProps> = ({history, match}) => {

    const [list, setList] = useState<any>([]);
    const [select, setSelect] = useState<any>(0);
    const [type, setType] = useState<any>(0);
    const loadState = useAppSelector(state => state.loadStateSlice);

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        console.info(loadState)
        console.info("history==")
        console.info(history)

        let location: any = history.location
        if (location.state && location.state.state) {
            setSelect(location.state.state.select)
        } else {
            setSelect(0)
        }

        if (loadState && loadState.tag == 'Roles' && loadState.state == 1) {
            getData()
        }
    }, [loadState.state]);

    const getData = () => {
        let params: any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id)
        };
        axios.get('https://api.bangs.network/role/search', {
            params: data
        }).then(function (response: any) {
            if (response?.data?.body?.roleList) {
                setList(response?.data?.body?.roleList)
            }
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };


    const toRoleDetail = (roleId: number) => {
        history.push(`/roleDetail/${roleId}`);
    };

    const skipEditRole = (e: any, roleId: number) => {
        e.stopPropagation();
        history.push(`/editRole/${roleId}`);
    };

    const skipCreteRole = () => {
        let params: any = match.params
        history.push(`/editRole/${params.id}`);
    };

    const selectType = (index:number) => {
        setType(index)
    };

    return (
        <IonPage>
            <IonHeader  className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color='secondary' defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>Roles</IonTitle>
                    {select != 1 && <IonButtons slot="end">
                        <IonButton onClick={skipCreteRole}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>}
                </IonToolbar>
                <RowCenterWrapper style={{color:'#000'}}>
                    <FixUi/>
                    <div className='cursor' onClick={()=>selectType(0)} style={{paddingBottom:4,width:60,textAlign:'center', fontWeight:type==0?'bold':'normal',borderBottom:type==0?'3px solid #0620F9':'none'}}>All</div>
                    <FixUi/>
                    <div className='cursor' onClick={()=>selectType(1)} style={{paddingBottom:4,width:60,textAlign:'center', fontWeight:type==1?'bold':'normal',borderBottom:type==1?'3px solid #0620F9':'none'}}>Local</div>
                    <FixUi/>
                    <div className='cursor' onClick={()=>selectType(2)} style={{paddingBottom:4,width:60,textAlign:'center', fontWeight:type==2?'bold':'normal',borderBottom:type==2?'3px solid #0620F9':'none'}}>Global</div>
                    <FixUi/>
                </RowCenterWrapper>
            </IonHeader>
            <IonContent style={{padding:0,margin:0}}>



                <div style={{background:'#f4f4f4',height:'100%',paddingTop:12}}>


                    {list.map((item: any, index: number) => {

                        return <RowItemCenterWrapper className={'cursor'} style={{height:81,margin:'0 12px 12px 12px',borderRadius:12,background:'#fff',padding:'0 15px'}} key={index} onClick={() => toRoleDetail(item.roleId)}>


                            <img style={{width:54,height:54,borderRadius:54}} src={parseUrl(item.roleAvator)}/>

                            <div style={{marginLeft:16}}>

                                <div style={{fontSize:16,fontWeight:'bold'}}> {item.roleName}</div>
                                {item.createUserName && <div style={{marginTop:8,fontSize:12,color: '#B6BDC9'}}>By @{item.createUserName}</div>}
                            </div>

                            <FixUi />

                            <div style={{borderRadius:32,width:72,height:30,lineHeight:'30px',color:'#fff',background:'#FF897D',textAlign:'center'}}>Local</div>

                            {/*<IonButton onClick={(e:any)=>skipEditRole(e,item.roleId)} fill="outline" slot="end">Edit</IonButton>*/}

                        </RowItemCenterWrapper>


                    })}

                </div>


            </IonContent>
        </IonPage>
    );
};

export default Roles;