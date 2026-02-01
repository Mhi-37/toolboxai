/**
 * morse-code.js - Encode/décode Morse
 */
(function () {
    'use strict';
    var morse = { A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.' };
    var rev = {}; Object.keys(morse).forEach(function (k) { rev[morse[k]] = k; });
    function encode(s) { return s.toUpperCase().split('').map(function (c) { return morse[c] || (c === ' ' ? '/' : ''); }).join(' ').replace(/ \/ /g, ' / '); }
    function decode(s) { return s.split('/').map(function (w) { return w.trim().split(' ').map(function (c) { return rev[c] || ''; }).join(''); }).join(' '); }
    function init() {
        var inp = document.getElementById('morse-input');
        var out = document.getElementById('morse-output');
        document.getElementById('morse-encode').addEventListener('click', function () { out.value = encode(inp.value); });
        document.getElementById('morse-decode').addEventListener('click', function () { out.value = decode(inp.value); });
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
