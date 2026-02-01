(function () {
    'use strict';
    function init() {
        document.getElementById('jv-btn').addEventListener('click', function () {
            var out = document.getElementById('jv-out');
            try {
                JSON.parse(document.getElementById('jv-in').value);
                out.value = 'JSON valide';
            } catch (e) {
                out.value = 'Erreur: ' + e.message;
            }
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
