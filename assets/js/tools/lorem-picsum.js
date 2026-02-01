(function () {
    'use strict';
    function init() {
        document.getElementById('lp-gen').addEventListener('click', function () {
            var w = document.getElementById('lp-w').value || 400;
            var h = document.getElementById('lp-h').value || 300;
            var url = 'https://picsum.photos/' + w + '/' + h;
            document.getElementById('lp-url').value = url;
            document.getElementById('lp-img').src = url;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
