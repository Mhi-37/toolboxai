/**
 * timestamp-converter.js - Timestamp Unix ↔ Date
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    function pad(n) { return n < 10 ? '0' + n : n; }

    function tsToDate(ts) {
        var ms = ts < 1e12 ? ts * 1000 : ts;
        var d = new Date(ms);
        if (isNaN(d.getTime())) return null;
        return d.toLocaleString('fr-FR', {
            dateStyle: 'full',
            timeStyle: 'medium'
        }) + ' (UTC: ' + d.toISOString() + ')';
    }

    function dateToTs(d) {
        var t = d.getTime();
        return { s: Math.floor(t / 1000), ms: t };
    }

    function init() {
        var input = document.getElementById('ts-input');
        var dateInput = document.getElementById('ts-datetime');
        var toDateBtn = document.getElementById('ts-to-date');
        var toTsBtn = document.getElementById('ts-to-timestamp');
        var nowBtn = document.getElementById('ts-now');

        toDateBtn.addEventListener('click', function () {
            var val = input.value.trim();
            var ts = parseInt(val, 10);
            var result = document.getElementById('ts-date-result');
            var output = document.getElementById('ts-date-output');
            if (!result || !output) return;
            if (isNaN(ts) || val === '') {
                result.style.display = 'block';
                output.textContent = 'Timestamp invalide';
                return;
            }
            var str = tsToDate(ts);
            result.style.display = 'block';
            output.textContent = str || 'Date invalide';
        });

        toTsBtn.addEventListener('click', function () {
            var val = dateInput.value;
            var result = document.getElementById('ts-ts-result');
            var sOut = document.getElementById('ts-ts-output');
            var msOut = document.getElementById('ts-ms-output');
            if (!result || !sOut || !msOut) return;
            if (!val) {
                result.style.display = 'block';
                sOut.textContent = msOut.textContent = '-';
                return;
            }
            var d = new Date(val);
            var t = dateToTs(d);
            result.style.display = 'block';
            sOut.textContent = t.s;
            msOut.textContent = t.ms;
        });

        nowBtn.addEventListener('click', function () {
            var now = new Date();
            var t = dateToTs(now);
            input.value = t.s;
            var y = now.getFullYear();
            var m = pad(now.getMonth() + 1);
            var d = pad(now.getDate());
            var h = pad(now.getHours());
            var min = pad(now.getMinutes());
            dateInput.value = y + '-' + m + '-' + d + 'T' + h + ':' + min;
            document.getElementById('ts-date-result').style.display = 'block';
            document.getElementById('ts-date-output').textContent = tsToDate(t.s);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
