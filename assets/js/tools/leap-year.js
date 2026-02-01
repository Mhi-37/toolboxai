/**
 * leap-year.js - Année bissextile
 */
(function () {
    'use strict';
    function isLeap(y) {
        return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    }
    function init() {
        document.getElementById('leap-btn').addEventListener('click', function () {
            var y = parseInt(document.getElementById('leap-year').value, 10);
            document.getElementById('leap-out').value = !isNaN(y) ? (isLeap(y) ? y + ' est bissextile' : y + ' n\'est pas bissextile') : '';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
