/**
 * slug-generator.js - Générateur de slug URL
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    var ACCENTS = { 'à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','ñ':'n','ç':'c','œ':'oe','æ':'ae' };

    function slugify(text, lowercase) {
        if (!text) return '';
        var s = String(text);
        Object.keys(ACCENTS).forEach(function (k) {
            s = s.replace(new RegExp(k, 'gi'), ACCENTS[k]);
        });
        s = s.replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return lowercase !== false ? s.toLowerCase() : s;
    }

    function init() {
        var form = document.getElementById('slug-form');
        var input = document.getElementById('slug-input');
        var output = document.getElementById('slug-output');
        var result = document.getElementById('slug-result');
        var lower = document.getElementById('slug-lowercase');
        var copyBtn = document.getElementById('slug-copy');

        function update() {
            var text = input.value.trim();
            if (!text) { result.style.display = 'none'; return; }
            var slug = slugify(text, lower.checked);
            output.value = slug;
            result.style.display = 'block';
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            update();
        });

        input.addEventListener('input', update);
        lower.addEventListener('change', update);

        copyBtn.addEventListener('click', function () {
            var t = output.value;
            if (!t) return;
            navigator.clipboard.writeText(t).then(function () {
                copyBtn.textContent = 'Copié !';
                setTimeout(function () { copyBtn.textContent = 'Copier'; }, 2000);
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
