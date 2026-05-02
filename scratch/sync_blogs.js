const fs = require('fs');
const execSync = require('child_process').execSync;

const blogsToKeep = [
  { file: "buket-crvenih-ruza-cijena.html", title: "Buket crvenih ruža cijena" },
  { file: "poklon-za-valentinovo-zagreb.html", title: "Poklon za Valentinovo" },
  { file: "101-ruza-dostava.html", title: "101 ruža dostava" },
  { file: "cvjecarna-zagreb-online.html", title: "Online cvjećarnica Zagreb" },
  { file: "savjeti-za-odrzavanje-ruza.html", title: "Savjeti za održavanje ruža" },
  { file: "brza-dostava-cvijeca-na-adresu.html", title: "Brza dostava cvijeća" },
  { file: "bijele-ruze-znacenje-i-dostava.html", title: "Bijele ruže značenje" },
  { file: "rodendanski-buket-ruza-zagreb.html", title: "Rođendanski buket ruža" },
  { file: "luksuzni-buketi-zagreb.html", title: "Luksuzni buketi Zagreb" }
];

const blogsToDelete = [
  "postani-majstor-romantike.html",
  "slanje-ruza-u-ured-zagreb.html",
  "rodendansko-iznenadenje-99-ruza.html",
  "ruze-u-kutiji-flower-box-zagreb.html",
  "dostava-ruza-zagreb.html"
];

// 1. Delete the extra files
blogsToDelete.forEach(file => {
    if(fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log("Deleted file: ", file);
    }
});

// 2. Generate the new exact SEO block matching the blog page
let seoLinksHtml = `
        <section class="seo-links-section mt-lg" style="max-width: 1200px; margin: 3rem auto; padding: 2rem; border-top: 1px solid #eee;">
            <h3 style="font-family: var(--font-heading); color: var(--text-primary); margin-bottom: 1.5rem; font-size: 1.5rem;">Naši blogovi</h3>
            <div class="seo-links-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">`;

blogsToKeep.forEach(blog => {
    seoLinksHtml += `
                <a href="/${blog.file}" style="color: var(--accent-red); text-decoration: none;">${blog.title}</a>`;
});

seoLinksHtml += `
            </div>
        </section>`;

// 3. Replace the SEO block in all remaining HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<section class="seo-links-section[\s\S]*?<\/section>/, seoLinksHtml.trim());
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Updated SEO links across all pages.");

// 4. Update generate_blog_index.js to only contain the 9 blogs
let genScript = fs.readFileSync('generate_blog_index.js', 'utf8');
const newDataArray = `const data = [
  { file: "buket-crvenih-ruza-cijena.html", title: "1. Buket crvenih ruža cijena", img: "prod_red.jpg" },
  { file: "poklon-za-valentinovo-zagreb.html", title: "2. Poklon za Valentinovo Zagreb", img: "Gemini_Generated_Image_6satt66satt66sat.webp" },
  { file: "101-ruza-dostava.html", title: "3. 101 ruža dostava", img: "Gemini_Generated_Image_o3fwspo3fwspo3fw.webp" },
  { file: "cvjecarna-zagreb-online.html", title: "4. Cvjećarna Zagreb online", img: "Snimka zaslona 2026-04-22 003719.webp" },
  { file: "savjeti-za-odrzavanje-ruza.html", title: "5. Kako produljiti svježinu ruža: Savjeti stručnjaka", img: "grand_roze.png" },
  { file: "brza-dostava-cvijeca-na-adresu.html", title: "6. Brza dostava cvijeća na adresu", img: "pravoj_bijele_ruze.png" },
  { file: "bijele-ruze-znacenje-i-dostava.html", title: "7. Bijele ruže značenje i dostava", img: "white_17.webp" },
  { file: "rodendanski-buket-ruza-zagreb.html", title: "8. Rođendanski buket ruža Zagreb", img: "Gemini_Generated_Image_ca1hgkca1hgkca1h.webp" },
  { file: "luksuzni-buketi-zagreb.html", title: "9. Luksuzni buketi Zagreb", img: "purple_17.webp" }
];`;

genScript = genScript.replace(/const data = \[[\s\S]*?\];/, newDataArray);
fs.writeFileSync('generate_blog_index.js', genScript, 'utf8');

// 5. Regenerate the blog.html page
execSync('node generate_blog_index.js', { stdio: 'inherit' });
console.log("Successfully rebuilt blog.html with only 9 items.");
