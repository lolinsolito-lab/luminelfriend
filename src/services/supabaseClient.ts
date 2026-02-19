import { createClient } from '@supabase/supabase-js';

// VITE env vars must be prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    // In development, handle missing env vars gracefully or throw detailed error
    console.warn("Supabase credentials missing! Check .env file.");
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
);
