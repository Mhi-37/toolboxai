# À finaliser – ToolBoxAI

Liste des points à finaliser par vos soins avant et après la mise en production.

---

## 1. Domaine et URLs

- [ ] **Remplacer le domaine**  
  Le site utilise actuellement `https://toolboxai.com` partout. Si votre domaine est différent :
  - Mettre à jour **robots.txt** : ligne `Sitemap: https://VOTREDOMAINE.com/sitemap.xml`
  - Mettre à jour **sitemap.xml** : remplacer `https://toolboxai.com` par `https://VOTREDOMAINE.com` dans toutes les balises `<loc>`
  - Mettre à jour les **canonical** et **og:url** dans : index.html, premium.html, blog/, privacy.html, terms.html, contact.html, about.html, tools/index.html
  - Optionnel : dans **manifest.json**, `start_url` est déjà en `/` (relatif), pas de changement nécessaire si le domaine change

- [ ] **Vérifier les liens internes**  
  Depuis la racine du site, les liens (index, tools/index, blog, premium, legal) sont en relatifs. Vérifier une fois en ligne que tout fonctionne (notamment depuis une sous-page type `/tools/word-counter.html`).

---

## 2. Google AdSense

- [ ] **Créer un compte AdSense**  
  [google.com/adsense](https://www.google.com/adsense) et soumettre le site pour approbation.

- [ ] **Remplacer les placeholders pub**  
  Les emplacements sont marqués par des divs du type :
  ```html
  <aside class="ad-box ad-slot ad-top ...">
    <div class="ad-placeholder">Emplacement pub 728x90</div>
  </aside>
  ```
  À faire :
  - Remplacer le contenu de chaque `.ad-placeholder` (ou le bloc `<aside>`) par le **code d’annonce AdSense** fourni par Google (script + insérer l’unité d’annonce).
  - Emplacements prévus : **ad-top**, **ad-middle**, **ad-bottom** (leaderboard 728x90 ou rectangle 300x250 selon la maquette).

- [ ] **Respect des règles AdSense**  
  - Contenu suffisant et conforme (pas de contenu interdit).
  - Pages **Privacy** et **Terms** accessibles et lisibles (déjà en place).
  - Pas trop de pubs par page (vous en avez 3 par page outil / accueil, ce qui est raisonnable).

---

## 3. Emails et contact

- [ ] **Remplacer les emails de contact**  
  Dans **contact.html** et **about.html** :
  - Remplacer `contact [at] toolboxai.com` par votre vraie adresse (ou un formulaire de contact).
  - Remplacer `partenariat [at] toolboxai.com` si vous utilisez une adresse dédiée.

- [ ] **Optionnel : formulaire de contact**  
  Si vous préférez un formulaire plutôt qu’une adresse mail en clair, ajouter un formulaire (ex. formulaire + envoi par email ou service type Formspree/Netlify Forms) et adapter le texte dans contact.html.

---

## 4. Premium / Paiement

- [ ] **Connecter un système de paiement**  
  La page **premium.html** contient un bouton « S'abonner » qui affiche une alerte. À faire :
  - Intégrer **Stripe** (ou autre) : création de session / abonnement, redirection vers le paiement, gestion du succès/annulation.
  - Adapter le libellé « *Démo — Connecter Stripe pour la production* » une fois l’intégration en place.

- [ ] **Mentions légales / CGU**  
  Dans **terms.html**, adapter les paragraphes sur l’abonnement Premium (prix, durée, remboursement, annulation) selon votre offre réelle.

---

## 5. Contenu et SEO

- [ ] **Vérifier les textes légaux**  
  Relire **privacy.html** et **terms.html** et adapter :
  - Nom du responsable / société si différent de « ToolBoxAI ».
  - Adresse postale si vous l’ajoutez.
  - Détails sur les cookies et analytics (ex. Google Analytics, consentement).

- [ ] **Analytics**  
  Si vous utilisez **Google Analytics** (ou autre) :
  - Ajouter le script de suivi dans toutes les pages (ex. dans le `<head>` ou avant `</body>`), de préférence de façon centralisée (un seul fichier JS inclus partout).

- [ ] **Soumettre le sitemap**  
  Une fois en ligne :
  - Google Search Console : ajouter la propriété du site et soumettre l’URL du sitemap : `https://VOTREDOMAINE.com/sitemap.xml`.

---

## 6. Technique et performance

- [ ] **Favicon / PWA**  
  - **manifest.json** référence `assets/img/favicon.svg`. Vérifier que le fichier existe et que le chemin est correct en production.
  - Pour une PWA plus complète : ajouter des icônes en 192x192 et 512x512 (PNG) dans `manifest.json` si besoin.

- [ ] **Lighthouse**  
  Lancer un audit (Performance, Accessibilité, SEO, Bonnes pratiques) sur la version en ligne et corriger les points signalés (images, contrastes, etc.).

- [ ] **HTTPS**  
  Mettre le site en **HTTPS** en production (certificat SSL). Tous les canonical et og:url doivent utiliser `https://`.

---

## 7. Optionnel

- [ ] **Image Open Graph**  
  Pour un meilleur partage sur les réseaux (Facebook, Twitter, LinkedIn), ajouter une image dédiée et une balise du type :
  ```html
  <meta property="og:image" content="https://VOTREDOMAINE.com/assets/img/og-image.jpg">
  ```
  sur la page d’accueil (et éventuellement sur les pages importantes). Créer l’image (recommandé : 1200×630 px).

- [ ] **Blog**  
  Les pages blog (index + article1) sont en place. Pour les prochains articles : dupliquer la structure d’article1.html, adapter le contenu, puis ajouter l’URL dans **sitemap.xml** et un lien depuis blog/index.html.

- [ ] **Résumeur IA / outils serveur**  
  Si l’outil « Résumeur » ou d’autres appellent une API ou un backend : configurer les clés API (en sécurité côté serveur) et mettre à jour la politique de confidentialité si des données sont envoyées à des tiers.

---

## Récapitulatif prioritaire

| Priorité | Action |
|----------|--------|
| 1 | Remplacer le domaine dans robots.txt, sitemap.xml et canonical/og:url si différent de toolboxai.com |
| 2 | Remplacer les placeholders pub par le code AdSense après approbation |
| 3 | Remplacer les emails de contact (contact.html, about.html) |
| 4 | Soumettre le sitemap dans Google Search Console |
| 5 | Connecter Stripe (ou autre) pour Premium et adapter terms.html |
| 6 | Relire privacy.html / terms.html et ajouter Analytics si utilisé |

---

*Document généré pour le projet ToolBoxAI. À mettre à jour au fur et à mesure de la mise en production.*
