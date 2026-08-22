import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ktlktrsqrfclnouqmntt.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_rxYY9ndyXk0Tb9bwZeMBjw_8TrwaRh7";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
