-- ==============================================================================
-- LUMINEL DB INIT SCRIPT - RUN THIS IN SUPABASE SQL EDITOR
-- ==============================================================================

-- 1. Create a custom ENUM type for User Tiers
CREATE TYPE public.user_tier AS ENUM ('avvio', 'pro', 'pro_plus', 'vip');

-- 2. Create the Profiles table matching the Emperor's Business Model
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    tier user_tier DEFAULT 'avvio'::user_tier NOT NULL,
    
    -- Text limitations (For 'Avvio' tier: max 15/day)
    messages_count_today INTEGER DEFAULT 0 NOT NULL,
    last_message_date DATE DEFAULT CURRENT_DATE NOT NULL,
    
    -- Audio limits (Pro: 60m, Pro+: 180m, VIP: Unltd)
    audio_minutes_used NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    extra_audio_minutes NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    
    -- Tracking timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Secure the table (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
    ON public.profiles FOR SELECT
    USING ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
    ON public.profiles FOR UPDATE
    USING ( auth.uid() = id );

-- 4. Create an automatic trigger to create a profile when a user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, tier)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        'avvio'::user_tier
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Attach the trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
