const fetch = require('node-fetch');

async function testApi() {
  try {
    // Test the root endpoint
    console.log('Testing root endpoint...');
    const rootResponse = await fetch('http://localhost:3000/');
    const rootText = await rootResponse.text();
    console.log('Root response:', rootText);
    console.log('Status:', rootResponse.status);
    console.log('--------------------------');

    // Test register endpoint with sample data
    console.log('Testing register endpoint...');
    const registerResponse = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`, // Unique email to avoid conflicts
        password: 'password123',
      }),
    });
    const registerData = await registerResponse.json();
    console.log('Register response:', registerData);
    console.log('Status:', registerResponse.status);
    console.log('--------------------------');

    // Test login endpoint with the registered user
    console.log('Testing login endpoint...');
    const loginResponse = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: registerData.user.email,
        password: 'password123',
      }),
    });
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);
    console.log('Status:', loginResponse.status);
    console.log('--------------------------');

    console.log('All tests completed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testApi(); 