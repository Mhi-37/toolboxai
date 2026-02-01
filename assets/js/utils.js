/**
 * utils.js - Fonctions helpers communes ToolBoxAI
 * 
 * Utilitaires réutilisables dans tout le site.
 */

/**
 * Crée un élément DOM avec des attributs optionnels
 * @param {string} tag - Balise HTML (div, a, p, etc.)
 * @param {Object} attrs - Attributs { class, href, id, ... }
 * @param {string|Node|Node[]} content - Contenu texte ou noeuds enfants
 * @returns {HTMLElement}
 */
function createElement(tag, attrs = {}, content = null) {
    const el = document.createElement(tag);
    Object.keys(attrs).forEach(key => {
        if (key === 'className') {
            el.className = attrs[key];
        } else if (key === 'dataset') {
            Object.assign(el.dataset, attrs[key]);
        } else if (key.startsWith('on') && typeof attrs[key] === 'function') {
            el.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        } else if (key !== 'style' && typeof attrs[key] === 'object') {
            // skip complex objects
        } else {
            el.setAttribute(key, attrs[key]);
        }
    });
    if (content !== null) {
        if (typeof content === 'string') {
            el.textContent = content;
        } else if (Array.isArray(content)) {
            content.forEach(c => el.appendChild(c instanceof Node ? c : document.createTextNode(c)));
        } else if (content instanceof Node) {
            el.appendChild(content);
        }
    }
    return el;
}

/**
 * Récupère un élément par sélecteur
 * @param {string} selector - Sélecteur CSS
 * @param {Element} parent - Élément parent (défaut: document)
 * @returns {Element|null}
 */
function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Récupère tous les éléments correspondant au sélecteur
 * @param {string} selector - Sélecteur CSS
 * @param {Element} parent - Élément parent
 * @returns {NodeList}
 */
function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Désactive/affiche le bouton de menu mobile (hamburger)
 * @param {string} action - 'open' | 'close'
 */
function toggleMobileNav(action) {
    const nav = $('.nav');
    const btn = $('.nav-toggle');
    if (!nav || !btn) return;
    if (action === 'open') {
        nav.classList.add('nav--open');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        nav.classList.remove('nav--open');
        btn.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Debounce - limite les appels d'une fonction
 * @param {Function} fn - Fonction à débouncer
 * @param {number} ms - Délai en millisecondes
 */
function debounce(fn, ms) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), ms);
    };
}

/**
 * Copie du texte dans le presse-papiers
 * @param {string} text - Texte à copier
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}
