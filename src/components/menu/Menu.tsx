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
import {ethWeb3} from "../emitWeb3/Connectors";

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

    const login = () => {
        console.log("login:");
        ethWeb3.eth.getAccounts().then(data=>{
            console.log("data:",data);
        }).catch(e=>{
            console.error("error",e)
        })
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
                                <IonButton color="primary" onClick={login}>Login</IonButton>
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
