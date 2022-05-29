import * as React from "react";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import axios from "axios";
import {useState} from "react";
import addIcon from "../../img/add.png";
import {IonLoading} from "@ionic/react";
import parseUrl from "../../util/common";

interface ImgInfo {

    imgUrl: string,
    setImgUrl: any,
    width?: any,

}

const UploadImage = ({imgUrl, setImgUrl,width}: ImgInfo) => {

    const [showLoading, setShowLoading] = useState(false);

    const uploadImage = async () => {


        const image: any = await Camera.getPhoto({
            quality: 100,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        console.info(image);
        const file = await fetch(image.webPath).then(r => r.blob()).then(blobFile => new File([blobFile], 'file', {type: blobFile.type}));

        console.info(file);
        const formData = new FormData();
        formData.append('file', file);
        setShowLoading(true);
        axios.post('https://api.bangs.network/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response: any) {
            setImgUrl(response.data);
            console.info(response);
            setShowLoading(false)
        }).catch(function (error: any) {
            console.info(error);
            setShowLoading(false)
        })


    };

    return <>
        <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
            duration={10000}
        />
        <img onClick={uploadImage} className='cursor' style={{width:width?width:120,height:width?width:120}}
                src={imgUrl?parseUrl(imgUrl):addIcon}/>

    </>

};

export default UploadImage;