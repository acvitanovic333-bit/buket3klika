$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    try {
        # Read the file as UTF-8
        $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
        
        # 1. Fix garbled Croatian characters
        $content = $content -replace 'pruĹľa', 'pruža'
        $content = $content -replace 'najbrĹľu', 'najbržu'
        $content = $content -replace 'ruĹľa', 'ruža'
        $content = $content -replace 'RuĹle', 'Ruže'
        $content = $content -replace 'RuĹLa', 'Ruža'
        $content = $content -replace 'ÄŤ', 'č'
        $content = $content -replace 'Ä‡', 'ć'
        $content = $content -replace 'Ĺľ', 'ž'
        $content = $content -replace 'vaĹˇ', 'vaš'
        $content = $content -replace 'savrĹˇ', 'savrš'
        $content = $content -replace 'RoÄ‘', 'Rođ'
        $content = $content -replace 'Ĺˇ', 'š'
        $content = $content -replace 'ÄŚ', 'Č'
        $content = $content -replace 'Ĺ˝', 'Ž'
        $content = $content -replace 'Ä†', 'Ć'
        $content = $content -replace 'Ä ', 'Đ'
        $content = $content -replace 'ĹL''e', 'že'
        $content = $content -replace 'ruĹL''a', 'ruža'
        $content = $content -replace 'RuĹL''a', 'Ruža'
        $content = $content -replace 'ÄŹ', 'đ'
        
        # 2. Fix Euro symbol
        $content = $content -replace 'â‚¬', '€'
        $content = $content -replace 'Â', ''
        
        # 3. Remove Instagram link if still present
        $content = $content -replace '<a href="https://www.instagram.com/buket3klika/".*?</a>', ''
        
        # 4. Update Header for Mobile (Phone button)
        if ($content -notmatch 'mobile-call-btn') {
            $content = $content -replace '(<button class="account-btn")', '<a href="tel:+385976050419" class="mobile-call-btn" style="margin-right: 1rem; font-size: 1.4rem; color: var(--accent-red); display: none;"><i class="fa-solid fa-phone"></i></a>$1'
        }
        
        # Write back as UTF-8
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Processed $($f.Name)"
    } catch {
        Write-Host "Error processing $($f.Name): $($_.Exception.Message)"
    }
}
