import { createClient } from "@supabase/supabase-js";

// For development, use placeholder values if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key_for_development';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
