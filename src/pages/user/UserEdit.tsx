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
import {RoleCreateApi, UpdateAccountApi} from "../../service/Api";
import BgIcon from "../../img/header-bg.png";
import parseUrl from "../../util/common";
import {RowCenterWrapper, RowItemCenterWrapper} from "../../theme/commonStyle";

interface MenuProps extends RouteComponentProps {
}

const UserEdit: React.FC<MenuProps> = ({history, match}) => {


    const [userName, setUserName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const dispatch = useAppDispatch();
    const [present, dismiss] = useIonToast();
    const [showLoading, setShowLoading] = useState(false);


    const updateAccount =  () => {
        if (!imgUrl) {
            present('Please upload image', 3000);
            return
        }
        if (!userName) {
            present('Please input user name', 3000);
            return
        }
        setShowLoading(true);
        const data = {
            Avater: imgUrl,
            UserName: userName
        };
        UpdateAccountApi(data).then(function (response: any) {
            setShowLoading(false)
            dispatch(saveLoadState({tag: 'User', state: 1}));
            history.goBack()
        }).catch(function (error: any) {
            console.info(error)
            setShowLoading(false)
        });

    };


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
                            <IonTitle>Edit User</IonTitle>
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
                                    <IonTextarea className='input' rows={1} value={userName}
                                                 placeholder="Add a Name" style={{borderRadius: 6, paddingLeft: 8}}
                                                 onIonChange={e => setUserName(e.detail.value!)}/>
                                </div>
                            </RowItemCenterWrapper>
                        </div>

                    </div>



                </IonContent>

                <IonFooter onClick={updateAccount}
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
                            Edit
                        </div>
                    </RowCenterWrapper>

                </IonFooter>


            </IonPage>
        </>
    );
};

export default UserEdit;