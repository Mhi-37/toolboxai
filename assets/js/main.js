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
        var base = (typeof window !== 'undefined' && window.location.pathname.indexOf('tools') !== -1) ? tool.url.replace(/^tools\//, '') : tool.url;
        link.href = base;
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

    function initBreadcrumbAndCanonical() {
        var bc = document.getElementById('breadcrumb-current');
        if (bc) {
            var h1 = document.querySelector('main h1');
            if (h1) bc.textContent = h1.textContent;
        }
        var cl = document.querySelector('link[rel="canonical"][id="canonical-link"]');
        if (cl && window.location && window.location.href) cl.href = window.location.origin + window.location.pathname;
        var slots = document.querySelectorAll('.tool-page .ad-slot');
        if (slots[0] && !slots[0].classList.contains('ad-top')) slots[0].classList.add('ad-top');
        if (slots[1] && !slots[1].classList.contains('ad-middle')) slots[1].classList.add('ad-middle');
    }

    function init() {
        renderToolsGrid();
        initMobileNav();
        initBreadcrumbAndCanonical();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
