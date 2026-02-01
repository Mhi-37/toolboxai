/**
 * binary-converter.js - Binaire, décimal, hexadécimal
 */
(function () {
    'use strict';
    function update(from, val) {
        var n;
        try {
            if (from === 'bin') n = parseInt(val, 2);
            else if (from === 'hex') n = parseInt(val, 16);
            else n = parseInt(val, 10);
            if (isNaN(n)) return;
            document.getElementById('bin-input').value = n.toString(2);
            document.getElementById('dec-input').value = n.toString(10);
            document.getElementById('hex-input').value = n.toString(16).toUpperCase();
        } catch (e) {}
    }
    function init() {
        ['bin', 'dec', 'hex'].forEach(function (id) {
            var el = document.getElementById(id + '-input');
            el.addEventListener('input', function () { update(id, this.value); });
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
