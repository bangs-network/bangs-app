import {RouteComponentProps, withRouter} from "react-router";
import {setDarkMode} from "../../data/user/user.actions";
import {
    IonAvatar, IonButton,
    IonContent, IonFooter,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader, IonLoading,
    IonMenu,
    IonMenuToggle,
    IonToggle
} from "@ionic/react";
import {
    hammer,
    help, helpCircleOutline,
    logIn,
    logOutOutline,
    alertCircleOutline,
    peopleCircleOutline,
    personCircleOutline,
    personAdd,
    settingsOutline, moonOutline
} from "ionicons/icons";
import {connect} from "../../data/connect";
import headerIcon from "../../img/head.png";
import profileIcon from "../../img/profile.png";
import draftIcon from "../../img/draft.png";
import historyIcon from "../../img/history.png";
import helpIcon from "../../img/help.png";
import aboutIcon from "../../img/about.png";
import settingIcon from "../../img/setting.png";
import {emitBox, ethWeb3} from "../emitWeb3/Connectors";
import {default as React, useEffect, useState} from "react";
import axios from "axios";
import {encodePacked, keccak256} from "web3-utils";
import qs from 'qs';
import {ChainType} from "@emit-technology/emit-types";
import {ColumnRightWrapper, RowCenterWrapper, RowItemCenterWrapper, RowRightWrapper} from "../../theme/commonStyle";


interface StateProps {
    darkMode: boolean;
    isAuthenticated: boolean;
    menuEnabled: boolean;
}

interface DispatchProps {
    setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {
}

const Menu: React.FC<MenuProps> = ({darkMode, history, isAuthenticated, setDarkMode, menuEnabled}) => {

    const [account, setAccount] = useState<string>('');
    const [alreadyLogin, setAlreadyLogin] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {

        // console.log("getAccount:");
        // emitBox.onActiveWalletChanged(walletAddress => {
        //     console.log("walletAddress:", walletAddress);
        //     //setAccount(walletAddress)
        // });
        if (localStorage.getItem("SessionID")) {
            setAlreadyLogin(true)
        } else {
            setAlreadyLogin(false)
        }

        let account = localStorage.getItem("account")
        if (account) {
            setAccount(account)
        }

        let name = localStorage.getItem("name")
        if (name) {
            setName(name)
        }

        emitBox.onActiveAccountChanged((accounts: any) => {
            setName(accounts.name);
            localStorage.setItem("name", accounts.name);
        })
    }, []);

    const getNonce = (account: any) => {
        console.log("getNonce:");
        const data = {
            account: account
        }
        axios.get('https://api.bangs.network/account/nonce', {params: data}).then(function (response: any) {
            console.info(response)
            login(account, response.data.body.nonce)
        }).catch(function (error: any) {
            console.info(error)
            setShowLoading(false)
        })
    };

    const login = (account: any, nonce: number) => {
        console.log("getNonce:" + nonce);

        let packValue = encodePacked({t: "bytes32", v: keccak256(account)}, {t: "uint64", v: nonce})

        if (!packValue) {
            return
        }
        const sign = keccak256(packValue);

        ethWeb3.eth.getAccounts((error, accounts) => {
            ethWeb3.eth.sign(sign,accounts[0]).then(rest=>{
                console.log(rest,"ssss")
                const data = {
                    account: account,
                    sig: rest
                };
                ethWeb3.eth.personal.ecRecover(sign,rest).then(rest=>{
                    console.log(account,rest)
                }).catch(e=>{
                    console.error(e)
                });
                axios({
                    method: 'POST',
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    data: qs.stringify(data),
                    url: 'https://api.bangs.network/account/login'
                }).then((res: any) => {
                    setShowLoading(false)
                    localStorage.setItem("SessionID", res.data.body.sessionID);
                    localStorage.setItem("account", account);
                    setAlreadyLogin(true);
                    setAccount(account);
                    console.log("login：")
                    console.log(res)
                }).catch(function (error: any) {
                    setShowLoading(false)
                    console.info(error)
                })
            });

        }).catch(e=>console.error(e))


        // emitBox.batchSignMsg([
        //     {msg: sign, chain: ChainType.ETH}
        // ]).then((rest: any) => {
        //     const data = {
        //         account: account,
        //         sig: rest[0].result
        //     };
        //
        // })

    };

