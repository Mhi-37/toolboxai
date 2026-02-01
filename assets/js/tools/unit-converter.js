/**
 * unit-converter.js - Convertisseur d'unités (longueur, masse, température, volume)
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    var UNITS = {
        length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 },
        mass: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
        volume: { L: 1, mL: 0.001, gal: 3.78541, qt: 0.946353, cup: 0.236588 },
        temp: {} // spécial
    };

    var LABELS = {
        length: { m: 'Mètre', km: 'Kilomètre', cm: 'Centimètre', mm: 'Millimètre', mi: 'Mile', yd: 'Yard', ft: 'Pied', in: 'Pouce' },
        mass: { kg: 'Kilogramme', g: 'Gramme', mg: 'Milligramme', lb: 'Livre', oz: 'Once' },
        volume: { L: 'Litre', mL: 'Millilitre', gal: 'Gallon', qt: 'Quart', cup: 'Tasse' },
        temp: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' }
    };

    function convertTemp(val, fromU, toU) {
        var c;
        if (fromU === 'C') c = val;
        else if (fromU === 'F') c = (val - 32) * 5 / 9;
        else c = val - 273.15;
        if (toU === 'C') return c;
        if (toU === 'F') return c * 9 / 5 + 32;
        return c + 273.15;
    }

    function convert(val, fromU, toU, cat) {
        if (cat === 'temp') return convertTemp(val, fromU, toU);
        var base = val * UNITS[cat][fromU];
        return base / UNITS[cat][toU];
    }

    function fillSelect(selId, cat) {
        var sel = document.getElementById(selId);
        if (!sel) return;
        var keys = cat === 'temp' ? ['C', 'F', 'K'] : Object.keys(UNITS[cat]);
        var labels = LABELS[cat];
        sel.innerHTML = keys.map(function (k) {
            return '<option value="' + k + '">' + (labels[k] || k) + '</option>';
        }).join('');
    }

    function update() {
        var cat = document.getElementById('unit-category').value;
        var fromU = document.getElementById('unit-from').value;
        var toU = document.getElementById('unit-to').value;
        var val = parseFloat(document.getElementById('unit-value').value) || 0;
        var res = convert(val, fromU, toU, cat);
        document.getElementById('unit-output').textContent = res.toFixed(6);
    }

    function init() {
        var catEl = document.getElementById('unit-category');
        fillSelect('unit-from', 'length');
        fillSelect('unit-to', 'length');

        catEl.addEventListener('change', function () {
            var c = this.value;
            fillSelect('unit-from', c);
            fillSelect('unit-to', c);
            update();
        });

        ['unit-from', 'unit-to', 'unit-value'].forEach(function (id) {
            document.getElementById(id).addEventListener('input', update);
            document.getElementById(id).addEventListener('change', update);
        });

        update();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
