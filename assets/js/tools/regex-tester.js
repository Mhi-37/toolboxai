/**
 * regex-tester.js - Test de regex
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('re-btn').addEventListener('click', function () {
            var pat = document.getElementById('re-pattern').value;
            var txt = document.getElementById('re-text').value;
            var out = document.getElementById('re-out');
            try {
                var flags = (document.getElementById('re-global').checked ? 'g' : '') + (document.getElementById('re-insensitive').checked ? 'i' : '');
                var re = new RegExp(pat, flags);
                var m = txt.match(re);
                out.value = m ? m.join('\n') : '(aucune correspondance)';
            } catch (e) {
                out.value = 'Erreur: ' + e.message;
            }
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
