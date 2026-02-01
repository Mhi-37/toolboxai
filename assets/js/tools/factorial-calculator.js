/**
 * factorial-calculator.js
 */
(function () {
    'use strict';
    function fact(n) {
        if (n < 0 || n > 170) return null;
        if (n <= 1) return 1;
        var r = 1;
        for (var i = 2; i <= n; i++) r *= i;
        return r;
    }
    function init() {
        document.getElementById('fac-btn').addEventListener('click', function () {
            var n = parseInt(document.getElementById('fac-n').value, 10);
            var r = fact(n);
            document.getElementById('fac-out').value = (r !== null && !isNaN(n)) ? r.toString() : (n > 170 ? 'Trop grand' : '');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
