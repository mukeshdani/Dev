const { Kafka } = require('kafkajs');

async function startConsumer() {
    // 1. Connect to the Kafka Broker (Server)
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    });

    // 2. Join a Consumer Group
    const consumer = kafka.consumer({ groupId: 'sports-news-group' });
    await consumer.connect();

    // 3. Subscribe to the Topic
    // fromBeginning: true means "If I was offline, give me all the old messages!"
    await consumer.subscribe({ topic: 'sports_news', fromBeginning: true });

    console.log("📥 Waiting for Kafka messages...");

    // 4. Run the listener loop
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Kafka sends data as buffers (bytes), so we MUST convert it to a string
            console.log(`🔥 MESSAGE RECEIVED [Partition ${partition}]:`, message.value.toString());
        },
    });
}

startConsumer();