/**
 * case-converter.js - Conversion de casse (upper, lower, title, camel, snake, kebab)
 */
(function () {
    'use strict';
    var fns = {
        upper: function (s) { return s.toUpperCase(); },
        lower: function (s) { return s.toLowerCase(); },
        title: function (s) { return s.toLowerCase().replace(/\b\w/g, function (c) { return c.toUpperCase(); }); },
        camel: function (s) { var a = s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' '); return a[0] + a.slice(1).map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(''); },
        snake: function (s) { return s.replace(/\s+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(); },
        kebab: function (s) { return s.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); }
    };
    function init() {
        var inp = document.getElementById('case-input');
        var out = document.getElementById('case-output');
        document.querySelectorAll('[data-case]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var t = inp.value;
                out.value = t ? fns[btn.dataset.case](t) : '';
            });
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
