// ============================================================
// SUPABASE SHARED CONFIG
// ============================================================
// This file is loaded by all pages that need Supabase.
// If you ever change your project URL or rotate your API key,
// update it HERE only — it applies to every page automatically.
// ============================================================

const SUPABASE_URL     = 'https://xvqiwsvvvbcevcelxgtf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWl3c3Z2dmJjZXZjZWx4Z3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTQzNTcsImV4cCI6MjA5NDgzMDM1N30.PCMNOeF3u6IMOg1l26vfViHACRyhPeCHndyZLdhcPTA';

// Create the Supabase client — available globally as `sb` on every page
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
