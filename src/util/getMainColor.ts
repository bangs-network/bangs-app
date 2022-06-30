import * as palette from 'react-palette'
import {PaletteColors} from "react-palette";
const getMainColor = async (src: string): Promise<PaletteColors> => {
    const rest = await palette.getPalette(src)
    return rest
};

export default getMainColor;