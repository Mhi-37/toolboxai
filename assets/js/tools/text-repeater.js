/**
 * text-repeater.js
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('rep-btn').addEventListener('click', function () {
            var t = document.getElementById('rep-text').value;
            var n = Math.min(1000, Math.max(1, parseInt(document.getElementById('rep-count').value, 10) || 1));
            var sep = document.getElementById('rep-sep').value;
            document.getElementById('rep-out').value = Array(n).fill(t).join(sep);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
