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
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {useAppDispatch} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {RouteComponentProps} from "react-router";
import {VersePointApi} from "../../service/Api";

interface MenuProps extends RouteComponentProps {}
const CreateExp: React.FC<MenuProps> = ({history,match}) => {

    const [expression, setExpression] = useState<string>();
    const [present, dismiss] = useIonToast();
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useAppDispatch();
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
            MainPic:'',
            MainColor:'',
            BackgroundColor:'',
            Music:'',
            ExpressionContent:expression
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
                    <IonTitle>Create Expressions</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList  lines="none">

                    <IonItem  className='secondary-color'>
                        <div >Expression</div>
                    </IonItem>
                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={expression} placeholder="Input Expression" onIonChange={e => setExpression(e.detail.value!)} />
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