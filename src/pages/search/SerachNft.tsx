import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonItemGroup,
    IonPage, IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Search.css';
import {useState} from "react";
import Icon1 from "../../img/1.png";
import Icon2 from "../../img/2.png";
import Icon3 from "../../img/3.png";
import * as React from "react";
import {RouteComponentProps} from "react-router";


interface MenuProps extends RouteComponentProps {}

const SearchNft: React.FC<MenuProps> = ({history}) => {

    const [searchText, setSearchText] = useState('');


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Search  Nft</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Search</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonSearchbar showCancelButton="never" placeholder="Search"
                              onIonChange={e => setSearchText(e.detail.value!)}/>


            </IonContent>
        </IonPage>
    );
};

export default SearchNft;
