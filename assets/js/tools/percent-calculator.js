/**
 * percent-calculator.js - Calculs de pourcentages
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('pct-calc').addEventListener('click', function () {
            var a = parseFloat(document.getElementById('pct-a').value) || 0;
            var b = parseFloat(document.getElementById('pct-b').value) || 0;
            document.getElementById('pct-result').value = (b * a / 100).toFixed(2);
        });
        document.getElementById('pct-change').addEventListener('click', function () {
            var v = parseFloat(document.getElementById('pct-val').value) || 0;
            var c = parseFloat(document.getElementById('pct-chg').value) || 0;
            document.getElementById('pct-result2').value = (v * (1 + c / 100)).toFixed(2);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
