/**
 * roman-numerals.js - Arabe ↔ Romain
 */
(function () {
    'use strict';
    var map = { M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1 };
    function toRoman(n) {
        var r = '';
        for (var k in map) { while (n >= map[k]) { r += k; n -= map[k]; } }
        return r;
    }
    function fromRoman(s) {
        s = s.toUpperCase();
        var n = 0, prev = 0;
        for (var i = s.length - 1; i >= 0; i--) {
            var v = map[s[i]] || 0;
            n += v < prev ? -v : v;
            prev = v;
        }
        return n;
    }
    function init() {
        document.getElementById('roman-to').addEventListener('click', function () {
            var n = parseInt(document.getElementById('roman-num').value, 10);
            document.getElementById('roman-out').value = (n >= 1 && n <= 3999) ? toRoman(n) : 'Entrez 1-3999';
        });
        document.getElementById('roman-from').addEventListener('click', function () {
            document.getElementById('roman-out').value = fromRoman(document.getElementById('roman-rom').value);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
