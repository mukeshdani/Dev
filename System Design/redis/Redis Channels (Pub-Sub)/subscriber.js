// subscriber.js
const redis = require('redis');

async function startListening() {
    // 1. Create a Redis connection
    const subscriber = redis.createClient();
    
    // Connect to your local Redis server
    await subscriber.connect();
    
    console.log("📻 TV is ON! Waiting for breaking news on 'sports_news' channel...");

    // 2. Subscribe to the channel
    await subscriber.subscribe('sports_news', (message) => {
        // This callback runs every time a publisher sends a message!
        console.log(`🔥 BREAKING NEWS RECEIVED: ${message}`);
    });
    }

startListening();