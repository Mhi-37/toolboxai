(function () {
    'use strict';
    var quotes = ['Le seul moyen de faire du bon travail est d\'aimer ce que vous faites. — Steve Jobs', 'L\'innovation distingue un leader d\'un suiveur. — Steve Jobs', 'Le succès n\'est pas final, l\'échec n\'est pas fatal. — Winston Churchill', 'La simplicité est la sophistication suprême. — Léonard de Vinci', 'Faites de votre vie un rêve, et d\'un rêve une réalité. — Antoine de Saint-Exupéry', 'Le courage n\'est pas l\'absence de peur, c\'est la capacité d\'agir malgré elle. — Mark Twain', 'Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant. — Proverbe chinois'];
    function init() {
        function show() {
            document.getElementById('q-content').textContent = quotes[Math.floor(Math.random() * quotes.length)];
        }
        document.getElementById('q-btn').addEventListener('click', show);
        show();
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
