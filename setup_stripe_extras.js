import Stripe from 'stripe';

// Il tastierino deve essere sk_test_... o sk_live_...
const sk = process.env.VITE_STRIPE_SECRET_KEY || 'sk_test_...';
const stripe = new Stripe(sk);

async function createExtraMinutesPackage(name, description, priceCents, extraMinutesAmount, tierRequirement) {
    console.log(`- Creazione Pacchetto Extra: ${name}`);

    // 1. Create Product
    const product = await stripe.products.create({
        name,
        description,
        metadata: {
            type: 'extra_minutes',
            amount: extraMinutesAmount // I minuti veri da aggiungere al DB
        }
    });

    // 2. Create Price (One-time, non recurring!)
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: priceCents,
        currency: 'eur',
    });

    // 3. Create Payment Link
    const link = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }],
        metadata: {
            type: 'extra_minutes',
            amount: extraMinutesAmount,
            tier_req: tierRequirement // PRO, PRO+, VIP
        },
        after_completion: {
            type: 'redirect',
            redirect: {
                url: 'http://localhost:5173/chat?success=extra_minutes',
            },
        },
    });

    return link.url;
}

async function main() {
    console.log("Creazione Pacchetti Extra (Microtransazioni) su Stripe...\n");

    try {
        const extra30 = await createExtraMinutesPackage(
            'Luminel Voce: +30 Minuti',
            'Ricarica immediata di 30 minuti di chiamate vocali.',
            999, // 9.99 EUR
            30,
            'pro'
        );

        const extra60 = await createExtraMinutesPackage(
            'Luminel Voce: +60 Minuti (Scelta del Leader)',
            'Ricarica immediata di 60 minuti di chiamate vocali.',
            1499, // 14.99 EUR
            60,
            'pro_plus'
        );

        const extra600 = await createExtraMinutesPackage(
            'Risveglio Vocale: +10 Ore (VIP)',
            'Ricarica massima di emergenza: 600 minuti.',
            4999, // 49.99 EUR
            600,
            'vip'
        );

        console.log("\n✅ TUTTI I LINK EXTRA CREATI CON SUCCESSO. INCOLLA QUESTI IN CommandCenter.tsx:\n");
        console.log(JSON.stringify({
            linkExtra30: extra30,
            linkExtra60: extra60,
            linkExtra600: extra600,
        }, null, 2));

    } catch (error) {
        console.error("Errore Stripe:", error.message);
    }
}

main();
