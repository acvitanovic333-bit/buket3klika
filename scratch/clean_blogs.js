const fs = require('fs');

const badFiles = [
    '101-ruza-dostava.html',
    'bijele-ruze-znacenje-i-dostava.html',
    'brza-dostava-cvijeca-na-adresu.html',
    'cvjecarna-zagreb-online.html',
    'luksuzni-buketi-zagreb.html',
    'rodendanski-buket-ruza-zagreb.html',
    'savjeti-za-odrzavanje-ruza.html'
];

badFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Match the seo-header that is outside <main>
        const seoMatch = content.match(/(<section class="seo-header"[\s\S]*?<\/section>)\s*<main class="container">/);
        if (seoMatch) {
            const seoHeaderContent = seoMatch[1];
            
            // Remove the seo-header from its original position
            content = content.replace(seoHeaderContent, '');
            
            // Now find <main class="container"> and remove EVERYTHING until <div class="blog-product-grid-container
            // and insert the seoHeaderContent right after <main class="container">
            content = content.replace(/<main class="container">[\s\S]*?(<div class="blog-product-grid-container)/, 
                                    '<main class="container">\n        ' + seoHeaderContent + '\n        $1');
            
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed structure in: ' + file);
        } else {
            console.log('Could not find the expected layout in: ' + file);
        }
    }
});
