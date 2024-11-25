from kafka import KafkaConsumer
from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.connectors import FlinkKafkaConsumer
from pyflink.common.serialization import SimpleStringSchema

client_id = 'example-flink-job'
shared_topic = 'flink-topic'

def process_message(value):
    # Example processing logic
    return value.upper()

def run_flink_job():
    env = StreamExecutionEnvironment.get_execution_environment()

    kafka_consumer = FlinkKafkaConsumer(
        topics=shared_topic,
        deserialization_schema=SimpleStringSchema(),
        properties={'bootstrap.servers': 'localhost:9092', 'group.id': 'flink-group'}
    )

    data_stream = env.add_source(kafka_consumer)

    processed_stream = data_stream.map(process_message)

    processed_stream.print()

    env.execute('Flink Kafka Consumer Job')

if __name__ == '__main__':
    run_flink_job()
