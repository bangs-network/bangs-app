import parseUrl from "../../util/common";
import * as React from "react";

interface ImgInfo {
    imgUrl: string
}

const ImageUi = ({imgUrl}: ImgInfo) => {

    return  <img src={parseUrl(imgUrl)}/>

};

export default ImageUi;