/**
 * bmi-calculator.js - IMC = poids / taille²
 */
(function () {
    'use strict';
    function interp(bmi) {
        if (bmi < 18.5) return 'Insuffisance pondérale';
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Surpoids';
        return 'Obésité';
    }
    function init() {
        document.getElementById('bmi-calc').addEventListener('click', function () {
            var w = parseFloat(document.getElementById('bmi-weight').value);
            var h = parseFloat(document.getElementById('bmi-height').value) / 100;
            if (!w || !h || h <= 0) { document.getElementById('bmi-result').value = ''; document.getElementById('bmi-interp').value = ''; return; }
            var bmi = (w / (h * h)).toFixed(1);
            document.getElementById('bmi-result').value = bmi;
            document.getElementById('bmi-interp').value = interp(parseFloat(bmi));
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
