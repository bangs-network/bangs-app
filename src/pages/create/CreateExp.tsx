///<reference path="../../../node_modules/@types/react-dom/index.d.ts"/>
import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonIcon, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonTabBar, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar, useIonToast, useIonViewWillEnter
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import PicIcon from "../../img/pic.png";
import CloseIcon from "../../img/close.png";
import AllIcon from "../../img/all.png";
import SelectIcon from "../../img/select.png";
import DeleteIcon from "../../img/delete.svg";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import {saveLoadState} from "../state/slice/loadStateSlice";
import {RouteComponentProps} from "react-router";
import {VersePointApi} from "../../service/Api";
import UploadImage from "../../components/widget/UploadImage";
import {addCircleOutline, removeCircleOutline} from "ionicons/icons";
import parseUrl from "../../util/common";
import {saveRoleState} from "../state/slice/roleSlice";
import {useEffect} from "react";
import {MentionsInput} from 'react-mentions'
import TextareaAutosize from 'react-textarea-autosize';
import {FixUi, RowItemCenterWrapper} from "../../theme/commonStyle";
import CommonUploadImage from "../../components/widget/CommonUploadImage";
import {useRef} from "react";
import {findDOMNode} from "react-dom";
import Popup from "reactjs-popup";

interface MenuProps extends RouteComponentProps {
}

const contentStyle = {background: '#000'};

