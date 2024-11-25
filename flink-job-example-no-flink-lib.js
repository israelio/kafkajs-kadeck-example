const { Kafka } = require('kafkajs');
const readline = require('readline');

const clientId = 'example-flink-job-no-lib';
const sharedTopic = 'flink-topic';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: clientId,
});

const consumer = kafka.consumer({ groupId: 'flink-group' });

// Set up readline interface
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function runJob() {
  await consumer.connect();
  await consumer.subscribe({ topic: sharedTopic, fromBeginning: true });

  console.log('Job started. Press Ctrl+C to exit.');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log(`Received message: ${value}`);

      // Process the message
      const processedValue = processMessage(value);
      console.log(`Processed message: ${processedValue}`);
    },
  });
}

function processMessage(value) {
  // Example processing logic
  return value.toUpperCase();
}

async function shutdown() {
  console.log('Shutting down job...');
  await consumer.disconnect();
  process.exit(0);
}

runJob().catch(console.error);

process.on('SIGINT', shutdown);
