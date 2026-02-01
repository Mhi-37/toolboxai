(function () {
    'use strict';
    function init() {
        document.getElementById('trim-btn').addEventListener('click', function () {
            var t = document.getElementById('trim-input').value;
            document.getElementById('trim-out').value = t.split('\n').map(function (l) { return l.trim(); }).join('\n').trim();
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
