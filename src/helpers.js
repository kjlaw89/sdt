/**
 * Converts the provided hex-string to an RBG class
 * @param string hex Hex-string to convert
 */
function hexToRGB(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

/**
 * Converts a RGB object to a hex string
 * @param object color Object that contains r, g, b
 */
function rgbToHex(color) {
	return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
  }

export function lightOrDark(hex, light, dark) {
	let color = hexToRGB(hex);
	if (!color) {
		color = hexToRGB("#FFF");
	}

	light = light || "#FFF";
	dark = dark || "#000";

	const l = (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114);
	return l <= 150 ? light : dark;
}

export function shadeColor(hex, percent) {
	let color = hexToRGB(hex);
	if (!color) {
		color = hexToRGB("#FFF");
	}

    let r = color.r + Math.floor(percent / 100 * 255);
    let g = color.g + Math.floor(percent / 100 * 255);
	let b = color.b + Math.floor(percent / 100 * 255);

	color.r = (r > 255) ? 255 : ((r < 0) ? 0 : r);
	color.g = (g > 255) ? 255 : ((g < 0) ? 0 : g);
	color.b = (b > 255) ? 255 : ((b < 0) ? 0 : b);
	
	console.log(color);

	return rgbToHex(color);
}
