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
import {RowCenterWrapper} from "../../theme/commonStyle";
import BgIcon from "../../img/dice_bg.png";

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
        if (!value) {
            return
        }
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

                    <div style={{borderRadius: 14, padding: "0 22px"}}>
                        {list.map((item: any, index: number) => {

                            return <IonItem key={index} lines={'none'}>
                                <IonThumbnail slot="start">
                                    <img src={parseUrl(item.roleAvator)}/>
                                </IonThumbnail>
                                <IonLabel>
                                    <h2 style={{width: 100}}> {item.roleName}</h2>
                                </IonLabel>
                                <IonInput style={{border: '1px solid #fff', marginLeft: 20}} type='text'
                                          value={item.amount}
                                          placeholder="Enter Maximum Number"
                                          onIonChange={e => setAmount(e.detail.value, index)}/>
                                <IonIcon size={'large'} style={{cursor: 'pointer'}} slot="end"
                                         icon={removeCircleOutline}
                                         onClick={() => deleteItem(index)}/>
                            </IonItem>


                        })}


                        <IonItem lines='none' style={{cursor: 'pointer'}} onClick={() => {
                            let params: any = match.params
                            history.push({
                                pathname: `/searchRole/${params.id}`, state: {
                                    selectList: roleIds
                                }
                            });
                        }}>
                            <IonIcon size={'large'} slot="start" icon={addCircleOutline}/>
                            <IonLabel style={{color: '#999'}}>Add Dice</IonLabel>
                        </IonItem>
                    </div>
                </div>
            </IonContent>

            <IonFooter onClick={create}
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
                        Create Dice
                    </div>
                </RowCenterWrapper>

            </IonFooter>
        </IonPage>
    );
};

export default CreateDice;