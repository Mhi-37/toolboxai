(function () {
    'use strict';
    function init() {
        document.getElementById('wr-btn').addEventListener('click', function () {
            var w = document.getElementById('wr-input').value.trim().split(/\s+/);
            document.getElementById('wr-out').value = w.reverse().join(' ');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
