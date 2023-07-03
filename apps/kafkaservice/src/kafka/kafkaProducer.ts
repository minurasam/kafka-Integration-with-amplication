const { Kafka } = require('kafkajs');


const kafka = new Kafka({ 
  clientId: 'kafka-ampication-integration', 
  brokers: ['localhost:9092'] // Replace with your broker addresses 
}); 

const producer = kafka.producer();

async function connectProducer() { 
  try { 
    await producer.connect(); 
    console.log('Producer connected to Kafka'); 
  } catch (error) { 
    console.error('Error connecting producer', error); 
  }
} 

connectProducer();

async function sendMessage(producerTopic: string, producerMessage: string ) {
  try {
    await producer.send({
      topic: producerTopic,
      messages: [
        { value: producerMessage }
      ]
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message', error);
  }
}

sendMessage('my-topic', 'Hello Kafka');