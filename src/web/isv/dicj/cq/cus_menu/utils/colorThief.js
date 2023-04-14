import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export const getDominantColor = (img) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      try {
        const color = colorThief.getColor(image);
        resolve(color);
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = img;
  });
};

export const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export const RGBToHex = (rgb, alpha = 1) => {
  const r = Math.round(rgb[0]);
  const g = Math.round(rgb[1]);
  const b = Math.round(rgb[2]);
  const a = alpha.toFixed(2);
  const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
  const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return { rgba, hex };
};

export const lightenColor = (hexColor, amount = 0, alpha = 0.4) => {
  const rgbColor = hexToRGB(hexColor);
  const lighterColor = rgbColor.map((c) => Math.max(c - amount, 0));
  const { rgba } = RGBToHex(lighterColor, alpha);
  return rgba;
};
