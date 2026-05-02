$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $content = $content -replace 'â‚¬', '€'
    $content = $content -replace 'Â', ''
    [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed $($f.Name)"
}
