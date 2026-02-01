/**
 * sort-lines.js - Tri de lignes (asc, desc, shuffle)
 */
(function () {
    'use strict';
    function init() {
        var inp = document.getElementById('sort-input');
        document.querySelectorAll('[data-sort]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lines = inp.value.split('\n').filter(function (l) { return l.trim(); });
                var mode = btn.dataset.sort;
                if (mode === 'asc') lines.sort();
                else if (mode === 'desc') lines.sort().reverse();
                else { for (var i = lines.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = lines[i]; lines[i] = lines[j]; lines[j] = t; } }
                inp.value = lines.join('\n');
            });
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
