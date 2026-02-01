/**
 * rot13.js - Chiffrement ROT13
 */
(function () {
    'use strict';
    function rot13(s) {
        return s.replace(/[a-zA-Z]/g, function (c) {
            var base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26));
        });
    }
    function init() {
        document.getElementById('rot13-btn').addEventListener('click', function () {
            document.getElementById('rot13-output').value = rot13(document.getElementById('rot13-input').value);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
