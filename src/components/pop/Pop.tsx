import React from 'react';
import {IonList, IonItem, IonLabel} from '@ionic/react';
import {RouteComponentProps} from "react-router";

interface AddPopoverProps {
    dismiss: () => void;
    history: any,
    id?: any,
    type: number,
}

const AddPopover: React.FC<AddPopoverProps> = ({dismiss, id, history, type}) => {

    const close = (url: string) => {
        window.open(url, '_blank');
        dismiss();
    };

    return (
        <IonList>

            {
                type == 1 ? <>

                    <IonItem button lines="none" onClick={() => {
                        history.push('/createVerse')
                        dismiss();
                    }}>
                        <IonLabel>Create Verse</IonLabel>
                    </IonItem></> : <>
                    <IonItem button onClick={() => {
                        history.push(`/createTheme/${id}`)
                        dismiss();
                    }
                    }>
                        <IonLabel>Theme</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push(`/createExp/${id}`)
                        dismiss();
                    }}>
                        <IonLabel>Expressions</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push(`/createTalks/${id}`)
                        dismiss();
                    }}>
                        <IonLabel>Talks</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push(`/createDice/${id}`)
                        dismiss();
                    }
                    }>
                        <IonLabel>Dices</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        history.push(`/roles/${id}`)
                        dismiss();
                    }}>
                        <IonLabel>Roles</IonLabel>
                    </IonItem>
                </>
            }

        </IonList>
    )
}

export default AddPopover;