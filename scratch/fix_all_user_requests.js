const fs = require('fs');
const execSync = require('child_process').execSync;

// 1. Remove <a> tags from index.html product cards to restore checkout popup
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<a href="\/.*?\.html" style="text-decoration: none; color: inherit;">\s*(<div class="image-wrapper">[\s\S]*?<\/div>)\s*<\/a>/g, '$1');
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log("Removed links from index.html product cards.");

// 2. Extract product grid
const productsMatch = indexHtml.match(/(<!-- Row 1: 3 items -->[\s\S]*?)(?=<!-- Extra Action Buttons -->)/);
const productGridHtml = productsMatch ? productsMatch[1] : '';

// 3. Restore original blog.html images
execSync('node generate_blog_index.js', { stdio: 'inherit' });
console.log("Restored original blog.html images.");

// 4. Inject product grid into all 14 blog posts
const blogs = [
  "buket-crvenih-ruza-cijena.html",
  "poklon-za-valentinovo-zagreb.html",
  "101-ruza-dostava.html",
  "cvjecarna-zagreb-online.html",
  "savjeti-za-odrzavanje-ruza.html",
  "brza-dostava-cvijeca-na-adresu.html",
  "bijele-ruze-znacenje-i-dostava.html",
  "rodendanski-buket-ruza-zagreb.html",
  "luksuzni-buketi-zagreb.html",
  "postani-majstor-romantike.html",
  "slanje-ruza-u-ured-zagreb.html",
  "rodendansko-iznenadenje-99-ruza.html",
  "ruze-u-kutiji-flower-box-zagreb.html",
  "dostava-ruza-zagreb.html"
];

blogs.forEach(blog => {
    if(fs.existsSync(blog)) {
        let content = fs.readFileSync(blog, 'utf8');
        
        // Ensure no previous injections are duplicated
        content = content.replace(/<div class="blog-product-grid-container[\s\S]*?<\/div>\s*<!-- SEO Links Section -->/g, '<!-- SEO Links Section -->');
        
        const injection = `
        <div class="blog-product-grid-container mt-lg" style="border-top: 1px solid #eee; padding-top: 3rem; margin-top: 3rem;">
            <h3 style="text-align: center; font-family: var(--font-heading); color: var(--accent-red); margin-bottom: 2rem; font-size: 2rem;">Sviđaju Vam se ruže iz teksta? Naručite odmah!</h3>
            ${productGridHtml}
        </div>
        `;
        
        if (content.includes('<!-- SEO Links Section -->')) {
            content = content.replace('<!-- SEO Links Section -->', injection + '\n        <!-- SEO Links Section -->');
        } else {
            content = content.replace('</main>', injection + '\n    </main>');
        }
        
        fs.writeFileSync(blog, content, 'utf8');
        console.log(`Injected product grid into ${blog}`);
    }
});

console.log("All user requests applied successfully.");
