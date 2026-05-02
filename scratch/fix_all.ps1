$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::GetEncoding(1250))
        
        # Remove git conflict markers
        if ($content -match '<<<<<<< HEAD') {
            $content = $content -replace '(?s)<<<<<<< HEAD.*?=======', ''
            $content = $content -replace '(?s)>>>>>>>.*?\n', ''
        }
        
        # Fix characters
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
        
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed $($f.Name)"
    } catch {
        Write-Host "Error fixing $($f.Name): $($_.Exception.Message)"
    }
}
