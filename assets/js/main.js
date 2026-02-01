/**
 * main.js - Point d'entrée ToolBoxAI
 * Génère les cartes outils, menu mobile
 */

(function () {
    'use strict';

    if (typeof TOOLS === 'undefined') {
        console.error('data.js doit être chargé avant main.js');
        return;
    }

    function renderToolsGrid() {
        const grid = document.getElementById('tools-grid');
        if (!grid) return;

        grid.innerHTML = '';
        TOOLS.forEach(function (tool, i) {
            const card = createToolCard(tool, i);
            grid.appendChild(card);
        });
    }

    function createToolCard(tool, index) {
        const link = document.createElement('a');
        link.href = tool.url;
        link.className = 'tool-card';
        link.setAttribute('aria-label', 'Ouvrir ' + tool.name);

        const icon = tool.icon || '⚙️';
        const category = tool.category || 'Outil';

        link.innerHTML = [
            '<div class="tool-card__icon">' + escapeHtml(icon) + '</div>',
            '<span class="tool-card__category">' + escapeHtml(category) + '</span>',
            '<h3 class="tool-card__title">' + escapeHtml(tool.name) + '</h3>',
            '<p class="tool-card__desc">' + escapeHtml(tool.description) + '</p>',
            '<span class="tool-card__arrow">Utiliser &rarr;</span>'
        ].join('');

        return link;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function initMobileNav() {
        const toggle = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.contains('nav--open');
            nav.classList.toggle('nav--open', !isOpen);
            toggle.setAttribute('aria-expanded', !isOpen);
        });

        nav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                nav.classList.remove('nav--open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function init() {
        renderToolsGrid();
        initMobileNav();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
