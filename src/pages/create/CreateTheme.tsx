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
import {VersePointApi} from "../../service/Api";
import {RowCenterWrapper} from "../../theme/commonStyle";

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

interface MenuProps extends RouteComponentProps {
}

const CreateTheme: React.FC<MenuProps> = ({history, match}) => {

    const [colorType, setColorType] = useState<number>(0);
    const [mainColor, setMainColor] = useState<string>('#000');
    const [backColor, setBackColor] = useState<string>('#fff');
    const [opacityBackColor, setOpacityBackColor] = useState<string>('rgba(0,0,0,1)');
    const [backImage, setBackImage] = useState<string>('');
    const [displayBgPicker, setDisplayBgPicker] = useState<boolean>(false);
    const [displayFontPicker, setDisplayFontPicker] = useState<boolean>(false);
    const [present, dismiss] = useIonLoading();
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useAppDispatch();

    //1=theme， 2=expression，3=talk，4=dice
    //  Dice:[{"RoleID":1,"MaxValue":100}]
    const createTheme = () => {
        setShowLoading(true)
        let params: any = match.params
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
        VersePointApi(data).then(function (response: any) {
            setShowLoading(false)
            dispatch(saveLoadState({tag: 'VerseDetail', state: 1}));
            history.goBack()
            //history.replace(`/verseDetail/${params.id}`);
        }).catch(function (error: any) {
            console.info(error)
            present(error, 5000);
            setShowLoading(false)
        });

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

    const hexToRgba = (bgColor: string) => {
        let color = bgColor.slice(1);

        let rgba = [

            parseInt('0x' + color.slice(0, 2)),

            parseInt('0x' + color.slice(2, 4)),

            parseInt('0x' + color.slice(4, 6)),

            backImage ? 0.4 : 1

        ];

        return 'rgba(' + rgba.toString() + ')';

    };

    const handleBgClose = () => {
        setDisplayBgPicker(false);
    };

    const handleFontClose = () => {
        setDisplayFontPicker(false);
    };

    const handleMainClick = () => {
        setDisplayFontPicker(true);
        setColorType(0)
    };

    const handleBackClick = () => {
        setDisplayBgPicker(true);
        setColorType(1)
    };

    return (
        <IonPage className={'common-bg'}>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={10000}
            />
            {displayBgPicker && <div className='popover'>
                <div className='cover' onClick={handleBgClose}/>
                <SketchPicker color={backColor} onChangeComplete={handleChangeComplete}/>
            </div>}
            {displayFontPicker && <div className='popover'>
                <div className='cover' onClick={handleFontClose}/>
                <SketchPicker color={mainColor} onChangeComplete={handleChangeComplete}/>
            </div>}
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color='secondary' defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle className='header-title'>Theme</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <div style={{padding: 15,background:'#f5f5f5',minHeight:'100vh'}}>
                    <div className='create-title'>Main Image:</div>

                    <UploadImage width={'100%'} imgUrl={backImage} setImgUrl={setBackImage} setColor={(bg, font)=>{
                        console.log(bg,font,"setColor")
                        setBackColor(bg);
                        setMainColor(font)
                    }} type={1}/>


                    <div className='create-title'>Font Color:</div>


                    <div onClick={handleMainClick} style={{
                        textAlign: 'center',
                        minWidth: 100,
                        width:100,
                        border: '1px solid #ddd',
                        height: 32,
                        cursor: 'pointer',
                        lineHeight: '32px',
                        padding: '0 10px',
                        borderRadius: 6,
                        color: mainColor == '#fff' ? 'red' : '#fff',
                        background: mainColor
                    }}>{mainColor}</div>

                    <div className='create-title'>Background Color:</div>

                    <div onClick={handleBackClick} style={{
                        textAlign: 'center',
                        minWidth: 100,
                        width:100,
                        border: '1px solid #ddd',
                        height: 32,
                        cursor: 'pointer',
                        lineHeight: '32px',
                        padding: '0 10px',
                        borderRadius: 6,
                        color: '#fff',
                        background: backColor
                    }}>{backColor}</div>


                </div>

            </IonContent>

            <IonFooter onClick={createTheme}
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
    );
};

export default CreateTheme;