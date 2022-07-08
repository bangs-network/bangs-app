import {
    IonAvatar, IonBackButton, IonButton, IonButtons, IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader, IonIcon, IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonListHeader, IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTextarea, IonThumbnail,
    IonTitle,
    IonToolbar, useIonToast
} from '@ionic/react';
import headerIcon from "../../img/0.png";
import * as React from "react";
import {useState} from "react";
import {addCircleOutline, removeCircleOutline} from "ionicons/icons";
import {RouteComponentProps} from "react-router";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../state/app/hooks";
import parseUrl from "../../util/common";
import {VersePointApi} from "../../service/Api";
import {saveRoleState} from '../state/slice/roleSlice';
import {ColumnCenterWrapper, RowCenterWrapper, RowItemCenterWrapper} from "../../theme/commonStyle";
import BgIcon from "../../img/dice_bg.png";
import TextareaAutosize from 'react-textarea-autosize';

interface MenuProps extends RouteComponentProps {
}

const CreateDice: React.FC<MenuProps> = ({history, match}) => {

    const [list, setList] = useState<any>([]);
    const [roleIds, setRoleIds] = useState<any>([]);
    const [dices, setDices] = useState<any>([]);
    const roleData: any = useAppSelector(state => state.roleSlice);
    const [showLoading, setShowLoading] = useState(false);
    const [present, dismiss] = useIonToast();
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (roleData && roleData.roleId > 0) {
            let role = {
                roleId: roleData.roleId,
                roleAvator: roleData.roleAvator,
                roleName: roleData.roleName,
            };
            list.push(role);
            let newList = [...list];
            setList(newList);

            let dice = {
                roleId: roleData.roleId
            };
            dices.push(dice);
            let newDiceList = [...dices];
            setDices(newDiceList);


            let roleId = roleData.roleId;
            roleIds.push(roleId);
            let newRoleList = [...roleIds];
            setRoleIds(newRoleList);
            dispatch(saveRoleState({roleId: 0, roleAvator: '', roleName: '', amount: ''}))
        }
    }, [roleData.roleId]);

    const setAmount = (value: any, index: number) => {

        let valueNum = value.replace(/[^\d^\.]+/g, '');
        if (valueNum.length != 0) {
            var re = /^(0|\+?[1-9][0-9]*)$/;
            if (!re.test(valueNum)) {
                valueNum = parseInt(valueNum).toString();
            }
        }
        console.info("valueNum== " + valueNum);
        console.info("index== " + index);

        let newList = [...list];
        console.info(newList);
        newList[index].amount = valueNum
        setList(newList);

        let newDiceList = [...dices];
        console.info(newDiceList);
        newDiceList[index].MaxValue = Number(valueNum)
        setDices(newDiceList);
        console.info("setNumber");

    };

    const deleteItem = (index: number) => {
        list.splice(index, 1);
        let newList = [...list];
        setList(newList);

        dices.splice(index, 1);
        let newDiceList = [...dices];
        setDices(newDiceList);

        roleIds.splice(index, 1);
        let newRoleList = [...roleIds];
        setRoleIds(newRoleList);
    };

    const create = () => {
        if (!list || list.length < 1) {
            present('Please select roles', 3000);
            return
        }
        for (let i = 0; i < dices.length; i++) {
            if (!dices[i].MaxValue || dices[i].MaxValue < 1) {
                present('Please input dice value', 3000);
                return
            }
        }
        let params: any = match.params
        console.info(params.id);
        const data = {
            VerseID: Number(params.id),
            TimelineType: 4,
            MainPic: '',
            MainColor: '',
            BackgroundColor: '',
            Music: '',
            ExpressionContent: '',
            Dice: dices
        };
        setShowLoading(true);
        VersePointApi(data).then(function (response: any) {

            console.info(response)
            setShowLoading(false)
            //dispatch(saveLoadState({tag: 'VerseDetail', state: 1}));
            history.replace(`/verseDetail/${params.id}`);

        }).catch(function (error: any) {
            console.info(error)
            console.info("CreateDice===")
            present(error, 5000);
            setShowLoading(false)
        });

    };

    return (
        <IonPage id={'create-role'}>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />

            <IonContent>
                <IonHeader className="about-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tabs/home"/>
                        </IonButtons>
                        <IonTitle>Dice</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="about-header">
                    {/* Instead of loading an image each time the select changes, use opacity to transition them */}
                    <img src={BgIcon} className="about-image"/>
                </div>

                <div className="about-info">

                    <div style={{borderRadius: 14, padding: "20px 12px"}}>
                        {list.map((item: any, index: number) => {

                            return <RowItemCenterWrapper key={index} style={{marginBottom: 12}}>

                                <ColumnCenterWrapper>
                                    <img style={{width: 42, height: 42}} src={parseUrl(item.roleAvator)}/>
                                </ColumnCenterWrapper>

                                <div className='font-bold' style={{marginLeft: 8, width: 60}}> {item.roleName}</div>

                                <TextareaAutosize style={{border: '1px solid #fff',outline: 'none',resize:'none', margin: '0 8px',background:'#F5F7F9',flex:1,padding:'10px 10px',borderRadius:8}}
                                                  value={item.amount}
                                                  rows={1}
                                                  placeholder="Enter Maximum Number"
                                                  onChange={e => setAmount(e.target.value, index)}/>
                                <IonIcon color={'secondary'} size={'large'} style={{cursor: 'pointer'}} slot="end"
                                         icon={removeCircleOutline}
                                         onClick={() => deleteItem(index)}/>
                            </RowItemCenterWrapper>


                        })}


                        <RowItemCenterWrapper style={{cursor: 'pointer'}} onClick={() => {
                            let params: any = match.params
                            history.push({
                                pathname: `/searchRole/${params.id}`, state: {
                                    selectList: roleIds
                                }
                            });
                        }}>
                            <IonIcon color={'secondary'} size={'large'} slot="start" icon={addCircleOutline}/>
                            <div className='font-bold' style={{marginLeft: 8, color: '#0620F9'}}>Add Dice</div>
                        </RowItemCenterWrapper>
                    </div>
                </div>
            </IonContent>

            <IonFooter onClick={create}
                       className='ion-padding ion-no-border'>
                <RowCenterWrapper>
                    <div className='font-bold cursor' style={{
                        background: '#0620F9',
                        borderRadius: 50,
                        textAlign: 'center',
                        width: 227,
                        height: 39,
                        color: '#fff',
                        lineHeight: '39px'
                    }}>
                        Create Dice
                    </div>
                </RowCenterWrapper>

            </IonFooter>
        </IonPage>
    );
};

export default CreateDice;