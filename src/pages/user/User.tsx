import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonItem,
    IonLabel, IonLoading,
    IonPage, IonRow,
    IonTitle, IonToast,
    IonToolbar
} from '@ionic/react';
import headerIcon from "../../img/head.png";
import bnbIcon from "../../img/bnb.png";
import editIcon from "../../img/edit.png";
import editGrayIcon from "../../img/edit_gray.png";
import * as React from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import axios from "axios";
import BgIcon from "../../img/header-bg.png";
import UrlIcon from "../../img/url_white.png";
import './user.scss';
import {addCircleOutline} from "ionicons/icons";
import {emitBox} from "../../components/emitWeb3/Connectors";
import {
    ColumnCenterWrapper,
    ColumnItemCenterWrapper, FixUi,
    RowCenterWrapper,
    RowItemCenterWrapper
} from "../../theme/commonStyle";
import {useRef, useState} from "react";
import {useEffect} from "react";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {GetAccountApi, UpdateAccountApi, VersePointApi} from "../../service/Api";
import parseUrl from "../../util/common";
import {ChainType} from "@emit-technology/emit-types/es";
import CopyToClipboard from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';
import TextareaAutosize from 'react-textarea-autosize';
import {useAppDispatch} from "../state/app/hooks";
import {saveDataState} from '../state/slice/dataSlice';

