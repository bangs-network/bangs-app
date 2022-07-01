import { getColor,getPalette } from 'color-thief-react'
import BigNumber from "bignumber.js";

export interface ThemeColors {
    primary: string;
    palette: Array<string>;
}

const getMainColor = async (src: string): Promise<ThemeColors> => {
    const color = await getColor(src,"rgbString")
    const palette = await getPalette(src,10,"rgbArray")
    console.log(color,palette);
    palette.sort(sortRgb);
    return {
        primary: color,
        palette: palette.map(v=>{return `rgb(${v[0]},${v[1]},${v[2]})`})
    }
};

function sortRgb(a:Array<number>,b:Array<number>){
    return powN(a)-powN(b)
}

function powN(a:Array<number>){
    const a0 = new BigNumber(a[0]).pow(2)
    const a1 = new BigNumber(a[1]).pow(2)
    const a2 = new BigNumber(a[2]).pow(2)
    return (a0.plus(a1).plus(a2)).sqrt().toNumber()
}

export default getMainColor;