import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * LUMINEL — Reset Vocale Mensile (CRON Job)
 * 
 * Questa funzione viene invocata ogni giorno alle 03:00 UTC.
 * Cerca tutti i profili con voice_minutes_reset_date scaduta
 * e resetta i loro consumi vocali a zero, impostando il prossimo
 * reset a 30 giorni da ora.
 * 
 * Per attivare il CRON, dopo il deploy, eseguire nel SQL Editor di Supabase:
 * 
 * SELECT cron.schedule(
 *   'reset-voice-minutes',
 *   '0 3 * * *',
 *   $$
 *   SELECT net.http_post(
 *     url := '<SUPABASE_URL>/functions/v1/reset-voice-minutes',
 *     headers := '{"Authorization": "Bearer <SUPABASE_SERVICE_ROLE_KEY>"}'::jsonb,
 *     body := '{}'::jsonb
 *   ) AS request_id;
 *   $$
 * );
 */

serve(async (_req) => {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string

    if (!supabaseUrl || !supabaseServiceKey) {
        return new Response('Supabase config missing', { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const now = new Date().toISOString()

    // Trova tutti i profili con reset_date scaduta (nel passato)
    const { data: expiredProfiles, error: fetchError } = await supabase
        .from('profiles')
        .select('id, tier, voice_minutes_reset_date')
        .not('voice_minutes_reset_date', 'is', null)
        .lt('voice_minutes_reset_date', now)

    if (fetchError) {
        console.error('Error fetching expired profiles:', fetchError)
        return new Response('DB fetch error', { status: 500 })
    }

    if (!expiredProfiles || expiredProfiles.length === 0) {
        console.log('No profiles need voice reset today.')
        return new Response(JSON.stringify({ reset: 0 }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    let resetCount = 0

    for (const profile of expiredProfiles) {
        // Ricalcola il limite base in base al tier
        let baseLimit = 0
        if (profile.tier === 'pro') baseLimit = 60
        if (profile.tier === 'pro_plus') baseLimit = 180
        if (profile.tier === 'vip') baseLimit = 1500

        // Se il tier è 'avvio' (free), non ha minuti — skip
        if (baseLimit === 0) continue

        const nextResetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                voice_minutes_used: 0,
                voice_minutes_limit: baseLimit, // Resetta al limite base (rimuove eventuali extra scaduti)
                voice_minutes_reset_date: nextResetDate
            })
            .eq('id', profile.id)

        if (updateError) {
            console.error(`Failed to reset profile ${profile.id}:`, updateError)
        } else {
            resetCount++
            console.log(`Reset voice for ${profile.id} (${profile.tier}) → ${baseLimit}m, next reset: ${nextResetDate}`)
        }
    }

    console.log(`Voice reset complete. ${resetCount} profiles reset.`)

    return new Response(JSON.stringify({ reset: resetCount, timestamp: now }), {
        headers: { 'Content-Type': 'application/json' }
    })
})
