import LogoIcon from "../img/logo.png";
import BigNumber from "bignumber.js";

export default function parseUrl(url: string) {
    if (!url){
        return ''
    }
    if (url.indexOf('images/preview') == -1){
        return LogoIcon
    }
    if (url.indexOf("https://") != -1) {
        return url
    } else {
        return 'https://api.bangs.network/' + url
    }
}

//1=theme， 2=expression，3=talk，4=dice
export function getPoint(type: number) {

    if (type== 2){
        return "Expression"
    }  else if (type == 3){
        return "Talks"
    } else if (type == 4){
        return "Dice"

    }

}

export const hexToRgba = (bgColor: string) => {

    if (!bgColor) {
        return 'rgba(0,0,0,0.1)'
    }

    let color = bgColor.slice(1);

    let rgba = [

        parseInt('0x' + color.slice(0, 2)),

        parseInt('0x' + color.slice(2, 4)),

        parseInt('0x' + color.slice(4, 6)),

        0.2

    ];


    return 'rgba(' + rgba.toString() + ')';

};

export const formatDate = (millionSeconds: number) => {

    let date = new Date(millionSeconds);
    //let monthArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"];
    let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = date.getFullYear();
    let month = monthArr[date.getMonth()];
    let dDate = date.getDate();
    let hours: any = date.getHours();
    let minute: any = date.getMinutes();
    let second: any = date.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minute < 10) {
        minute = "0" + minute;
    }

    if (second < 10) {
        second = "0" + second;
    }

    return month + " " + dDate + ", " + year + " " + hours + ":" + minute ;



};


export const convert = (v: any, v2?: any) => {
    if (!v2) {
        v2 = 10 ** 18
    }
    if (v) {
        return new BigNumber(v).dividedBy(v2).toFixed()
    } else {
        return new BigNumber(0).toFixed()
    }
};

export const convertPercent = (v: any, v2?: any) => {

    v = v * 100;

    if (v) {
        return new BigNumber(v).dividedBy(v2).toFixed()
    } else {
        return new BigNumber(0).toFixed()
    }
};

export const convertAndFix = (v: any, fixNum: number) => {
    if (v) {
        return new BigNumber(v).dividedBy(10 ** 18).toFixed(fixNum,1)
    } else {
        return new BigNumber(0).toFixed(fixNum)
    }
};

export const convertFix = (v: any, v2: any, fixNum: number) => {
    if (v) {
        return new BigNumber(v).dividedBy(v2).toFixed(fixNum,1)
    } else {
        return new BigNumber(0).toFixed(fixNum)
    }
};

export const multiply = (v: any, v2?: any) => {
    if (!v2) {
        v2 = 10 ** 18
    }
    if (v) {
        return new BigNumber(v).multipliedBy(v2).toFixed()
    } else {
        return new BigNumber(0).toFixed()
    }
};
