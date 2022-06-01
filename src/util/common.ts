import Icon11 from "../img/5.jpg";

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