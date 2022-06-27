const getImgColor = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const context = canvas.getContext("2d");
    context?.drawImage(img, 0, 0);
    let pixelData = context?.getImageData(0, 0, canvas.width, canvas.height).data;
    return pixelData;
};

const getMainColor = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement("canvas");
            const img = new Image();
            img.crossOrigin = "";
            img.src = src;
            img.onload = () => {
                const color = getImgColor(canvas, img);
                const colorMain = translateToRgba(color);
                resolve(colorMain);
            };
        } catch (e) {
            reject(e);
        }
    });
};

const translateToRgba = (
    color: Uint8ClampedArray | undefined
): string => {
    if (!color) {
        return "";
    }
    const rgbaMapCount = new Map();
    let rgba: Array<number | undefined> = [];
    let rgbaStr = "";

    for (let i = 0; i < color.length; i += 4) {
        rgba[0] = color[i];
        rgba[1] = color[i + 1];
        rgba[2] = color[i + 2];
        rgba[3] = color[i + 3];

        if (rgba.indexOf(undefined) !== -1 || color[i + 3] === 0) {
            continue;
        }
        rgbaStr = getHexColor(rgba)
        if (rgbaMapCount.has(rgbaStr)) {
            const oldCount = rgbaMapCount.get(rgbaStr);
            rgbaMapCount.set(rgbaStr, oldCount + 1);
        } else {
            rgbaMapCount.set(rgbaStr, 1);
        }
    }
    const rgbaArrayCount: [string, number][] = Array.from(rgbaMapCount).sort(
        (a, b) => b[1] - a[1]
    );
    // const result = new Map(rgbaArrayCount);
    if(rgbaArrayCount.length>0 && rgbaArrayCount[0].length>0){
        return rgbaArrayCount[0][0];
    }
    return ""
};

function getHexColor(rgba:Array<any>){
    if(rgba && rgba.length == 4 && rgba.indexOf(undefined) == -1){
        const r = rgba[0].toString(16);
        const g = rgba[1].toString(16);
        const b = rgba[2].toString(16);
        const R = r.length==1?'0' + r : r;
        const G = g.length==1?'0' + g : g;
        const B = b.length==1?'0' + b : b;
        return  R + G + B;
    }
    throw new Error("not standard rgba color")
}

export default getMainColor;