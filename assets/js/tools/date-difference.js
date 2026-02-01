(function () {
    'use strict';
    function init() {
        document.getElementById('dd-btn').addEventListener('click', function () {
            var a = document.getElementById('dd-a').value;
            var b = document.getElementById('dd-b').value;
            if (!a || !b) { document.getElementById('dd-out').value = ''; return; }
            var d = (new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24);
            document.getElementById('dd-out').value = Math.floor(d) + ' jours';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
