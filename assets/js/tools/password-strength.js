(function () {
    'use strict';
    var colors = ['#dc2626','#ea580c','#ca8a04','#65a30d','#16a34a'];
    var labels = ['Très faible','Faible','Moyen','Fort','Très fort'];
    function strength(p) {
        if (!p) return 0;
        var s = 0;
        if (p.length >= 8) s++;
        if (p.length >= 12) s++;
        if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
        if (/\d/.test(p)) s++;
        if (/[^a-zA-Z0-9]/.test(p)) s++;
        return Math.min(4, Math.floor(s / 1.25));
    }
    function init() {
        var inp = document.getElementById('ps-input');
        var fill = document.getElementById('ps-fill');
        var label = document.getElementById('ps-label');
        function update() {
            var s = strength(inp.value);
            fill.style.width = (s + 1) * 20 + '%';
            fill.style.background = colors[s];
            label.textContent = inp.value ? labels[s] : '';
        }
        inp.addEventListener('input', update);
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
