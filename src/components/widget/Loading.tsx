import {IonLoading} from "@ionic/react";
import {default as React, useState} from "react";

export default function ShowLoading() {

    const [showLoading, setShowLoading] = useState(true);

    return <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        duration={10000}
    />

}