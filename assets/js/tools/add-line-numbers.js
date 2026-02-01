/**
 * add-line-numbers.js
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('ln-btn').addEventListener('click', function () {
            var lines = document.getElementById('ln-input').value.split('\n');
            var out = lines.map(function (l, i) { return (i + 1) + ' | ' + l; }).join('\n');
            document.getElementById('ln-out').value = out;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
