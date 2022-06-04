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
import {ChainType} from "@emit-technology/emit-types";


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

const Menu1: React.FC<MenuProps> = ({darkMode, history, isAuthenticated, setDarkMode, menuEnabled}) => {


    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {


    },[]);




    return (
        <IonMenu type="overlay" menuId="first" side="end" disabled={!menuEnabled} contentId="main">
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={30000}
            />
            <IonContent forceOverscroll={false}>
                <IonList lines="none">




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
    component: withRouter(Menu1)
})
