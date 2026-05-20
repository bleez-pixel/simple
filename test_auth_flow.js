const SUPABASE_URL = 'https://xvqiwsvvvbcevcelxgtf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWl3c3Z2dmJjZXZjZWx4Z3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTQzNTcsImV4cCI6MjA5NDgzMDM1N30.PCMNOeF3u6IMOg1l26vfViHACRyhPeCHndyZLdhcPTA';

async function testSignupFlow() {
  const email = `test_user_${Date.now()}@example.com`;
  const password = 'password123';
  const name = 'Test User';

  console.log(`Attempting signup with: ${email}`);

  try {
    // Step 1: Auth SignUp
    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email, password })
    });

    const authData = await authRes.json();
    console.log("Auth Signup Status:", authRes.status);
    console.log("Auth Signup Data:", JSON.stringify(authData, null, 2));

    if (!authRes.ok) {
      throw new Error(`Signup failed: ${authData.msg || authData.error_description}`);
    }

    const userId = authData.id || (authData.user && authData.user.id);
    const token = authData.access_token; // may be null if confirmation is required
    console.log("User ID:", userId);
    console.log("Session access token:", token ? "Exists" : "Null (Email confirmation required)");

    // Step 2: Insert into 'users' table
    console.log("Attempting to insert profile into 'users' table...");
    
    // Set headers
    const headers = {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Prefer': 'return=representation'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id: userId,
        email: email,
        name: name,
        plan: 'free',
        status: 'active',
        registered_at: new Date().toISOString()
      })
    });

    const dbData = await dbRes.json();
    console.log("DB Insert Status:", dbRes.status);
    console.log("DB Insert Response:", JSON.stringify(dbData, null, 2));

  } catch (err) {
    console.error("Flow failed:", err.message);
  }
}

testSignupFlow();
