function hslToHex(h, s, l) {
    h = (h >= 360) ? 359 : (h < 0) ? 0 : h;
    s = (s > 1) ? 1 : (s < 0) ? 0 : s;
    l = (l > 1) ? 1 : (l < 0) ? 0 : l;


    let r, g, b;

    if (s === 0) {
        r = g = b = l; 
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h / 360 + 1 / 3);
        g = hueToRgb(p, q, h / 360);
        b = hueToRgb(p, q, h / 360 - 1 / 3);
    }

    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return hex;
}

function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let cMax = Math.max(r, g, b);
    let cMin = Math.min(r, g, b);
    let delta = cMax - cMin;

    let hue = 0;
    if (delta === 0) {
        hue = 0;
    } else if (cMax === r) {
        hue = 60 * (((g - b) / delta) % 6);
    } else if (cMax === g) {
        hue = 60 * (((b - r) / delta) + 2);
    } else {
        hue = 60 * (((r - g) / delta) + 4);
    }

    let lightness = (cMax + cMin) / 2;

    let saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    return { h: hue, s: saturation, l: lightness };
}


function getComplementaryColor(hex) {
    const hsl = hexToHSL(hex);
    const newHue = (hsl.h + 270) % 360; 
    return hslToHex(newHue,hsl.s,hsl.l - 0.1)
}

