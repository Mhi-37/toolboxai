/**
 * hash-generator.js - SHA-256/SHA-1 via Web Crypto API
 */
(function () {
    'use strict';
    async function hash(text, algo) {
        var enc = new TextEncoder();
        var data = enc.encode(text);
        var buf = await crypto.subtle.digest(algo, data);
        return Array.from(new Uint8Array(buf)).map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    }
    function init() {
        document.getElementById('hash-btn').addEventListener('click', function () {
            var inp = document.getElementById('hash-input').value;
            var algo = document.getElementById('hash-algo').value;
            var out = document.getElementById('hash-output');
            if (!inp) { out.value = ''; return; }
            hash(inp, algo).then(function (h) { out.value = h; }).catch(function () { out.value = 'Erreur'; });
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
