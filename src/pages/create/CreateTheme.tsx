import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea,
    IonTitle,
    IonToolbar, useIonLoading
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import ChromePicker from "react-color/lib/components/chrome/Chrome";
import UploadImage from "../../components/widget/UploadImage";
import SketchPicker from "react-color/lib/components/sketch/Sketch";
import {url} from "inspector";
import parseUrl from "../../util/common";
import {RouteComponentProps} from "react-router";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {useAppDispatch} from "../state/app/hooks";

const popover = {
    position: 'absolute',
    zIndex: '2',
}
const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
}

interface MenuProps extends RouteComponentProps {}
const CreateTheme: React.FC<MenuProps> = ({history,match}) => {

    const [colorType, setColorType] = useState<number>(0);
    const [mainColor, setMainColor] = useState<string>('#ffffff');
    const [backColor, setBackColor] = useState<string>('#000000');
    const [opacityBackColor, setOpacityBackColor] = useState<string>('rgba(0,0,0,0.4)');
    const [backImage, setBackImage] = useState<string>('https://api.bangs.network/images/preview/53/26641d23-a23a-4baf-adf2-ca02107dda5d.png');
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const [present, dismiss] = useIonLoading();
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useAppDispatch();

    //1=theme， 2=expression，3=talk，4=dice
    //  Dice:[{"RoleID":1,"MaxValue":100}]
    const createExp = () => {
        setShowLoading(true)
        let params:any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id),
            TimelineType: 1,
            MainPic: backImage,
            MainColor: mainColor,
            BackgroundColor: backColor,
            Music: '',
            ExpressionContent: ''
        };
        axios.post('https://api.bangs.network/timeline/create', data).then(function (response: any) {
            console.info(response)
            setShowLoading(false)
            //history.replace(`/verseDetail/${params.id}`);
            dispatch(saveLoadState({tag: 'VerseDetail', state: 1}));
            history.goBack()
        }).catch(function (error: any) {
            setShowLoading(false)
            console.info(error)
        })
    };

    const handleChangeComplete = (color: any) => {
        console.info(color);
        if (colorType == 1) {
            setBackColor(color.hex);
            console.info(hexToRgba(color.hex));
            setOpacityBackColor(hexToRgba(color.hex));
        } else {
            setMainColor(color.hex);
        }

    };

    const hexToRgba = (bgColor:string) => {
        let color = bgColor.slice(1);

        let rgba = [

            parseInt('0x'+color.slice(0, 2)),

            parseInt('0x'+color.slice(2, 4)),

            parseInt('0x'+color.slice(4, 6)),

            0.4

        ];

        return 'rgba(' + rgba.toString() + ')';

    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleMainClick = () => {
        setDisplayColorPicker(true);
        setColorType(0)
    };

    const handleBackClick = () => {
        setDisplayColorPicker(true);
        setColorType(1)
    };

    return (
        <IonPage>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={10000}
            />
            {displayColorPicker && <div className='popover'>
                <div className='cover' onClick={handleClose}/>
                <SketchPicker color={mainColor} onChangeComplete={handleChangeComplete}/>
            </div>}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>Create Theme</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>


                <IonList lines="none">
                    <IonItem className='secondary-color'>
                        <div>Main Color:</div>

                    </IonItem>

                    <IonItem className='secondary-color'>
                        <IonButton style={{height: 35}} onClick={handleMainClick}>Pick Color</IonButton>
                        <div style={{
                            textAlign: 'center',
                            minWidth: 100,
                            border: '1px solid #fff',
                            marginLeft: 20,
                            height: 32,
                            lineHeight: '32px',
                            padding: '0 10px',
                            color: mainColor == '#fff' ? 'red' : '#fff',
                            background: mainColor
                        }}>{mainColor}</div>
                    </IonItem>

                    <IonItem className='secondary-color'>
                        <div>Background Color:</div>
                    </IonItem>

                    <IonItem className='secondary-color'>
                        <IonButton style={{height: 35}} onClick={handleBackClick}>Pick Color</IonButton>
                        <div style={{
                            textAlign: 'center',
                            minWidth: 100,
                            border: '1px solid #fff',
                            marginLeft: 20,
                            height: 32,
                            lineHeight: '32px',
                            padding: '0 10px',
                            color: '#fff',
                            background: backColor
                        }}>{backColor}</div>
                    </IonItem>

                    <IonItem className='secondary-color'>
                        <div>Banner Image:</div>
                    </IonItem>

                    <IonItem>
                        <UploadImage imgUrl={backImage} setImgUrl={setBackImage}/>
                    </IonItem>


                    <IonItem className='secondary-color'>
                        <div>Style Preview:</div>
                    </IonItem>

                    <IonItem className='secondary-color'>
                        <div  style={{
                            background: "url(" + parseUrl(backImage) + ")",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            color: mainColor,
                            backgroundSize:'cover'
                        }}>
                            <div className='blur' >
                            <div  style={{  padding: 20,background:opacityBackColor}}>
                            The world's first and largest digital marketplace for crypto collectibles and non-fungible
                            tokens (NFTs).<br/><br/>
                            Buy, sell, and discover exclusive digital items.<br/><br/>After reading the Privacy Notice,
                            you may subscribe for our newsletter to get special offers and occasional surveys delivered
                            to your inbox. Unsubscribe at any time by clicking on the link in the email.
                            </div>
                            </div>
                        </div>
                    </IonItem>

                </IonList>

            </IonContent>

            <IonFooter onClick={createExp} className='ion-padding cursor'
                       style={{background: '#3171e0', textAlign: 'center', fontWeight: 'bold'}}>
                Create Theme
            </IonFooter>

        </IonPage>
    );
};

export default CreateTheme;