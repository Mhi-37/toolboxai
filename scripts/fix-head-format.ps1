$toolsDir = Join-Path $PSScriptRoot "..\tools"
Get-ChildItem -Path $toolsDir -Filter "*.html" | Where-Object { $_.Name -notin @("index.html", "template.html") } | ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    if ($c -match 'viewport.*scale=1\.0">\s{2,}<meta name="robots"') {
        $c = $c -replace '(viewport" content="width=device-width, initial-scale=1\.0">)\s+(<meta name="robots")', "`$1`n    `$2"
        [System.IO.File]::WriteAllText($_.FullName, $c, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "Fixed head: $($_.Name)"
    }
}
