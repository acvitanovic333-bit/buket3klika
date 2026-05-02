const fs = require('fs');

// 1. Fix the script.js fatal error that breaks product clicks on blog pages
let scriptJs = fs.readFileSync('script.js', 'utf8');

// The original script checks `if (adminHeartLink)` but fails because adminModal and adminUsernameInput are null on blog pages
scriptJs = scriptJs.replace(/if\s*\(\s*adminHeartLink\s*\)\s*\{/, 'if (adminHeartLink && adminModal && adminUsernameInput) {');

fs.writeFileSync('script.js', scriptJs, 'utf8');
console.log('Fixed the fatal error in script.js');

// 2. Add 'Od ' prefix to all prices in all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <span class="price">€XX.XX</span> or similar with <span class="price">Od €XX.XX</span>
    // We make sure it doesn't already contain "Od" to prevent "Od Od €..."
    const originalContent = content;
    
    // We match any tag containing class="price" that is followed by the euro sign WITHOUT "Od " before it
    content = content.replace(/(<[^>]*class="[^"]*price[^"]*"[^>]*>)\s*(?:Od\s*)?€([0-9.,]+)\s*(<\/[^>]+>)/g, '$1Od €$2$3');
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});

console.log('Added "Od" prefix to prices in ' + count + ' HTML files.');
