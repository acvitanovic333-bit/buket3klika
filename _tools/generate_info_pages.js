const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Generate O Nama
const oNamaHtml = `
<main class="container" style="padding-top: 12rem; min-height: 70vh;">
    <div class="info-card-container" style="max-width: 800px; margin: 0 auto; text-align: center; background: var(--bg-card); padding: 3rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h1 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 2rem; color: var(--accent-red); letter-spacing: -0.5px;">Najjednostavniji put do savršenog cvjetnog iznenađenja</h1>
        <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 1.5rem;">Zaboravite na komplicirane procese i sate razmišljanja. Buket3klika je <strong style="color: var(--accent-red);">osmišljen za maksimalnu jednostavnost dostave</strong> najsvježijih ruža u Zagrebu, bez suvišnih koraka.</p>
        <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 1.5rem;">Vjerujemo da darivanje treba biti užitak, a ne obaveza. Zato smo kreirali sustav koji vas od odluke do gotove narudžbe dijeli kroz doslovno <strong style="color: var(--accent-red);">3 klika.</strong> Vi birate emociju, a mi osiguravamo besprijekornu realizaciju.</p>
        <p style="font-size: 1.2rem; line-height: 1.8; font-weight: bold;">Najbolji dio? Vaš buket stiže na njezina (ili vaša) vrata unutar samo sat vremena!</p>
    </div>
</main>
`;

let onama = indexHtml.replace(/<main class="container">[\s\S]*?<\/main>/, oNamaHtml);
onama = onama.replace(/<title>.*?<\/title>/, `<title>O Nama - Buket3klika</title>`);
onama = onama.replace(/<header class="hero">[\s\S]*?<\/header>/, ``); // Remove hero
fs.writeFileSync('o-nama.html', onama);


// 2. Generate FAQ
const faqHtml = `
<main class="container" style="padding-top: 12rem; min-height: 70vh;">
    <h1 style="text-align: center; font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 3rem; color: var(--accent-red);">Česta Pitanja (FAQ)</h1>
    
    <div style="max-width: 800px; margin: 0 auto;">
        
        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent-red);">1. Na kojim lokacijama dostavljate?</h3>
            <p style="line-height: 1.6;">Naša dostava pokriva apsolutno cijeli grad <b>Zagreb i Zagrebačku županiju</b>. Od samog centra grada pa sve do okolnih naselja, možete računati na sigurnu i pouzdanu isporuku bez ikakvih problema.</p>
        </div>

        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent-red);">2. Koliko traje dostava?</h3>
            <p style="line-height: 1.6;">Ponosni smo na našu brzinu! Nakon što vaša narudžba bude zaprimljena, naš tim odmah kreće u akciju i vaš savršeni buket stiže na odabranu lokaciju <b>unutar samo jednog sata!</b> Nema dugih čekanja ni nesigurnosti.</p>
        </div>

        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent-red);">3. Mogu li naručiti specifičan broj ruža?</h3>
            <p style="line-height: 1.6;">Naravno! Bez obzira slavite li posebnu obljetnicu i trebate točno 17 ruža, ili jednostavno želite 101 ružu kako biste ju impresionirali, na našoj stranici postoji posebna opcija "Naručivanje određenog broja" gdje sami kreirate svoj buket od 1 komada pa na više.</p>
        </div>

        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent-red);">4. Može li dostava biti anonimna?</h3>
            <p style="line-height: 1.6;">Apsolutno da. Jamčimo potpunu diskreciju. Ukoliko nas napomenete, ili jednostavno ne potpišete poruku uz buket, osoba koja prima cvijeće nikada neće od nas saznati tko je tajni obožavatelj.</p>
        </div>

        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent-red);">5. Kako mogu pratiti svoju narudžbu?</h3>
            <p style="line-height: 1.6;">Nakon svake narudžbe dobit ćete jedinstveni kod (npr. BK-123456). Taj kod možete unijeti klikom na <b>ikonu korisnika (čovječuljak)</b> u gornjem desnom kutu stranice. Tamo ćete odmah vidjeti je li vaš buket zaprimljen, u izradi ili je već na putu prema vama.</p>
        </div>

        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent-red);">6. Jesu li ruže svježe?</h3>
            <p style="line-height: 1.6;">Naše cvijeće nabavljamo isključivo od provjerenih uzgajivača svakoga dana. Preskačemo posrednike koji cvijeće drže danima u hladnjačama, stoga vam garantiramo 100% premium svježinu i dugotrajnost latica.</p>
        </div>

    </div>
</main>
`;

