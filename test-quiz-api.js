// Simple test script to verify quiz API
const testQuizAPI = async () => {
  try {
    console.log('Testing quiz completion API...');
    
    const response = await fetch('http://localhost:3000/api/quiz/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: 'caching-basics',
        score: 2,
        total: 3
      }),
    });

    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Quiz API test successful!');
      console.log(`Points: ${result.points}`);
      console.log(`Percentage: ${result.percentage}%`);
      console.log(`Badges awarded: ${result.badgesAwarded}`);
    } else {
      console.log('❌ Quiz API test failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Error testing quiz API:', error.message);
  }
};

// Wait a bit for the server to start, then test
setTimeout(testQuizAPI, 5000);
