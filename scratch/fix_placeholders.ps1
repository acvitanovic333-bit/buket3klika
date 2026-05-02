$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    
    # Common garbled patterns
    $content = $content -replace 'esta pitanja', 'Česta pitanja'
    $content = $content -replace 'Korisniki raun', 'Korisnički račun'
    $content = $content -replace 'najljepe', 'najljepše'
    $content = $content -replace 'rua', 'ruža'
    $content = $content -replace 'znaenje', 'značenje'
    $content = $content -replace 'cvijea', 'cvijeća'
    $content = $content -replace 'Naruite', 'Naručite'
    $content = $content -replace 'iznenadenje', 'iznenađenje'
    $content = $content -replace 'Ĺľupaniji', 'županiji'
    $content = $content -replace 'Ispriavamo', 'Ispričavamo'
    $content = $content -replace 'upaniji', 'županiji'
    $content = $content -replace 'ogranicena', 'ograničena'
    $content = $content -replace 'ogranicena', 'ograničena'
    $content = $content -replace 'svjeinu', 'svježinu'
    $content = $content -replace 'sluene', 'složene'
    
    # Add mobile call btn if missing
    if ($content -notmatch 'mobile-call-btn') {
        $content = $content -replace '(<button class="account-btn")', '<a href="tel:+385976050419" class="mobile-call-btn" style="margin-right: 1rem; font-size: 1.4rem; color: var(--accent-red); display: none;"><i class="fa-solid fa-phone"></i></a>$1'
    }

    [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed $($f.Name)"
}
