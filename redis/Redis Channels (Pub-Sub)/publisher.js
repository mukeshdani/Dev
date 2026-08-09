// publisher.js
const redis = require('redis');

async function broadcastNews() {
    // 1. Create a separate Redis connection for publishing
    const publisher = redis.createClient();
    
    // Connect to your local Redis server
    await publisher.connect();
    
    const newsMessage = "India won the match!";
    console.log(`🎙️ Broadcasting to 'sports_news': ${newsMessage}`);
    
    // 2. Publish the message to all listeners
    await publisher.publish('sports_news', newsMessage);
    
    // Disconnect after sending the message
    await publisher.disconnect();
}

broadcastNews();