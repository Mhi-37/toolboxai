/**
 * url-encoder.js - Encode/décode URL (percent-encoding)
 */
(function () {
    'use strict';
    function init() {
        var inp = document.getElementById('url-input');
        var out = document.getElementById('url-output');
        document.getElementById('url-encode').addEventListener('click', function () {
            try { out.value = encodeURIComponent(inp.value); } catch (e) { out.value = ''; }
        });
        document.getElementById('url-decode').addEventListener('click', function () {
            try { out.value = decodeURIComponent(inp.value.replace(/\+/g, ' ')); } catch (e) { out.value = 'Erreur: URL invalide'; }
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
