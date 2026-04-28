const fs = require('fs');

const customOrderHtml = `
<main class="container" style="padding-top: 12rem; min-height: 80vh;">
    <h1 style="text-align: center; font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 3rem; color: var(--accent-red);">Naručivanje po Vašoj želji</h1>
    
    <div class="custom-order-container" style="display: flex; flex-wrap: wrap; gap: 3rem; background: var(--bg-card); padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <div class="custom-order-image" style="flex: 1; min-width: 300px;">
            <img id="custom-preview-img" src="assets/prod_red.jpg" alt="Odabrana boja ruža" style="width: 100%; border-radius: 12px; object-fit: cover; aspect-ratio: 3/4;">
            <div id="custom-preview-count" style="position: absolute; background: rgba(0,0,0,0.6); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; margin-top: -3rem; margin-left: 1rem;">1 ruža</div>
        </div>
        
        <div class="custom-order-form" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; justify-content: center;">
            <h2 style="font-family: var(--font-heading); margin-bottom: 1.5rem;">Složite svoj savršen buket</h2>
            
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label for="rose-count" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Broj ruža (počevši od 17):</label>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button type="button" id="btn-minus" style="width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ccc; background: white; cursor: pointer; font-size: 1.2rem;">-</button>
                    <input type="number" id="rose-count" value="17" min="17" max="500" style="width: 80px; text-align: center; font-size: 1.2rem; padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px;">
                    <button type="button" id="btn-plus" style="width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ccc; background: white; cursor: pointer; font-size: 1.2rem;">+</button>
                </div>
            </div>
            
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Boja ruža:</label>
                <div class="color-options" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <label class="color-option" style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="rose-color" value="Crvena" data-img="assets/prod_red.jpg" checked>
                        Crvena
                    </label>
                    <label class="color-option" style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="rose-color" value="Roza" data-img="assets/Gemini_Generated_Image_9a7jgz9a7jgz9a7j.webp">
                        Roza
                    </label>
                    <label class="color-option" style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="rose-color" value="Bijela" data-img="assets/pravoj_bijele_ruze.png">
                        Bijela
                    </label>
                    <label class="color-option" style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="rose-color" value="Ljubičasta" data-img="https://www.odealarose.com/media/cache/767_1024_jpeg/product/phpE2xPQB-68c1971b8371f.jpeg">
                        Ljubičasta
                    </label>
                    <label class="color-option" style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="rose-color" value="Narančasta" data-img="assets/prod_orange_new.png">
                        Narančasta
                    </label>
                    <label class="color-option" style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="rose-color" value="Miješano" data-img="assets/Gemini_Generated_Image_2jj5zl2jj5zl2jj5 (1).webp">
                        Miješano
                    </label>
                </div>
            </div>

            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                <i class="fa-solid fa-gift" style="color: var(--accent-red);"></i> <strong>Poseban popust automatski se obračunava na sve narudžbe od 99 ili više ruža!</strong>
            </div>

            <div class="price-estimate" style="margin-bottom: 2rem; font-size: 1.5rem; font-weight: bold; color: var(--accent-red);">
                Ukupno: <span id="total-price">€2.50</span>
            </div>

            <button id="btn-custom-checkout" class="btn-primary" style="font-size: 1.2rem; padding: 1rem;">Završi narudžbu</button>
        </div>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const roseCountInput = document.getElementById('rose-count');
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    const colorRadios = document.querySelectorAll('input[name="rose-color"]');
    const previewImg = document.getElementById('custom-preview-img');
    const previewCount = document.getElementById('custom-preview-count');
    const totalPriceEl = document.getElementById('total-price');
    const btnCheckout = document.getElementById('btn-custom-checkout');

    // Price per rose configuration
    function getPricePerRose(count) {
        return count >= 99 ? 2.0 : 2.5;
    }

    function updatePreview() {
        let count = parseInt(roseCountInput.value) || 17;
        if (count < 17) { count = 17; roseCountInput.value = 17; }
        
        let suffix = 'ruža';
        if (count === 1) suffix = 'ruža';
        // croatian pluralization
        else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) suffix = 'ruže';
        else suffix = 'ruža';
        
        previewCount.innerText = count + " " + suffix;
        const currentPrice = getPricePerRose(count);
        const total = (count * currentPrice).toFixed(2);
        totalPriceEl.innerText = "€" + total;
        
        const selectedColor = document.querySelector('input[name="rose-color"]:checked');
        if (selectedColor) {
            previewImg.src = selectedColor.getAttribute('data-img');
        }
    }

    btnMinus.addEventListener('click', () => {
        if (parseInt(roseCountInput.value) > 17) {
            roseCountInput.value = parseInt(roseCountInput.value) - 1;
            updatePreview();
        }
    });

    btnPlus.addEventListener('click', () => {
        roseCountInput.value = parseInt(roseCountInput.value) + 1;
        updatePreview();
    });

    roseCountInput.addEventListener('change', updatePreview);
    roseCountInput.addEventListener('keyup', updatePreview);

    colorRadios.forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });

    updatePreview();

    // Checkout Logic Handler
    btnCheckout.addEventListener('click', () => {
        const count = parseInt(roseCountInput.value) || 1;
        const color = document.querySelector('input[name="rose-color"]:checked').value;
        const currentPrice = getPricePerRose(count);
        const price = (count * currentPrice);
        
        const customProduct = {
            title: "Buket po želji: " + count + " " + color + " ruža",
            price: price,
            image: document.querySelector('input[name="rose-color"]:checked').getAttribute('data-img'),
            color: color,
            count: count
        };

        // We can just open checkout view here. 
        // We will trigger a custom event or inject checkout logic.
        // The easiest way is to mock a product object and use existing checkout UI
        if(window.openCheckout) {
            window.openCheckout(customProduct);
        } else {
            alert("Sustav za naplatu se učitava...");
            // fallback: redirect to home with query param? No, checkout is in index.html popup
            // I should use the existing openCheckout logic. 
            // Wait, custom_order.html has the same scripts as index.html?
            // Yes, I copy index.html and replace <main>, so script.js is loaded!
        }
    });

});
</script>
`;

const indexHtml = fs.readFileSync('index.html', 'utf8');

let newHtml = indexHtml.replace(/<main class="container">[\s\S]*?<\/main>/, customOrderHtml);

// 1. Update Title tag for SEO
newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>Naručivanje po Vašoj želji - Buket3klika Zagreb</title>`);

// 2. Inject Unique Meta Description for SEO
const customMetaDescription = "Složite svoj savršen buket ruža po želji. Odaberite točan broj i boju ruža te uživajte u brzoj dostavi u Zagrebu. Premium ruže u samo tri klika.";
newHtml = newHtml.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${customMetaDescription}">`);

// 3. Update Canonical Link
newHtml = newHtml.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://buket3klika.hr/narudzba-po-zelji.html">`);

// Hide the hero for this page as it makes it cleaner
newHtml = newHtml.replace(/<header class="hero">[\s\S]*?<\/header>/, ``);

fs.writeFileSync('narudzba-po-zelji.html', newHtml);
console.log('Successfully generated narudzba-po-zelji.html');
