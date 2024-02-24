import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xrjhsuqftysdczndpwtb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyamhzdXFmdHlzZGN6bmRwd3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MTc0MTIsImV4cCI6MjAyNDA5MzQxMn0.hfB1gjoSDEwAOZASSZLssv60ZFArCRUysxk1re3TxCo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
