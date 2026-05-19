const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 0, location: 'India', firstTime: true })
    });
    const data = await res.json();
    console.log('User response:', data);

    if (data.userId) {
      const res2 = await fetch('http://localhost:3001/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.userId, message: 'Hello', currentStep: 1 })
      });
      const data2 = await res2.text();
      console.log('Assistant response status:', res2.status);
      console.log('Assistant response:', data2);
    }
  } catch (err) {
    console.error(err);
  }
}
test();
