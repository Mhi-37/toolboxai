(function () {
    'use strict';
    function toCSV(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return '';
        var keys = Object.keys(arr[0]);
        var row = function (o) { return keys.map(function (k) { var v = String(o[k] || ''); return v.indexOf(',') >= 0 ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(','); };
        return [keys.join(','), arr.map(row).join('\n')].join('\n');
    }
    function init() {
        document.getElementById('j2c-btn').addEventListener('click', function () {
            try {
                var arr = JSON.parse(document.getElementById('j2c-input').value);
                document.getElementById('j2c-out').value = toCSV(arr);
            } catch (e) {
                document.getElementById('j2c-out').value = 'Erreur: ' + e.message;
            }
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
