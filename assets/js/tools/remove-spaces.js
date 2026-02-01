/**
 * remove-spaces.js - Nettoie espaces multiples et sauts de ligne
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('spaces-btn').addEventListener('click', function () {
            var t = document.getElementById('spaces-input').value;
            if (document.getElementById('spaces-multi').checked) t = t.replace(/\s+/g, ' ');
            if (document.getElementById('spaces-lines').checked) t = t.replace(/\n/g, '').replace(/\r/g, '');
            document.getElementById('spaces-output').value = t.trim();
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
