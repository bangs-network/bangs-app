import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel, IonList, IonLoading,
    IonPage, IonRow, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import AddBlueIcon from "../../img/add_blue.png";
import SelectIcon from "../../img/select.png";
import SelectUnIcon from "../../img/select_un.png";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {RouteComponentProps} from "react-router";
import parseUrl from "../../util/common";
import {useEffect} from "react";
import {
    ColumnCenterWrapper, ColumnContentCenterWrapper,
    FixUi,
    RowCenterWrapper,
    RowContentCenterWrapper,
    RowItemCenterWrapper
} from "../../theme/commonStyle";
import Popup from "reactjs-popup";
import SearchUi from "../../components/widget/SearchUi";
import {GetUserListApi, RoleActorsApi, RoleDetailApi, RoleSpecifyApi, UpdateAccountApi} from "../../service/Api";
import {getBgColor} from "../../util/getMainColor";

interface MenuProps extends RouteComponentProps {
}

const RoleDetail: React.FC<MenuProps> = ({history, match}) => {

    const [data, setData] = useState<any>({
        roleAvator: "",
        roleDescription: "",
        roleId: 0,
        roleName: ""
    });
    const [list, setList] = useState<any>([]);
    const [userIDs, setUserIDs] = useState<any>([]);
    const [selectUserlist, setSelectUserlist] = useState<any>([]);
    const [actorList, setActorList] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [bgColor, setBgColor] = useState<string>('#D1CB52');

    useEffect(() => {
        let location: any = history.location
        console.info("location==",history);
        getData()
        geActorList()
    }, []);

    const getData = () => {
        let params: any = match.params
        console.info(params.id);
        const data = {
            ID: Number(params.id)
        };
        RoleDetailApi(data).then(function (response: any) {
            setShowLoading(false)
            setData(response)

        }).catch(function (error: any) {
            console.info(error)
            setShowLoading(false)
        });

    };

    useEffect(() => {
        if(data.roleAvator){
            (async function handle() {
                const bg = await getBgColor(parseUrl(data.roleAvator));
                console.info("bg==",bg)
                setBgColor(bg)
            })();
        }
    }, [data]);

    useEffect(() => {
        if (inputValue) {
            geUserList()
        } else {
            setList([]);
        }
    }, [inputValue]);


    const geUserList = () => {
        setShowLoading(true);
        const data = {
            Key: inputValue
        };
        GetUserListApi(data).then(function (response: any) {
            setShowLoading(false);
            if (response) {
                setList(response);
            } else {
                setList([])
            }

        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });
    };

    const geActorList = () => {
        setShowLoading(true);
        let location: any = history.location;
        let params: any = match.params
        const data = {
            RoleID:Number(params.id),
            VerseID: Number(location.state.VerseID),
        };
        RoleActorsApi(data).then(function (response: any) {
            setShowLoading(false);
            if (response) {
                setActorList(response);
            } else {
                setActorList([])
            }

        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });
    };

    const roleSpecify = () => {
        let location: any = history.location;
        let params: any = match.params
        setShowLoading(true);
        const data = {
            VerseID: Number(location.state.VerseID),
            RoleID:Number(params.id),
            Oper:1,
            UserIDs:userIDs
        };
        RoleSpecifyApi(data).then(function (response: any) {
            setShowLoading(false);
            setOpen(false);
            geActorList()

        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        });
    };

    const closeModal = () => {
        setOpen(false)
    };

    const selectUser = (item: any) => {
        for (let i = 0; i < selectUserlist.length; i++) {
            if (selectUserlist[i].userID == item.userID) {
                selectUserlist.splice(i, 1);
                userIDs.splice(i, 1);
                let newList = [...selectUserlist]
                setSelectUserlist(newList);
                let newLists = [...userIDs]
                setUserIDs(newLists)
                return
            }
        }
        selectUserlist.push(item);
        let newList = [...selectUserlist]
        setSelectUserlist(newList)

        userIDs.push(Number(item.userID))
        let newLists = [...userIDs]
        setUserIDs(newLists)
    };


    const isSelectUser = (item: any) => {
        for (let i = 0; i < selectUserlist.length; i++) {
            if (selectUserlist[i].userID == item.userID) {
                return true
            }
        }
        return false
    };


    return (

        <IonPage id='position-top'>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={10000}
            />
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <RowItemCenterWrapper style={{padding: '8px'}}>
                        <SearchUi inputValue={inputValue} setInputValue={setInputValue}/>
                    </RowItemCenterWrapper>
                    {selectUserlist && selectUserlist.length > 0 ? <RowItemCenterWrapper style={{
                        overflowX: 'scroll',
                        overflowY: 'hidden',
                        marginBottom: 8,
                        marginLeft:8,
                    }}> {selectUserlist.map((item: any, index: number) => {
                        return <img  key={index} style={{width: 28, height: 28, borderRadius: 54,marginRight: 8}} src={parseUrl(item.avater)}/>
                       })} </RowItemCenterWrapper>: <></>}
                    <div style={{height: 1, background: '#B6BDC9', width: '100%'}}/>
                    <div style={{height: 180}}>
                        {list && list.length > 0 ? <div style={{maxHeight: 180, overflowY: 'scroll'}}>
                            {list && list.map((item: any, index: number) => {
                                return <RowItemCenterWrapper onClick={() => selectUser(item)} className='cursor'
                                                             key={index} style={{
                                    background: '#F5F7F9',
                                    margin: index== list.length - 1? '8px':'8px 8px 0 8px',
                                    borderRadius: '12px',
                                    border: isSelectUser(item) ? '1px solid #0620F9' : '1px solid #F5F7F9',
                                    paddingLeft: 7
                                }}>
                                    <img style={{width: 28, height: 28, borderRadius: 54}} src={parseUrl(item.avater)}/>

                                    <div style={{marginLeft: 5}}>

                                        <div style={{fontSize: 14}}> {item.userName ? item.userName : 'Bangs'}</div>
                                        <div style={{
                                            marginTop: 2,
                                            fontSize: 12,
                                            color: '#868990'
                                        }}>{item.mainAddress ? item.mainAddress?.slice(0, 10) + "..." + item.mainAddress?.slice(item.mainAddress.length - 7) : ''}</div>
                                    </div>

                                    <FixUi/>

                                    <img style={{width: 42, height: 42, padding: 11, borderRadius: 54}}
                                         src={isSelectUser(item) ? SelectIcon : SelectUnIcon}/>

                                </RowItemCenterWrapper>

                            })}
                        </div> : <ColumnCenterWrapper style={{height: 180}}>

                            <div style={{fontSize: 10, color: '#B6BDC9'}}>Enter</div>
                            <div className='font-bold' style={{margin: 4, fontSize: 13, color: '#B6BDC9'}}>username /
                                address
                            </div>
                            <div style={{fontSize: 10, color: '#B6BDC9'}}>to search</div>

                        </ColumnCenterWrapper>}
                    </div>
                    <div style={{height: 1, background: '#B6BDC9', width: '100%'}}/>
                    <RowCenterWrapper style={{height:43}}>
                        <div onClick={closeModal} style={{flex:1,color:'#868990'}}
                             className='font-bold cursor  text-center text-16'>Cancel
                        </div>
                        <div style={{height:'43px',width:1,background:'#B6BDC9'}} />
                        <div onClick={roleSpecify} style={{flex:1}}
                             className='font-bold cursor primary-color text-center text-16'>Apply
                        </div>
                    </RowCenterWrapper>

                </div>
            </Popup>
            <IonContent>

                <IonHeader className="about-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tabs/home"/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <div className="role-header"/>

                <div className="role-info">
                    <RowItemCenterWrapper style={{margin: '0 32px'}}>
                        <img style={{borderRadius: 64, width: 64, height: 64, border: '2px solid #FFFFFF'}}
                             src={parseUrl(data.roleAvator)}/>
                        <div className='font-bold'
                             style={{fontSize: 16, fontWeight: 'bold', marginLeft: 15}}>{data.roleName}</div>
                    </RowItemCenterWrapper>


                    <div style={{
                        background: '#FFFFFF',
                        marginTop: 12,
                        borderRadius: 12,
                        margin: '20px 12px',
                        padding: '15px 15px'
                    }}>
                        <div><span style={{
                            background: bgColor,
                            padding: '4px 10px',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: 20
                        }}>Description</span></div>
                        <div style={{marginTop: 12}}>{data.roleDescription}</div>
                    </div>

                    <div style={{margin: '12px 0 15px 12px'}}>
                        <div className='font-bold' style={{color: '#000'}}>Actor</div>
                        <RowItemCenterWrapper style={{padding: '20px 0'}}>
                            <ColumnContentCenterWrapper onClick={() => {
                                setSelectUserlist([]);
                                setUserIDs([]);
                                setOpen(true);
                            }} className={'cursor'} style={{marginRight: 32}}>
                                <img style={{width: 60, height: 60}} src={AddBlueIcon}/>
                                <div style={{textAlign: 'center', color: '#868990', marginTop: 12,height:30,fontSize:12}}>Add new<br/>actor
                                </div>
                            </ColumnContentCenterWrapper>
                            <RowContentCenterWrapper style={{
                                overflowX: 'scroll',
                                overflowY: 'hidden'
                            }}>
                                {actorList.map((item: any, index: number) => {
                                    return <ColumnContentCenterWrapper key={index} className={'cursor'} style={{marginRight: 32,width:60}}>
                                        <img style={{width: 60, height: 60,borderRadius:60}} src={parseUrl(item.avator)}/>
                                        <div style={{textAlign: 'center', color: '#868990', marginTop: 12,height:30,fontSize:12}}>{item.userName}54786<br/>
                                        </div>
                                    </ColumnContentCenterWrapper>
                                })
                                }
                            </RowContentCenterWrapper>
                        </RowItemCenterWrapper>


                    </div>

                </div>


            </IonContent>

        </IonPage>
    );
};

export default RoleDetail;