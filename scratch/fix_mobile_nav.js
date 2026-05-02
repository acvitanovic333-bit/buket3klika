const fs = require('fs');

let style = fs.readFileSync('style.css', 'utf16le');
if (!style.includes('nav-links')) {
    // Fallback if it's already utf8
    style = fs.readFileSync('style.css', 'utf8');
}

// Remove the display none block
style = style.replace(/\s*\.nav-links, \.nav-contact\s*\{\s*display: none !important;\s*\/\* Hide on mobile for simplicity[^\*]*\*\/\s*\}/g, '');

// Replace the row flex with the original column flex layout for mobile
const badNavTop = /\.nav-top\.extended-nav\s*\{\s*flex-direction: row;\s*justify-content: space-between;\s*padding: 0\.5rem 1rem;\s*height: 60px;\s*\}/g;

const goodNavTop = `.nav-top.extended-nav {
        flex-direction: column;
        padding: 0.5rem 1rem;
        gap: 0.5rem;
        height: auto;
    }
    .nav-links {
        display: flex !important;
        gap: 1rem;
        font-size: 0.9rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    .nav-contact {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.8rem;
    }
    .account-actions {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
    }`;

style = style.replace(badNavTop, goodNavTop);

// Ensure the mobile call btn is positioned correctly
// If account actions are absolute, mobile call btn could be visible next to user icon if we uncomment display.
// But we just want the original layout to work.

fs.writeFileSync('style.css', style, 'utf8');
console.log("Restored mobile navigation and converted style.css to UTF-8.");
