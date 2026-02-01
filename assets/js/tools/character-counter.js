(function () {
    'use strict';
    function init() {
        var inp = document.getElementById('cc-input');
        function update() {
            var t = inp.value;
            document.getElementById('cc-chars').textContent = t.length;
            document.getElementById('cc-no').textContent = t.replace(/\s/g, '').length;
            document.getElementById('cc-tw').textContent = t.length;
            document.getElementById('cc-sms').textContent = t.length;
        }
        inp.addEventListener('input', update);
        update();
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
