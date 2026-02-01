(function () {
    'use strict';
    var id = null, remain = 0;
    function fmt(s) {
        var m = Math.floor(s / 60), sec = Math.floor(s % 60);
        return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
    }
    function tick() {
        remain--;
        document.getElementById('cd-display').textContent = fmt(remain);
        if (remain <= 0) {
            clearInterval(id);
            id = null;
            document.getElementById('cd-display').textContent = 'Terminé !';
            return;
        }
    }
    function init() {
        document.getElementById('cd-start').addEventListener('click', function () {
            if (id) return;
            var min = parseInt(document.getElementById('cd-min').value, 10) || 0;
            var sec = parseInt(document.getElementById('cd-sec').value, 10) || 0;
            remain = min * 60 + sec;
            if (remain <= 0) return;
            document.getElementById('cd-display').textContent = fmt(remain);
            id = setInterval(tick, 1000);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
