const fs = require('fs');

// 1. Remove the mobile call button from all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the anchor tag that has class="mobile-call-btn"
    content = content.replace(/<a href="tel:\+385976050419" class="mobile-call-btn"[^>]*><i class="fa-solid fa-phone"><\/i><\/a>/g, '');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Removed the mobile call button from all HTML files.");

// 2. Ensure logo text is visible on all devices in style.css
let style = fs.readFileSync('style.css', 'utf8');

// Ensure the style file doesn't already have our forced rule
if (!style.includes('.logo-text { display: inline-block !important; }')) {
    // Append a forceful rule at the end of the file
    style += `\n\n/* Force logo text visibility on mobile */\n@media (max-width: 768px) {\n    .logo-text { display: inline-block !important; }\n}\n`;
    fs.writeFileSync('style.css', style, 'utf8');
    console.log("Forced .logo-text visibility in style.css.");
} else {
    console.log("Logo text rule already exists.");
}
