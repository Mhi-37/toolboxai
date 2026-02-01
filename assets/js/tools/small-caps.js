(function () {
    'use strict';
    var map = { 'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ','h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ','s':'ꜱ','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ' };
    function init() {
        document.getElementById('sc-btn').addEventListener('click', function () {
            var t = document.getElementById('sc-input').value.toLowerCase();
            document.getElementById('sc-out').value = t.replace(/[a-z]/g, function (c) { return map[c] || c; });
        });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
