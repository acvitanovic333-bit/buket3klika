const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8').split('\n');

const newContent = [
    '                        <p style="font-weight: bold; color: var(--text-main); margin-bottom: 0.5rem;">Potrebni podaci za potvrdu i dostavu (obavezno):</p>',
    '                        <div class="email-input-group" style="display: flex; flex-direction: column; gap: 0.8rem;">',
    '                            <input type="email" id="confirm-email" placeholder="vaš@email.com" style="width: 100%;" required>',
    '                            <input type="tel" id="customer-phone" placeholder="Vaš broj mobitela (za dostavljača)" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-family: var(--font-body); font-size: 1rem;" required>',
    '                            <button id="send-email-btn" class="btn-primary" style="width: 100%;">Pošalji podatke</button>',
    '                        </div>'
];

content.splice(350, 6, ...newContent);
fs.writeFileSync('script.js', content.join('\n'), 'utf8');
console.log('Successfully updated mandatory fields text');
