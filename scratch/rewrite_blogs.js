const fs = require('fs');

const blogTexts = {
    'buket-crvenih-ruza-cijena.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Kada pretražujete pojam cijena crvenih ruža, obično samo tražite brojku. Ali mi u Buket3klika znamo da ne kupujete obično cvijeće – vi kupujete onaj neprocjenjivi trenutak kada joj se ozari lice i kada cijeli svijet na trenutak stane. Crvene ruže su nepobjedivi klasik s razlogom; one su najčišći izraz prave ljubavi koji nikada ne izlazi iz mode.</p>
                <p>Naše cijene su jednako elegantne i transparentne kao i vaze u kojima dostavljamo. Počinjemo od <b>€47.50</b> za pažljivo aranžiran buket koji govori mnogo više od tisuću riječi. Zašto baš mi? Zato što kod nas nema neugodnih iznenađenja. Ne isporučujemo cvijeće koje će sutra uvenuti, već pomno birane premium ruže od kojih istinski zastaje dah.</p>
                <p>Bilo da slavite važnu godišnjicu, planirate veliki korak u životu ili se samo želite iskupiti za onaj sitni nesporazum (hej, događa se i najboljima!), naša brza dostava po Zagrebu tu je da spasi stvar. Ruže stižu svježe, u elegantnom minimalističkom pakiranju, s vašom osobnom porukom za dodir romantike.</p>
                <p>Odaberite savršen broj ruža, prepustite nam logistiku i pripremite se za titulu najromantičnije osobe mjeseca. Jer vrhunska gesta ne mora biti komplicirana – udaljena je od vas samo tri klika!</p>
            </div>`,

    'poklon-za-valentinovo-zagreb.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Svi dobro znamo onaj lagani pritisak koji dolazi s veljačom. Traženje savršenog poklona za Valentinovo u Zagrebu lako se pretvori u pravu malu misiju, pogotovo kada želite izbjeći one predvidljive i već viđene darove. Srećom, postoji jedan jezik koji apsolutno svi razumiju – jezik raskošnih ruža.</p>
                <p>U Buket3klika odlučili smo vam značajno olakšati život. Nema više trčanja po gradu i gužvama u zadnji čas. Vaša jedina obaveza je odabrati boju koja najbolje pristaje njezinu karakteru – vatreno crvena za klasičnu romansu, nježno roza za slatke trenutke ili možda besprijekorno bijela za čistu eleganciju.</p>
                <p>Svi naši buketi za Dan zaljubljenih stižu u premium minimalističkom aranžmanu, uz diskretnu karticu na kojoj možete ostaviti poruku (ili onaj tajanstveni potpis koji će ju zaintrigirati). Naši kuriri postaju vaši osobni asistenti romantike koji će se pobrinuti da iznenađenje stigne na prava vrata točno na vrijeme.</p>
                <p>Zato, umjesto stresa oko pronalaska dara na vrijeme, odigrajte elegantno i na sigurno. Naručite premium buket i osigurajte si onaj pravi filmski poljubac. Mi odrađujemo posao, a vi – sasvim zasluženo – preuzimate zasluge!</p>
            </div>`,

    '101-ruza-dostava.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Postoje trenuci u životu kada je obično jednostavno – nedovoljno. Kada nekome želite reći "Volim te" toliko glasno da to zaista ostane urezano u sjećanje, odgovor je uvijek isti: impresivan buket od (gotovo) 101 ruže. Naš Grand Buket, sastavljen od 99 pažljivo odabranih premium ruža, stvoren je za one epske poteze o kojima se priča tjednima.</p>
                <p>Ovaj cvjetni div nije tek običan poklon; to je pravi spektakl elegancije. Bez obzira slavite li okruglu godišnjicu, proslavljate rođenje djeteta ili vam treba doista moćna, gospodska gesta isprike, ovakav buket redovito obara s nogu. Svaka ruža pomno je odabrana kako bi zajedno s ostalima tvorila savršenu i tešku kupolu čistog luksuza.</p>
                <p>Vjerojatno se pitate – "Tko uopće kod kuće drži vazu za toliko cvijeće?" Bez brige, i na to smo mislili! Naš Grand Buket dolazi već savršeno aranžiran i sigurno smješten u pročišćenu staklenu vazu s vodom. Nema rezanja, nema pretraživanja kuhinjskih ormarića – buket je spreman da trenutno postane centar njezina svijeta (i njezina Instagrama).</p>
                <p>Dopustite nam da vam pomognemo kreirati nezaboravan, gotovo filmski trenutak. Naša dostava pažljivo i diskretno donosi ovu raskoš ravno na vaša (ili njezina) vrata. Jer prava romantika ne priznaje kompromise, a uz Buket3klika, ona nikad nije bila dostupnija.</p>
            </div>`,

    'cvjecarna-zagreb-online.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Ubrzani tempo Zagreba često nam ostavlja premalo vremena za one važne, spontane znakove pažnje. Tu nastupamo mi – Buket3klika, vaša premium online cvjećarnica kojoj možete pristupiti iz udobnosti svog ureda, kauča ili čak dok ste zapeli na semaforu u Vukovarskoj.</p>
                <p>Zaboravite na brige oko parkinga i nepredvidivog radnog vremena. Naš izlog nikada ne spava, a buketi koje isporučujemo baš su onakvi kakvi izgledaju na fotografijama – raskošni, zapanjujuće svježi i besprijekorno uredni. Proces narudžbe kreiran je da bude brz, fluidan i potpuno bez stresa.</p>
                <p>Bilo da planirate rođendansko iznenađenje, elegantnu gestu za godišnjicu ili jednostavno želite nekome uljepšati naizgled običan utorak, mi smo tu za vas. Naš tim stručno slaže svaki buket s onom pažnjom prema detaljima koja razdvaja prosječno od luksuznog, koristeći samo najljepše rezove.</p>
                <p>Uz pouzdanu dostavu na širem području Zagreba, vaša jedina briga je sastaviti dovoljno iskrenu i romantičnu poruku koja ide uz cvijeće. Mi preuzimamo sve ostalo – i osiguravamo da vaše iznenađenje stigne svježe i sa stilom. Dobrodošli u pametno darivanje.</p>
            </div>`,

    'savjeti-za-odrzavanje-ruza.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Dobili ste (ili poklonili) vrhunski buket i pitate se kako tu svježu ljepotu sačuvati što dulje? Ruže su, baš kao i svaka prava ljubav, izuzetno predivne, ali traže tek mrvicu pažnje kako bi blistale iz dana u dan. Uz par naših provjerenih trikova, vaš će cvjetni aranžman prkositi vremenu.</p>
                <p>Prvo i zlatno pravilo: čista voda je apsolutno sve! Vaše ruže stižu svježe i – prilično žedne. Mijenjajte im vodu redovito, najbolje svaki drugi dan, te osigurajte da vaza bude besprijekorno čista. Maleni detalj koji čini čuda jest rezanje stabljika pod kutom od 45 stupnjeva pri svakoj promjeni vode kako bi ruže nesmetano "pile".</p>
                <p>Drugo važno pravilo tiče se lokacije. Ruže obožavaju svjetlost, ali nipošto ne uživaju u sunčanju na direktnom suncu. Držite ih podalje od radijatora i (vjerovali ili ne) zdjele s voćem, jer plodovi ubrzavaju starenje cvijeća. Pronađite im ugodno, prozračno mjesto gdje će dominirati vašim interijerom.</p>
                <p>Uz malo truda i ljubavi, vaš Buket3klika aranžman dugo će svjedočiti o onom posebnom trenutku darivanja. A kada konačno dođe vrijeme za svježu postavu, znate gdje ćete pronaći novu dozu ljepote – na samo tri klika od vas.</p>
            </div>`,

    'brza-dostava-cvijeca-na-adresu.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Svima nam se barem jednom dogodilo: pogledate u kalendar i odjednom shvatite da je onaj "iznimno bitan datum" zapravo – danas! Lagana panika, ubrzan puls... ali srećom, nema mjesta za stres. Buket3klika vaša je tajna adut-karta za iznenadne izljeve romantike ili brzinske znakove pažnje.</p>
                <p>Naša brza isporuka cvijeća kreirana je upravo kako bismo spašavali ovakve situacije. Ne morate izlaziti ranije s posla niti gubiti vrijeme u zagrebačkim gužvama. Svega nekoliko trenutaka na našoj stranici dovoljno je da luksuzni, premium buket krene na svoju destinaciju. Mi volimo misliti da smo poput vašeg osobnog čarobnjaka za romantiku.</p>
                <p>Svaki dostavljač pazi na vaš buket kao na kap vode na dlanu. Cvijeće putuje u provjerenim uvjetima, nerijetko već sigurno smješteno u vazi s vodom, kako bi na odredište stiglo svježe, čisto i besprijekorno – spremno za onaj neizbježan "wow" efekt čim se vrata otvore.</p>
                <p>Iznenadite je usred radnog dana u uredu, pošaljite raskoš u restoran prije vašeg dolaska ili je dočekajte kod kuće s gestom koja obara s nogu. Uz brzu dostavu, vi preuzimate status romantičnog junaka, dok mi osiguravamo da magija funkcionira na vrijeme.</p>
            </div>`,

    'bijele-ruze-znacenje-i-dostava.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Dok crvene ruže glasno i jasno govore "strast", bijele ruže onako elegantno, gotovo aristokratski šapuću "čista, iskrena ljubav". One su onaj bezvremenski klasik koji simbolizira duboko poštovanje i profinjenost. Odabir bijelih ruža odlika je istinskog džentlmena koji zna da prava ljepota ne treba glasne boje da bi ostavila trag.</p>
                <p>Ovakvi, suptilni i luksuzni buketi najčešće se biraju za važne prve godišnjice, proslave vjenčanja ili kao nevjerojatno elegantna gesta pomirenja (jer tko doista može ostati ravnodušan pored tako čistog, besprijekornog buketa?). Njihova estetika unosi instantni mir i premium osjećaj u apsolutno svaki interijer.</p>
                <p>Svaka ruža u našim bijelim aranžmanima pomno je selektirana; bez iti jedne greške, s laticama koje asociraju na netaknutu svilu. Vezane su decentno, u skladu s našim minimalističkim potpisom, kako bi fokus ostao reflects isključivo na vrhunskoj kvaliteti samog cvijeta.</p>
                <p>Ako nekome želite pokazati koliko vam je iznimno stalo, i to na onaj decentan, "old money" način – bijele ruže su vaš nepogrešiv saveznik. Naša diskretna isporuka po Zagrebu pobrinut će se da ovaj oblak romantike stigne na pravo mjesto u pravom trenutku.</p>
            </div>`,

    'rodendanski-buket-ruza-zagreb.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Rođendani zahtijevaju poseban tretman, a svaka posebna slavljenica zaslužuje osjećati se kao glavna zvijezda svog dana. Postoji li bolji način za postizanje tog efekta od isporuke impresivnog, voluminoznog buketa koji će elegancijom i mirisom suptilno zasjeniti sve ostale poklone na stolu?</p>
                <p>Bilo da se radi o okrugloj obljetnici, slatkim ranim dvadesetima ili bilo kojoj divnoj brojci između, Buket3klika uvijek ima savršeno floralno rješenje. Naša ponuda nudi sve – od fatalne crvene klasike, preko zaigranih rozih nota, pa do onih chic, šarenih aranžmana stvorenih za jedinstvene karaktere.</p>
                <p>Ne morate pritom strepiti hoće li cvijeće djelovati dovoljno luksuzno. Svi naši buketi strukturirani su da budu grandiozni i besprijekorno uredni. Isporučuju se s punim stilom, spremni da odmah krase rođendansku zabavu i postanu središnji motiv najljepših uspomena.</p>
                <p>Olakšajte si život i organizaciju. Upišite njezinu lokaciju, ostavite iskrenu posvetu za personaliziranu karticu i prepustite nama da budemo vaš najpouzdaniji romantični asistent. Uz našu dostavu, onaj nevjerojatan osmijeh od uha do uha potpuno je zagarantiran!</p>
            </div>`,

    'luksuzni-buketi-zagreb.html': `
            <div style="text-align: justify; font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <p>Kada prigoda zahtijeva samo ono apsolutno najbolje, kompromisi postaju suvišni. Pravi luksuz ne očituje se samo u dimenzijama buketa; on je vidljiv u svakom detalju, u nevjerojatnoj svježini, vrhunskom dizajnu i onom posebnom, zatajnom osjećaju kada primate nešto ekskluzivno. Mi u Buket3klika, stručnjaci smo za upravo taj osjećaj.</p>
                <p>Naši luksuzni komadi, s naglaskom na fascinantne "Grand" aranžmane, krojeni su za klijentelu oštrog oka i istančanog ukusa. Koristimo holds ruže najviše kategorije, karakteristične po dugim stabljikama i bogatim pupoljcima, koje slažemo čisto, bez ikakvog jeftinog sjaja ili plastičnog celofana.</p>
                <p>Ekskluziva sa sobom nosi i besprijekornu uslugu. Zato ovi najveći formati stižu već dostojanstveno usidreni u vazi s vodom, čuvajući svoju monumentalnu formu od našeg studija pa sve do stola onoga koga darujete. Sve je već pripremljeno za uživanje.</p>
                <p>Planirate li veliko slavlje, iskazujete li najdublju zahvalnost ili vas jednostavno vodi želja da impresionirate do kraja, naši luksuzni buketi ne ostavljaju prostor za grešku. Prepustite nama da vašu veliku gestu pretočimo u istinsko remek-djelo cvjetnog dizajna.</p>
            </div>`
};

for (const [filename, newDivContent] of Object.entries(blogTexts)) {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');
        
        // Match the text div inside seo-header
        // The div starts with <div style="text-align: justify; ..."> and ends before </div>\s*</section>
        const updatedContent = content.replace(/(<section class="seo-header"[^>]*>[\s\S]*?<h2[^>]*>[^<]+<\/h2>\s*)<div style="text-align: justify;[^>]*>[\s\S]*?<\/div>(\s*<\/section>)/, 
            '$1' + newDivContent + '$2');
            
        if (content !== updatedContent) {
            fs.writeFileSync(filename, updatedContent, 'utf8');
            console.log('Updated texts in ' + filename);
        } else {
            console.log('Failed to match structure in ' + filename);
        }
    }
}
