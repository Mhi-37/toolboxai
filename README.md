# ToolBoxAI

Site SaaS d'outils web gratuits (convertisseurs, image, PDF, IA) monétisé par Google AdSense, abonnement Premium et blog SEO.

**Stack :** HTML, CSS, JavaScript vanilla — sans framework, sans backend.

---

## Structure du projet

```
/index.html          → Page d'accueil (grille d'outils)
/premium.html        → Page abonnement Premium
/robots.txt
/sitemap.xml

/assets
  /css/style.css     → Styles globaux
  /js/main.js        → Génération dynamique des cartes
  /js/utils.js       → Fonctions helpers
  /js/data.js        → Tableau TOOLS centralisé
  /js/tools/         → Scripts spécifiques par outil
  /img/              → Images du site

/tools
  template.html      → Modèle pour nouveaux outils
  password.html      → Générateur de mot de passe
  compress.html      → Compresseur (UI seule)
  summarizer.html    → Résumeur IA (faux résultat)

/blog
  index.html         → Liste des articles
  article1.html      → Exemple article SEO 800+ mots
```

---

## Comment ajouter un nouvel outil

### 1. Ajouter l'outil dans `assets/js/data.js`

```javascript
TOOLS.push({
    name: 'Nom de l\'outil',
    description: 'Description courte pour la carte.',
    url: 'tools/mon-outil.html',
    icon: '🔧',        // Emoji ou icône
    category: 'Fichiers'  // Ex: Sécurité, IA, Fichiers
});
```

### 2. Créer la page de l'outil

Copier `tools/template.html` vers `tools/mon-outil.html` puis :

- Modifier le `title`, la meta `description`, le `h1` et le contenu
- Ajouter la logique dans un fichier `assets/js/tools/mon-outil.js` si nécessaire
- Inclure le script : `<script src="../assets/js/tools/mon-outil.js"></script>`

### 3. Mettre à jour le sitemap

Ajouter l'URL de la nouvelle page dans `sitemap.xml`.

---

## Emplacements Google AdSense

Les emplacements pubs sont des blocs `.ad-box` avec la classe `.ad-placeholder`. Pour activer AdSense :

1. Remplacer le contenu de chaque `.ad-box` par le code snippet AdSense
2. Exemple de structure AdSense :

```html
<aside class="ad-box ad-box--leaderboard" role="complementary">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto"></ins>
</aside>
```

3. Charger le script AdSense dans le `<head>` :

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
```

4. Après le chargement, initialiser : `(adsbygoogle = window.adsbygoogle || []).push({});`

**Emplacements prévus :**
- Leaderboard 728x90 : header, milieu, footer de l’index
- Rectangle 300x250 : à côté des outils et dans les articles

---

## Déploiement (Vercel / Netlify)

### Vercel

1. Créer un dépôt Git avec le projet
2. Aller sur [vercel.com](https://vercel.com) → Import Project
3. Sélectionner le dépôt, laisser les paramètres par défaut
4. Déployer — le site sera servi en statique

### Netlify

1. Créer un dépôt Git avec le projet
2. Aller sur [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Choisir le dépôt
4. Build settings : laisser vide (site statique)
5. Publish directory : `/` (racine)
6. Déployer

### Fichier de configuration optionnel

**`vercel.json`** (si besoin de redirects) :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Pour un site statique multi-pages comme ToolBoxAI, ce fichier n'est pas nécessaire.

---

## Développement local

Ouvrir `index.html` directement dans le navigateur, ou utiliser un serveur local :

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Puis visiter `http://localhost:8000`.

---

## Bonnes pratiques respectées

- **SEO :** Schema JSON-LD, Open Graph, meta, canonical, sitemap
- **Design :** palette indigo/violet distinctive, typo Plus Jakarta Sans
- **Mobile first :** design responsive, menu hamburger
- **Performance :** preconnect fonts, display=swap, pas de librairies
- **Conversion :** stats, trust badges, CTA optimisés
- **Accessibilité :** aria-labels, focus-visible, structure sémantique
- **Extensibilité :** data.js centralisé, icon/category par outil

---

## Licence

Projet boilerplate — à adapter selon vos besoins.
