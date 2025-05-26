import { createClient } from "@supabase/supabase-js";
import { environment } from "../utils/environment.js";

const supabaseUrl = environment.SUPABASE_URL;
const supabaseKey = environment.SUPABASE_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
