import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl); // Ajoute ceci pour vérifier les variables
console.log('Supabase Anon Key:', supabaseAnonKey); // Ajoute ceci pour vérifier les variables

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;