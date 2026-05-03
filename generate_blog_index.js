const fs = require('fs');

const data = [
  { file: "buket-crvenih-ruza-cijena.html", title: "1. Buket crvenih ruža cijena", img: "prod_red.jpg" },
  { file: "poklon-za-valentinovo-zagreb.html", title: "2. Poklon za Valentinovo Zagreb", img: "Gemini_Generated_Image_6satt66satt66sat.webp" },
  { file: "101-ruza-dostava.html", title: "3. 101 ruža dostava", img: "Gemini_Generated_Image_o3fwspo3fwspo3fw.webp" },
  { file: "cvjecarna-zagreb-online.html", title: "4. Cvjećarna Zagreb online", img: "Snimka zaslona 2026-04-22 003719.webp" },
  { file: "savjeti-za-odrzavanje-ruza.html", title: "5. Kako produljiti svježinu ruža: Savjeti stručnjaka", img: "grand_roze.png" },
  { file: "brza-dostava-cvijeca-na-adresu.html", title: "6. Brza dostava cvijeća na adresu", img: "pravoj_bijele_ruze.png" },
  { file: "bijele-ruze-znacenje-i-dostava.html", title: "7. Bijele ruže značenje i dostava", img: "white_17.webp" },
  { file: "rodendanski-buket-ruza-zagreb.html", title: "8. Rođendanski buket ruža Zagreb", img: "Gemini_Generated_Image_ca1hgkca1hgkca1h.webp" },
  { file: "luksuzni-buketi-zagreb.html", title: "9. Luksuzni buketi Zagreb", img: "purple_17.webp" },
  { file: "dostava-ruza-zagreb.html", title: "10. Dostava ruža Zagreb", img: "prod_orange_new.png" },
  { file: "postani-majstor-romantike.html", title: "11. Postani majstor romantike", img: "Gemini_Generated_Image_2jj5zl2jj5zl2jj5 (1).webp" },
  { file: "rodendansko-iznenadenje-99-ruza.html", title: "12. Rođendansko iznenađenje 99 ruža", img: "prod_huge.jpg" },
  { file: "slanje-ruza-u-ured-zagreb.html", title: "13. Slanje ruža u ured Zagreb", img: "rose-logo.png" }
];

let itemsHtml = '';

data.forEach((item) => {
    itemsHtml += `
    <article class="product-card" style="margin-bottom: 2rem;">
        <div class="image-wrapper" style="height: 300px;">
            <a href="${item.file}">
                <img src="assets/${item.img}" alt="${item.title}" style="height: 100%; object-fit: cover;">
            </a>
        </div>
        <div class="product-info" style="justify-content: center; padding: 1.5rem;">
            <a href="${item.file}" class="btn-primary" style="text-decoration: none; display: inline-block; width: 100%; text-align: center; white-space: normal; line-height: 1.4;">${item.title}</a>
        </div>
    </article>
    `;
});

const blogMainHtml = `
<main class="container" style="padding-top: 12rem;">
    <section class="product-grid grid-3 cols">
        ${itemsHtml}
    </section>
</main>
`;

const indexHtml = fs.readFileSync('index.html', 'utf8');
let newHtml = indexHtml.replace(/<main class="container">[\s\S]*?<\/main>/, blogMainHtml);
// Remove the redundant SEO links section from the blog page
newHtml = newHtml.replace(/<section class="seo-links-section[\s\S]*?<\/section>/, '');
newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>Više za vas - Blog - Buket3klika</title>`);
newHtml = newHtml.replace(/<h1 class="hero-title">.*?<\/h1>/, `<h1 class="hero-title" style="color: var(--accent-red);">Više za vas blog</h1>`);
newHtml = newHtml.replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/, ``);
newHtml = newHtml.replace(/RuĹle/g, 'Ruže');
newHtml = newHtml.replace(/ruĹle/g, 'ruže');
newHtml = newHtml.replace(/ruĹLa/g, 'ruža');
newHtml = newHtml.replace(/ruĹla/g, 'ruža');
newHtml = newHtml.replace(/cvijeÄ‡a/g, 'cvijeća');
newHtml = newHtml.replace(/cvjeÄ‡arnica/g, 'cvjećarnica');
newHtml = newHtml.replace(/ViĹˇe/g, 'Više');
newHtml = newHtml.replace(/najbrĹľu/g, 'najbržu');
newHtml = newHtml.replace(/ÄŤesta/g, 'Česta');
newHtml = newHtml.replace(/KorisniÄŤki raÄŤun/g, 'Korisnički račun');
newHtml = newHtml.replace(/RoÄ‘endanski/g, 'Rođendanski');
newHtml = newHtml.replace(/iznenadenje/g, 'iznenađenje');
newHtml = newHtml.replace(/narudĹľbu/g, 'narudžbu');
newHtml = newHtml.replace(/koriĹˇtenja/g, 'korištenja');
newHtml = newHtml.replace(/pristupaÄŤnosti/g, 'pristupačnosti');
newHtml = newHtml.replace(/IspriÄŤavamo/g, 'Ispričavamo');
newHtml = newHtml.replace(/Ĺľupaniji/g, 'županiji');
newHtml = newHtml.replace(/\ufffd/g, ' '); // Remove replacement characters

fs.writeFileSync('blog.html', newHtml);
console.log('Successfully generated blog.html with 14 aligned posts');
