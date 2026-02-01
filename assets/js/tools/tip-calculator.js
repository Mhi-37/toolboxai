/**
 * tip-calculator.js - Pourboire
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('tip-calc').addEventListener('click', function () {
            var amt = parseFloat(document.getElementById('tip-amount').value) || 0;
            var pct = parseFloat(document.getElementById('tip-pct').value) || 0;
            var people = Math.max(1, parseInt(document.getElementById('tip-people').value, 10) || 1);
            var tip = amt * pct / 100;
            var total = amt + tip;
            document.getElementById('tip-tip').textContent = tip.toFixed(2);
            document.getElementById('tip-total').textContent = total.toFixed(2);
            document.getElementById('tip-per').textContent = (total / people).toFixed(2);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
