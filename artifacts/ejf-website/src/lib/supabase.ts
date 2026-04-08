import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "[EJF] Supabase environment variables are not configured.\n" +
    "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel project settings, then redeploy."
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-key"
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
