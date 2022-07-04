import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea,
    IonTitle,
    IonToolbar, useIonToast
} from '@ionic/react';
import * as React from "react";
import {useState} from "react";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {VersePointApi} from "../../service/Api";
import {RouteComponentProps} from "react-router";
import {useAppDispatch} from "../state/app/hooks";
import {RowCenterWrapper} from "../../theme/commonStyle";

interface MenuProps extends RouteComponentProps {}
const CreateTalks: React.FC<MenuProps> = ({history,match}) => {


    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [present, dismiss] = useIonToast();

    const create = () => {
        let params:any = match.params
        console.info(params.id);
        const data = {
            VerseID:Number(params.id),
            TimelineType:3,
            MainPic:'',
            MainColor:'',
            BackgroundColor:'',
            Music:'',
            ExpressionContent:''
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

    return (
        <IonPage>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            <IonHeader  className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton   color='secondary' defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle className='header-title'>Create Talks</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

            </IonContent>

            <IonFooter onClick={create}
                       className='ion-padding ion-no-border'>
                <RowCenterWrapper>
                    <div className='cursor' style={{
                        background: '#0620F9',
                        borderRadius: 50,
                        textAlign: 'center',
                        width: 227,
                        height: 39,
                        color:'#fff',
                        lineHeight: '39px'
                    }}>
                        Create Talks
                    </div>
                </RowCenterWrapper>

            </IonFooter>


        </IonPage>
    );
};

export default CreateTalks;