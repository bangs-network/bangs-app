import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonIcon, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar, useIonToast
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {RouteComponentProps} from "react-router";
import {VersePointApi} from "../../service/Api";
import UploadImage from "../../components/widget/UploadImage";
import {addCircleOutline, removeCircleOutline} from "ionicons/icons";
import parseUrl from "../../util/common";
import {saveRoleState} from "../state/slice/roleSlice";
import {useEffect} from "react";

interface MenuProps extends RouteComponentProps {}
const CreateExp: React.FC<MenuProps> = ({history,match}) => {

    const [expression, setExpression] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [present, dismiss] = useIonToast();
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [backImage, setBackImage] = useState<string>('');
    const [list,setList] = useState<any>([]);
    const [roleIds,setRoleIds] = useState<any>([]);
    const roleData:any = useAppSelector(state => state.roleSlice);

    //1=theme， 2=expression，3=talk，4=dice
    //  Dice:[{"RoleID":1,"MaxValue":100}]


    const createExp = () => {
        if (!expression) {
            present('Please Input content', 3000);
            return
        }
        let params:any = match.params
        console.info(params.id);
        const data = {
            VerseID:Number(params.id),
            TimelineType:2,
            MainPic:backImage,
            MainColor:'',
            RoleIDs:roleIds,
            BackgroundColor:'',
            Music:'',
            ExpressionTitle:title,
            ExpressionContent:expression.replace(/(\r\n)|(\n)/g,'<br/>')
        };
        setShowLoading(true);
        VersePointApi(data).then(function (response: any) {
            setShowLoading(false)
            dispatch(saveLoadState({tag: 'VerseDetail', state: 1}));
            history.goBack()
        }).catch(function (error: any) {
            console.info(error)
            present(error, 5000);
            setShowLoading(false)
        });

    };

    const deleteItem = (index:number) => {
        list.splice(index, 1);
        let newList = [...list];
        setList(newList);

        roleIds.splice(index, 1);
        let newRoleList = [...roleIds];
        setRoleIds(newRoleList);
    };

    useEffect(() => {
        if (roleData && roleData.roleId  > 0 ) {
            let role = {
                roleId:roleData.roleId,
                roleAvator:roleData.roleAvator,
                roleName:roleData.roleName,
            };
            list.push(role);
            let newList = [...list];
            setList(newList);

            let roleId = roleData.roleId;
            roleIds.push(roleId);
            let newRoleList = [...roleIds];
            setRoleIds(newRoleList);

            dispatch(saveRoleState({ roleId: 0, roleAvator: '', roleName:'' , amount: ''}))
        }
    },[roleData.roleId]);

    return (
        <IonPage>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  color='secondary' defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle>Create Expressions</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList  lines="none">

                    <IonItem className='secondary-color'>
                        <div>Image</div>
                    </IonItem>

                    <IonItem>
                        <UploadImage imgUrl={backImage} setImgUrl={setBackImage}/>
                    </IonItem>

                    <IonItem  className='secondary-color'>
                        <div>Title</div>
                    </IonItem>
                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={title} placeholder="Input Expression" onIonChange={e => setTitle(e.detail.value!)} />
                    </IonItem>

                    <IonItem  className='secondary-color'>
                        <div>Content</div>
                    </IonItem>
                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={expression} placeholder="Input Expression" onIonChange={e => setExpression(e.detail.value!)} />
                    </IonItem>

                    {list.map((item: any, index: number) => {

                        return  <IonItem key={index} lines={'none'}>
                            <IonThumbnail slot="start">
                                <img src={parseUrl(item.roleAvator)}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h2 style={{width:100}}> {item.roleName}</h2>
                            </IonLabel>
                            <IonIcon size={'large'} style={{cursor:'pointer'}} slot="end" icon={removeCircleOutline} onClick={()=>deleteItem(index)}/>
                        </IonItem>


                    })}


                    <IonItem lines='none'  style={{cursor:'pointer'}} onClick={() => {
                        let params:any = match.params;
                        history.push({
                            pathname: `/searchRole/${params.id}`, state: {
                                selectList: roleIds
                            }
                        });
                    }}>
                        <IonIcon  size={'large'} slot="start" icon={addCircleOutline}/>
                        <IonLabel style={{color:'#999'}}>Add role (Only added roles can see this expression)</IonLabel>
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