/**
 * json-formatter.js - Formateur et validateur JSON
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    function showResult(text) {
        const result = document.getElementById('json-result');
        const error = document.getElementById('json-error');
        const output = document.getElementById('json-output');
        if (result && error && output) {
            result.style.display = 'block';
            error.style.display = 'none';
            output.textContent = text;
        }
    }

    function showError(msg) {
        const result = document.getElementById('json-result');
        const error = document.getElementById('json-error');
        const output = document.getElementById('json-output');
        if (result && error && output) {
            result.style.display = 'none';
            error.style.display = 'block';
            error.textContent = 'Erreur : ' + msg;
        }
    }

    function formatJSON() {
        const input = document.getElementById('json-input');
        const indentEl = document.getElementById('json-indent');
        if (!input) return;
        try {
            const parsed = JSON.parse(input.value);
            const indent = Math.max(0, Math.min(8, parseInt(indentEl.value, 10) || 2));
            const formatted = JSON.stringify(parsed, null, indent);
            showResult(formatted);
        } catch (e) {
            showError(e.message);
        }
    }

    function minifyJSON() {
        const input = document.getElementById('json-input');
        if (!input) return;
        try {
            const parsed = JSON.parse(input.value);
            showResult(JSON.stringify(parsed));
        } catch (e) {
            showError(e.message);
        }
    }

    function copyJSON() {
        const output = document.getElementById('json-output');
        const result = document.getElementById('json-result');
        if (!output || !result || result.style.display === 'none') return;
        const text = output.textContent;
        if (!text) return;
        navigator.clipboard.writeText(text).then(function () {
            const btn = document.getElementById('json-copy');
            if (btn) {
                var orig = btn.textContent;
                btn.textContent = 'Copié !';
                setTimeout(function () { btn.textContent = orig; }, 2000);
            }
        });
    }

    function init() {
        document.getElementById('json-format')?.addEventListener('click', formatJSON);
        document.getElementById('json-minify')?.addEventListener('click', minifyJSON);
        document.getElementById('json-copy')?.addEventListener('click', copyJSON);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
