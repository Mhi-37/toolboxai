(function () {
    'use strict';
    var enc = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' };
    function escapeHtml(s) { return s.replace(/[&<>"']/g, function (c) { return enc[c]; }); }
    function unescapeHtml(s) {
        var d = document.createElement('textarea');
        d.innerHTML = s;
        return d.value;
    }
    function init() {
        var inp = document.getElementById('esc-input');
        var out = document.getElementById('esc-out');
        document.getElementById('esc-enc').addEventListener('click', function () { out.value = escapeHtml(inp.value); });
        document.getElementById('esc-dec').addEventListener('click', function () { out.value = unescapeHtml(inp.value); });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