const CreateExp: React.FC<MenuProps> = ({history, match}) => {

    const [expression, setExpression] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [present, dismiss] = useIonToast();
    const ImageRef = useRef<any>();
    const [showLoading, setShowLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [clickImg, setClickImg] = useState(false);
    const [allSelect, setAllSelect] = useState(false);
    const dispatch = useAppDispatch();
    const [imgUrl, setImgUrl] = useState<string>('');
    const [list, setList] = useState<any>([]);

    //1=theme， 2=expression，3=talk，4=dice
    //  Dice:[{"RoleID":1,"MaxValue":100}]


    useEffect(() => {
        function handler(event: any) {
            if (!ImageRef.current?.contains(event.target)) {
                console.log('clicked outside of the modal')
                setClickImg(false)
            } else {
                setClickImg(true)
                console.log('click inside')
            }

        }

        getRoles();

        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler)
    }, [])


    const createExp = () => {
        if (!expression) {
            present('Please Input content', 3000);
            return
        }
        let params: any = match.params;
        console.info(params.id);
        let roleIds: any = []
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].select) {
                    roleIds.push(list[i].roleId)
                }
            }
        }


        const data = {
            VerseID: Number(params.id),
            TimelineType: 2,
            MainPic: imgUrl,
            MainColor: '',
            RoleIDs: roleIds,
            BackgroundColor: '',
            Music: '',
            ExpressionTitle: title,
            ExpressionContent: expression.replace(/(\r\n)|(\n)/g, '<br/>')
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

    const getRoles = () => {
        let params: any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id)
        };
        axios.get('https://api.bangs.network/role/search', {
            params: data
        }).then(function (response: any) {
            if (response?.data?.body?.roleList) {
                setList(response?.data?.body?.roleList)
            }
            console.info(response)
        }).catch(function (error: any) {
            console.info(error)
        })
    };


    const selectRole = (index: number) => {
        list[index].select = !list[index].select;
        let newList = [...list];
        setList(newList);

    };

    const selectAllRole = () => {

        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                list[i].select = !allSelect;
            }
        }

        setAllSelect(!allSelect);


    };

    const deleteImg = () => {
        setImgUrl('')
    };

    const closeModal = () => {
        setOpen(false)
    };


    return (
        <IonPage>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <RowItemCenterWrapper style={{padding: '10px 15px'}}>
                        <div style={{fontSize: 16, fontWeight: 'bold'}}>Who can see?</div>
                        <FixUi/>
                        <img className='cursor' style={{width: 14}} onClick={closeModal} src={CloseIcon}/>
                    </RowItemCenterWrapper>
                    <div style={{height: 1, background: '#c4c4c4', width: '100%'}}/>
                    <div style={{padding: '10px 15px'}}>
                        <div style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                            Public
                        </div>
                        <RowItemCenterWrapper onClick={selectAllRole}
                                              style={{
                                                  cursor:'pointer',
                                                  background: '#F1F3F5',
                                                  padding: '5px 10px',
                                                  marginBottom: 10,
                                                  borderRadius: 8,
                                                  border: allSelect?'2px solid #0620F9':'2px solid #F1F3F5'
                                              }}>
                            <img style={{marginRight: 10, width: 22}} src={AllIcon}/>
                            <div>Everyone</div>
                            <FixUi/>
                            {allSelect && <img style={{width: 18, height: 18}}
                                 src={SelectIcon}/>}
                        </RowItemCenterWrapper>
                        <div style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                            Specified Roles
                        </div>
                        <RowItemCenterWrapper
                            style={{background: '#F1F3F5', paddingBottom: 16, borderRadius: 8, flexWrap: 'wrap'}}>
                            {list && list.map((item: any, index: number) => {
                                return <div key={index} style={{
                                    position: 'relative',
                                    marginRight: 15,
                                    marginTop: 15,
                                    marginLeft: 15
                                }}><img onClick={() => selectRole(index)} className='cursor' key={index} style={{
                                    width: 54,
                                    height: 54,
                                    border: item.select ? '2px solid #0620F9' : '2px solid #F1F3F5',
                                    position: 'relative',
                                    borderRadius: '50px'
                                }}
                                        src={parseUrl(item.roleAvator)}/>
                                    {item.select &&
                                    <img style={{width: 18, height: 18, position: 'absolute', right: 0, bottom: 0}}
                                         src={SelectIcon}/>}

                                </div>

                            })}
                        </RowItemCenterWrapper>
                    </div>
                    <div style={{height: 1, background: '#c4c4c4', width: '100%'}}/>
                    <div onClick={closeModal} style={{padding: '10px 15px'}}  className='cursor primary-color text-center text-16'>Apply</div>
                </div>
            </Popup>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color='secondary' defaultHref="/tabs/home"/>
                    </IonButtons>
                    <IonTitle>Expression</IonTitle>
                    <IonButtons slot="end">
                        <div className='cursor right-button mr-15' onClick={createExp}>Apply</div>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <div style={{padding: 16}}>


                    <TextareaAutosize
                        className='common-input'
                        autoFocus
                        rows={1}
                        onChange={e => setTitle(e.target.value!)}
                        style={{fontSize: 18, fontWeight: 'bold'}}
                        placeholder={"Title (Optional)"}
                        value={title}
                    />

                    <div style={{height: 1, background: '#c4c4c4', width: '100%'}}/>

                    <TextareaAutosize
                        className='common-input'
                        rows={1}
                        onChange={e => setExpression(e.target.value!)}
                        placeholder={"Write something..."}
                        value={expression}
                    />

                    <div style={{position: 'relative'}}>

                        <img className='cursor' ref={ImageRef} src={parseUrl(imgUrl)}
                             style={{
                                 width: '100%',
                                 borderRadius: 8,
                                 border: clickImg ? '2px solid #0620F9' : 'none',
                                 position: 'relative'
                             }}/>
                        {imgUrl && clickImg &&
                        <img onClick={deleteImg} className='right-top cursor' style={{width: 44}} src={DeleteIcon}/>}
                    </div>


                    <RowItemCenterWrapper
                        style={{paddingBottom: 16, borderRadius: 8, flexWrap: 'wrap'}}>
                        {list && list.map((item: any, index: number) => {
                            return item.select ? <div key={index} style={{
                                marginRight: 15,
                                marginTop: 15
                            }}><img onClick={() => selectRole(index)} className='cursor' key={index} style={{
                                width: 54,
                                height: 54,
                                position: 'relative',
                                borderRadius: '50px'
                            }}
                                    src={parseUrl(item.roleAvator)}/>

                            </div> : <></>

                        })}
                    </RowItemCenterWrapper>


                </div>

            </IonContent>

            {expression && expression.length > 0 && <IonFooter className='ion-no-border ion-padding cursor'>
                <RowItemCenterWrapper>
                    <CommonUploadImage height={26} setImgUrl={setImgUrl} photo={PicIcon}/>
                    <FixUi/>
                    <div className='cursor right-button' onClick={() => setOpen(true)}>Visible Range</div>

                </RowItemCenterWrapper>
            </IonFooter>}

        </IonPage>
    );
};

export default CreateExp;