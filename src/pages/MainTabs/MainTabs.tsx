import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import {calendar, location, informationCircle, people, peopleCircle, person, search} from 'ionicons/icons';
import Search from "../search/Search";
import Dao from "../dao/Dao";
import Home from "../home/Home";

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect path="/tabs" to="/tabs/home" />
                {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
                <Route exact path="/tabs/home" component={Home}/>
                <Route exact path="/tabs/search" component={Search}/>
                <Route path="/tabs/dao" component={Dao}/>

            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={person}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="search" href="/tabs/search">
                    <IonIcon icon={search}/>
                    <IonLabel>Search</IonLabel>
                </IonTabButton>
                <IonTabButton tab="dao" href="/tabs/dao">
                    <IonIcon icon={peopleCircle}/>
                    <IonLabel>DAO</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;