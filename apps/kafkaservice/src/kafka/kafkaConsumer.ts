const { Kafka } = require('kafkajs');


const consumer = kafka.consumer({ 
  groupId: 'my-group' 
});

async function connectConsumer() {
  try {
    await consumer.connect();
    console.log('Consumer connected to Kafka');

    await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }: any) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString()
        });
      }
    });
  } catch (error) {
    console.error('Error connecting consumer', error);
  }
}

connectConsumer();