/**
 * base64.js - Encodeur / Décodeur Base64
 * Vanilla JS, utilise btoa/atob (UTF-8 géré via encodeURIComponent)
 */
(function () {
    'use strict';

    function encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    function decode(str) {
        try {
            return decodeURIComponent(escape(atob(str)));
        } catch (e) {
            throw new Error('Base64 invalide');
        }
    }

    function isBase64Like(str) {
        const trimmed = str.trim();
        if (!trimmed) return false;
        return /^[A-Za-z0-9+/]+=*$/.test(trimmed) && trimmed.length % 4 === 0;
    }

    function showResult(text) {
        var result = document.getElementById('base64-result');
        var error = document.getElementById('base64-error');
        var output = document.getElementById('base64-output');
        if (result && error && output) {
            result.style.display = 'block';
            error.style.display = 'none';
            output.textContent = text;
        }
    }

    function showError(msg) {
        var result = document.getElementById('base64-result');
        var error = document.getElementById('base64-error');
        if (result && error) {
            result.style.display = 'none';
            error.style.display = 'block';
            error.textContent = 'Erreur : ' + msg;
        }
    }

    function doEncode() {
        var input = document.getElementById('base64-input');
        if (!input) return;
        try {
            showResult(encode(input.value));
        } catch (e) {
            showError(e.message);
        }
    }

    function doDecode() {
        var input = document.getElementById('base64-input');
        if (!input) return;
        try {
            showResult(decode(input.value.trim()));
        } catch (e) {
            showError(e.message);
        }
    }

    function copyResult() {
        var output = document.getElementById('base64-output');
        var result = document.getElementById('base64-result');
        if (!output || !result || result.style.display === 'none') return;
        var text = output.textContent;
        if (!text) return;
        navigator.clipboard.writeText(text).then(function () {
            var btn = document.getElementById('base64-copy');
            if (btn) { btn.textContent = 'Copié !'; setTimeout(function () { btn.textContent = 'Copier'; }, 2000); }
        });
    }

    function init() {
        document.getElementById('base64-encode')?.addEventListener('click', doEncode);
        document.getElementById('base64-decode')?.addEventListener('click', doDecode);
        document.getElementById('base64-copy')?.addEventListener('click', copyResult);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
