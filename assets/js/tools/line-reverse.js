(function () {
    'use strict';
    function init() {
        document.getElementById('lr-btn').addEventListener('click', function () {
            var lines = document.getElementById('lr-input').value.split('\n');
            document.getElementById('lr-out').value = lines.reverse().join('\n');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
