const fs = require('fs');

const restoredBlogs = {
    'dostava-ruza-zagreb.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Kada emocije treba pretočiti u opipljivu gestu, vrijeme i mjesto igraju ključnu ulogu. U dinamičnom ritmu glavnog grada, pronalazak savršenog buketa često zna biti izazov. Srećom, vrhunska dostava ruža u Zagrebu nikada nije bila jednostavnija i pouzdanija – uz Buket3klika, vašeg osobnog partnera za trenutke koji se pamte.</p>
                <p>Mi ne dostavljamo samo cvijeće; mi isporučujemo čisti, nepatvoreni osjećaj pažnje. Od odabira najljepših, čvrstih pupoljaka do besprijekorno čistog, minimalističkog pakiranja, svaki korak našeg procesa podređen je jednom cilju: izazivanju oduševljenja. Naš asortiman nudi sve što vam je potrebno, od romantičnih crvenih do profinjenih bijelih nota.</p>
                <p>Znamo da se najbolje priče ne planiraju mjesecima unaprijed. Zato naša ekspresna dostava pokriva cijeli Zagreb i okolicu, osiguravajući da vaše iznenađenje stigne svježe i netaknuto. Naši dostavljači paze na svaki aranžman kao na malo umjetničko djelo, ostavljajući iza sebe samo miris ruža i osmijehe.</p>
                <p>Nema potrebe za beskonačnim pretraživanjem po gradu. Prepustite nama da vašu emociju pretvorimo u raskošnu cvjetnu priču. Tri klika dovoljna su da nekome uljepšate dan i pokažete zašto je prava romantika uvijek u modi.</p>
            </div>`,

    'postani-majstor-romantike.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Majstorstvo romantike ne znači pjevanje serenada pod prozorom u dva ujutro. Pravi, moderni džentlmen zna da su istinske geste u onim naizgled jednostavnim, ali savršeno izvedenim trenucima. A ništa ne govori "imam stila" poput neočekivane dostave vrhunskog buketa svježih ruža na njezina vrata.</p>
                <p>Zaboravite na panične kupovine na usputnim benzinskim crpkama ili u supermarketima. Romantika s potpisom zahtijeva kvalitetu, estetiku i faktor iznenađenja. Bilo da se odlučite za duboke, strastvene crvene ruže ili elegantne, suptilne roze nijanse, naš minimalistički dizajn osigurava da cvijeće apsolutno dominira svakim prostorom.</p>
                <p>Najbolji romantičari znaju cijeniti i dobru logistiku. Vaše je samo da znate adresu i osmislite onu jednu, pametnu rečenicu za posvetu. Mi preuzimamo sve ostalo – od selekcije najljepših cvjetova do diskretne i sigurne dostave u optimalnim uvjetima.</p>
                <p>Pokažite joj da pažnja ne mora biti rezervirana samo za rođendane i godišnjice. Naručite buket danas, "samo zato", i gledajte kako s nevjerojatnom lakoćom osvajate titulu majstora romantike. S Buket3klika, vrhunska elegancija vam je uvijek pri ruci.</p>
            </div>`,

    'rodendansko-iznenadenje-99-ruza.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Postoje rođendani, i postoje rođendani koji se prepričavaju generacijama. Ako tražite način kako da nadmašite sva očekivanja i ostavite nju (i sve prisutne) potpuno bez daha, predstavljamo vam naš Grand Buket – impresivnu kupolu od 99 pomno odabranih, luksuznih ruža.</p>
                <p>Ovo nije običan poklon; ovo je moćna "statement" gesta. Kada 99 savršenih pupoljaka stigne na njezina vrata, svaka riječ postaje suvišna. Ovaj grandiozni aranžman simbolizira bezuvjetnu pažnju i osjećaj za nepatvoreni luksuz koji si rijetki mogu, i znaju, priuštiti.</p>
                <p>Znamo da ovakav gigant zahtijeva i posebne uvjete. Kako biste izbjegli nespretno traženje adekvatnih posuda, naš Grand Buket isporučujemo već sigurno smješten u elegantnu staklenu vazu s čistom vodom. Vaše rođendansko iznenađenje stiže spremno da odmah postane centar proslave.</p>
                <p>Dopustite nam da budemo vaši tajni partneri u kreiranju savršenog rođendanskog trenutka. Diskretna i sigurna dostava na području Zagreba garantira da će ovo monumentalno iznenađenje stići netaknuto i izazvati onaj autentični, predivni šok oduševljenja.</p>
            </div>`,

    'slanje-ruza-u-ured-zagreb.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Učiniti da se osjeća posebno sjajan je osjećaj, ali učiniti da se osjeća posebno pred cijelim uredom? To je već viša razina igre. Iznenadna isporuka luksuznog buketa na njezino radno mjesto gesta je koja razbija monotoniju radnog dana i garantira joj status glavne teme ureda.</p>
                <p>Bilo da proslavlja promaknuće, rođendan ili jednostavno želite prekinuti njezin stresni utorak, isporuka naših besprijekornih ruža šalje jasnu poruku o vašem stilu. Naši buketi dizajnirani su s mjerom – dovoljno raskošni da izazovu tiho divljenje kolega, a opet dovoljno elegantni i pročišćeni da se savršeno uklope u profesionalno okruženje.</p>
                <p>Razumijemo važnost poslovne diskrecije. Naši dostavljači su profesionalni, tihi i iznimno pažljivi. Buket stiže osiguran i svjež, često već u svojoj adekvatnoj vazi, pa ne mora gubiti vrijeme tražeći posude u uredskoj čajnoj kuhinji.</p>
                <p>Ostavite kratku, šarmantnu poruku, odaberite savršenu boju ruža i prepustite nama logistiku. Slanje ruža u ured s Buket3klika najsigurniji je i najluksuzniji način da joj uljepšate dan i pokažete nevjerojatan osjećaj za stil.</p>
            </div>`
};

for (const [filename, newText] of Object.entries(restoredBlogs)) {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');
        
        // 1. Strip duplicated homepage content
        const seoMatch = content.match(/(<section class="seo-header"[\s\S]*?<\/section>)\s*<main class="container">/);
        if (seoMatch) {
            const seoHeaderContent = seoMatch[1];
            content = content.replace(seoHeaderContent, '');
            content = content.replace(/<main class="container">[\s\S]*?(<div class="blog-product-grid-container)/, 
                                    '<main class="container">\n        ' + seoHeaderContent + '\n        $1');
        }
        
        // 2. Replace the old text with the new elegant text
        content = content.replace(/(<section class="seo-header"[^>]*>[\s\S]*?<h2[^>]*>[^<]+<\/h2>\s*)<div style="text-align: justify;[^>]*>[\s\S]*?<\/div>(\s*<\/section>)/, 
            '$1' + newText + '$2');
            
        // 3. Update the Call To Action
        content = content.replace(/Sviđaju Vam se ruže iz teksta\?\s*Naručite odmah!/g, 'Izaberite vaš buket za narudžbu');
        content = content.replace(/Naručite odmah!/g, 'Izaberite vaš buket za narudžbu');
        
        // 4. Update script version
        content = content.replace(/script\.js\?v=[\d\.]+/g, 'script.js?v=3.9');
        
        fs.writeFileSync(filename, content, 'utf8');
        console.log('Restored, cleaned and updated: ' + filename);
    }
}
