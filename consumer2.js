const clientId = 'example-consumer-2';
const clientGroupId = 'test-group-2';
const sharedTopic = 'test-topic';
const fromBeginning = true;


// consumer.js
const { Kafka } = require('kafkajs');
const readline = require('readline');
const fs = require('fs')

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: clientId,
  })

const consumer = kafka.consumer({ groupId: clientGroupId });

// Set up readline interface
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function run() {
  // Connect the consumer
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: sharedTopic, fromBeginning: fromBeginning });

  console.log('Consumer started. Press any key to exit.');
  
  // Run the consumer and print messages to console
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });

  // Listen for keypress event
  process.stdin.on('keypress', async () => {
    await shutdown();
  });
}

async function shutdown() {
  console.log('Shutting down...');
  await consumer.disconnect();
  process.exit(0);
}

run().catch(console.error);

process.on('SIGINT', shutdown);