/**
 * jwt-decoder.js - Décode header et payload JWT (base64url)
 */
(function () {
    'use strict';
    function b64Decode(s) {
        try {
            s = s.replace(/-/g, '+').replace(/_/g, '/');
            while (s.length % 4) s += '=';
            return JSON.parse(decodeURIComponent(escape(atob(s))));
        } catch (e) { return null; }
    }
    function init() {
        document.getElementById('jwt-btn').addEventListener('click', function () {
            var t = document.getElementById('jwt-input').value.trim().split('.');
            var h = t[0] ? b64Decode(t[0]) : null;
            var p = t[1] ? b64Decode(t[1]) : null;
            document.getElementById('jwt-header').textContent = h ? JSON.stringify(h, null, 2) : '-';
            document.getElementById('jwt-payload').textContent = p ? JSON.stringify(p, null, 2) : '-';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
