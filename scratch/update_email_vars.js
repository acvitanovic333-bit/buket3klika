const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

const newParamsBlock = `const phoneInput = document.getElementById('customer-phone');
                    const phoneValue = phoneInput ? phoneInput.value.trim() : '';

                    const templateParams = {
                        email: email,
                        customer_email: email,
                        customer_phone: phoneValue,
                        order_id: orderId,
                        logo_url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                        product_name: currentSelectedProduct || 'Prekrasan Buket',
                        delivery_address: deliveryAddress,
                        delivery_time: deliveryTime,
                        price: (currentSelectedPrice || '').replace(/^Od\\s+/i, ''),
                        from_email: "prodaja.buket3klika@gmail.com"
                    };`;

content = content.replace(/const phoneInput = document\.getElementById\('customer-phone'\);[\s\S]*?from_email: "prodaja.buket3klika@gmail.com"\s*\};/g, newParamsBlock);

fs.writeFileSync('script.js', content, 'utf8');
console.log('Updated to send separate customer_email and customer_phone variables');
