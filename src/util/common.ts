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