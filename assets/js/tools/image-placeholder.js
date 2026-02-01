/**
 * image-placeholder.js - URL placehold.co
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('img-gen').addEventListener('click', function () {
            var w = document.getElementById('img-w').value || 400;
            var h = document.getElementById('img-h').value || 300;
            var t = document.getElementById('img-text').value || (w + 'x' + h);
            var url = 'https://placehold.co/' + w + 'x' + h + '?text=' + encodeURIComponent(t);
            document.getElementById('img-url').value = url;
            document.getElementById('img-prev').src = url;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
