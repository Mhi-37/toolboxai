/**
 * age-calculator.js - Âge en années, mois, jours
 */
(function () {
    'use strict';
    function calc(birth, ref) {
        var b = new Date(birth), r = ref ? new Date(ref) : new Date();
        if (isNaN(b) || b > r) return 'Date invalide';
        var y = r.getFullYear() - b.getFullYear();
        var m = r.getMonth() - b.getMonth();
        var d = r.getDate() - b.getDate();
        if (d < 0) { m--; d += new Date(r.getFullYear(), r.getMonth(), 0).getDate(); }
        if (m < 0) { y--; m += 12; }
        return y + ' ans, ' + m + ' mois, ' + d + ' jours';
    }
    function init() {
        document.getElementById('age-calc').addEventListener('click', function () {
            var birth = document.getElementById('age-birth').value;
            var ref = document.getElementById('age-ref').value;
            document.getElementById('age-result').value = birth ? calc(birth, ref || null) : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
