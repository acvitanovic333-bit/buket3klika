const fs = require('fs');

const filepath = 'index.html';
let content = fs.readFileSync(filepath, 'utf-8');

const targetRegex = /<article class="product-card large">\s*<div class="image-wrapper">\s*<img src="assets\/grand_roze\.png" alt="Grand Roze ruže - dostava cvijeća">\s*<button class="wishlist-btn"><i class="fa-regular fa-heart"><\/i><\/button>\s*<div class="product-title-overlay top-left" style="color: #d81b60;">Grand Roze Ruže<\/div>\s*<div class="rose-count-overlay">49 ruža<\/div>\s*<span class="price">Od €122\.50<\/span>\s*<\/div>\s*<\/article>/;

const replacement = `             <article class="product-card large">
                <div class="image-wrapper">
                    <img src="assets/grand_roze.png" alt="Grand Roze ruže - dostava cvijeća">
                    <button class="wishlist-btn"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-title-overlay top-left" style="color: #d81b60;">Grand Roze Ruže</div>
                    <div class="rose-count-overlay">49 ruža</div>
                </div>
                <div class="product-info">
                    <span></span>
                    <span class="price">Od €122.50</span>
                </div>
            </article>

             <article class="product-card large">
                <div class="image-wrapper">
                    <img src="assets/pravoj_bijele_ruze.png" alt="Grande Bijele ruže - premium dostava Zagreb">
                    <button class="wishlist-btn"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-title-overlay top-left" style="color: white; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">Grande Bijele Ruže</div>
                    <div class="rose-count-overlay">49 ruža</div>
                </div>
                <div class="product-info">
                    <span></span>
                    <span class="price">Od €122.50</span>
                </div>
            </article>`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log("Fixed products in index.html");
} else {
    console.log("Target not found. Please review the regex.");
}
