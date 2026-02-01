(function () {
    'use strict';
    function update() {
        var h = 'Fenêtre: ' + window.innerWidth + ' × ' + window.innerHeight + ' px<br>';
        h += 'Écran: ' + screen.width + ' × ' + screen.height + ' px';
        document.getElementById('ss-out').innerHTML = h;
    }
    function init() {
        update();
        window.addEventListener('resize', update);
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
