(function () {
    'use strict';
    var chars = { alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', num: '0123456789' };
    function init() {
        document.getElementById('rs-gen').addEventListener('click', function () {
            var len = Math.min(256, Math.max(1, parseInt(document.getElementById('rs-len').value, 10) || 16));
            var pool = '';
            if (document.getElementById('rs-alpha').checked) pool += chars.alpha;
            if (document.getElementById('rs-num').checked) pool += chars.num;
            if (!pool) pool = chars.alpha;
            var s = '';
            for (var i = 0; i < len; i++) s += pool[Math.floor(Math.random() * pool.length)];
            document.getElementById('rs-out').value = s;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
