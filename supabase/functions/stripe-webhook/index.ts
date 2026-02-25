import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Stripe from "https://esm.sh/stripe@11.1.0?target=deno"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
    const signature = req.headers.get('Stripe-Signature')

    if (!signature) {
        return new Response('No signature provided', { status: 400 })
    }

    const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string
    const body = await req.text()

    let event

    try {
        event = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            endpointSecret,
            undefined,
            cryptoProvider
        )
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message)
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    // Handle successful checkout
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any
        const userId = session.client_reference_id

        if (!userId) {
            console.error('No client_reference_id in session')
            return new Response('Client reference ID missing', { status: 400 })
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error('Supabase credentials missing')
            return new Response('Supabase config error', { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const metadata = session.metadata || {};

        // 1. GESTIONE MICROTRANSAZIONI (Ricariche Minuti Extra)
        if (metadata.type === 'extra_minutes') {
            const extraMinutes = parseInt(metadata.amount || '0', 10);
            console.log(`Microtransaction: User ${userId} bought ${extraMinutes} extra minutes.`);

            // Prendi il limite attuale
            const { data: profile } = await supabase
                .from('profiles')
                .select('voice_minutes_limit')
                .eq('id', userId)
                .single();

            const currentLimit = profile?.voice_minutes_limit || 0;

            // Aggiungi i minuti
            const { error } = await supabase
                .from('profiles')
                .update({ voice_minutes_limit: currentLimit + extraMinutes })
                .eq('id', userId);

            if (error) {
                console.error("Error adding minutes:", error);
                return new Response('Database error on extra minutes', { status: 500 });
            }

            // --- REGISTRAZIONE TRANSAZIONE ---
            await supabase.from('transactions').insert({
                user_id: userId,
                amount: (session.amount_total || 0) / 100, // Stripe manda l'importo in centesimi
                currency: session.currency || 'eur',
                type: 'extra_minutes'
            });

            console.log(`Successfully added ${extraMinutes} minutes. New limit: ${currentLimit + extraMinutes}`);

        } else {
            // 2. GESTIONE ABBONAMENTI (Upgrade Tier)
            const chosenTier = metadata.tier || 'pro'

            let baseVoiceLimit = 0;
            if (chosenTier === 'pro') baseVoiceLimit = 60;
            if (chosenTier === 'pro_plus') baseVoiceLimit = 180;
            if (chosenTier === 'vip') baseVoiceLimit = 1500;

            const todayStr = new Date().toISOString().split('T')[0]

            const { error } = await supabase
                .from('profiles')
                .update({
                    tier: chosenTier,
                    messages_count_today: 0,
                    last_message_date: todayStr,
                    voice_minutes_limit: baseVoiceLimit,
                    voice_minutes_used: 0, // Reset dei consumi per il nuovo abbonamento
                    voice_minutes_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Reset tra 30 giorni
                })
                .eq('id', userId)

            if (error) {
                console.error('Failed to update profile tier:', error)
                return new Response('Database error on tier upgrade', { status: 500 })
            }

            // --- REGISTRAZIONE TRANSAZIONE ---
            await supabase.from('transactions').insert({
                user_id: userId,
                amount: (session.amount_total || 0) / 100,
                currency: session.currency || 'eur',
                type: 'subscription_upgrade',
                tier: chosenTier
            });

            console.log(`Successfully upgraded user ${userId} to ${chosenTier} with ${baseVoiceLimit}m voice limit.`)
        }
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
    })
})
