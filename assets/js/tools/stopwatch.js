(function () {
    'use strict';
    var start = 0, elapsed = 0, id = null;
    function fmt(ms) {
        var h = Math.floor(ms / 3600000);
        var m = Math.floor((ms % 3600000) / 60000);
        var s = Math.floor((ms % 60000) / 1000);
        var d = Math.floor((ms % 1000) / 100);
        return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '.' + d;
    }
    function tick() {
        document.getElementById('sw-display').textContent = fmt(elapsed + (performance.now() - start));
        id = requestAnimationFrame(tick);
    }
    function init() {
        document.getElementById('sw-start').addEventListener('click', function () {
            if (id) return;
            start = performance.now();
            tick();
        });
        document.getElementById('sw-pause').addEventListener('click', function () {
            if (id) {
                cancelAnimationFrame(id);
                id = null;
                elapsed += performance.now() - start;
            }
        });
        document.getElementById('sw-reset').addEventListener('click', function () {
            if (id) cancelAnimationFrame(id);
            id = null;
            start = 0;
            elapsed = 0;
            document.getElementById('sw-display').textContent = '00:00:00.0';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
