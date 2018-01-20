function randomColor() {
  colorMode(HSB);
  var c = color(random(360), random(50, 100), 100);
  return hsvToRgb(c);
}

function rgbToHsv(col) {
  var r = red(col);
  var g = green(col);
  var b = blue(col);
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  colorMode(HSB);
  var col = color(h * 360, s * 100, v * 100);
  return col;
}

function hsvToRgb(col) {
  var h = hue(col) / 360;
  var s = saturation(col) / 100;
  var v = brightness(col) / 100;
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  colorMode(RGB);
  return color(r * 255, g * 255, b * 255);
}

function contrast(col) {
  var c = rgbToHsv(col);

  var h = hue(c) + 180;
  if (h > 360) {
    h = h - 360;
  }
  c = color(h, saturation(c), brightness(c));

  return hsvToRgb(c);
}
