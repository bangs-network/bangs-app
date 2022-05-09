import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import * as React from "react";
import {useState} from "react";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {VersePointApi} from "../../service/Api";
import {RouteComponentProps} from "react-router";
import {useAppDispatch} from "../state/app/hooks";

interface MenuProps extends RouteComponentProps {}
const CreateTalks: React.FC<MenuProps> = ({history,match}) => {


    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useAppDispatch();

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
            dispatch(saveLoadState({tag: 'VerseDetail', state: 1}));
            history.goBack()
            //history.replace(`/verseDetail/${params.id}`);
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error)
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
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle className='header-title'>Create Talks</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

            </IonContent>

            <IonFooter onClick={create} className='ion-padding cursor' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
               Create Talks
            </IonFooter>

        </IonPage>
    );
};

export default CreateTalks;