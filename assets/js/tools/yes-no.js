/**
 * yes-no.js - Oui ou Non aléatoire
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('yesno-btn').addEventListener('click', function () {
            document.getElementById('yesno-display').textContent = Math.random() < 0.5 ? 'Oui' : 'Non';
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
