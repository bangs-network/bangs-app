import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem,
    IonLabel, IonList, IonLoading,
    IonPage, IonRow, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import * as React from "react";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {RouteComponentProps} from "react-router";
import UploadImage from "../../components/widget/UploadImage";
import {useAppDispatch} from "../state/app/hooks";
import {saveLoadState} from '../state/slice/loadStateSlice';

interface MenuProps extends RouteComponentProps {
}

const EditRole: React.FC<MenuProps> = ({history, match}) => {


    const [roleId, setRoleId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const dispatch = useAppDispatch();
    const [showLoading, setShowLoading] = useState(false);

    const createRole = () => {
        const data = {
            VerseID: 17,
            RoleName: roleName,
            Note: note,
            RoleAvator: imgUrl,
        };
        setShowLoading(true);
        axios.post('https://api.bangs.network/role/create', data).then(function (response: any) {
            console.info(response);

            if (response?.data?.code == 1000) {
                dispatch(saveLoadState({tag: 'Roles', state: 1}))
                history.goBack()
            }
            setShowLoading(false);
        }).catch(function (error: any) {
            setShowLoading(false);
            console.info(error)
        })
    };


    useEffect(() => {
        let params: any = match.params;
        if (params.id == 0) {
            setTitle("Add Role");
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
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tabs/home"/>
                        </IonButtons>
                        <IonTitle>{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonItem className='secondary-color'>
                        <div>Role Image</div>
                    </IonItem>

                    <IonItem>
                        <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl}/>
                    </IonItem>

                    <IonItem className='secondary-color'>
                        <div>Role Name</div>
                    </IonItem>
                    <IonItem color='medium'>
                        <IonInput value={roleName} placeholder="Input Role Name"
                                  onIonChange={e => setRoleName(e.detail.value!)}/>
                    </IonItem>


                    <IonItem className='secondary-color'>
                        <div>Role Detail</div>
                    </IonItem>

                    <IonItem color='medium'>
                        <IonTextarea rows={4} value={note} placeholder="Input Role Detail"
                                     onIonChange={e => setNote(e.detail.value!)}/>
                    </IonItem>


                </IonContent>

                <IonFooter onClick={createRole} className='ion-padding'
                           style={{background: '#3171e0', textAlign: 'center', fontWeight: 'bold'}}>
                    Add Role
                </IonFooter>

            </IonPage>
        </>
    );
};

export default EditRole;