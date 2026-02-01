/**
 * backward-text.js - Inverse les caractères
 */
(function () {
    'use strict';
    function init() {
        document.getElementById('back-btn').addEventListener('click', function () {
            document.getElementById('back-out').value = document.getElementById('back-input').value.split('').reverse().join('');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
