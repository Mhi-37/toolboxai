(function () {
    'use strict';
    function init() {
        var ua = navigator.userAgent;
        document.getElementById('ua-out').value = ua;
        var mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
        document.getElementById('ua-info').innerHTML = 'Mobile: ' + (mobile ? 'Oui' : 'Non') + '<br>Langue: ' + navigator.language + '<br>Plateforme: ' + (navigator.platform || '-');
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
