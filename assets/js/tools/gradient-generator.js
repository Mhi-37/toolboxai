/**
 * gradient-generator.js - Génère CSS linear-gradient
 */
(function () {
    'use strict';
    function update() {
        var c1 = document.getElementById('g1').value;
        var c2 = document.getElementById('g2').value;
        var angle = document.getElementById('g-angle').value || 135;
        var css = 'linear-gradient(' + angle + 'deg, ' + c1 + ', ' + c2 + ')';
        document.getElementById('g-preview').style.background = css;
        document.getElementById('g-css').value = 'background: ' + css + ';';
    }
    function init() {
        ['g1', 'g2', 'g-angle'].forEach(function (id) {
            document.getElementById(id).addEventListener('input', update);
        });
        update();
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
