/**
 * coin-flip.js - Pile ou Face
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('coin-btn').addEventListener('click', function () {
            document.getElementById('coin-display').textContent = Math.random() < 0.5 ? 'Pile' : 'Face';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
