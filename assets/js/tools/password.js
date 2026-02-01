/**
 * password.js - Générateur de mot de passe ToolBoxAI
 * 
 * Logique complète du générateur :
 * - Longueur configurable
 * - Options : majuscules, minuscules, chiffres, symboles
 * - Copie dans le presse-papiers
 * - Force du mot de passe (indicateur)
 */

(function () {
    'use strict';

    const DEFAULT_LENGTH = 16;
    const CHARS = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let config = {
        length: DEFAULT_LENGTH,
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
    };

    /**
     * Génère un mot de passe aléatoire selon la config
     * @returns {string}
     */
    function generatePassword() {
        let pool = '';
        if (config.lowercase) pool += CHARS.lowercase;
        if (config.uppercase) pool += CHARS.uppercase;
        if (config.numbers) pool += CHARS.numbers;
        if (config.symbols) pool += CHARS.symbols;

        if (!pool) {
            return '';
        }

        let result = '';
        const arr = pool.split('');
        for (let i = 0; i < config.length; i++) {
            result += arr[Math.floor(Math.random() * arr.length)];
        }
        return result;
    }

    /**
     * Calcule la force du mot de passe (0-4)
     * @param {string} pwd
     * @returns {number}
     */
    function getStrength(pwd) {
        if (!pwd) return 0;
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;
        return Math.min(4, Math.floor(score / 1.25));
    }

    /**
     * Met à jour l'affichage du mot de passe et de la force
     * @param {string} pwd
     */
    function updateDisplay(pwd) {
        const output = document.getElementById('password-output');
        const strengthEl = document.getElementById('password-strength');
        const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];

        if (output) output.value = pwd;
        if (strengthEl) {
            const s = getStrength(pwd);
            strengthEl.textContent = strengthLabels[s];
            strengthEl.className = 'password-strength password-strength--' + s;
        }
    }

    /**
     * Lit la configuration depuis les inputs du formulaire
     */
    function readConfig() {
        const lengthEl = document.getElementById('password-length');
        const len = parseInt(lengthEl?.value || DEFAULT_LENGTH, 10);
        config.length = Math.min(64, Math.max(4, len));

        config.lowercase = document.getElementById('opt-lowercase')?.checked !== false;
        config.uppercase = document.getElementById('opt-uppercase')?.checked !== false;
        config.numbers = document.getElementById('opt-numbers')?.checked !== false;
        config.symbols = document.getElementById('opt-symbols')?.checked !== false;
    }

    /**
     * Handler : génération
     */
    function onGenerate() {
        readConfig();
        const pwd = generatePassword();
        updateDisplay(pwd);
    }

    /**
     * Handler : copie
     */
    async function onCopy() {
        const output = document.getElementById('password-output');
        const btn = document.getElementById('password-copy-btn');
        if (!output?.value) return;

        const ok = typeof copyToClipboard === 'function'
            ? await copyToClipboard(output.value)
            : await navigator.clipboard.writeText(output.value).then(() => true).catch(() => false);

        if (ok && btn) {
            const orig = btn.textContent;
            btn.textContent = 'Copié !';
            setTimeout(() => { btn.textContent = orig; }, 2000);
        }
    }

    /**
     * Initialise les event listeners
     */
    function init() {
        const genBtn = document.getElementById('password-generate-btn');
        const copyBtn = document.getElementById('password-copy-btn');
        const lengthInput = document.getElementById('password-length');
        const lengthValue = document.getElementById('password-length-value');

        if (genBtn) genBtn.addEventListener('click', onGenerate);
        if (copyBtn) copyBtn.addEventListener('click', onCopy);

        if (lengthInput && lengthValue) {
            lengthInput.addEventListener('input', function () {
                lengthValue.textContent = this.value;
            });
        }

        // Génération initiale
        onGenerate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
