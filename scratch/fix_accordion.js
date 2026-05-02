const fs = require('fs');
let style = fs.readFileSync('style.css', 'utf8');

const startIndex = style.indexOf('/* SEO Links Accordion on Mobile */');
if (startIndex !== -1) {
    // We remove everything from startIndex to the end of the file since it was added at the very end.
    style = style.substring(0, startIndex);
    
    const newCSS = `/* SEO Links Accordion */
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
    display: block; /* Visible everywhere */
}

/* Hidden by default everywhere, open when 'active' class is added */
.seo-links-grid {
    display: none !important;
}

.seo-links-grid.active {
    display: grid !important;
}

@media (max-width: 768px) {
    .seo-links-grid {
        text-align: center;
    }
    .seo-links-section h3 {
        margin-bottom: 0 !important;
    }
}
`;
    
    style += newCSS;
    fs.writeFileSync('style.css', style, 'utf8');
    console.log('Updated style.css successfully.');
} else {
    console.log('Could not find the starting comment in style.css');
}
