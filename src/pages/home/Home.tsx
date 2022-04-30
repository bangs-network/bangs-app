import {
    IonAvatar,
    IonButton,
    IonButtons, IonCard, IonCardHeader,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel,
    IonMenuButton,
    IonPage, IonPopover,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import {addCircle, addCircleOutline} from "ionicons/icons";
import * as React from "react";
import Icon1 from "../../img/2.png";
import Icon2 from "../../img/2.png";
import Icon3 from "../../img/3.png";
import Icon4 from "../../img/4.png";
import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {connect} from "../../data/connect";
import {RouteComponentProps, withRouter} from "react-router";

interface StateProps {
    darkMode: boolean;
    isAuthenticated: boolean;
    menuEnabled: boolean;
}

interface MenuProps extends RouteComponentProps {}

const Home: React.FC<MenuProps> = ({history}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const pageRef = useRef<HTMLElement>(null);

    const presentPopover = (e: React.MouseEvent) => {
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };


    return (
        <IonPage  ref={pageRef} id='home-page'>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton >
                            <img style={{width:30,height:30,borderRadius:30}}  src={Icon1}/>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle style={{ fontSize:24,fontWeight: 700,textAlign:'center'}}>BANGS.</IonTitle>
                    <IonButtons slot="end">
                        <IonButton  onClick={presentPopover}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">BANGS</IonTitle>
                    </IonToolbar>
                </IonHeader>

                    <IonItemGroup>
                        <IonCard style={{background:'#22bc87'}} onClick={() => {
                            history.push('/verseDetail');
                        }}>
                            <img src={Icon1} style={{width: '100%', height: 240, objectFit: 'cover'}}/>


                            <IonCardHeader>
                                <div style={{fontSize: 32, color: '#fff', fontWeight: 'bold'}}>Universe Name</div>
                                <p style={{ color: '#fff'}}>
                                    The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                    be
                                    created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                    Mutant Ape in the public sale.
                                </p>
                                <div style={{border:'1px solid #f2f2f2',padding:15,color:'#fff'}}>
                                    The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                    be
                                    created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                    Mutant Ape in the public sale.
                                </div>
                                <IonRow style={{marginTop:20}}>
                                    <IonCol size="2"  style={{padding:0,paddingRight:10}}>
                                        <img className='icon-circle full-width' src={Icon2}/>

                                    </IonCol>
                                    <IonCol size="10">

                                        <div style={{fontWeight:700,color:'#fff',fontSize:16}}>Trump</div>
                                        <div style={{marginTop:5,color:'#f2f2f2'}}>By Peter</div>
                                        <div style={{marginTop:10,color:'#fff'}}>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                            be
                                            created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                            Mutant Ape in the public sale.</div>
                                    </IonCol>
                                </IonRow>
                            </IonCardHeader>

                        </IonCard>

                        <IonCard  style={{background:'#fff'}} onClick={() => {
                            history.push('/verseDetail');
                        }}>
                            <img src={Icon2} style={{width: '100%', height: 240, objectFit: 'cover'}}/>

                            <IonCardHeader>
                                <div style={{fontSize: 32, color: '#b6bc00', fontWeight: 'bold'}}>Mutant Ape Yacht Club
                                </div>
                                <p>
                                    The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                    be
                                    created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                    Mutant Ape in the public sale.
                                </p>

                                <img src={Icon2} style={{width: '100%',objectFit: 'cover'}}/>


                            </IonCardHeader>
                        </IonCard>

                        <IonCard onClick={() => {
                            history.push('/verseDetail');
                        }}>
                            <img src={Icon3} style={{width: '100%', height: 240, objectFit: 'cover'}}/>

                            <IonCardHeader>
                                <div style={{fontSize: 32, color: '#ff1f29', fontWeight: 'bold'}}>Mutant Ape Yacht Club
                                </div>
                                <p style={{color:'#fff'}}>
                                    The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                    be
                                    created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                    Mutant Ape in the public sale.
                                </p>


                                <IonGrid style={{margin:0,padding:0}}>

                                    <IonRow>
                                        <IonCol size="2"  style={{padding:0,paddingRight:10}}>
                                            <img className='icon-circle full-width' src={Icon1}/>

                                        </IonCol>
                                        <IonCol size="10">

                                            <div style={{fontWeight:700,color:'#fff',fontSize:16}}>ElonMask</div>
                                            <div style={{marginTop:5}}>By Gordon</div>
                                            <div style={{marginTop:10,color:'#fff'}}>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                                be
                                                created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                                Mutant Ape in the public sale.</div>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol size="2"  style={{padding:0,paddingRight:10}}>
                                            <img className='icon-circle full-width' src={Icon2}/>

                                        </IonCol>
                                        <IonCol size="10">

                                            <div style={{fontWeight:700,color:'#fff',fontSize:16}}>JOJO</div>
                                            <div style={{marginTop:5}}>By Peter</div>
                                            <div style={{marginTop:10,color:'#fff'}}>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                                be
                                                created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                                Mutant Ape in the public sale.</div>
                                        </IonCol>
                                    </IonRow>

                                </IonGrid>


                            </IonCardHeader>
                        </IonCard>

                    </IonItemGroup>

            </IonContent>

            <IonPopover
                isOpen={showPopover}
                event={popoverEvent}
                onDidDismiss={() => setShowPopover(false)}
            >
                <AddPopover dismiss={() => setShowPopover(false)}  history={history} type={1}/>
            </IonPopover>
        </IonPage>
    );
};

export default Home;
