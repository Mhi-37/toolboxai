(function () {
    'use strict';
    function shuffle(a) {
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    function init() {
        document.getElementById('lr-btn').addEventListener('click', function () {
            var el = document.getElementById('lr-in');
            var a = el.value.split('\n').filter(Boolean);
            shuffle(a);
            el.value = a.join('\n');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
