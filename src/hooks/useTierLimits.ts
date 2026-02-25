import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export type UserTier = 'avvio' | 'pro' | 'pro_plus' | 'vip';

export function useTierLimits() {
    const { user } = useAuth();
    const [tier, setTier] = useState<UserTier>('avvio');
    const [messageCount, setMessageCount] = useState(0);
    const [voiceMinutesUsed, setVoiceMinutesUsed] = useState(0);
    const [voiceLimit, setVoiceLimit] = useState(0);
    const [loadingConfig, setLoadingConfig] = useState(true);

    const messageLimit = tier === 'avvio' ? 15 : Infinity;

    useEffect(() => {
        async function loadProfile() {
            if (!user) {
                // Anonymous mode (localStorage fallback)
                const today = new Date().toDateString();
                const lastSession = localStorage.getItem('luminel_last_session_date');
                if (lastSession !== today) {
                    setMessageCount(0);
                    localStorage.setItem('luminel_last_session_date', today);
                    localStorage.setItem('luminel_msg_count', '0');
                } else {
                    const savedCount = parseInt(localStorage.getItem('luminel_msg_count') || '0');
                    setMessageCount(savedCount);
                }
                setLoadingConfig(false);
                return;
            }

            // Authenticated user: fetch from Supabase
            const { data, error } = await supabase
                .from('profiles')
                .select('tier, messages_count_today, last_message_date, voice_minutes_used, voice_minutes_limit')
                .eq('id', user.id)
                .single();

            if (error || !data) {
                console.error("Error loading profile:", error);
                setLoadingConfig(false);
                return;
            }

            let currentTier = data.tier as UserTier;
            let currentLimit = data.voice_minutes_limit || 0;

            // OVERRIDE IMPERIALE: Il Re vede sempre tutto sbloccato
            if (user.email === 'jaramichael@hotmail.com') {
                currentTier = 'vip';
                currentLimit = 1500;
            }

            setTier(currentTier);
            setVoiceMinutesUsed(data.voice_minutes_used || 0);
            setVoiceLimit(currentLimit);

            // Check if amnesia (next day reset) should happen
            const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            if (data.last_message_date !== todayStr) {
                // Reset count in DB
                await supabase
                    .from('profiles')
                    .update({ messages_count_today: 0, last_message_date: todayStr })
                    .eq('id', user.id);
                setMessageCount(0);
            } else {
                setMessageCount(data.messages_count_today);
            }

            setLoadingConfig(false);
        }

        loadProfile();
    }, [user]);

    const incrementMessageCount = async () => {
        setMessageCount(prev => prev + 1);

        if (!user) {
            localStorage.setItem('luminel_msg_count', (messageCount + 1).toString());
            return;
        }

        // Sync with DB
        const todayStr = new Date().toISOString().split('T')[0];
        try {
            await supabase
                .from('profiles')
                .update({
                    messages_count_today: messageCount + 1,
                    last_message_date: todayStr
                })
                .eq('id', user.id);
        } catch (e) {
            console.error("Failed to sync message count", e);
        }
    };

    return {
        tier,
        messageCount,
        messageLimit,
        voiceMinutesUsed,
        voiceLimit,
        incrementMessageCount,
        isPaywallActive: messageCount >= messageLimit,
        loadingConfig
    };
}
