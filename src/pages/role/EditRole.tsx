import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem,
    IonLabel, IonList, IonLoading,
    IonPage, IonRow, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar, useIonToast
} from '@ionic/react';
import * as React from "react";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {RouteComponentProps} from "react-router";
import UploadImage from "../../components/widget/UploadImage";
import {useAppDispatch} from "../state/app/hooks";
import {saveLoadState} from '../state/slice/loadStateSlice';
import {RoleCreateApi} from "../../service/Api";
import BgIcon from "../../img/header-bg.png";
import parseUrl from "../../util/common";
import {RowCenterWrapper, RowItemCenterWrapper} from "../../theme/commonStyle";

interface MenuProps extends RouteComponentProps {
}

const EditRole: React.FC<MenuProps> = ({history, match}) => {


    const [roleId, setRoleId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const dispatch = useAppDispatch();
    const [present, dismiss] = useIonToast();
    const [showLoading, setShowLoading] = useState(false);

    const createRole = () => {
        if (!imgUrl) {
            present('Please upload image', 3000);
            return
        }
        if (!roleName) {
            present('Please input roleName', 3000);
            return
        }
        let params:any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id),
            RoleName: roleName,
            RoleDescription: note,
            RoleAvator: imgUrl,
        };
        setShowLoading(true);

        RoleCreateApi(data).then(function (response: any) {
            dispatch(saveLoadState({tag: 'Roles', state: 1}));
            history.goBack()
            //history.replace(`/Roles/${params.id}`);
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error)
            setShowLoading(false)
        });

    };


    useEffect(() => {
        dispatch(saveLoadState({tag: 'Roles', state: 0}));
        let params: any = match.params;
        if (params.id >= 0) {
            setTitle("New Role");
        } else {
            setTitle("Edit Role");
        }
        setRoleId(params.id);
    }, []);

    return (
        <>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={10000}
            />
            <IonPage id={'create-role'}>

                <IonContent>

                    <IonHeader  className="about-header">
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonBackButton defaultHref="/tabs/home"/>
                            </IonButtons>
                            <IonTitle>{title}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <div className="about-header">
                        {/* Instead of loading an image each time the select changes, use opacity to transition them */}
                        <img src={BgIcon} className="about-image"/>
                    </div>

                    <div className="about-info">

                        <div style={{borderRadius: 14,padding:"0 22px"}}>

                            <RowItemCenterWrapper style={{width: '100%',marginTop:20}}>
                                <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} width={50}/>
                                <div style={{marginLeft: 15, width: '100%'}}>
                                    <div className={'common-title'}>Name</div>
                                    <IonTextarea className='input' rows={1} value={roleName}
                                                 placeholder="Add a Name" style={{borderRadius: 6, paddingLeft: 8}}
                                                 onIonChange={e => setRoleName(e.detail.value!)}/>
                                </div>
                            </RowItemCenterWrapper>
                            <div className={'common-title'} style={{marginBottom:20,marginTop:20}}>Description</div>
                            <IonTextarea className='input' rows={6} style={{borderRadius: 6, paddingLeft: 8}}
                                         value={note} placeholder="Role description"
                                         onIonChange={e => setNote(e.detail.value!)}/>
                        </div>

                    </div>



                </IonContent>

                <IonFooter onClick={createRole}
                           className='ion-padding ion-no-border'>
                    <RowCenterWrapper>
                        <div className='cursor' style={{
                            background: '#0620F9',
                            borderRadius: 50,
                            textAlign: 'center',
                            width: 227,
                            height: 39,
                            lineHeight: '39px'
                        }}>
                            Create
                        </div>
                    </RowCenterWrapper>

                </IonFooter>


            </IonPage>
        </>
    );
};

export default EditRole;