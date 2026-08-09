// consumer.js
const redis = require('redis');

async function startConsumer() {
    // 1. Create a Redis connection
    const client = redis.createClient();
    await client.connect();
    
    console.log("📥 Mailbox is OPEN! Waiting for messages in 'sports_news_stream'...");
    
    // We are using '0' so it fetches ALL the old messages you sent!
    let lastId = '0'; 
    
    while (true) {
        try {
            // 2. Read from the stream (No commandOptions needed!)
            const response = await client.xRead(
                [ { key: 'sports_news_stream', id: lastId } ],
                { BLOCK: 0 } 
            );
            
            if (response) {
                const streamData = response[0];
                const messages = streamData.messages;
                
                for (let msg of messages) {
                    console.log(`🔥 NEW MESSAGE [ID: ${msg.id}]:`, msg.message);
                    lastId = msg.id; 
                }
            }
        } catch (err) {
            console.error("Error reading stream:", err);
            break; 
        }
    }
}

startConsumer();