-- =========================================================================
-- LUMINEL IMPERIAL GOD MODE - SCHEMA UPDATE
-- =========================================================================

-- 1. Tabella TRANSACTIONS (Per calcolo Revenue e AOV istantaneo)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL, -- es: 9.99
    currency VARCHAR(3) DEFAULT 'eur',
    type VARCHAR(50) NOT NULL, -- 'subscription_upgrade' o 'extra_minutes'
    tier VARCHAR(50), -- es 'pro', 'vip' (solo per subscription)
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabella PROMO_CODES (Per generazione Sconti)
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(50) NOT NULL, -- 'percentage', 'fixed_amount', 'extra_minutes'
    discount_value NUMERIC(10, 2) NOT NULL, 
    is_active BOOLEAN DEFAULT true,
    uses_count INTEGER DEFAULT 0,
    max_uses INTEGER, -- NULL = infinito
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Abilitazione Row Level Security (RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- 4. Polizze di Sicurezza (God Mode: Solo jaramichael@hotmail.com)
-- Drop existing policies se stiamo resettando
DROP POLICY IF EXISTS "God Mode Full Access Transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can read own transactions" ON public.transactions;
DROP POLICY IF EXISTS "God Mode Full Access Promos" ON public.promo_codes;

-- L'Emperor legge e scrive tutto sulle transazioni
CREATE POLICY "God Mode Full Access Transactions" 
ON public.transactions 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'jaramichael@hotmail.com');

-- (Opzionale) Gli utenti possono leggere solo le proprie transazioni (per uno storico fatturazione futuro)
CREATE POLICY "Users can read own transactions" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = user_id);

-- L'Emperor gestisce i promo codes
CREATE POLICY "God Mode Full Access Promos" 
ON public.promo_codes 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'jaramichael@hotmail.com');

-- Tutti gli utenti autenticati possono LEGGERE i promo codes attivi per validarli al checkout
CREATE POLICY "Users can read active promos" 
ON public.promo_codes 
FOR SELECT 
USING (is_active = true AND (max_uses IS NULL OR uses_count < max_uses));

-- 5. Aggiornamento permessi RLS su PROFILES per permettere all'Emperor di modificare
-- Aggiungiamo una policy `UPDATE` su profiles se non esiste già una che copre l'Admin
DROP POLICY IF EXISTS "God Mode can update profiles" ON public.profiles;

CREATE POLICY "God Mode can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (auth.jwt() ->> 'email' = 'jaramichael@hotmail.com');

-- Aggiungi index per query veloci sulle transazioni
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
