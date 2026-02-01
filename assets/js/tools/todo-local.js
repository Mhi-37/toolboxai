(function () {
    'use strict';
    var KEY = 'toolboxai_todo';
    function load() {
        try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
    }
    function save(arr) { localStorage.setItem(KEY, JSON.stringify(arr)); }
    function render() {
        var arr = load();
        var ul = document.getElementById('todo-list');
        ul.innerHTML = arr.map(function (t, i) {
            return '<li style="padding:0.5rem 0;border-bottom:1px solid var(--color-border);">' +
                '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' data-i="' + i + '"> ' +
                '<span ' + (t.done ? 'style="text-decoration:line-through"' : '') + '>' + (t.text || '') + '</span> ' +
                '<button type="button" data-i="' + i + '" style="margin-left:0.5rem;">✕</button></li>';
        }).join('');
        ul.querySelectorAll('input[type=checkbox]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var arr = load();
                var i = parseInt(this.dataset.i, 10);
                arr[i].done = this.checked;
                save(arr);
                render();
            });
        });
        ul.querySelectorAll('button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var arr = load();
                arr.splice(parseInt(this.dataset.i, 10), 1);
                save(arr);
                render();
            });
        });
    }
    function init() {
        document.getElementById('todo-add').addEventListener('click', function () {
            var inp = document.getElementById('todo-input');
            var t = inp.value.trim();
            if (!t) return;
            var arr = load();
            arr.push({ text: t, done: false });
            save(arr);
            inp.value = '';
            render();
        });
        document.getElementById('todo-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') document.getElementById('todo-add').click();
        });
        render();
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
