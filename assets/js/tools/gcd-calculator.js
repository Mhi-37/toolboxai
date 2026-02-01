/**
 * gcd-calculator.js - PGCD (algorithme d'Euclide)
 */
(function () {
    'use strict';
    function gcd(a, b) {
        a = Math.abs(Math.floor(a));
        b = Math.abs(Math.floor(b));
        while (b) { var t = b; b = a % b; a = t; }
        return a;
    }
    function init() {
        document.getElementById('gcd-btn').addEventListener('click', function () {
            var a = parseInt(document.getElementById('gcd-a').value, 10);
            var b = parseInt(document.getElementById('gcd-b').value, 10);
            document.getElementById('gcd-out').value = (!isNaN(a) && !isNaN(b)) ? gcd(a, b) : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
