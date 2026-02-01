# Met a jour toutes les pages outils : SEO, breadcrumb, ad-slot, sections, footer, defer
$toolsDir = Join-Path $PSScriptRoot "..\tools"
$files = Get-ChildItem -Path $toolsDir -Filter "*.html" | Where-Object { $_.Name -notin @("index.html", "template.html") }

$breadcrumb = @"
<nav class="breadcrumb" aria-label="Fil d'Ariane"><a href="../index.html">Accueil</a><span>&#8250;</span><a href="index.html">Outils</a><span>&#8250;</span><span class="breadcrumb-current" id="breadcrumb-current"></span></nav>

"@

$headInsert = @'
    <meta name="robots" content="index,follow">
    <link rel="canonical" id="canonical-link" href="">
    <link rel="manifest" href="../manifest.json">
    <meta name="theme-color" content="#6366f1">

'@

$sectionsBlock = @'

                <section class="tool-how-to" aria-labelledby="how-to-title">
                    <h2 id="how-to-title">Comment utiliser</h2>
                    <ol>
                        <li>Saisissez ou collez votre contenu dans la zone prevue.</li>
                        <li>Utilisez les options ou boutons selon vos besoins.</li>
                        <li>Copiez le resultat ou telechargez si l'outil le permet.</li>
                    </ol>
                </section>
                <section class="tool-faq" aria-labelledby="faq-title">
                    <h2 id="faq-title">FAQ</h2>
                    <dl>
                        <dt>Cet outil est-il gratuit ?</dt>
                        <dd>Oui. Tous nos outils sont gratuits et utilisables sans inscription.</dd>
                        <dt>Mes donnees sont-elles envoyees a un serveur ?</dt>
                        <dd>Pour la plupart des outils, le traitement se fait dans votre navigateur.</dd>
                        <dt>Puis-je utiliser cet outil sur mobile ?</dt>
                        <dd>Oui. Le site est optimise mobile.</dd>
                    </dl>
                </section>
                <section class="tool-related" aria-labelledby="related-title">
                    <h2 id="related-title">Outils associes</h2>
                    <ul>
                        <li><a href="word-counter.html">Compteur de mots</a></li>
                        <li><a href="base64.html">Base64 Encode / Decode</a></li>
                        <li><a href="password.html">Generateur de mot de passe</a></li>
                        <li><a href="json-formatter.html">Formateur JSON</a></li>
                        <li><a href="character-counter.html">Compteur de caracteres</a></li>
                    </ul>
                </section>

                <aside class="ad-box ad-slot ad-bottom ad-box--rectangle" role="complementary">
                    <div class="ad-placeholder">Emplacement pub 300x250</div>
                </aside>
'@

$footerNew = @'
                <div><h3>ToolBox<span class="logo-accent">AI</span></h3><p>La boite a outils web #1.</p></div>
                <div><h4>Navigation</h4><ul><li><a href="../index.html">Accueil</a></li><li><a href="index.html">Tous les outils</a></li><li><a href="../blog/index.html">Blog</a></li><li><a href="../premium.html">Premium</a></li></ul></div>
                <div><h4>Légal</h4><ul><li><a href="../privacy.html">Confidentialité</a></li><li><a href="../terms.html">CGU</a></li><li><a href="../contact.html">Contact</a></li><li><a href="../about.html">À propos</a></li></ul></div>
'@

foreach ($f in $files) {
    $path = $f.FullName
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    if ($content -match 'meta name="robots"') { continue }

    $content = $content -replace '<meta name="viewport" content="width=device-width, initial-scale=1\.0">', ('<meta name="viewport" content="width=device-width, initial-scale=1.0">' + $headInsert)
    $content = $content -replace '<a href="\.\./index\.html" class="tool-page__back">[^<]*</a>\s*', $breadcrumb
    $content = $content -replace '<aside class="ad-box ad-box--rectangle"', '<aside class="ad-box ad-slot ad-box--rectangle"'

    if ($content -notmatch 'ad-bottom') {
        $content = $content -replace '(\s*)(</div>\s*</section>\s*</main>)', ($sectionsBlock + "`n            `$2")
    }

    if ($content -notmatch 'privacy\.html') {
        $content = $content -replace '<h4>Liens</h4>', '<h4>Navigation</h4>'
        $content = $content -replace '<li><a href="\.\./index\.html">Outils</a></li>', '<li><a href="../index.html">Accueil</a></li><li><a href="index.html">Tous les outils</a></li>'
        $content = $content -replace '<li><a href="#">Mentions legales</a></li>', '<li><a href="../privacy.html">Confidentialite</a></li>'
        $content = $content -replace '<li><a href="#">CGU</a></li>', '<li><a href="../terms.html">CGU</a></li>'
        $content = $content -replace '<li><a href="#">Confidentialite</a></li>', '<li><a href="../contact.html">Contact</a></li><li><a href="../about.html">A propos</a></li>'
    }

    $content = $content -replace '<script src="\.\./assets/js/([^"]+)"\s*>', '<script src="../assets/js/$1" defer>'

    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $($f.Name)"
}

Write-Host "Done. Total: $($files.Count)"
