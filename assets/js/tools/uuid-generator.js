/**
 * uuid-generator.js - Génère des UUID v4
 */
(function () {
    'use strict';
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 3 | 8);
            return v.toString(16);
        });
    }
    function init() {
        var out = document.getElementById('uuid-output');
        var count = document.getElementById('uuid-count');
        document.getElementById('uuid-gen').addEventListener('click', function () {
            var n = Math.min(100, Math.max(1, parseInt(count.value, 10) || 1));
            out.value = n === 1 ? uuid() : Array(n).fill().map(uuid).join('\n');
        });
        document.getElementById('uuid-copy').addEventListener('click', function () {
            if (!out.value) return;
            var btn = this;
            navigator.clipboard.writeText(out.value).then(function () {
                btn.textContent = 'Copié!'; setTimeout(function () { btn.textContent = 'Copier'; }, 1500);
            });
        });
        out.value = uuid();
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
