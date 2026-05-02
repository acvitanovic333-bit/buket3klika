const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <div class="price">€XX.XX</div> or similar with <div class="price">Od €XX.XX</div>
    // Ensure we don't duplicate "Od Od"
    const originalContent = content;
    
    content = content.replace(/(<div[^>]*class="[^"]*price[^"]*"[^>]*>)\s*€([0-9.,]+)\s*(<\/div>)/g, '$1Od €$2$3');
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});

console.log('Added "Od" prefix to prices in ' + count + ' files.');
