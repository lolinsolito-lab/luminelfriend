-- ==============================================================================
-- LUMINEL DB: PROTOCOLLO EMERGENZA 500
-- Questo script risolve definitivamente l'errore "Database error creating new user".
-- Copia TUTTO e fai RUN nel SQL Editor di Supabase.
-- ==============================================================================

-- 1. ASSICURIAMOCI CHE TUTTE LE COLONNE ESISTANO
-- (Se il trigger provava a inserire dati in colonne mancanti, il database andava in crash).
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS voice_minutes_limit INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS voice_minutes_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS voice_minutes_reset_date TIMESTAMP WITH TIME ZONE;

-- 2. RISCRITTURA PULITA DEL TRIGGER DI REGISTRAZIONE
-- (Il precedente aveva un blocco EXCEPTION che in Supabase Auth causa transazioni abortite e rimborsa Errore 500)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    -- Inseriamo SOLO l'Indispensabile. Tutti gli altri campi (messaggi, voice, etc)
    -- prenderanno automaticamente il loro valore di DEFAULT = 0 imposto dalla tabella.
    INSERT INTO public.profiles (id, full_name, tier)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Viaggiatore'),
        'avvio'::public.user_tier
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
END;
$$;
