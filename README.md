# kafkajs-kadeck-example
- Example of running docker with one node of kafka using node consumer / producer 
use kadeck at port localhost:80 and connect to kafka:29092 to monitor the local kafka

edit the docker-compose file and change the following line with your email:
```sh
xeotek_kadeck_free: "register-with-your-email"
```

- Run the kafka broker, kadeck, and Flink docker images
```sh
docker-compose up -d
```

- Retrieve node dependencies
```sh
npm i
```

- Open 4 terminals and start two producers and two consumers
- start a kafka producers
```sh
node producer1.js
node producer2.js
node consumer1.js
node consumer2.js
```

- Open the browser and open kadeck ui at http://localhost:80 and login using username: admin password: admin
declare a new connection to your local kafka broker, use the following address
```sh
kafka:29092
```

- Open additional terminals and start the protobuf-based producer and consumer
```sh
node producer3.js
node consumer3.js
```

- Open additional terminals and start the Flink-based producer and consumer
```sh
node producer4.js
node consumer4.js
```

- The new Kafka topic for Flink is `flink-topic`.

- This example uses Flink for stream processing by running Flink services in the background. The `producer4.js` script publishes messages to the `flink-topic` Kafka topic, and the `consumer4.js` script consumes messages from the same topic. Flink can be configured to perform stream processing on the messages in the `flink-topic` Kafka topic.

- To monitor Flink and see how it works, you can use the Flink Web UI. The Flink JobManager is accessible on port 8081. Open your browser and navigate to `http://localhost:8081` to access the Flink Web UI. From there, you can monitor the status of your Flink jobs, view job details, and check the progress of your stream processing tasks.

- To demo the use of `flink-job-example.js`, follow these steps:
  1. Ensure that the Flink services are running using `docker-compose up -d`.
  2. Start the Flink-based producer and consumer by running `node producer4.js` and `node consumer4.js` in separate terminals.
  3. Open another terminal and run the Flink job example script using the command `node flink-job-example.js`.
  4. The Flink job will consume messages from the `flink-topic` Kafka topic, process them, and print the processed messages to the console.
  5. Monitor the Flink job's progress and status using the Flink Web UI at `http://localhost:8081`.

- To demo the use of `flink-job-example.py`, follow these steps:
  1. Ensure that the Flink services are running using `docker-compose up -d`.
  2. Start the Flink-based producer and consumer by running `node producer4.js` and `node consumer4.js` in separate terminals.
  3. Open another terminal and run the Flink job example script using the command `python flink-job-example.py`.
  4. The Flink job will consume messages from the `flink-topic` Kafka topic, process them, and print the processed messages to the console.
  5. Monitor the Flink job's progress and status using the Flink Web UI at `http://localhost:8081`.

- To demo the use of `flink-job-example-no-flink-lib.py`, follow these steps:
  1. Ensure that the Flink services are running using `docker-compose up -d`.
  2. Start the Flink-based producer and consumer by running `node producer4.js` and `node consumer4.js` in separate terminals.
  3. Open another terminal and run the Flink job example script using the command `python flink-job-example-no-flink-lib.py`.
  4. The Flink job will consume messages from the `flink-topic` Kafka topic, process them, and print the processed messages to the console.
  5. Monitor the Flink job's progress and status using the Flink Web UI at `http://localhost:8081`.
