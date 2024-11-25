const { Kafka } = require('kafkajs');
const { Flink } = require('flink');

const clientId = 'example-flink-job';
const sharedTopic = 'flink-topic';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: clientId,
});

const consumer = kafka.consumer({ groupId: 'flink-group' });

async function runFlinkJob() {
  await consumer.connect();
  await consumer.subscribe({ topic: sharedTopic, fromBeginning: true });

  console.log('Flink job started. Press Ctrl+C to exit.');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log(`Received message: ${value}`);

      // Process the message using Flink
      const processedValue = processMessageWithFlink(value);
      console.log(`Processed message: ${processedValue}`);
    },
  });
}

function processMessageWithFlink(value) {
  // Example Flink processing logic
  return value.toUpperCase();
}

async function shutdown() {
  console.log('Shutting down Flink job...');
  await consumer.disconnect();
  process.exit(0);
}

runFlinkJob().catch(console.error);

process.on('SIGINT', shutdown);
