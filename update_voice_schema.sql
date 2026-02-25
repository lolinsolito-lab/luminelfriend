-- ==============================================================================
-- LUMINEL DB MIGRATION: VOICE STRATEGY & LIMITS
-- COPY AND PASTE THIS ENTIRE SCRIPT INTO SUPABASE SQL EDITOR AND RUN IT
-- ==============================================================================

-- 1. Rimuoviamo le vecchie colonne audio se presenti (pulizia del db)
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS audio_minutes_used,
DROP COLUMN IF EXISTS extra_audio_minutes;

-- 2. Aggiungiamo i nuovi campi per tracciare i minuti vocali
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS voice_minutes_limit INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS voice_minutes_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS voice_minutes_reset_date TIMESTAMP WITH TIME ZONE;

-- NOTE: 
-- Quando un utente si registra, essendo "avvio", avrà limit = 0.
-- Quando acquisterà PRO o PRO+, lo Stripe Webhook aggiornerà "tier" e imposterà 
-- "voice_minutes_limit" a 60 o 180.
-- Quando comprerà la ricarica (es. +30), lo Stripe Webhook farà:
-- UPDATE profiles SET voice_minutes_limit = voice_minutes_limit + 30 WHERE ...
