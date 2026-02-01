(function () {
    'use strict';
    function isPrime(n) {
        if (n < 2 || !Number.isInteger(n)) return false;
        for (var i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
        return true;
    }
    function init() {
        document.getElementById('prime-btn').addEventListener('click', function () {
            var n = parseInt(document.getElementById('prime-n').value, 10);
            document.getElementById('prime-out').value = !isNaN(n) ? (isPrime(n) ? n + ' est premier' : n + ' n\'est pas premier') : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
