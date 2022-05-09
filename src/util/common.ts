import Icon11 from "../img/11.png";

export default function parseUrl(url: string) {
    if (!url){
        return Icon11
    }
    if (url.indexOf("https://") != -1) {
        return url
    } else {
        return 'https://api.bangs.network/' + url
    }
}