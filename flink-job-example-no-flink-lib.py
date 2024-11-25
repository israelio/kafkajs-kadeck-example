from kafka import KafkaConsumer

client_id = 'example-flink-job-no-lib'
shared_topic = 'flink-topic'

def process_message(value):
    # Example processing logic
    return value.upper()

def run_job():
    consumer = KafkaConsumer(
        shared_topic,
        bootstrap_servers='localhost:9092',
        group_id='flink-group',
        auto_offset_reset='earliest'
    )

    print('Job started. Press Ctrl+C to exit.')

    for message in consumer:
        value = message.value.decode('utf-8')
        print(f'Received message: {value}')

        # Process the message
        processed_value = process_message(value)
        print(f'Processed message: {processed_value}')

def shutdown():
    print('Shutting down job...')
    exit(0)

if __name__ == '__main__':
    try:
        run_job()
    except KeyboardInterrupt:
        shutdown()
