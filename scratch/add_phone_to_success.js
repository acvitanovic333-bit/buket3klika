const fs = require('fs');

let scriptJs = fs.readFileSync('script.js', 'utf8');

// 1. Replace the HTML structure inside the modal
const oldHTML = `<div class="order-confirmation-email">
                        <p>Želite li potvrdu na email? (nije obavezno)</p>
                        <div class="email-input-group">
                            <input type="email" id="confirm-email" placeholder="vaš@email.com">
                            <button id="send-email-btn" class="btn-secondary">Pošalji</button>
                        </div>
                        <p id="email-sent-msg" class="hidden" style="color: var(--accent-green); font-size: 0.9rem; margin-top: 0.5rem;">Potvrda poslana!</p>
                    </div>`;

const newHTML = `<div class="order-confirmation-email">
                        <p>Podaci za kontakt vozača i potvrdu (nije obavezno)</p>
                        <div class="email-input-group" style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <input type="email" id="confirm-email" placeholder="Vaš e-mail (za potvrdu)" style="width: 100%; border: 1px solid var(--border-color); padding: 0.8rem; border-radius: 8px; outline: none; font-family: inherit;">
                            <input type="tel" id="confirm-phone" placeholder="Broj mobitela (da vozač može nazvati)" style="width: 100%; border: 1px solid var(--border-color); padding: 0.8rem; border-radius: 8px; outline: none; font-family: inherit;">
                            <button id="send-email-btn" class="btn-secondary" style="width: 100%; margin-left: 0;">Pošalji podatke</button>
                        </div>
                        <p id="email-sent-msg" class="hidden" style="color: var(--accent-green); font-size: 0.9rem; margin-top: 0.5rem;">Podaci uspješno poslani!</p>
                    </div>`;

scriptJs = scriptJs.replace(oldHTML, newHTML);

// 2. Replace the JS logic for the click handler
const oldJSLogicStart = `const emailInput = document.getElementById('confirm-email');
                        const email = emailInput ? emailInput.value.trim() : '';
                        const orderId = document.querySelector('.order-id-display').innerText;
                        const successMsgElem = document.getElementById('success-message');
                        let deliveryAddress = 'N/A';
                        let deliveryTime = 'N/A';
                        
                        if (!email) {
                            alert('Molimo unesite valjanu email adresu.');
                            return;
                        }`;

const newJSLogicStart = `const emailInput = document.getElementById('confirm-email');
                        const phoneInput = document.getElementById('confirm-phone');
                        const email = emailInput ? emailInput.value.trim() : '';
                        const phone = phoneInput ? phoneInput.value.trim() : '';
                        const orderId = document.querySelector('.order-id-display').innerText;
                        const successMsgElem = document.getElementById('success-message');
                        let deliveryAddress = 'N/A';
                        let deliveryTime = 'N/A';
                        
                        if (!email && !phone) {
                            alert('Molimo unesite barem email ili broj mobitela.');
                            return;
                        }`;

scriptJs = scriptJs.replace(oldJSLogicStart, newJSLogicStart);

const oldParams = `const templateParams = {
                        email: email,
                        order_id: orderId,
                        logo_url: 'https://buket3klika.hr/assets/rose-logo.png',
                        product_name: currentSelectedProduct || 'Prekrasan Buket',
                        delivery_address: deliveryAddress,
                        delivery_time: deliveryTime,
                        price: (currentSelectedPrice || '').replace(/^Od\\s+/i, ''),
                        from_email: "prodaja.buket3klika@gmail.com"
                    };`;

const newParams = `const templateParams = {
                        email: email || 'Nije uneseno',
                        order_id: orderId,
                        logo_url: 'https://buket3klika.hr/assets/rose-logo.png',
                        product_name: currentSelectedProduct || 'Prekrasan Buket',
                        delivery_address: deliveryAddress + (phone ? ' | Mob za vozača: ' + phone : ''),
                        delivery_time: deliveryTime,
                        price: (currentSelectedPrice || '').replace(/^Od\\s+/i, ''),
                        from_email: "prodaja.buket3klika@gmail.com"
                    };`;

scriptJs = scriptJs.replace(oldParams, newParams);

fs.writeFileSync('script.js', scriptJs, 'utf8');
console.log('Successfully added phone number input and updated the logic.');
