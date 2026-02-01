(function () {
    'use strict';
    function init() {
        document.getElementById('int-btn').addEventListener('click', function () {
            var c = parseFloat(document.getElementById('int-cap').value) || 0;
            var t = parseFloat(document.getElementById('int-rate').value) || 0;
            var n = parseFloat(document.getElementById('int-years').value) || 0;
            document.getElementById('int-out').value = (c * t / 100 * n).toFixed(2) + ' €';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
