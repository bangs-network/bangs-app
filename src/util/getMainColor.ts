import {getColor, getPalette} from 'color-thief-react'
import BigNumber from "bignumber.js";

export interface ThemeColors {
    primary: string;
    palette: Array<string>;

    isDarkColor: boolean

    badge: {
        color: string,
        background: string
    }

    text: {
        color: string;
        translucent: string;
    }

}

const getMainColor = async (src: string): Promise<ThemeColors> => {
    const color = await getColor(src, "rgbArray")
    const palette = await getPalette(src, 10, "rgbArray")
    console.log(color, palette);
    palette.sort(sortRgb);

    let isDarkColor = false;
    let badge, text;
    const primary = `rgb(${color[0]},${color[1]},${color[2]})`;
    if ((color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) < 186) {
        isDarkColor = true
        badge = {background: "rgba(255,255,255,0.5)", color: primary}
        text = {color: `#ffffff`, translucent: "rgba(255,255,255,0.5)"}
    } else {
        badge = {background: "rgba(0,0,0,0.5)", color: "#000000"}
        text = {color: `#000000`, translucent: "rgba(0,0,0,0.5)"}
    }
    return {
        primary: primary,
        palette: palette.map(v => {
            return `rgb(${v[0]},${v[1]},${v[2]})`
        }),
        isDarkColor: isDarkColor,
        badge: badge,
        text: text
    }
};

function sortRgb(a: Array<number>, b: Array<number>) {
    return powN(a) - powN(b)
}

function powN(a: Array<number>) {
    const a0 = new BigNumber(a[0]).pow(2)
    const a1 = new BigNumber(a[1]).pow(2)
    const a2 = new BigNumber(a[2]).pow(2)
    return (a0.plus(a1).plus(a2)).sqrt().toNumber()
}

export default getMainColor;