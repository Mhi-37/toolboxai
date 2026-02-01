/**
 * html-entities.js - Encode/décode entités HTML
 */
(function () {
    'use strict';
    function encode(s) {
        return s.replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function decode(s) {
        var txt = document.createElement('textarea');
        txt.innerHTML = s;
        return txt.value;
    }
    function init() {
        var inp = document.getElementById('htmlent-input');
        var out = document.getElementById('htmlent-output');
        document.getElementById('htmlent-enc').addEventListener('click', function () { out.value = encode(inp.value); });
        document.getElementById('htmlent-dec').addEventListener('click', function () { out.value = decode(inp.value); });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
