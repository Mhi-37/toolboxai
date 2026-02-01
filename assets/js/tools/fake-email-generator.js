/**
 * fake-email-generator.js - Emails de test
 */
(function () {
    'use strict';
    var prefixes = ['user','test','demo','contact','info','admin','support','dev'];
    function init() {
        document.getElementById('email-gen').addEventListener('click', function () {
            var domain = document.getElementById('email-domain').value || 'example.com';
            var n = Math.min(50, Math.max(1, parseInt(document.getElementById('email-count').value, 10) || 5));
            var out = [];
            for (var i = 0; i < n; i++) {
                var p = prefixes[i % prefixes.length] + (n > 1 ? (i + 1) : '');
                out.push(p + '@' + domain.replace(/@/g, ''));
            }
            document.getElementById('email-output').value = out.join('\n');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
