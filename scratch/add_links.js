const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const linksToAdd = `
                <a href="/dostava-ruza-zagreb.html" style="color: var(--accent-red); text-decoration: none;">Dostava ruža Zagreb</a>
                <a href="/postani-majstor-romantike.html" style="color: var(--accent-red); text-decoration: none;">Postani majstor romantike</a>
                <a href="/rodendansko-iznenadenje-99-ruza.html" style="color: var(--accent-red); text-decoration: none;">Rođendansko iznenađenje 99 ruža</a>
                <a href="/slanje-ruza-u-ured-zagreb.html" style="color: var(--accent-red); text-decoration: none;">Slanje ruža u ured Zagreb</a>
            </div>`;

let count = 0;
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Luksuzni buketi Zagreb</a>')) {
        const originalContent = content;
        content = content.replace(/Luksuzni buketi Zagreb<\/a>\s*<\/div>/g, 'Luksuzni buketi Zagreb</a>' + linksToAdd);
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            count++;
        }
    }
});
console.log('Added links to ' + count + ' HTML files.');
