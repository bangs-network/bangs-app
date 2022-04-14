import React from 'react';
import {IonList, IonItem, IonLabel} from '@ionic/react';
import {RouteComponentProps} from "react-router";

interface AddPopoverProps {
    dismiss: () => void;
    history: any,
    type: number,
}

const AddPopover: React.FC<AddPopoverProps> = ({dismiss, history, type}) => {

    const close = (url: string) => {
        window.open(url, '_blank');
        dismiss();
    };

    return (
        <IonList>

            {
                type == 1 ? <>
                    <IonItem button onClick={() => close('https://ionicframework.com/getting-started')}>
                        <IonLabel>Theme</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push('/createExp')
                        dismiss();
                    }}>
                        <IonLabel>Expressions</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push('/createTalks')
                        dismiss();
                    }}>
                        <IonLabel>Talks</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => close('https://github.com/ionic-team/ionic')}>
                        <IonLabel>Dices</IonLabel>
                    </IonItem>
                    <IonItem button onClick={dismiss} lines="none">
                        <IonLabel>Session</IonLabel>
                    </IonItem></> : <>
                    <IonItem button onClick={() => {
                        history.push('/createTalks')
                        dismiss();
                    }}>
                        <IonLabel>ReBang</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push('/roles')
                        dismiss();
                    }}>
                        <IonLabel>Roles</IonLabel>
                    </IonItem>
                    <IonItem button onClick={dismiss} lines="none">
                        <IonLabel>DAOs</IonLabel>
                    </IonItem>
                </>
            }

        </IonList>
    )
}

export default AddPopover;