/**
 * meta-tags-generator.js - Génère le code HTML des meta
 */
(function () {
    'use strict';
    function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    function init() {
        document.getElementById('meta-gen').addEventListener('click', function () {
            var t = document.getElementById('meta-title').value || 'Titre';
            var d = document.getElementById('meta-desc').value || 'Description';
            var u = document.getElementById('meta-url').value || 'https://example.com';
            var html = '<title>' + esc(t) + '</title>\n';
            html += '<meta name="description" content="' + esc(d) + '">\n';
            html += '<meta property="og:title" content="' + esc(t) + '">\n';
            html += '<meta property="og:description" content="' + esc(d) + '">\n';
            html += '<meta property="og:url" content="' + esc(u) + '">\n';
            html += '<meta name="twitter:card" content="summary">\n';
            html += '<meta name="twitter:title" content="' + esc(t) + '">\n';
            html += '<meta name="twitter:description" content="' + esc(d) + '">';
            document.getElementById('meta-out').value = html;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
