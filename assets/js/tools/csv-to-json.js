/**
 * csv-to-json.js - Conversion CSV simple vers JSON
 */
(function () {
    'use strict';
    function parseCSV(csv) {
        var lines = csv.trim().split('\n');
        if (lines.length < 2) return '[]';
        var headers = lines[0].split(',').map(function (h) { return h.trim(); });
        var out = [];
        for (var i = 1; i < lines.length; i++) {
            var vals = lines[i].split(',');
            var obj = {};
            headers.forEach(function (h, j) { obj[h] = (vals[j] || '').trim(); });
            out.push(obj);
        }
        return JSON.stringify(out, null, 2);
    }
    function init() {
        document.getElementById('csv-btn').addEventListener('click', function () {
            try {
                document.getElementById('csv-out').value = parseCSV(document.getElementById('csv-input').value);
            } catch (e) {
                document.getElementById('csv-out').value = 'Erreur: ' + e.message;
            }
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