let faq = indexHtml.replace(/<main class="container">[\s\S]*?<\/main>/, faqHtml);
faq = faq.replace(/<title>.*?<\/title>/, `<title>Česta Pitanja - Buket3klika</title>`);
faq = faq.replace(/<header class="hero">[\s\S]*?<\/header>/, ``); // Remove hero
fs.writeFileSync('faq.html', faq);


// 3. Generate Kontakt
const kontaktHtml = `
<main class="container" style="padding-top: 12rem; min-height: 70vh;">
    <h1 style="text-align: center; font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 3rem; color: var(--accent-red);">Kontaktirajte nas</h1>
    
    <div class="info-card-container" style="display: flex; flex-wrap: wrap; gap: 3rem; max-width: 1000px; margin: 0 auto; background: var(--bg-card); padding: 3rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <!-- Contact Info -->
        <div style="flex: 1; min-width: 300px;">
            <h2 style="font-family: var(--font-heading); margin-bottom: 1.5rem;">Naši podaci</h2>
            <p style="font-size: 1.2rem; margin-bottom: 1rem;"><i class="fa fa-phone" style="width: 30px; color: var(--accent-red);"></i> <a href="tel:+385976050419" style="text-decoration: none; color: inherit; font-weight: bold;">+385 97 605 0419</a></p>
            <p style="font-size: 1.2rem; margin-bottom: 1rem;"><i class="fa fa-envelope" style="width: 30px; color: var(--accent-red);"></i> <a href="mailto:info@buket3klika.hr" style="text-decoration: none; color: inherit; font-weight: bold;">info@buket3klika.hr</a></p>
            <p style="font-size: 1.2rem; margin-bottom: 1rem;"><i class="fa fa-map-marker" style="width: 30px; color: var(--accent-red);"></i> Zagreb i Zagrebačka županija</p>
            
            <div style="margin-top: 3rem;">
                <p style="opacity: 0.8; line-height: 1.6;">Imate posebnu želju? Trebate brzu provjeru narudžbe? Uvijek smo dostupni putem telefona i rado ćemo vam pomoći!</p>
            </div>
        </div>

        <div style="flex: 1; min-width: 300px;">
            <h2 style="font-family: var(--font-heading); margin-bottom: 1.5rem;">Pošaljite nam upit</h2>
            <form id="contact-form" action="#" method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; flex-direction: column;">
                    <label style="margin-bottom: 0.5rem; font-weight: 500;">Ime i prezime</label>
                    <input type="text" id="contact-name" name="name" required style="padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label style="margin-bottom: 0.5rem; font-weight: 500;">Email adresa</label>
                    <input type="email" id="contact-email" name="email" required style="padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label style="margin-bottom: 0.5rem; font-weight: 500;">Vaša poruka</label>
                    <textarea id="contact-message" name="message" rows="5" required style="padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                <button type="submit" id="contact-submit-btn" class="btn-primary" style="font-size: 1.1rem; padding: 1rem; margin-top: 0.5rem;">Pošalji poruku</button>
            </form>
        </div>
        
    </div>
</main>
`;

let kontakt = indexHtml.replace(/<main class="container">[\s\S]*?<\/main>/, kontaktHtml);
kontakt = kontakt.replace(/<title>.*?<\/title>/, `<title>Kontakt - Buket3klika</title>`);
kontakt = kontakt.replace(/<header class="hero">[\s\S]*?<\/header>/, ``); // Remove hero
fs.writeFileSync('kontakt.html', kontakt);

console.log('Successfully generated info pages: o-nama.html, faq.html, kontakt.html');
