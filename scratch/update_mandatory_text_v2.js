const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8').split('\n');

const newContent = [
    '                        <p style="font-weight: bold; color: var(--text-main); margin-bottom: 0.5rem; line-height: 1.4;">Molimo unesite podatke (obavezno):</p>',
    '                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">Email nam je potreban za slanje računa, a broj mobitela kako bi vas dostavljač mogao kontaktirati.</p>',
    '                        <div class="email-input-group" style="display: flex; flex-direction: column; gap: 0.8rem;">',
    '                            <input type="email" id="confirm-email" placeholder="vaš@email.com" style="width: 100%;" required>',
    '                            <input type="tel" id="customer-phone" placeholder="Vaš broj mobitela" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-family: var(--font-body); font-size: 1rem;" required>',
    '                            <button id="send-email-btn" class="btn-primary" style="width: 100%;">Pošalji i potvrdi</button>',
    '                        </div>'
];

// We look for where we just inserted the previous text. 
// Since we used splice(350, 6, ...), let's find the new block.
let contentStr = content.join('\n');
const blockRegex = /<p style="font-weight: bold; color: var\(--text-main\); margin-bottom: 0.5rem;">Potrebni podaci za potvrdu i dostavu \(obavezno\):<\/p>[\s\S]*?<\/div>/;

const replacement = newContent.join('\n');
contentStr = contentStr.replace(blockRegex, replacement);

fs.writeFileSync('script.js', contentStr, 'utf8');
console.log('Successfully updated mandatory fields text with driver/invoice explanation');
