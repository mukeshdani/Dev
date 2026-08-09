const { Kafka } = require('kafkajs');

async function startProducer() {
    // 1. Connect to the Kafka Broker
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    });

    const producer = kafka.producer();
    await producer.connect();
    
    console.log("📤 Sending data to Kafka Topic 'sports_news'...");
    
    // 2. Send the message
    await producer.send({
        topic: 'sports_news',
        messages: [
            { value: 'India won the World Cup! and Mukesh won the Man of the Match award!' },
        ],
    });
    
    console.log("✅ Message safely saved in Kafka!");
    await producer.disconnect();
}

startProducer();


// docker run -d --name local-kafka -p 9092:9092 confluentinc/confluent-local:latest