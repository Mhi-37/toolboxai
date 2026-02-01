(function () {
    'use strict';
    function minify(css) {
        return css
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    function init() {
        document.getElementById('css-btn').addEventListener('click', function () {
            document.getElementById('css-out').value = minify(document.getElementById('css-in').value);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
