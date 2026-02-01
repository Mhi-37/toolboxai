/**
 * duplicate-remover.js - Supprime lignes en double
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('dup-btn').addEventListener('click', function () {
            var lines = document.getElementById('dup-input').value.split('\n');
            var seen = {}, out = [];
            lines.forEach(function (l) {
                if (!seen[l]) { seen[l] = true; out.push(l); }
            });
            document.getElementById('dup-out').value = out.join('\n');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
