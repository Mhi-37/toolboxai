$toolsDir = Join-Path $PSScriptRoot "..\tools"
$files = Get-ChildItem -Path $toolsDir -Filter "*.html" | Where-Object { $_.Name -notin @("index.html", "template.html") }
foreach ($f in $files) {
    $path = $f.FullName
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $orig = $content
    $content = $content -replace '<li><a href="#">Mentions [^<]+</a></li>', '<li><a href="../privacy.html">Confidentialite</a></li>'
    $content = $content -replace '<li><a href="#">CGU</a></li>', '<li><a href="../terms.html">CGU</a></li>'
    $content = $content -replace '<li><a href="#">Confidentialit[^<]*</a></li>', '<li><a href="../contact.html">Contact</a></li><li><a href="../about.html">A propos</a></li>'
    $content = $content -replace 'Confidentialite', 'Confidentialité'
    $content = $content -replace 'A propos', 'À propos'
    $single = [char]0x203A
    $mojibake = [System.Text.Encoding]::UTF8.GetString([byte[]](0xC3,0xA2,0xE2,0x82,0xAC,0xC2,0xBA))
    $content = $content -replace [regex]::Escape($single), '&#8250;'
    $content = $content -replace [regex]::Escape($mojibake), '&#8250;'
    if ($content -ne $orig) {
        [System.IO.File]::WriteAllText($path, $content, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "Fixed: $($f.Name)"
    }
}
