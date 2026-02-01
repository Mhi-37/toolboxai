(function () {
    'use strict';
    function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
    function lcm(a, b) { return (a && b) ? Math.abs(a * b) / gcd(a, b) : 0; }
    function init() {
        document.getElementById('lcm-btn').addEventListener('click', function () {
            var a = parseInt(document.getElementById('lcm-a').value, 10);
            var b = parseInt(document.getElementById('lcm-b').value, 10);
            document.getElementById('lcm-out').value = (!isNaN(a) && !isNaN(b) && a && b) ? lcm(a, b) : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
