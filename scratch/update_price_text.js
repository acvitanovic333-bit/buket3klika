const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const originalContent = content;
    
    // Replace '>Od €' with '>Cijena od €'
    content = content.replace(/(<span[^>]*class="[^"]*price[^"]*"[^>]*>)\s*Od\s*€/g, '$1Cijena od €');
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});

console.log('Replaced "Od" with "Cijena od" in ' + count + ' HTML files.');
