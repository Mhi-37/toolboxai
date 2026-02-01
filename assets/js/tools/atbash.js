(function () {
    'use strict';
    function atbash(s) {
        return s.replace(/[a-zA-Z]/g, function (c) {
            var base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode(90 - (c.charCodeAt(0) - 65) + (c <= 'Z' ? 0 : 32));
        });
    }
    function init() {
        document.getElementById('atb-btn').addEventListener('click', function () {
            var s = document.getElementById('atb-input').value;
            var r = '';
            for (var i = 0; i < s.length; i++) {
                var c = s[i];
                if (c >= 'A' && c <= 'Z') r += String.fromCharCode(90 - (c.charCodeAt(0) - 65));
                else if (c >= 'a' && c <= 'z') r += String.fromCharCode(122 - (c.charCodeAt(0) - 97));
                else r += c;
            }
            document.getElementById('atb-out').value = r;
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
