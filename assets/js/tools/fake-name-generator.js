/**
 * fake-name-generator.js - Noms fictifs aléatoires
 */
(function () {
    'use strict';
    var prenoms = ['Jean','Marie','Pierre','Sophie','Nicolas','Isabelle','François','Nathalie','Patrick','Sylvie','Laurent','Catherine','Michel','Christine','Philippe','Martine'];
    var noms = ['Martin','Bernard','Dubois','Thomas','Robert','Richard','Petit','Durand','Leroy','Moreau','Simon','Laurent','Lefebvre','Michel','Garcia','David'];
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function init() {
        document.getElementById('name-gen').addEventListener('click', function () {
            var n = Math.min(50, Math.max(1, parseInt(document.getElementById('name-count').value, 10) || 5));
            var out = [];
            for (var i = 0; i < n; i++) out.push(pick(prenoms) + ' ' + pick(noms));
            document.getElementById('name-output').value = out.join('\n');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
