const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

const newStr = `const phoneInput = document.getElementById('customer-phone');
                    let fullAddress = deliveryAddress;
                    fullAddress += ' | Email kupca: ' + email;
                    if (phoneInput && phoneInput.value.trim()) {
                        fullAddress += ' | Mobitel: ' + phoneInput.value.trim();
                    }

                    const templateParams = {
                        email: email,
                        order_id: orderId,
                        logo_url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                        product_name: currentSelectedProduct || 'Prekrasan Buket',
                        delivery_address: fullAddress,
                        delivery_time: deliveryTime,
                        price: (currentSelectedPrice || '').replace(/^Od\\s+/i, ''),
                        from_email: "prodaja.buket3klika@gmail.com"
                    };`;

content = content.replace(/const templateParams = \{[\s\S]*?from_email: "prodaja.buket3klika@gmail.com"\s*\};/g, newStr);

fs.writeFileSync('script.js', content, 'utf8');
console.log('Fixed email sending params');
