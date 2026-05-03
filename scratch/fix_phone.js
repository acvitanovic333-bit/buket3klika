const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');
content = content.replace(
    /<div class=\"email-input-group\">\s*<input type=\"email\" id=\"confirm-email\" placeholder=\"vaš@email\.com\">\s*<button id=\"send-email-btn\" class=\"btn-secondary\">Pošalji<\/button>\s*<\/div>/g,
    `<div class="email-input-group" style="display: flex; flex-direction: column; gap: 0.8rem;">
                            <input type="email" id="confirm-email" placeholder="vaš@email.com" style="width: 100%;">
                            <input type="tel" id="customer-phone" placeholder="Broj mobitela za vozača" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-family: var(--font-body); font-size: 1rem;">
                            <button id="send-email-btn" class="btn-secondary" style="width: 100%;">Pošalji</button>
                        </div>`
);
fs.writeFileSync('script.js', content, 'utf8');
console.log('Phone input added to script.js');
