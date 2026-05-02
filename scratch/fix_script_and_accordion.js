const fs = require('fs');

// 1. Fix the script tag position in all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if script tag is above the seo-links or blog-product-grid
    if (content.includes('<script src="script.js?v=3.7"></script>')) {
        // Remove it from its current position
        content = content.replace(/\s*<script src="script\.js\?v=3\.7"><\/script>/g, '');
        // Append it right before </body>
        content = content.replace(/<\/body>/, '    <script src="script.js?v=3.7"></script>\n</body>');
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log("Moved script.js to the absolute bottom of all files.");

// 2. Add accordion functionality and centered mobile text to "Naši blogovi" (SEO links)
let style = fs.readFileSync('style.css', 'utf8');

const newCSS = `
/* SEO Links Accordion on Mobile */
.seo-links-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.seo-links-toggle {
    font-size: 1.5rem;
    color: var(--accent-red);
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .seo-links-grid {
        display: none !important; /* Hidden by default on mobile */
        text-align: center;
    }
    .seo-links-grid.active {
        display: grid !important;
    }
    .seo-links-toggle {
        display: block;
    }
    .seo-links-section h3 {
        margin-bottom: 0 !important;
    }
}
@media (min-width: 769px) {
    .seo-links-toggle {
        display: none;
    }
    .seo-links-grid {
        display: grid !important; /* Always visible on desktop */
    }
}
`;

if (!style.includes('.seo-links-header')) {
    style += newCSS;
    fs.writeFileSync('style.css', style, 'utf8');
}

// 3. Update the SEO links HTML structure across all files to support accordion
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the existing h3 with the header wrapper
    const h3Regex = /<h3 style="font-family: var\(--font-heading\); color: var\(--text-primary\); margin-bottom: 1\.5rem; font-size: 1\.5rem;">Naši blogovi<\/h3>/;
    
    if (h3Regex.test(content)) {
        const newHeader = `
            <div class="seo-links-header" onclick="document.getElementById('seo-links-grid-id').classList.toggle('active'); this.querySelector('.seo-links-toggle').style.transform = this.querySelector('.seo-links-toggle').style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';">
                <h3 style="font-family: var(--font-heading); color: var(--text-primary); margin-bottom: 1.5rem; font-size: 1.5rem;">Naši blogovi</h3>
                <i class="fa-solid fa-chevron-down seo-links-toggle"></i>
            </div>`;
        content = content.replace(h3Regex, newHeader);
        // Add ID to grid
        content = content.replace(/<div class="seo-links-grid" style="display: grid;/, '<div id="seo-links-grid-id" class="seo-links-grid" style="display: grid;');
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log("Applied accordion functionality to SEO links.");