const User: React.FC = () => {

    const [account, setAccount] = useState<string>('');
    const [showLoading, setShowLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openPop, setOpenPop] = useState(false);
    const [headImg, setHeadImg] = useState('');
    const [userName, setUserName] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useAppDispatch();
    const [toolbarColor, setToolbarColor] = useState<string>('transparent');

    useEffect(() => {
        let headImg = localStorage.getItem("avatar")
        if (headImg) {
            setHeadImg(headImg)
        }
        let name = localStorage.getItem("userName")
        if (name) {
            setUserName(name)
        }
        getAccount()
        getWallet()
    }, []);

    const scrollToTop = (e: any) => {
        let opacity = e.detail.scrollTop / 44;
        setToolbarColor(opacity < 1 ? 'transparent' : '#121FF9')
    };

    const updateAccount = (avater?: any) => {
        setShowLoading(true);
        if (!inputValue || inputValue.trim() == '') {
            return
        }
        const data = {
            Avater: avater ? avater : headImg,
            UserName: inputValue.trim(),
        };
        UpdateAccountApi(data).then(function (response: any) {
            setShowLoading(false);
            setUserName(inputValue);
            setHeadImg(avater ? avater : headImg);
            setOpenPop(false);
            localStorage.setItem("avatar", avater ? avater : headImg);
            localStorage.setItem("userName", inputValue);
            let data = {
                refresh: true
            };
            dispatch(saveDataState({data: JSON.stringify(data), tag: 'UserInfoRefresh'}))

        }).catch(function (error: any) {
            console.info(error)
            setShowLoading(false)
        });

    };


    const getWallet = () => {
        let accountEmit = localStorage.getItem("accountEmit");
        if (accountEmit) {
            setAccount(accountEmit)
        } else {
            emitBox.requestAccount().then((data: any) => {
                console.log("data:", data);
                if (data && data.result && data.result.addresses[ChainType.EMIT]) {
                    localStorage.setItem("accountEmit", data.result.addresses[ChainType.EMIT])
                    setAccount(data.result.addresses[ChainType.EMIT])
                }

            }).catch(e => {
                console.error("error", e)
            })
        }

    };


    const getAccount = () => {
        setShowLoading(true);
        const data = {
            ID: 0
        };
        GetAccountApi(data).then(function (response: any) {
            setShowLoading(false);
            console.info("UpdateAccountApi==", response)
            setHeadImg(response.avater)
            setUserName(response.userName);
            setInputValue(response.userName);
        }).catch(function (error: any) {
            console.info(error)
            setShowLoading(false)
        });

    };


    const uploadImage = async () => {
        console.info("uploadImage:")

        try {
            const image: any = await Camera.getPhoto({
                quality: 100,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos
            });

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            console.info(image);
            const file = await fetch(image.webPath).then(r => r.blob()).then(blobFile => new File([blobFile], 'file', {type: blobFile.type}));


            //let file =  base64toFile(image.base64String,'file');
            //const file = new File([image.webPath], 'pic.png', {type: 'text/plain;charset=utf-8'});
            console.info(file);
            const formData = new FormData();
            formData.append('file', file);
            setShowLoading(true);
            axios.post('https://api.bangs.network/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response: any) {
                updateAccount(response.data)
                console.info(response)
            }).catch(function (error: any) {
                console.info(error)
            })

        } catch (e) {
            console.info(e)
        }

    };


    const showAccountWidget = () => {
        emitBox.showWidget().catch(e => {
            console.error(e)
        });

    };


    const copyToast = () => {
        setOpen(true)

    };

    const openModel = () => {
        setOpenPop(true)
        inputRef?.current?.setSelectionRange(5, 5);
    };

    const closeModal = () => {
        setOpenPop(false)
    };


    return (
        <IonPage id='position-top'>
            <Popup open={openPop} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <RowItemCenterWrapper style={{padding: '15px 12px'}}>
                        <TextareaAutosize
                            className='gray-input'
                            ref={inputRef}
                            rows={1}
                            onChange={e => setInputValue(e.target.value!)}
                            placeholder={""}
                            value={inputValue}
                        />

                    </RowItemCenterWrapper>
                    <div style={{height: 1, background: '#B6BDC9', width: '100%'}}/>
                    <RowCenterWrapper style={{height: 43}}>
                        <div onClick={closeModal} style={{flex: 1, color: '#868990'}}
                             className='font-bold cursor  text-center text-16'>Cancel
                        </div>
                        <div style={{height: '43px', width: 1, background: '#B6BDC9'}}/>
                        <div onClick={() => updateAccount('')} style={{flex: 1}}
                             className='font-bold cursor primary-color text-center text-16'>{showLoading ? 'Loading' : 'Apply'}
                        </div>
                    </RowCenterWrapper>

                </div>
            </Popup>
            <IonToast
                position="top"
                isOpen={open}
                animated={true}
                color='success'
                onDidDismiss={() => setOpen(false)}
                message="Copy successful!"
                duration={2000}
            />
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={10000}
            />

            <IonContent scrollEvents={true} onIonScroll={(e) => scrollToTop(e)}>
                <IonHeader>

                        <IonToolbar>
                            <RowItemCenterWrapper style={{background: toolbarColor, height: '56px'}}>
                            <IonButtons slot="start">
                                <IonBackButton defaultHref="/tabs/home"/>
                            </IonButtons>
                            <IonTitle>Wallet</IonTitle>
                            <IonButtons slot="end">
                                <a href={'https://assets.emit.technology/'} target="_blank">
                                    <img style={{width: 32, height: 32}} src={UrlIcon}/>
                                </a>
                            </IonButtons>
                            </RowItemCenterWrapper>
                        </IonToolbar>

                </IonHeader>
                <div className="about-header">
                    {/* Instead of loading an image each time the select changes, use opacity to transition them */}
                    <img src={BgIcon} className="about-image"/>
                </div>
                <div className="about-info">
                    <div style={{marginTop: -60, background: 'none'}}>
                        <div className="ion-text-center" style={{

                            borderRadius: 12
                        }}>
                            <RowCenterWrapper>
                                <div style={{position: 'relative'}} className='wh-86 cursor'>
                                    <img className='icon-circle wh-86 cursor'
                                         src={headImg ? parseUrl(headImg) : headerIcon}/>
                                    <img onClick={uploadImage}
                                         style={{width: 24, height: 24, position: 'absolute', right: 0, bottom: 0}}
                                         src={editIcon}/>
                                </div>
                            </RowCenterWrapper>
                            <RowCenterWrapper className='cursor' onClick={openModel}>
                                <div style={{fontSize: 18, fontWeight: 'bold', margin: 12}}>{userName}</div>
                                <img style={{width: 16, height: 16, marginLeft: -6}}
                                     src={editGrayIcon}/>
                            </RowCenterWrapper>

                        </div>

                        <div style={{background: '#fff', padding: 12, margin: 24, borderRadius: 12}}>
                            <div style={{fontWeight: 'bold', fontSize: 16}}>Receive</div>
                            <div style={{color: '#868990', marginTop: 12, marginBottom: 15}}>{account}</div>
                        </div>
                        <CopyToClipboard text={account ? account : ''}
                                         onCopy={copyToast}>
                            <div className='cursor' style={{
                                background: '#0620F9',
                                color: '#fff',
                                zIndex: 999,
                                width: 85,
                                margin: '-40px auto 0',
                                height: 29,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                lineHeight: '29px',
                                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)',
                                borderRadius: 71
                            }}>Copy
                            </div>
                        </CopyToClipboard>

                        <div style={{margin: 12}}>
                            <div style={{marginTop: 40, marginBottom: 12, fontSize: 18, fontWeight: 'bold'}}>Coins</div>

                            <IonGrid
                                style={{
                                    background: '#fff',
                                    borderRadius: 12,
                                    color: '#fff',
                                    padding: 0
                                }}>
                                <RowItemCenterWrapper style={{padding: '17px 14px'}}>
                                    <RowItemCenterWrapper style={{width: 42}} className="ion-align-self-center">
                                        <img style={{width: 42, height: 42}} src={bnbIcon}/>
                                    </RowItemCenterWrapper>
                                    <div style={{marginLeft: 12}}>
                                        <div style={{
                                            textAlign: 'left',
                                            fontSize: 16,
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}>Bangs
                                        </div>
                                        <div style={{
                                            textAlign: 'left',
                                            color: '#868990',
                                            fontSize: 12,
                                            marginTop: 8
                                        }}>Bangs
                                        </div>

                                    </div>
                                    <FixUi/>
                                    <div style={{color: '#000'}}>
                                        <div style={{
                                            textAlign: 'right',
                                            fontSize: 16,
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}>17000.89
                                        </div>
                                        <div style={{
                                            textAlign: 'right',
                                            color: '#868990',
                                            fontSize: 12,
                                            marginTop: 8
                                        }}>$299.928
                                        </div>
                                    </div>
                                </RowItemCenterWrapper>
                                <div style={{borderTop: '1px solid #f4f4f4', width: '100%'}}/>
                                <IonRow style={{height: 35}}>
                                    <IonCol className="ion-align-self-center">
                                        <div style={{textAlign: 'center', fontWeight: 'bold', color: '#0620F9'}}>Log
                                        </div>
                                    </IonCol>
                                    <div style={{borderRight: '1px solid #f4f4f4', height: '100%'}}/>
                                    <IonCol className="ion-align-self-center">
                                        <div
                                            style={{textAlign: 'center', fontWeight: 'bold', color: '#0620F9'}}>Transfer
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </div>
                    </div>

                </div>

            </IonContent>
        </IonPage>
    );
};

export default User;