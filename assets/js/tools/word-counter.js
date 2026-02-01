/**
 * word-counter.js - Compteur de mots en temps réel
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    function countWords(text) {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).filter(Boolean).length;
    }

    function countChars(text) {
        return text.length;
    }

    function countCharsNoSpaces(text) {
        return text.replace(/\s/g, '').length;
    }

    function countSentences(text) {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        const matches = trimmed.match(/[.!?]+/g);
        return matches ? matches.length : 1;
    }

    function countParagraphs(text) {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        const paras = trimmed.split(/\n\s*\n/).filter(function (p) { return p.trim(); });
        return paras.length || 1;
    }

    function updateStats(text) {
        document.getElementById('stat-words').textContent = countWords(text);
        document.getElementById('stat-chars').textContent = countChars(text);
        document.getElementById('stat-chars-no-spaces').textContent = countCharsNoSpaces(text);
        document.getElementById('stat-sentences').textContent = countSentences(text);
        document.getElementById('stat-paragraphs').textContent = countParagraphs(text);
    }

    function init() {
        const input = document.getElementById('word-counter-input');
        if (!input) return;
        input.addEventListener('input', function () {
            updateStats(this.value);
        });
        updateStats(input.value);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
