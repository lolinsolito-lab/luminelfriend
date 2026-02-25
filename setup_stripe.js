import Stripe from 'stripe';

const sk = process.env.VITE_STRIPE_SECRET_KEY || 'sk_test_...';
const stripe = new Stripe(sk);

async function main() {
    console.log("Creazione Prodotti e Prezzi su Stripe...");

    const getProductAndLinks = async (name, description, monthlyPrice, annualPrice, tierMetadata) => {
        console.log(`- Creazione Prodotto: ${name}`);
        const product = await stripe.products.create({ name, description });

        const priceMonthly = await stripe.prices.create({
            product: product.id,
            unit_amount: monthlyPrice,
            currency: 'eur',
            recurring: { interval: 'month' },
        });

        const priceAnnual = await stripe.prices.create({
            product: product.id,
            unit_amount: annualPrice,
            currency: 'eur',
            recurring: { interval: 'year' },
        });

        const linkMonthly = await stripe.paymentLinks.create({
            line_items: [{ price: priceMonthly.id, quantity: 1 }],
            metadata: { tier: tierMetadata },
        });

        const linkAnnual = await stripe.paymentLinks.create({
            line_items: [{ price: priceAnnual.id, quantity: 1 }],
            metadata: { tier: tierMetadata },
        });

        return {
            monthly: linkMonthly.url,
            annual: linkAnnual.url
        };
    };

    try {
        const proLinks = await getProductAndLinks(
            'Luminel Pro',
            'Chat illimitato, memoria persistente, 60 min voice call',
            4999,
            49000,
            'pro'
        );

        const proPlusLinks = await getProductAndLinks(
            'Luminel Pro+',
            'Luminel Pro + 180 min voice call, analisi emotiva',
            9900,
            99000,
            'pro_plus'
        );

        const vipLinks = await getProductAndLinks(
            'Luminel VIP',
            'Zero limiti, voice/chat illimitati, proattività',
            19900,
            199000,
            'vip'
        );

        console.log("\n✅ TUTTI I LINK CREATI CON SUCCESSO:\n");
        console.log(JSON.stringify({
            pro: proLinks,
            proPlus: proPlusLinks,
            vip: vipLinks,
        }, null, 2));

    } catch (error) {
        console.error("Errore Stripe:", error.message);
    }
}

main();
