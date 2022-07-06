import Icon7 from "../img/7.png";
import BigNumber from "bignumber.js";

export default function parseUrl(url: string) {
    if (!url){
        return ''
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
