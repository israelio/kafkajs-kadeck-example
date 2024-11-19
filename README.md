# kafkajs-kadeck-example
- Example of running docker with one node of kafka using node consumer / producer 
use kadeck at port localhost:80 and connect to kafka:29092 to monitor the local kafka

- Run the kafka broker and kadeck docker images
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


- Open 2 terminals and start a protobuf producer and protobuf consumer
- start a kafka producers
```sh
node producer3.js
node consumer3.js
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
