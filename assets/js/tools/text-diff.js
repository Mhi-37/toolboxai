/**
 * text-diff.js - Comparaison ligne par ligne
 */
(function () {
    'use strict';
    function diff(a, b) {
        var la = a.split('\n'), lb = b.split('\n');
        var out = [], i = 0, j = 0;
        while (i < la.length || j < lb.length) {
            if (i < la.length && j < lb.length && la[i] === lb[j]) {
                out.push('  ' + la[i]);
                i++; j++;
            } else if (j < lb.length && (i >= la.length || lb.indexOf(la[i], j) === -1)) {
                out.push('+ ' + lb[j]);
                j++;
            } else if (i < la.length) {
                out.push('- ' + la[i]);
                i++;
            }
        }
        return out.join('\n') || '(aucune différence)';
    }
    function init() {
        document.getElementById('diff-btn').addEventListener('click', function () {
            document.getElementById('diff-output').textContent = diff(
                document.getElementById('diff-a').value,
                document.getElementById('diff-b').value
            );
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
