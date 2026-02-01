(function () {
    'use strict';
    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }
    function init() {
        document.getElementById('ws-btn').addEventListener('click', function () {
            var words = document.getElementById('ws-input').value.trim().split(/\s+/);
            document.getElementById('ws-out').value = shuffle(words).join(' ');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
