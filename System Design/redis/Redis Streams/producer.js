// producer.js
const redis = require('redis');

async function sendMessage() {
    // 1. Create a Redis connection
    const publisher = redis.createClient();
    await publisher.connect();
    
    console.log(`📤 Sending data to 'sports_news_stream'...`);
    
    // 2. Add data to the stream using xAdd
    // '*' tells Redis to automatically generate a unique timestamp ID for this message
    // Unlike Pub/Sub which only sends a single string, Streams allow you to send Key-Value JSON objects!
    const messageId = await publisher.xAdd('sports_news_stream', '*', {
        headline: "India won the T20 World Cup!",
        player_of_the_match: "Virat Kohli + Mukesh Dani",
        score: "176/7"
    });
    
    console.log(`✅ Message saved permanently in Redis! Your Message ID is: ${messageId}`);
    
    // Close the connection
    await publisher.disconnect();
}

sendMessage();