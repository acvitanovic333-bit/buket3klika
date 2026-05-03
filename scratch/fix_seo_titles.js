const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('BUKET3KLIKA - ')) {
        const originalContent = content;
        content = content.replace(/<span[^>]*>BUKET3KLIKA - <\/span>/g, '');
        content = content.replace(/BUKET3KLIKA - /g, '');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed SEO title in ' + file);
        }
    }
});
