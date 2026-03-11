const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Only allow POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { product_name, price, order_id, delivery_address, delivery_time } = req.body;

        // Validate input
        if (!product_name || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Parse price - remove "Od €" prefix and convert
        const priceString = price.replace(/[^0-9.,]/g, '').replace(',', '.');
        const amount = Math.round(parseFloat(priceString) * 100); // Stripe uses cents

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid price' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product_name,
                            description: `Dostava: ${delivery_address || 'N/A'} | Termin: ${delivery_time || 'N/A'}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin || 'https://buket3klika.vercel.app'}?payment=success&order_id=${order_id}`,
            cancel_url: `${req.headers.origin || 'https://buket3klika.vercel.app'}?payment=cancelled`,
            metadata: {
                order_id: order_id,
                delivery_address: delivery_address,
                delivery_time: delivery_time,
            },
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: error.message });
    }
};
