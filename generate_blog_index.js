const fs = require('fs');

const data = [
  { file: "dostava-ruza-zagreb.html", title: "1. Dostava ruža Zagreb", text: "Tražite li pouzdanu i ekspresnu isporuku najljepših ruža na području glavnog grada? Dostava ruža Zagreb naša je glavna specijalizacija." },
  { file: "buket-crvenih-ruza-cijena.html", title: "2. Buket crvenih ruža cijena", text: "Ljudi koji ovo traže su blizu odluke o kupnji i zanima ih vrijednost za novac. Fokus: Transparentnost." },
  { file: "poklon-za-valentinovo-zagreb.html", title: "3. Poklon za Valentinovo Zagreb", text: "Sezonska ključna riječ visokog intenziteta. Fokus: Romantika i 'spas u zadnji čas'." },
  { file: "101-ruza-dostava.html", title: "4. 101 ruža dostava", text: "Ovo traže kupci koji žele ostaviti snažan dojam (i imaju veći budžet). Fokus: Ekskluzivnost." },
  { file: "cvjecarna-zagreb-online.html", title: "5. Cvjećarna Zagreb online", text: "Targetiraš ljude koji preferiraju digitalnu kupnju bez odlaska u fizičku poslovnicu." },
  { file: "savjeti-za-odrzavanje-ruza.html", title: "6. Kako produljiti svježinu ruža: Savjeti stručnjaka", text: "Kada dobijete savršen buket, želite da traje što duže. Fokus: Praktični savjeti o održavanju." },
  { file: "brza-dostava-cvijeca-na-adresu.html", title: "7. Brza dostava cvijeća na adresu", text: "Ključna riječ za 'zaboravne' ili hitne situacije (rođendani, godišnjice). Fokus: Logistika." },
  { file: "bijele-ruze-znacenje-i-dostava.html", title: "8. Bijele ruže značenje i dostava", text: "Edukativni sadržaj koji privlači ljude koji traže cvijeće za vjenčanja ili kao znak poštovanja." },
  { file: "rodendanski-buket-ruza-zagreb.html", title: "9. Rođendanski buket ruža Zagreb", text: "Personalizirani pristup za proslave. Fokus: Čestitke i personalizacija." },
  { file: "luksuzni-buketi-zagreb.html", title: "10. Luksuzni buketi Zagreb", text: "Targetiraš high-end klijentelu. Fokus: Kvaliteta iznad svega." },
  { file: "postani-majstor-romantike.html", title: "11. Postani Majstor Romantike", text: "Zamisli scenu. Petak je navečer, 19:15 h. Sve počinje jednim klikom i savršenim buketom." },
  { file: "slanje-ruza-u-ured-zagreb.html", title: "12. Slanje Vrhunskih Ruža u Ured", text: "Poslovni bonton i romantika ponekad idu ruku pod ruku. Iznenadite je na radnom mjestu." },
  { file: "rodendansko-iznenadenje-99-ruza.html", title: "13. Rođendansko Iznenađenje: 99 Ruža", text: "Ostavite sve dugoročne propuste po strani. Predivan grand buket od čak 99 ruža donosi neponovljivi Wow efekt." },
  { file: "nagradna-igra-osvoji-popust.html", title: "14. Nagradna igra: Osvoji 15% popusta!", text: "Kliknite na srce pored proizvoda, pošaljite nam link na Instagram i osvojite kod za popust!" }
];

let itemsHtml = '';
const images = [
    'Gemini_Generated_Image_yewortyewortyewo.png',
    'prod_red.jpg',
    'Gemini_Generated_Image_6satt66satt66sat.webp',
    'Gemini_Generated_Image_o3fwspo3fwspo3fw.webp',
    'Snimka zaslona 2026-04-22 003719.webp',
    'grand_roze.png',
    'pravoj_bijele_ruze.png',
    'https://www.odealarose.com/media/cache/767_1024_jpeg/product/php6w4sAb-68c196f7c6e67.jpeg',
    'Gemini_Generated_Image_ca1hgkca1hgkca1h.webp',
    'https://www.odealarose.com/media/cache/767_1024_jpeg/product/phpE2xPQB-68c1971b8371f.jpeg',
    'prod_orange_new.png',
    'Gemini_Generated_Image_ctos43ctos43ctos.webp',
    'prod_huge.jpg',
    'Gemini_Generated_Image_yewortyewortyewo.png' // Placeholder for giveaway
];

data.forEach((item, index) => {
    let imgSrc = images[index % images.length];

    itemsHtml += `
    <article class="product-card" style="margin-bottom: 2rem;">
        <div class="image-wrapper" style="height: 300px;">
            <a href="${item.file}">
                <img src="assets/${imgSrc}" alt="${item.title}" style="height: 100%; object-fit: cover;">
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
newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>Više za vas - Blog - Buket3klika</title>`);
newHtml = newHtml.replace(/<h1 class="hero-title">.*?<\/h1>/, `<h1 class="hero-title" style="color: var(--accent-red);">Više za vas blog</h1>`);
newHtml = newHtml.replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/, ``);

fs.writeFileSync('blog.html', newHtml);
console.log('Successfully generated blog.html');
