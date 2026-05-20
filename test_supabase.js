const SUPABASE_URL = 'https://xvqiwsvvvbcevcelxgtf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWl3c3Z2dmJjZXZjZWx4Z3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTQzNTcsImV4cCI6MjA5NDgzMDM1N30.PCMNOeF3u6IMOg1l26vfViHACRyhPeCHndyZLdhcPTA';

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");
    
    // Test auth settings
    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log("Auth settings status:", authRes.status);
    const authData = await authRes.json();
    console.log("Auth settings:", JSON.stringify(authData, null, 2));

    // Test querying users table (selecting a dummy row)
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/users?select=*&limit=1`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log("Users table status:", dbRes.status);
    const dbData = await dbRes.json();
    console.log("Users table response:", JSON.stringify(dbData, null, 2));
  } catch (err) {
    console.error("Error during test:", err);
  }
}

testConnection();
