/**
 * lorem-ipsum.js - Générateur de texte Lorem Ipsum
 * Vanilla JS, sans dépendance
 */
(function () {
    'use strict';

    var WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

    function pickWord() {
        return WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    function sentence() {
        var len = 5 + Math.floor(Math.random() * 10);
        var s = [];
        for (var i = 0; i < len; i++) s.push(pickWord());
        s[0] = s[0].charAt(0).toUpperCase() + s[0].slice(1);
        return s.join(' ') + '.';
    }

    function paragraph() {
        var len = 3 + Math.floor(Math.random() * 4);
        var p = [];
        for (var i = 0; i < len; i++) p.push(sentence());
        return p.join(' ');
    }

    function generate(type, count) {
        var out = [];
        count = Math.max(1, Math.min(50, count || 3));
        if (type === 'words') {
            for (var w = 0; w < count; w++) out.push(pickWord());
            return out.join(' ');
        }
        if (type === 'sentences') {
            for (var s = 0; s < count; s++) out.push(sentence());
            return out.join(' ');
        }
        for (var i = 0; i < count; i++) out.push(paragraph());
        return out.join('\n\n');
    }

    function init() {
        var form = document.getElementById('lorem-form');
        var result = document.getElementById('lorem-result');
        var output = document.getElementById('lorem-output');
        var copyBtn = document.getElementById('lorem-copy');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var type = document.getElementById('lorem-type').value;
            var count = parseInt(document.getElementById('lorem-count').value, 10) || 3;
            output.textContent = generate(type, count);
            result.style.display = 'block';
        });

        copyBtn.addEventListener('click', function () {
            var text = output.textContent;
            if (!text) return;
            navigator.clipboard.writeText(text).then(function () {
                copyBtn.textContent = 'Copié !';
                setTimeout(function () { copyBtn.textContent = 'Copier'; }, 2000);
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
