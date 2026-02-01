/**
 * Met à jour toutes les pages outils : SEO (meta, canonical, og, twitter),
 * breadcrumb, ad-slot, sections Comment utiliser / FAQ / Outils associés, footer, defer.
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'tools');
const DATA_JS = path.join(__dirname, '..', 'assets', 'js', 'data.js');
const BASE = 'https://toolboxai.com';

function getToolsMap() {
  const src = fs.readFileSync(DATA_JS, 'utf8');
  const map = {};
  const re = /\{\s*name:\s*['"]([^'"]+)['"].*?url:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    const url = m[2];
    const filename = url.replace(/^tools\//, '');
    map[filename] = name;
  }
  return map;
}

const BREADCRUMB = '<nav class="breadcrumb" aria-label="Fil d\'Ariane"><a href="../index.html">Accueil</a><span>›</span><a href="index.html">Outils</a><span>›</span><span class="breadcrumb-current">H1_TEXT</span></nav>';

const SECTIONS_HTML = `
                <section class="tool-how-to" aria-labelledby="how-to-title">
                    <h2 id="how-to-title">Comment utiliser</h2>
                    <ol>
                        <li>Saisissez ou collez votre contenu dans la zone prévue.</li>
                        <li>Utilisez les options ou boutons selon vos besoins.</li>
                        <li>Copiez le résultat ou téléchargez-le si l'outil le permet.</li>
                    </ol>
                </section>
                <section class="tool-faq" aria-labelledby="faq-title">
                    <h2 id="faq-title">FAQ</h2>
                    <dl>
                        <dt>Cet outil est-il gratuit ?</dt>
                        <dd>Oui. Tous nos outils sont gratuits et utilisables sans inscription.</dd>
                        <dt>Mes données sont-elles envoyées à un serveur ?</dt>
                        <dd>Pour la plupart des outils, le traitement se fait dans votre navigateur ; aucune donnée n'est envoyée à nos serveurs.</dd>
                        <dt>Puis-je utiliser cet outil sur mobile ?</dt>
                        <dd>Oui. Le site est optimisé mobile (responsive).</dd>
                    </dl>
                </section>
                <section class="tool-related" aria-labelledby="related-title">
                    <h2 id="related-title">Outils associés</h2>
                    <ul>
                        <li><a href="word-counter.html">Compteur de mots</a></li>
                        <li><a href="base64.html">Base64 Encode / Decode</a></li>
                        <li><a href="password.html">Générateur de mot de passe</a></li>
                        <li><a href="json-formatter.html">Formateur JSON</a></li>
                        <li><a href="character-counter.html">Compteur de caractères</a></li>
                    </ul>
                </section>`;

function escapeXml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateFile(filePath, toolName, canonical, title, metaDesc) {
  let html = fs.readFileSync(filePath, 'utf8');

  const ogTitle = title ? title.replace(/\s*\|\s*ToolBoxAI\s*$/, '').trim() : toolName;
  const ogDesc = metaDesc || (toolName + '. Outil gratuit en ligne sur ToolBoxAI.');

  if (!html.includes('meta name="robots"')) {
    html = html.replace(
      /<meta name="viewport" content="[^"]*">/,
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="robots" content="index,follow">\n    <link rel="canonical" href="' + canonical + '">\n    <link rel="manifest" href="../manifest.json">\n    <meta name="theme-color" content="#6366f1">\n    <meta property="og:type" content="website">\n    <meta property="og:url" content="' + canonical + '">\n    <meta property="og:title" content="' + escapeXml(ogTitle) + '">\n    <meta property="og:description" content="' + escapeXml(ogDesc.substring(0, 160)) + '">\n    <meta property="og:locale" content="fr_FR">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="' + escapeXml(ogTitle) + '">\n    <meta name="twitter:description" content="' + escapeXml(ogDesc.substring(0, 160)) + '">'
    );
  }

  html = html.replace(
    /<a href="\.\.\/index\.html" class="tool-page__back">[^<]*<\/a>\s*/,
    BREADCRUMB.replace('H1_TEXT', toolName) + '\n                '
  );

  let adIdx = 0;
  html = html.replace(/<aside class="ad-box ad-box--rectangle" role="complementary">/g, () => {
    adIdx++;
    const c = adIdx === 1 ? 'ad-top' : 'ad-middle';
    return '<aside class="ad-box ad-slot ' + c + ' ad-box--rectangle" role="complementary">';
  });
  if (!html.includes('ad-bottom')) {
    html = html.replace(
      /(\s*)(<\/section>\s*<\/main>)/,
      '\n            <aside class="ad-box ad-slot ad-bottom ad-box--rectangle" role="complementary"><div class="ad-placeholder">Emplacement pub 300x250</div></aside>$2'
    );
  }

  if (!html.includes('tool-how-to')) {
    html = html.replace(
      /(\s*)(<\/div>\s*<\/section>\s*<\/main>)/,
      SECTIONS_HTML + '$2'
    );
  }

  if (!html.includes('privacy.html')) {
    html = html.replace(/<h4>Liens<\/h4>/g, '<h4>Navigation</h4>');
    html = html.replace(/<li><a href="\.\.\/index\.html">Outils<\/a><\/li>/g, '<li><a href="../index.html">Accueil</a></li>\n                        <li><a href="index.html">Tous les outils</a></li>');
    html = html.replace(/<li><a href="#">Mentions légales<\/a><\/li>/g, '<li><a href="../privacy.html">Confidentialité</a></li>');
    html = html.replace(/<li><a href="#">CGU<\/a><\/li>/g, '<li><a href="../terms.html">CGU</a></li>');
    html = html.replace(/<li><a href="#">Confidentialité<\/a><\/li>/g, '<li><a href="../contact.html">Contact</a></li>\n                        <li><a href="../about.html">À propos</a></li>');
  }

  html = html.replace(/<script src="\.\.\/assets\/js\/([^"]+)"\s*>/g, '<script src="../assets/js/$1" defer>');

  fs.writeFileSync(filePath, html, 'utf8');
}

const toolsMap = getToolsMap();
const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'template.html');

files.forEach((filename) => {
  const filePath = path.join(TOOLS_DIR, filename);
  const toolName = toolsMap[filename] || filename.replace(/\.html$/, '').replace(/-/g, ' ');
  const canonical = BASE + '/tools/' + filename;
  let title = '';
  let metaDesc = '';
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) title = titleMatch[1].trim();
  const descMatch = content.match(/<meta name="description" content="([^"]*)"/);
  if (descMatch) metaDesc = descMatch[1];
  updateFile(filePath, toolName, canonical, title, metaDesc);
  console.log('Updated:', filename);
});

console.log('Done. Total:', files.length);
