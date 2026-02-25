-- ==============================================================================
-- LUMINEL DB IMPERIAL AUDIT SCRIPT
-- Esegui questo script nel tuo Supabase SQL Editor.
-- Genererà un quadro completo della sicurezza, della struttura e degli errori latenti.
-- ==============================================================================

-- 1. CONTROLLO TIPI ENUM (Tiers D'Elite)
-- Mostra se l'enum user_tier è configurato correttamente con 'avvio', 'pro', 'pro_plus', 'vip'
SELECT t.typname AS enum_name, string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) AS allowed_values
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname = 'user_tier'
GROUP BY t.typname;

-- 2. STATUS TABELLE LUMINEL (Presenza e Sicurezza)
-- Verifica che le tabelle chiave esistano e abbiano la RLS (Row Level Security) ATTIVA contro gli hacker.
SELECT c.relname AS table_name, 
       c.relrowsecurity AS rls_enabled,
       (SELECT count(*) FROM information_schema.columns WHERE table_name = c.relname) AS column_count
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' 
AND c.relkind = 'r'
AND c.relname IN ('profiles', 'transactions', 'promo_codes')
ORDER BY c.relname;

-- 3. ANATOMIA TABELLA PROFILES (Tutti i campi cruciali)
-- Verifica la presenza dei campi di limitazione e voice
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. CONTROLLO POLICY DI SICUREZZA RLS (Prevenzione Leak Dati)
-- Mostra chi può leggere o scrivere cosa. Il God Mode deve essere l'unico a vedere tutto.
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('profiles', 'transactions', 'promo_codes')
ORDER BY tablename, policyname;

-- 5. VERIFICA TRIGGER DI REGISTRAZIONE (Possibile causa Errore 500)
-- Mostra lo stato del trigger di Auth Supabase
SELECT event_object_schema as trigger_schema,
       event_object_table as target_table,
       trigger_name,
       event_manipulation as trigger_event,
       action_statement as trigger_action
FROM information_schema.triggers
WHERE event_object_table = 'users' AND event_object_schema = 'auth';

-- 6. ISPEZIONE FUNZIONE HANDLE_NEW_USER (Il Codice Sorgente del Trigger)
-- Mostra la query esatta che viene eseguita quando un utente si iscrive. Se qui c'è un errore, l'iscrizione fallisce (Errore 500).
SELECT proname AS function_name, pg_get_functiondef(oid) AS source_code
FROM pg_proc
WHERE proname = 'handle_new_user';
