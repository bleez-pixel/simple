const SUPABASE_URL = 'https://xvqiwsvvvbcevcelxgtf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWl3c3Z2dmJjZXZjZWx4Z3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTQzNTcsImV4cCI6MjA5NDgzMDM1N30.PCMNOeF3u6IMOg1l26vfViHACRyhPeCHndyZLdhcPTA';

// Helper to generate a random UUID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function testInsert() {
  const dummyId = uuidv4();
  const email = `test_${Date.now()}@example.com`;
  console.log(`Trying to insert user profile for ID: ${dummyId}, email: ${email}`);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        id: dummyId,
        email: email,
        name: 'Test Anon Insert',
        plan: 'free',
        status: 'active',
        registered_at: new Date().toISOString()
      })
    });

    const data = await res.json();
    console.log("Response status:", res.status);
    console.log("Response body:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Insert failed:", err);
  }
}

testInsert();
