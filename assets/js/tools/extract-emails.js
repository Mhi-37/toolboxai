(function () {
    'use strict';
    var re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    function init() {
        document.getElementById('em-btn').addEventListener('click', function () {
            var m = document.getElementById('em-input').value.match(re) || [];
            var uniq = []; m.forEach(function (e) { if (uniq.indexOf(e) === -1) uniq.push(e); });
            document.getElementById('em-out').value = uniq.join('\n');
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
