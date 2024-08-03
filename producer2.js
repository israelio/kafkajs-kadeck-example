const clientId = 'example-producer-2';
const sharedTopic = 'test-topic';

// producer.js
const { Kafka } = require('kafkajs');
const readline = require('readline');
const fs = require('fs')

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: clientId
  })

const producer = kafka.producer();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function run() {
  // Connect the producer
  await producer.connect();

  console.log('Connected to Kafka. Enter messages (press Ctrl+C to exit):');

  rl.on('line', async (input) => {
    try {
      // Send message to Kafka
      await producer.send({
        topic: sharedTopic,
        messages: [{ value: input }],
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
}

run().catch(console.error);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await producer.disconnect();
  rl.close();
  process.exit(0);
});