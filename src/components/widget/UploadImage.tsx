import * as React from "react";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import axios from "axios";
import {useState} from "react";
import addIcon from "../../img/add.png";
import addCircleIcon from "../../img/edit_circle.png";
import {IonLoading} from "@ionic/react";
import parseUrl from "../../util/common";
import getMainColor from "../../util/getMainColor";

interface ImgInfo {

    imgUrl: string,
    setImgUrl: any,
    width?: any,
    type?: any,
    setColor?:(bg:string,font:string,badge:any, text:any)=>void,

}

const UploadImage = ({imgUrl, setImgUrl,width,type,setColor}: ImgInfo) => {

    const [showLoading, setShowLoading] = useState(false);

    const getBgColor = async (pic:string) => {
        const palette = await getMainColor(pic);
        console.log(palette,"get main color:");
        if(palette && palette.primary && palette.palette){
            let bgColor = palette.primary;
            setColor && setColor(bgColor,palette.palette[0],palette.badge,palette.text);
        }
    };

    const uploadImage = async () => {
        const image: any = await Camera.getPhoto({
            quality: 100,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        console.info(image);
        await getBgColor(image.webPath);
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
                src={imgUrl?parseUrl(imgUrl):(type?addIcon:addCircleIcon)}/>

    </>

};

export default UploadImage;