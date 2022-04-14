import {IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import './Search.css';
import {useState} from "react";

const Search: React.FC = () => {

    const [searchText, setSearchText] = useState('');


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search</IonTitle>
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

export default Search;
