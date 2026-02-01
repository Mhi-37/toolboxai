(function () {
    'use strict';
    function getWeek(d) {
        d = new Date(d);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        var y = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - y) / 86400000) + 1) / 7);
    }
    function init() {
        document.getElementById('wn-date').valueAsDate = new Date();
        document.getElementById('wn-btn').addEventListener('click', function () {
            var v = document.getElementById('wn-date').value;
            document.getElementById('wn-out').value = v ? 'Semaine ' + getWeek(v) : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
