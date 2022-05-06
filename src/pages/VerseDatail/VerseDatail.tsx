import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons, IonCard, IonCardHeader, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel,
    IonMenuButton,
    IonPage, IonPopover, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {addCircle, addCircleOutline} from "ionicons/icons";
import * as React from "react";
import Icon1 from "../../img/1.png";
import Icon2 from "../../img/2.png";
import Icon3 from "../../img/3.png";
import Icon4 from "../../img/4.png";
import {useRef, useState} from "react";
import AddPopover from "../../components/pop/Pop";
import {RouteComponentProps} from "react-router";
import './detail.css';
import {useEffect} from "react";
import axios from "axios";

interface MenuProps extends RouteComponentProps {}

const VerseDetail: React.FC<MenuProps> = ({history,match}) => {

    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
    const [verseId, setVerseId] = useState<number>();
    const pageRef = useRef<HTMLElement>(null);

    const presentPopover = (e: React.MouseEvent) => {
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    useEffect(() => {
        let params:any = match.params
        console.info(params.id);
    },[]);


    return (
        <IonPage  ref={pageRef} id='about-page'>
            <IonHeader    className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home" />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton  onClick={presentPopover}>
                            <IonIcon slot="icon-only" icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen  style={{  position: 'relative'}}>
                <IonItemGroup  style={{padding:0,border:0,margin:0}}>
                    <IonItemDivider sticky style={{padding:0,border:0,margin:0,background:'red'}}>
                        <img  src={Icon1} style={{padding:0,border:0,margin:0,width: '100vw', height: 240, objectFit: 'cover'}}/>
                    </IonItemDivider>
                    <IonCard style={{background:'#22bc87'}}>

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
                            <img src={Icon1} style={{width: '100%',objectFit: 'cover',margin:'15px 0'}}/>
                            <div style={{border:'1px solid #f2f2f2',padding:15,color:'#fff'}}>
                                The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                be
                                created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                Mutant Ape in the public sale.
                            </div>
                        </IonCardHeader>

                    </IonCard>

                    <IonItemDivider sticky style={{padding:0,border:0}}>
                        <img  src={Icon4} style={{width: '100%', height: 240, objectFit: 'cover'}}/>
                    </IonItemDivider>
                    <IonCard  style={{background:'#fff'}}>

                        <IonCardHeader>
                            <div style={{fontSize: 32, color: '#b6bc00', fontWeight: 'bold'}}>Mutant Ape Yacht Club
                            </div>
                            <p>
                                The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                be
                                created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                Mutant Ape in the public sale.
                            </p>

                            <img src={Icon2} style={{width: '100%',objectFit: 'cover',margin:'15px 0'}}/>

                            <IonRow style={{marginTop:20}}>
                                <IonCol size="2"  style={{padding:0,paddingRight:10}}>
                                    <img className='icon-circle full-width' src={Icon4}/>

                                </IonCol>
                                <IonCol size="10">

                                    <div style={{fontWeight:700,color:'#000',fontSize:16}}>ElonMask</div>
                                    <div style={{marginTop:5,color:'#999'}}>By Peter</div>
                                    <div style={{marginTop:10,color:'#000'}}>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                        be
                                        created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                        Mutant Ape in the public sale.</div>
                                </IonCol>
                            </IonRow>

                            <IonRow style={{marginTop:20}}>
                                <IonCol size="2"  style={{padding:0,paddingRight:10}}>
                                    <img className='icon-circle full-width' src={Icon4}/>

                                </IonCol>
                                <IonCol size="10">

                                    <div style={{fontWeight:700,color:'#000',fontSize:16}}>Trump</div>
                                    <div style={{marginTop:5,color:'#999'}}>By Peter</div>
                                    <div style={{marginTop:10,color:'#000'}}>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                        be
                                        created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                        Mutant Ape in the public sale.</div>
                                </IonCol>
                            </IonRow>

                            <IonRow style={{marginTop:20}}>
                                <IonCol size="2"  style={{padding:0,paddingRight:10}}>
                                    <img className='icon-circle full-width' src={Icon2}/>

                                </IonCol>
                                <IonCol size="10">

                                    <div style={{fontWeight:700,color:'#000',fontSize:16}}>Trump</div>
                                    <div style={{marginTop:5,color:'#999'}}>By Mike</div>
                                    <div style={{marginTop:10,color:'#000'}}>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only
                                        be
                                        created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a
                                        Mutant Ape in the public sale.</div>
                                </IonCol>
                            </IonRow>


                        </IonCardHeader>
                    </IonCard>

                    <IonItemDivider sticky style={{padding:0,border:0}}>
                        <img  src={Icon3} style={{width: '100%', height: 240, objectFit: 'cover'}}/>
                    </IonItemDivider>
                    <IonCard  style={{background:'#343434'}}>

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
                <AddPopover dismiss={() => setShowPopover(false)} history={history} type={2}/>
            </IonPopover>
        </IonPage>
    );
};

export default VerseDetail;