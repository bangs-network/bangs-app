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
import './create.scss';
import BgIcon from "../../img/create_bg.png";
import {RowCenterWrapper} from "../../theme/commonStyle";
import getMainColor from "../../util/getMainColor";
import TextareaAutosize from 'react-textarea-autosize';

interface MenuProps extends RouteComponentProps {
}

const CreateVerse: React.FC<MenuProps> = ({history}) => {

    const [title, setTitle] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string>('');
    const [showLoading, setShowLoading] = useState(false);
    const [present, dismiss] = useIonToast();
    const [colorType, setColorType] = useState<number>(0);
    const [mainColor, setMainColor] = useState<string>('#000000');
    const [backColor, setBackColor] = useState<string>('#ffffff');
    const [toolbarColor, setToolbarColor] = useState<string>('transparent');
    const [opacityBackColor, setOpacityBackColor] = useState<string>('rgba(0,0,0,0.4)');
    const [backImage, setBackImage] = useState<string>('');
    const [displayBgPicker, setDisplayBgPicker] = useState<boolean>(false);
    const [displayFontPicker, setDisplayFontPicker] = useState<boolean>(false);

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
            VerseName: title,
            VerseDesc: detail.replace(/(\r\n)|(\n)/g, '<br/>'),
            MainPic: backImage,
            MainColor: mainColor,
            BackgroundColor: backColor,
        };
        setShowLoading(true)
        CreateVerseApi(data).then((res: any) => {
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

    const scrollToTop = (e:any) => {
       let opacity = e.detail.scrollTop / 44;
       setToolbarColor(opacity < 1?'transparent':'#121FF9')
    };

    const getBgColor = async (pic:string) => {
        let bgColor =  await getMainColor(pic);
        console.info("bgColor===", bgColor)
        setBackColor("#" + bgColor);
    };

    return (
        <IonPage id="create-verse-page">
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            {displayBgPicker && <div className='popover'>
                <div className='cover' onClick={handleBgClose}/>
                <SketchPicker color={backColor} onChangeComplete={handleChangeComplete}/>
            </div>}
            {displayFontPicker && <div className='popover'>
                <div className='cover' onClick={handleFontClose}/>
                <SketchPicker color={mainColor} onChangeComplete={handleChangeComplete}/>
            </div>}

            <IonContent scrollEvents={true} onIonScroll={(e)=>scrollToTop(e)}>

                <IonHeader  className="ion-no-border">

                    <IonToolbar>
                        <div style={{background:toolbarColor,height:'56px'}}>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tabs/home"/>
                        </IonButtons>
                        </div>
                    </IonToolbar>

                </IonHeader>

                <div className="about-header">
                    {/* Instead of loading an image each time the select changes, use opacity to transition them */}
                    <img src={BgIcon} className="about-image"/>
                </div>

                <div className="about-info">

                    <div style={{borderRadius: 14, padding: "0 22px"}}>


                        <div className='create-title'>Verse Name</div>

                        <div className='radius-6' style={{background: '#F1F3F5'}}>
                            <IonInput value={title} placeholder="Add a verse name"
                                      onIonChange={e => setTitle(e.detail.value!)}/>
                        </div>

                        <div className='create-title'>Description</div>


                        <div color='medium' className='radius-6' style={{background: '#F1F3F5'}}>
                            <TextareaAutosize style={{paddingLeft:10}} className='radius common-input' rows={4} value={detail} placeholder="Verse Description"
                                              onChange={e => setDetail(e.target.value!)}/>
                        </div>

                        <div className='create-title'>Main Image:</div>

                        <UploadImage width={'100%'} imgUrl={backImage} setImgUrl={setBackImage} setColor={(bg,font,badge,text)=>{
                            setBackColor(bg);
                            setMainColor(font);
                        }} type={1}/>


                        <div className='create-title'>Font Color:</div>


                        <div onClick={handleMainClick} style={{
                            textAlign: 'center',
                            minWidth: 100,
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
                            border: '1px solid #ddd',
                            height: 32,
                            cursor: 'pointer',
                            lineHeight: '32px',
                            padding: '0 10px',
                            borderRadius: 6,
                            color: '#fff',
                            background: backColor
                        }}>{backColor}</div>



                        <div className='create-title'>Style Preview:</div>

                        {backImage && <div style={{
                            background: backColor,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            color: mainColor,
                            paddingBottom:10,
                            backgroundSize: 'cover',

                        }}>
                            <img style={{width:'100%'}} src={parseUrl(backImage)}/>
                            <div style={{margin:15,padding: 20,border: '1px solid #ddd', borderRadius: 8,background:'#fff'}}>
                                <div  dangerouslySetInnerHTML={{__html:detail?detail:''}}/>
                            </div>

                        </div>}


                    </div>

                </div>

            </IonContent>

            <IonFooter onClick={createVerse}
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
                        Create
                    </div>
                </RowCenterWrapper>

            </IonFooter>

        </IonPage>
    );
};

export default CreateVerse;