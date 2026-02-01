/**
 * color-converter.js - Convertisseur HEX / RGB / HSL
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        var n = parseInt(hex, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(function (x) {
            var h = Math.round(x).toString(16);
            return h.length === 1 ? '0' + h : h;
        }).join('');
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max === min) h = s = 0;
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                default: h = ((r - g) / d + 4) / 6;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        var r, g, b;
        if (s === 0) r = g = b = l;
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    function parseInput(str) {
        str = str.trim();
        var m;
        if ((m = str.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/))) {
            return hexToRgb(m[1]);
        }
        if ((m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/))) {
            return { r: +m[1], g: +m[2], b: +m[3] };
        }
        if ((m = str.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/))) {
            return hslToRgb(+m[1], +m[2], +m[3]);
        }
        return null;
    }

    function updateDisplay(rgb) {
        var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

        document.getElementById('color-hex').value = hex;
        document.getElementById('color-rgb').value = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        document.getElementById('color-hsl').value = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
        document.getElementById('color-preview').style.background = hex;
        document.getElementById('color-result').style.display = 'block';
        document.getElementById('color-picker').value = hex;
    }

    function init() {
        var input = document.getElementById('color-input');
        var picker = document.getElementById('color-picker');
        var btn = document.getElementById('color-convert');
        var copyHex = document.getElementById('color-copy-hex');

        function doConvert() {
            var val = input.value.trim();
            var rgb = parseInput(val);
            if (rgb) updateDisplay(rgb);
            else alert('Format non reconnu. Utilisez #hex, rgb(r,g,b) ou hsl(h,s%,l%)');
        }

        btn.addEventListener('click', doConvert);
        input.addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); doConvert(); } });

        picker.addEventListener('input', function () {
            input.value = this.value;
            updateDisplay(hexToRgb(this.value.replace('#', '')));
        });

        copyHex.addEventListener('click', function () {
            var hex = document.getElementById('color-hex').value;
            navigator.clipboard.writeText(hex).then(function () {
                copyHex.textContent = 'Copié !';
                setTimeout(function () { copyHex.textContent = 'Copier HEX'; }, 2000);
            });
        });

        updateDisplay(hexToRgb('6366f1'));
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
