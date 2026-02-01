(function () {
    'use strict';
    function toBin(s) {
        return s.split('').map(function (c) {
            var b = c.charCodeAt(0).toString(2);
            return '00000000'.slice(b.length) + b;
        }).join(' ');
    }
    function fromBin(s) {
        try {
            return s.trim().split(/\s+/).map(function (b) {
                return String.fromCharCode(parseInt(b, 2));
            }).join('');
        } catch (e) { return 'Erreur'; }
    }
    function init() {
        var inp = document.getElementById('t2b-input');
        var out = document.getElementById('t2b-out');
        document.getElementById('t2b-enc').addEventListener('click', function () { out.value = toBin(inp.value); });
        document.getElementById('t2b-dec').addEventListener('click', function () { out.value = fromBin(inp.value); });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
