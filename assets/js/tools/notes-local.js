/**
 * notes-local.js - Notes avec localStorage
 */
(function () {
    'use strict';
    var KEY = 'toolboxai_notes';
    function init() {
        var area = document.getElementById('notes-area');
        area.value = localStorage.getItem(KEY) || '';
        area.addEventListener('input', function () {
            localStorage.setItem(KEY, area.value);
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
