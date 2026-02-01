/**
 * anagram-checker.js
 */
(function () {
    'use strict';
    function norm(s) {
        return s.toLowerCase().replace(/\s/g, '').split('').sort().join('');
    }
    function isAnagram(a, b) {
        return norm(a) === norm(b) && norm(a).length > 0;
    }
    function init() {
        document.getElementById('ana-btn').addEventListener('click', function () {
            var a = document.getElementById('ana-a').value;
            var b = document.getElementById('ana-b').value;
            document.getElementById('ana-out').value = (a && b) ? (isAnagram(a, b) ? 'Oui, ce sont des anagrammes' : 'Non') : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
