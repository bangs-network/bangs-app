import {RouteComponentProps, withRouter} from "react-router";
import {setDarkMode} from "../../data/user/user.actions";
import {
    IonAvatar, IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
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
import headerIcon from "../../img/0.png";
import {emitBox, ethWeb3} from "../emitWeb3/Connectors";
import {useEffect, useState} from "react";
import {HandlerCallback} from "workbox-routing/_types";
import axios from "axios";
import {encodePacked, keccak256} from "web3-utils";
import qs from 'qs';

const abi = require('web3-eth-abi');


const routes = {
    loggedInPages: [
        { title: 'Account', path: '/account', icon: personCircleOutline },
        { title: 'Particles', path: '/particles', icon:  peopleCircleOutline},
        { title: 'Settings and Privacy', path: '/account', icon: settingsOutline},
        { title: 'Support', path: '/support', icon: helpCircleOutline },
        { title: 'About', path: '/about', icon: alertCircleOutline },
        { title: 'Logout', path: '/logout', icon: logOutOutline }
    ],
    loggedOutPages: [
        { title: 'Login', path: '/login', icon: logIn },
        { title: 'Support', path: '/support', icon: help },
        { title: 'Signup', path: '/signup', icon: personAdd }
    ]
};

interface Pages {
    title: string,
    path: string,
    icon: string,
    routerDirection?: string
}
interface StateProps {
    darkMode: boolean;
    isAuthenticated: boolean;
    menuEnabled: boolean;
}

interface DispatchProps {
    setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode, menuEnabled }) => {

    const [account, setAccount] = useState<string>('');

    function renderListItems(list: Pages[]) {
        return list
            .filter(route => !!route.path)
            .map(p => (
                <IonMenuToggle key={p.title} auto-hide="false">
                    <IonItem detail={false} routerLink={p.path} >
                        <IonIcon slot="start" icon={p.icon} />
                        <IonLabel>{p.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            ));
    }

    useEffect(() => {
        emitBox.onActiveWalletChanged(walletAddress => {
            console.log("walletAddress:",walletAddress);
            //setAccount(walletAddress)
        })
    });

    const getNonce = (account:any) => {
        console.log("getNonce:");
        const data = {
            account:account
        }
        axios.get('https://api.bangs.network/account/nonce', {params:data}).then(function (response: any) {
            console.info(response)
            login(account,response.data.body.nonce)
        }).catch(function (error: any) {
            console.info(error)
        })
    };

    const login = (account:any,nonce:number) => {
        console.log("getNonce:"+nonce);

        let packValue = encodePacked({t:"bytes32", v:keccak256(account)}, {t:"uint64", v:nonce})
        console.log('packValue=='+packValue);
        if (!packValue) {
            return
        }
        const sign  =  keccak256(packValue);

        ethWeb3.eth.personal.sign(sign,account,"").then(value => {
            console.log('sign==');
            console.log(value);
            const data = {
                account:account,
                sig:value
            };
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(data),
                url: 'https://api.bangs.network/account/login'
            }).then(res => {

                console.log("login：")
                console.log(res)
            }).catch(function (error: any) {
                console.info(error)
            })
        }).catch(function (error: any) {
            console.log("signError：")
            console.info(error)
        })



    };

    const getAccount = () => {
        console.log("login:");
        ethWeb3.eth.getAccounts().then(data=>{
            console.log("data:",data);
            getNonce(data[0])
        }).catch(e=>{
            console.error("error",e)
        })
    };

    const showAccountWidget = () => {
        emitBox.showWidget()
    };

    return (
        <IonMenu  type="overlay" disabled={!menuEnabled} contentId="main">
            <IonContent forceOverscroll={false}>
                <IonList lines="none">

                        <IonItem>
                            <IonAvatar slot="start">
                            <img  src={headerIcon}/>
                            </IonAvatar>
                            <IonLabel >
                                <h2>Gordon</h2>
                                <p>0xDsI883K...HO8R</p>
                                <IonButton color="primary" onClick={getAccount}>Login</IonButton>
                                <IonButton color="primary" onClick={showAccountWidget}>Accounts</IonButton>
                            </IonLabel>
                        </IonItem>

                    {!isAuthenticated ? renderListItems(routes.loggedInPages) : renderListItems(routes.loggedOutPages)}
                    {/*<IonItem>*/}
                        {/*<IonIcon slot="start" icon={moonOutline}/>*/}
                        {/*<IonLabel>Dark Mode</IonLabel>*/}
                        {/*<IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />*/}
                    {/*</IonItem>*/}
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
