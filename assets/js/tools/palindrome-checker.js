/**
 * palindrome-checker.js
 */
(function () {
    'use strict';
    function isPal(s) {
        var t = s.toLowerCase().replace(/[^a-z0-9à-ÿ]/g, '');
        return t && t === t.split('').reverse().join('');
    }
    function init() {
        document.getElementById('pal-btn').addEventListener('click', function () {
            var s = document.getElementById('pal-input').value;
            document.getElementById('pal-output').value = s ? (isPal(s) ? 'Oui, c\'est un palindrome' : 'Non, ce n\'est pas un palindrome') : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
