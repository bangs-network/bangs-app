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
import axios from "axios";
import UploadImage from "../../components/widget/UploadImage";
import {RouteComponentProps} from "react-router";
import {CreateVerseApi} from "../../service/Api";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {useAppDispatch} from "../state/app/hooks";
import parseUrl from "../../util/common";
import SketchPicker from "react-color/lib/components/sketch/Sketch";

interface MenuProps extends RouteComponentProps {}

const CreateVerse: React.FC<MenuProps> = ({history}) => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [imgUrl,setImgUrl] = useState<string>('');
    const [showLoading, setShowLoading] = useState(false);
    const [present, dismiss] = useIonToast();
    const [colorType, setColorType] = useState<number>(0);
    const [mainColor, setMainColor] = useState<string>('#ffffff');
    const [backColor, setBackColor] = useState<string>('#000000');
    const [opacityBackColor, setOpacityBackColor] = useState<string>('rgba(0,0,0,0.4)');
    const [backImage, setBackImage] = useState<string>('');
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

    const createVerse = () => {

        if (!title) {
            present('Please Input Verse Name', 3000);
            return
        }

        if (!detail) {
            present('Please Input Verse Introduce', 3000);
            return
        }


        const data = {
            VerseName:title,
            VerseDesc:detail,
            MainPic: backImage,
            MainColor: mainColor,
            BackgroundColor: backColor,
        };
        setShowLoading(true)
        CreateVerseApi(data).then((res:any) => {
           console.info(res)
            setShowLoading(false)

            history.replace(`/verseDetail/${res.id}`);
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

            backImage?0.4:1

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
                duration={5000}
            />
            {displayColorPicker && <div className='popover'>
                <div className='cover' onClick={handleClose}/>
                <SketchPicker color={mainColor} onChangeComplete={handleChangeComplete}/>
            </div>}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  color='secondary' defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonTitle>Create Verse</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonList  lines="none">

                    <IonItem className='secondary-color'>
                        <div>Verse Name</div>
                    </IonItem>
                    <IonItem color='medium'>
                        <IonInput value={title} placeholder="Input Verse Name" onIonChange={e => setTitle(e.detail.value!)} />
                    </IonItem>
                    <IonItem  className='secondary-color'>
                        <div >Verse Detail</div>
                    </IonItem>

                    <IonItem  color='medium'>
                        <IonTextarea rows={4} value={detail} placeholder="Input Verse Detail" onIonChange={e => setDetail(e.detail.value!)} />
                    </IonItem>

                    <IonItem className='secondary-color'>
                        <div>Main Color:</div>

                    </IonItem>

                    <IonItem className='secondary-color'>
                        <IonButton style={{height: 35}} onClick={handleMainClick}>Pick Color</IonButton>
                        <div style={{
                            textAlign: 'center',
                            minWidth: 100,
                            border: '1px solid #000',
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

            <IonFooter onClick={createVerse} className='ion-padding cursor' style={{background:'#3171e0',textAlign:'center',fontWeight:'bold'}}>
                Create Verse
            </IonFooter>

        </IonPage>
    );
};

export default CreateVerse;