/**
 * random-number.js - Nombre aléatoire entre min et max
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('rand-gen').addEventListener('click', function () {
            var min = parseFloat(document.getElementById('rand-min').value) || 0;
            var max = parseFloat(document.getElementById('rand-max').value) || 100;
            var dec = document.getElementById('rand-decimal').checked;
            var r = min + Math.random() * (max - min);
            document.getElementById('rand-output').value = dec ? r.toFixed(4) : Math.floor(r);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
