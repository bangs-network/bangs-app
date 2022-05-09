import {RouteComponentProps, withRouter} from "react-router";
import {setDarkMode} from "../../data/user/user.actions";
import {
    IonAvatar, IonButton,
    IonContent,
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
import {emitBox, ethWeb3} from "../emitWeb3/Connectors";
import {default as React, useEffect, useState} from "react";
import axios from "axios";
import {encodePacked, keccak256} from "web3-utils";
import qs from 'qs';
import {ChainType} from "@emit-technology/emit-account-node-sdk/lib/types";


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

        emitBox.onActiveAccountChanged((accounts:any) => {
            setName(accounts.name);
            localStorage.setItem("name",accounts.name);
        })
    },[]);

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

        emitBox.batchSignMsg([
            {msg: sign, chain: ChainType.ETH}
        ]).then((rest: any) => {
            const data = {
                account: account,
                sig: rest[0].result
            };
            axios({
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(data),
                url: 'https://api.bangs.network/account/login'
            }).then((res:any) => {
                setShowLoading(false)
                localStorage.setItem("SessionID",res.data.body.sessionID);
                localStorage.setItem("account",account);
                setAlreadyLogin(true);
                setAccount(account);
                console.log("login：")
                console.log(res)
            }).catch(function (error: any) {
                setShowLoading(false)
                console.info(error)
            })
        })

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
        localStorage.setItem("SessionID",'');
        localStorage.setItem("account",'');
        localStorage.setItem("name",'');
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

                    <IonItem>
                        <IonAvatar slot="start">
                            <img onClick={()=>{
                                history.push('/account')
                            }} src={headerIcon}/>
                        </IonAvatar>
                        <IonLabel>
                            {
                                alreadyLogin?<div>
                                    <h2>{name}</h2>
                                    <p>{!account?'':account?.slice(0, 8) + "..." + account?.slice(account.length - 8)}</p>
                                    <IonButton color="primary" onClick={showAccountWidget}>Accounts</IonButton>
                                </div>:<div>
                                    <IonButton color="primary" onClick={getAccount}>Login</IonButton>
                                </div>
                            }


                        </IonLabel>
                    </IonItem>

                    <IonMenuToggle   className='cursor'>
                        <IonItem detail={false}>
                            <IonIcon slot="start" icon={settingsOutline}/>
                            <IonLabel>Settings and Privacy</IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                    <IonMenuToggle   className='cursor'>
                        <IonItem detail={false}>
                            <IonIcon slot="start" icon={helpCircleOutline}/>
                            <IonLabel>Support</IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                    <IonMenuToggle  className='cursor'>
                        <IonItem detail={false}>
                            <IonIcon slot="start" icon={alertCircleOutline}/>
                            <IonLabel>About</IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                    {
                        alreadyLogin  && <IonMenuToggle>
                        <IonItem detail={false} className='cursor' onClick={logout}>
                            <IonIcon slot="start" icon={logOutOutline}/>
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle> }



                </IonList>
            </IonContent>
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
