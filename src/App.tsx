import {Redirect, Route, Switch} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet, IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter, IonReactHashRouter} from '@ionic/react-router';
import Account from './pages/user/User';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './index.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import * as React from "react";
import Menu from './components/menu/Menu';
import {AppContextProvider} from "./data/AppContext";
import {connect} from "./data/connect";
import {loadConfData} from './data/sessions/sessions.actions';
import {loadUserData, setIsLoggedIn, setUsername} from './data/user/user.actions';
import {useEffect} from "react";
import MainTabs from './pages/MainTabs/MainTabs';
import VerseDetail from "./pages/VerseDatail/VerseDatail";
import CreateTalks from "./pages/create/CreateTalks";
import CreateExp from "./pages/create/CreateExp";
import Roles from "./pages/role/Role";

setupIonicReact();

interface StateProps {
    darkMode: boolean;
}

interface DispatchProps {
    loadConfData: typeof loadConfData;
    loadUserData: typeof loadUserData;
    setIsLoggedIn: typeof setIsLoggedIn;
    setUsername: typeof setUsername;
}

const App: React.FC = () => (
    <AppContextProvider>
        <IonicAppConnected />
    </AppContextProvider>

);

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {

    useEffect(() => {
        loadUserData();
        loadConfData();
        // eslint-disable-next-line
    }, []);

    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu/>
                    <IonRouterOutlet id="main">
                        <Route path="/tabs" render={() => <MainTabs />} />
                        <Route path="/account" component={Account} />
                        <Route path="/verseDetail" component={VerseDetail} />
                        <Route path="/createTalks" component={CreateTalks} />
                        <Route path="/createExp" component={CreateExp} />
                        <Route path="/roles" component={Roles} />

                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
        )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        darkMode: state.data.darkMode,
        schedule: state.data.schedule
    }),
    mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
    component: IonicApp
});

