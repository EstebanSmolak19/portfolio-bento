import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
    const config = useRuntimeConfig();
    console.log('supabase url:', config.supabaseUrl)
    return createClient(config.supabaseUrl, config.supabaseKey);
}