    const getAccount = () => {
        setShowLoading(true);
        emitBox.requestAccount().then((data: any) => {
            console.log("data:", data);
            if (data && data.result && data.result.addresses[ChainType.ETH]) {
                getNonce(data.result.addresses[ChainType.ETH])
            }

        }).catch(e => {
            console.error("error", e)
        })
    };

    const showAccountWidget = () => {
        emitBox.showWidget().catch(e => {
            console.error(e)
        });

    };

    const logout = () => {
        localStorage.setItem("SessionID", '');
        localStorage.setItem("account", '');
        localStorage.setItem("name", '');
        setAlreadyLogin(false);
    };

    return (
        <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={30000}
            />
            <IonContent forceOverscroll={false}>


                <IonList lines="none">

                    {alreadyLogin ? <IonItem>
                        <RowItemCenterWrapper  className='cursor' style={{
                            width: '100%',
                            marginTop:10,
                            background: 'rgba(240, 242, 244, 0.94)',
                            borderRadius: 12,
                            padding: 12
                        }}>
                            <img onClick={() => {
                                history.push('/account')
                            }} src={headerIcon}/>
                            <div style={{marginLeft: 15}}>
                                <div style={{fontWeight: 'bold'}}>HERMAN.PAN</div>
                                <div onClick={showAccountWidget} style={{
                                    color: '#666',
                                    marginTop: 10
                                }}> {!account ? '' : account?.slice(0, 8) + "..." + account?.slice(account.length - 8)}</div>
                            </div>
                        </RowItemCenterWrapper>
                    </IonItem>:<IonItem>
                        <RowCenterWrapper onClick={getAccount} className='cursor' style={{
                            width: '100%',
                            marginTop:30,
                            marginBottom:10,
                            background: '#0620F9',
                            color:'#fff',
                            textAlign:'center',
                            borderRadius: 12,
                            padding: 12
                        }}>Log in</RowCenterWrapper>
                    </IonItem>}

                    <div style={{borderTop: '1px solid #DBDBDB',width:'100%',marginTop:20,marginBottom:20}} />


                    {alreadyLogin && <><IonItem  className='cursor' detail={false}>
                        <img style={{width:20}} src={profileIcon} />
                        <IonLabel style={{paddingLeft:17,margin:0}}>Profile</IonLabel>
                    </IonItem>

                    <IonItem  className='cursor' detail={false}>
                        <img style={{width:20}} src={draftIcon}  />
                        <IonLabel style={{paddingLeft:17,margin:0}}>Draft</IonLabel>
                    </IonItem>

                    <IonItem  className='cursor' detail={false}>
                        <img style={{width:20}} src={historyIcon} />
                        <IonLabel style={{paddingLeft:17,margin:0}}>History</IonLabel>
                    </IonItem></>}

                    <IonItem  className='cursor' detail={false}>

                        <img style={{width:20}} src={helpIcon}  />
                        <IonLabel style={{paddingLeft:17,margin:0}}>Help</IonLabel>
                    </IonItem>

                    <IonItem  className='cursor' detail={false}>
                        <img style={{width:20}} src={aboutIcon} />
                        <IonLabel style={{paddingLeft:17,margin:0}}>About</IonLabel>
                    </IonItem>

                    <IonItem  className='cursor' detail={false}>
                        <img style={{width:20}} src={settingIcon} />
                        <IonLabel style={{paddingLeft:17,margin:0}}>Setting and Privacy</IonLabel>
                    </IonItem>





                </IonList>
            </IonContent>
            <IonFooter  className="ion-no-border">
                {
                    alreadyLogin &&
                    <IonItem  style={{border:'none'}} lines='none' detail={false}   className='cursor'  onClick={logout}>
                        <span style={{color:'#fff',marginBottom:50,background:'#0620F9',padding:'3px 8px',borderRadius:8}}>Log out</span>
                    </IonItem>}
            </IonFooter>
        </IonMenu>
    );

};

export default connect<{}, StateProps, {}>({
    mapStateToProps: (state) => ({
        darkMode: state.user.darkMode,
        isAuthenticated: state.user.isLoggedin,
        menuEnabled: state.data.menuEnabled
    }),
    mapDispatchToProps: ({
        setDarkMode
    }),
    component: withRouter(Menu)
})
