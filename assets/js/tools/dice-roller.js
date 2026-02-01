/**
 * dice-roller.js - Lance des dés (D6, D10, D20, D100)
 */
(function () {
    'use strict';
    function roll(sides, count) {
        var sum = 0, rolls = [];
        for (var i = 0; i < count; i++) {
            var r = 1 + Math.floor(Math.random() * sides);
            rolls.push(r);
            sum += r;
        }
        return { rolls: rolls, sum: sum };
    }
    function init() {
        document.getElementById('dice-roll').addEventListener('click', function () {
            var sides = parseInt(document.getElementById('dice-type').value, 10);
            var count = Math.min(20, Math.max(1, parseInt(document.getElementById('dice-count').value, 10) || 1));
            var r = roll(sides, count);
            document.getElementById('dice-output').value = count === 1 ? r.sum : r.rolls.join(' + ') + ' = ' + r.sum;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
